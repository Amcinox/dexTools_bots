import puppeteer from 'puppeteer';
import axios from 'axios';
import { getChromePath } from "../utils/paths";
import { Config, ProxyResult } from '../types';
import { writeLog } from '../utils/logUtils';
import { toQuery } from '../utils/formatString';
import { minute } from '../utils/time';


// let proxyIndex = 0;
let port = 40000
let thread_number = 0

const baseURL = "http://45.35.12.25:9049"
export async function accessPumboAndDextools(config: Config, session: number) {
    let error: string | null | unknown = null
    let actionExecuted: string[] = [];

    const start = new Date().toLocaleString()

    const { DELAY_BEFORE_CLICK, DEXTOOLS_URL, LINKS, PUMBO_URL, proxies, actions } = config
    // Load proxy addresses from file
    // const proxies = fs.readFileSync('proxy.txt', 'utf8').split('\n').filter(Boolean);


    // Get proxy address
    // const { ip, port, username, password } = proxies[proxyIndex];

    const query = {
        num: 1,
        state: 'all',
        city: 'all',
        zip: 'all',
        t: 'json',
        port: port,
        isp: 'all'

    }

    const username = "";
    const password = "";

    const { data } = await axios.get(`${baseURL}/v1/ips${toQuery(query)}`)
    console.log({ data })
    if (data.msg !== "ok") {
        return
    }
    port = (port + 1)
    const { ip, out_ip } = data.data[0] as ProxyResult
    // logs for browser 


    // const {ip, port, username, password} = proxy






    // Increase index for the next proxy address (if index exceeds the length of the array, it will return to the beginning)
    // proxyIndex = (proxyIndex + 1) % config.proxies.length;

    const browser = await puppeteer.launch({

        headless: false, // Display Chrome browser
        executablePath: getChromePath(), //'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', //Where your GOOGLE CHROMEDRIVER is located
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--disable-software-rasterizer',
            '--disable-extensions',
            '--mute-audio',
            '--disable-application-cache',
            '--media-cache-size=1',
            '--aggressive-cache-discard',
            '--window-size=800,600', // Set the window size to 800x600
            // '--disable-infobars',
            // '--disable-notifications',
            '--disable-offline-auto-reload',
            '--disable-offline-auto-reload-visible-only',
            '--blink-settings=imagesEnabled=false',
            '--disable-image-loading',
            `--proxy-server=${ip}:${port}`,
        ],
    });

    const page = await browser.newPage();


    setTimeout(async () => {
        try {
            await page.close();
        } catch (e) {
            console.log(e)
        }
        try {

            await browser.close();

        } catch (e) {
            console.log(e)
        }
    }, minute);


    try {
        // Authenticate for the proxy server
        await page.authenticate({
            username: username,
            password: password,
        });

        await page.goto(PUMBO_URL);
        console.log('Launching One Page');

        // Start timer
        await page.evaluate(() => {
            console.time('One Page Time');
        });

        // Custom code for Pumbo Space


        page.on("error", (err) => {
            console.log("error happen at the page: ", err);
            error = err
        });




        // End timer for Pumbo Space
        await page.evaluate(() => {
            console.timeEnd('One Page Time');
        });

        await page.goto(DEXTOOLS_URL);
        console.log('Launching DEXTOOLS Web');

        // Start timer for DEXTOOLS
        await page.evaluate(() => {
            console.time('DEXTOOLS Time');
        });




        // add actions here with the key being the action name and the value being the argument
        const actionMap: { [key: string]: (arg: any) => Promise<any> } = {
            waitForSelector: (selector) => page.waitForSelector(selector),
            click: (selector) => page.click(selector),
            bringToFront: () => page.bringToFront(),
            type: ([selector, text]) => page.type(selector, text),
            deleteCookies: () => page.deleteCookie(),
            log: (message) => {
                console.log(message);
                actionExecuted.push(message);
                return Promise.resolve();
            },
        };

        for (const action of actions) {
            for (const [key, value] of Object.entries(action)) {
                if (key in actionMap) {
                    await actionMap[key as keyof typeof actionMap](value);
                }
            }
            await page.waitForTimeout(DELAY_BEFORE_CLICK);
        }


        for (const link of LINKS) {
            await page.waitForTimeout(DELAY_BEFORE_CLICK);
            await page.goto(link);
        }
        console.log('Opening ETHERSCAN WEB');

        // Stop the timer in the browser console
        await page.evaluate(() => {
            console.timeEnd('DEXTOOLS Time');
        });
    } catch (err) {
        console.error('Error:', err);
        error = err
    } finally {
        // Close the browser at the end of each cycle
        await browser.close();
        const end = new Date().toLocaleString()
        const log = {
            start: start,
            config,
            ip: ip,
            out_ip,
            thread_number,
            actionExecuted,
            session,
            error,
            status: error ? "error" : "success",
            end: end
        }
        writeLog(log, error ? "errors" : "thread");
        thread_number = thread_number + 1
        // No need to reopen the browser in this case
        console.log('Closing Browsers and repeating the function...');
    }
}


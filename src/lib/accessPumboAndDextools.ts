import puppeteer from 'puppeteer';
import { getChromePath } from "../utils/paths";
import { Config } from '../types';
import { updateLog, writeErrorLog } from '../utils/logUtils';
import { minute } from '../utils/time';


let proxyIndex = 0;
let thread_number = 0
let total_success = 0
let total_failed = 0






export async function accessPumboAndDextools(config: Config, commandIndex: number) {
    thread_number = thread_number + 1
    const Tnumber = thread_number
    const t1 = Date.now()
    console.log(`==thread ${Tnumber} Started===`)

    let error: string | null | unknown = null
    let actionExecuted: string[] = [];

    const start = new Date().toLocaleString()

    const { DELAY_BEFORE_CLICK, DEXTOOLS_URL, LINKS, PUMBO_URL, proxies, actions } = config

    // Get proxy address
    const { ip, port, username, password } = proxies[proxyIndex];

    // Increase index for the next proxy address (if index exceeds the length of the array, it will return to the beginning)
    proxyIndex = (proxyIndex + 1) % config.proxies.length;

    let browser;

    try {
        browser = await puppeteer.launch({

            headless: "new", // Display Chrome browser
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
            timeout: 120000,
        });
    } catch (e) {
        console.log(e)
        error = e
        const end = new Date().toLocaleString()
        const log = {
            start,
            config: { ...config, proxies: undefined },

            end,
            error,
            thread_number: Tnumber,
        }
        // log error here to file
        return
    }




    try {
        const page = await browser.newPage();
        page.setDefaultTimeout(0);

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


        // End timer for Pumbo Space
        await page.evaluate(() => {
            console.timeEnd('One Page Time');
        });
        // Custom code for Pumbo Space

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
            delay: (number) => page.waitForTimeout(number),

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


        // for (const link of LINKS) {
        //     await page.waitForTimeout(DELAY_BEFORE_CLICK);
        //     await page.goto(link);
        // }
        // console.log('Opening ETHERSCAN WEB');

        // Stop the timer in the browser console
        await page.evaluate(() => {
            console.timeEnd('DEXTOOLS Time');
        });
        total_success = total_success + 1
    } catch (err) {
        console.error('Error:', err);
        error = err
        total_failed = total_failed + 1
    } finally {
        // Close the browser at the end of each cycle
        await browser.close();
        const end = new Date().toLocaleString()
        const log = {
            start: start,
            ip: ip,
            Tnumber,
            actionExecuted,
            error,
            thread_number,
            status: error ? "error" : "success",
            end: end
        }
        if (error) {
            writeErrorLog(commandIndex, log, "thread")
        }
        updateLog(commandIndex, log, "thread");

        // No need to reopen the browser in this case
        const t2 = Date.now()
        console.log(`==thread ${Tnumber} Ended in ${t2 - t1} ms=`)
        console.log("Total Success: ", total_success)
        console.log("Total Failed: ", total_failed)
        console.log("===============")
        console.log('Closing Browsers and repeating the function...');
    }
}


import puppeteer from 'puppeteer';
import { actions, proxies } from '../data';
import { getChromePath } from "../utils/paths";
import { DELAY_BEFORE_CLICK, DEXTOOLS_URL, LINKS, PUMBO_URL } from "../config";




let proxyIndex = 0;
export async function accessPumboAndDextools() {
    // Load proxy addresses from file
    // const proxies = fs.readFileSync('proxy.txt', 'utf8').split('\n').filter(Boolean);

    // Get proxy address
    const { ip, port, username, password } = proxies[proxyIndex];
    // const {ip, port, username, password} = proxy

    // Increase index for the next proxy address (if index exceeds the length of the array, it will return to the beginning)
    proxyIndex = (proxyIndex + 1) % proxies.length;

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
            log: (message) => {
                console.log(message);
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
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Close the browser at the end of each cycle
        await browser.close();

        // No need to reopen the browser in this case
        console.log('Closing Browsers and repeating the function...');
    }
}


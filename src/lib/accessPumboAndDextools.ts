import puppeteer from 'puppeteer';
import fs from 'fs';


const DELAY_BEFORE_CLICK = process.env.DELAY_BEFORE_CLICK as unknown as number //3000; // 3 milliseconds
const erc20Address = process.env.ERC_20_ADDRESS!
const PUMBO_URL = process.env.PUMBO_URL! ///'https://www.google.com';
const DEXTOOLS_URL = process.env.DEXTOOLS_URL! //'https://www.dextools.io/';
const LINKS = [
    `https://www.dextools.io/app/en/ether/pair-explorer/${process.env.ERC_20_ADDRESS}`,
];

let proxyIndex = 0;


const actions = [
    {
        waitForSelector: '.close',
        click: '.close',
        log: 'Closing ad banner'
    },
    {
        waitForSelector: '.search-mobile-button',
        click: '.search-mobile-button',
        log: 'Clicking on search button'
    },
    {
        waitForSelector: '.search-pairs',
        type: ['.search-pairs', erc20Address],
        log: 'Entering ERC20 address and searching'
    },
    {
        waitForSelector: '.auto-complete-text',
        click: '.auto-complete-text'
    },
    {
        waitForSelector: 'app-favorite-button',
        click: 'app-favorite-button',
        log: 'Clicking on favorite button'
    },
    {
        waitForSelector: '.fa-share',
        click: '.fa-share',
        log: 'Clicking on share'
    },
    {
        waitForSelector: 'button.btn.btn-primary.btn-swap-1',
        click: 'button.btn.btn-primary.btn-swap-1',
        log: 'Copying...'
    },
    {
        waitForSelector: '.close.ng-star-inserted',
        click: '.close.ng-star-inserted',
        log: 'Exiting share'
    }
];



export async function accessPumboAndDextools() {
    // Load proxy addresses from file
    const proxies = fs.readFileSync('proxy.txt', 'utf8').split('\n').filter(Boolean);

    // Get proxy address
    const proxy = proxies[proxyIndex];
    const [ip, port, username, password] = proxy.split(':');

    // Increase index for the next proxy address (if index exceeds the length of the array, it will return to the beginning)
    proxyIndex = (proxyIndex + 1) % proxies.length;

    const browser = await puppeteer.launch({
        headless: false, // Display Chrome browser
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', //Where your GOOGLE CHROMEDRIVER is located
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



        for (const action of actions) {
            if (action.waitForSelector) {
                await page.waitForSelector(action.waitForSelector);
            }

            if (action.click) {
                await page.click(action.click);
            }

            if (action.type) {
                const [selector, text] = action.type;
                await page.type(selector, text);
            }

            if (action.log) {
                console.log(action.log);
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


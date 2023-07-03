"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const puppeteer = require('puppeteer');
const request = require('request-promise');
const fs = require('fs');
const PROCESS_COUNT = 1;
const THREAD_COUNT = 1000; // Number of simulations at one moment
const RESTART_INTERVAL = 10000; // 10 seconds
const IP_INTERVAL = 30000; // 30 seconds
const DELAY_BEFORE_CLICK = 3000; // 3 milliseconds
const DELAY_BETWEEN_THREADS = 10000; // 10 seconds (The difference between simulations)
const PUMBO_URL = 'https://www.google.com';
const DEXTOOLS_URL = 'https://www.dextools.io/';
const LINKS = [
    'https://www.dextools.io/app/en/ether/pair-explorer/0x252ba9b5916171dbdadd2cec7f91875a006955d0',
];
const commands = [
    accessPumboAndDextoolsInThreads,
];
let proxyIndex = 0;
function* cyclicGenerator(array) {
    let index = 0;
    while (true) {
        yield array[index];
        index = (index + 1) % array.length;
    }
}
process.setMaxListeners(30);
function accessPumboAndDextools() {
    return __awaiter(this, void 0, void 0, function* () {
        // Load proxy addresses from file
        const proxies = fs.readFileSync('proxy.txt', 'utf8').split('\n').filter(Boolean);
        // Get proxy address
        const proxy = proxies[proxyIndex];
        const [ip, port, username, password] = proxy.split(':');
        // Increase index for the next proxy address (if index exceeds the length of the array, it will return to the beginning)
        proxyIndex = (proxyIndex + 1) % proxies.length;
        const browser = yield puppeteer.launch({
            headless: false,
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
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
                '--window-size=800,600',
                // '--disable-infobars',
                // '--disable-notifications',
                '--disable-offline-auto-reload',
                '--disable-offline-auto-reload-visible-only',
                '--blink-settings=imagesEnabled=false',
                '--disable-image-loading',
                `--proxy-server=${ip}:${port}`,
            ],
        });
        const page = yield browser.newPage();
        try {
            // Authenticate for the proxy server
            yield page.authenticate({
                username: username,
                password: password,
            });
            yield page.goto(PUMBO_URL);
            console.log('Launching One Page');
            // Start timer
            yield page.evaluate(() => {
                console.time('One Page Time');
            });
            // Custom code for Pumbo Space
            // End timer for Pumbo Space
            yield page.evaluate(() => {
                console.timeEnd('One Page Time');
            });
            yield page.goto(DEXTOOLS_URL);
            console.log('Launching DEXTOOLS Web');
            // Start timer for DEXTOOLS
            yield page.evaluate(() => {
                console.time('DEXTOOLS Time');
            });
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('.close');
            yield page.click('.close');
            console.log('Closing ad banner');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('.search-mobile-button');
            yield page.click('.search-mobile-button');
            console.log('Clicking on search button');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('.search-pairs');
            yield page.type('.search-pairs', '0x252ba9b5916171dbdadd2cec7f91875a006955d0'); // Enter what will be searched here
            console.log('Entering ERC20 address and searching');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('.auto-complete-text');
            yield page.click('.auto-complete-text');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('app-favorite-button');
            yield page.click('app-favorite-button');
            console.log('Clicking on favorite button');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('.fa-share');
            yield page.click('.fa-share');
            console.log('Clicking on share');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('button.btn.btn-primary.btn-swap-1');
            yield page.click('button.btn.btn-primary.btn-swap-1');
            console.log('Copying...');
            yield page.waitForTimeout(DELAY_BEFORE_CLICK);
            yield page.waitForSelector('.close.ng-star-inserted');
            yield page.click('.close.ng-star-inserted');
            console.log('Exiting share');
            for (const link of LINKS) {
                yield page.waitForTimeout(DELAY_BEFORE_CLICK);
                yield page.goto(link);
            }
            console.log('Opening ETHERSCAN WEB');
            // Stop the timer in the browser console
            yield page.evaluate(() => {
                console.timeEnd('DEXTOOLS Time');
            });
        }
        catch (error) {
            console.error('Error:', error);
        }
        finally {
            // Close the browser at the end of each cycle
            yield browser.close();
            // No need to reopen the browser in this case
            console.log('Closing Browsers and repeating the function...');
        }
    });
}
function accessPumboAndDextoolsInThreads() {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = [];
        for (let i = 0; i < THREAD_COUNT; i++) {
            promises.push(accessPumboAndDextools());
            yield delay(DELAY_BETWEEN_THREADS); // Add delay between threads
        }
        yield Promise.all(promises);
    });
}
function executeCommands() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const command of commands) {
            yield command();
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        while (true) {
            yield executeCommands();
            yield delay(RESTART_INTERVAL);
            // Reset the commands array for repeating the commands
            commands.length = 0;
            commands.push(accessPumboAndDextoolsInThreads);
        }
    });
}
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
main().catch((err) => console.error(err));

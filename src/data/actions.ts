import { Action } from "../types";
const erc20Address = process.env.ERC_20_ADDRESS!


export const actions: Action[] = [
    {
        waitForSelector: '.close',
        click: '.close',
        log: 'Closing ad banner',
        delay: 2300

    },
    {
        waitForSelector: '.search-mobile-button',
        click: '.search-mobile-button',
        log: 'Clicking on search button',
        delay: 3000
    },
    {
        waitForSelector: '.search-pairs',
        type: ['.search-pairs', erc20Address],
        log: 'Entering ERC20 address and searching',
        delay: 3000
    },
    {
        waitForSelector: '.auto-complete-text',
        click: '.auto-complete-text',
        delay: 3200
    },
    {
        waitForSelector: 'app-favorite-button',
        click: 'app-favorite-button',
        log: 'Adding it to Favorite',
        delay: 1302
    },

    // links

    {
        waitForSelector: '.fa-desktop',
        click: '.fa-desktop',
        log: 'Opened Landing Page',
        bringToFront: true,
        delay: 500
    },
    {
        waitForSelector: '.fa-telegram',
        click: ".fa-telegram",
        log: 'Opened Telegram',
        bringToFront: true,
        delay: 783
    },
    {
        waitForSelector: ".fa-twitter",
        click: ".fa-twitter",
        log: 'Opened Twitter',
        bringToFront: true,
        delay: 937
    },
    {
        waitForSelector: ".cmc-icon",
        click: ".cmc-icon",
        log: 'Opened CoinMarketCap',
        bringToFront: true,
        delay: 1242
    },
    {
        waitForSelector: 'img[src="assets/img/bubblemaps.png"]',
        click: 'img[src="assets/img/bubblemaps.png"]',
        log: 'Opened BubbleMaps',
        bringToFront: true,
        delay: 1345
    },

    {
        waitForSelector: 'img[src="assets/img/chains/etherscan.png"]',
        click: 'img[src="assets/img/chains/etherscan.png"]',
        log: 'Opened Etherscan',
        bringToFront: true,
        delay: 1100
    },



    {
        waitForSelector: '.fa-share',
        click: '.fa-share',
        log: 'Clicking on share',
        delay: 1400
    },
    {
        waitForSelector: 'button.btn.btn-primary.btn-swap-1',
        click: 'button.btn.btn-primary.btn-swap-1',
        log: 'Copying...',
        delay: 3000
    },
    {
        waitForSelector: 'btn btn-primary btn-swap-1',
        click: 'btn btn-primary btn-swap-1',
        log: 'Copying 2...',
        delay: 3000
    },
    {
        waitForSelector: '.close.ng-star-inserted',
        click: '.close.ng-star-inserted',
        log: 'Exiting share',
        delay: 1000
    }
];
import { Action } from "../types";
const erc20Address = process.env.ERC_20_ADDRESS!


export const actions: Action[] = [
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
        log: 'Adding it to Favorite'
    },

    // links

    {
        waitForSelector: '.fa-desktop',
        click: '.fa-desktop',
        log: 'Opened Landing Page',
        bringToFront: true,
    },
    {
        waitForSelector: '.fa-telegram',
        click: ".fa-telegram",
        log: 'Opened Telegram',
        bringToFront: true,
    },
    {
        waitForSelector: ".fa-twitter",
        click: ".fa-twitter",
        log: 'Opened Twitter',
        bringToFront: true,
    },
    {
        waitForSelector: ".cmc-icon",
        click: ".cmc-icon",
        log: 'Opened CoinMarketCap',
        bringToFront: true,
    },
    {
        waitForSelector: 'img[src="assets/img/bubblemaps.png"]',
        click: 'img[src="assets/img/bubblemaps.png"]',
        log: 'Opened BubbleMaps',
        bringToFront: true,
    },

    {
        waitForSelector: 'img[src="assets/img/chains/etherscan.png"]',
        click: 'img[src="assets/img/chains/etherscan.png"]',
        log: 'Opened Etherscan',
        bringToFront: true,
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
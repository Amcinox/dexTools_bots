import { actions, proxies } from "./data";
import { Config } from "./types";
// import { minute } from "./utils/time";

// lengths 
export const ACTIONS_LENGTH = actions.length;
export const PROXIES_LENGTH = proxies.length;


export const RESTART_INTERVAL = process.env.RESTART_INTERVAL as unknown as number; // 10 seconds to restat the whole process


// puppeteer config
export const DELAY_BEFORE_CLICK = process.env.DELAY_BEFORE_CLICK as unknown as number
export const PUMBO_URL = process.env.PUMBO_URL!
export const DEXTOOLS_URL = process.env.DEXTOOLS_URL!
export const LINKS: string[] = [
    `https://www.dextools.io/app/en/ether/pair-explorer/${process.env.ERC_20_ADDRESS}`,
];

// how many browsers to open
export const THREAD_COUNT = process.env.THREAD_COUNT as unknown as number // Number of simulations at one moment
export const DELAY_BETWEEN_THREADS = process.env.DELAY_BETWEEN_THREADS as unknown as number // 10 seconds (The difference between simulations)

// export const DELAY_BETWEEN_THREADS = minute / THREAD_COUNT; // 10 seconds (The difference between simulations)
const config: Config = {
    ACTIONS_LENGTH,
    PROXIES_LENGTH,
    RESTART_INTERVAL,
    DELAY_BEFORE_CLICK,
    PUMBO_URL,
    DEXTOOLS_URL,
    LINKS,
    THREAD_COUNT,
    DELAY_BETWEEN_THREADS,
    proxies,
    actions,

    // threads delay
    // breathing_step: 5,
    BREATHING_STEP: 5,
    BREATHING_DELAY: 5000, // 1 minute

}



export default config;
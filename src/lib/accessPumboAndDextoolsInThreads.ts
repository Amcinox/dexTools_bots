import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';

const THREAD_COUNT = process.env.THREAD_COUNT as unknown as number //1000; // Number of simulations at one moment
const DELAY_BETWEEN_THREADS = process.env.DELAY_BETWEEN_THREADS as unknown as number //10000; // 10 seconds (The difference between simulations)

export async function accessPumboAndDextoolsInThreads() {
    const promises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        promises.push(accessPumboAndDextools());
        await delay(DELAY_BETWEEN_THREADS); // Add delay between threads
    }
    await Promise.all(promises);
}

import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { THREAD_COUNT, DELAY_BETWEEN_THREADS } from '../config';

export async function accessPumboAndDextoolsInThreads() {
    const promises = [];
    for (let i = 0; i < THREAD_COUNT; i++) {
        promises.push(accessPumboAndDextools());
        await delay(DELAY_BETWEEN_THREADS); // Add delay between threads
    }
    await Promise.all(promises);
}

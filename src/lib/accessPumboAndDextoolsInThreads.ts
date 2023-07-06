import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { Config } from '../types';
const proxyFile = process.env.PROXY_FILE as string;

export async function accessPumboAndDextoolsInThreads(config: Config, commandIndex: number): Promise<void> {
    const tasks: Promise<void>[] = [];

    for (let i = 1; i < config.THREAD_COUNT; i++) {
        console.log("Thread " + i + " started")
        let Tdelay = config.DELAY_BETWEEN_THREADS
        if (i % config.LONG_BREATHING_STEP === 0) Tdelay = config.LONG_BREATHING_DELAY
        else if (i % config.BREATHING_STEP === 0) Tdelay = config.BREATHING_DELAY
        // event for each browser 

        const task = accessPumboAndDextools(config, commandIndex);

        tasks.push(task);
        // await delay(config.DELAY_BETWEEN_THREADS );
        console.group({ proxyFile })
        console.log("Sleeping for " + Tdelay + " ms")
        await delay(Tdelay);

    }
    await Promise.all(tasks);
}
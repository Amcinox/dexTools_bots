import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { Config } from '../types';


export async function accessPumboAndDextoolsInThreads(config: Config, session: number): Promise<void> {
    const tasks: Promise<void>[] = [];

    for (let i = 0; i < config.THREAD_COUNT; i++) {
        let Tdelay = config.DELAY_BETWEEN_THREADS
        if (i % config.LONG_BREATHING_STEP === 0) Tdelay = config.LONG_BREATHING_DELAY
        else if (i % config.BREATHING_STEP === 0) Tdelay = config.BREATHING_DELAY
        // event for each browser 

        const task = accessPumboAndDextools(config, session);
        tasks.push(task);
        // await delay(config.DELAY_BETWEEN_THREADS );
        await delay(Tdelay);

    }
    await Promise.all(tasks);
}
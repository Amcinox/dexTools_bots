import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { Config } from '../types';


export async function accessPumboAndDextoolsInThreads(config: Config, session: number): Promise<void> {
    const tasks: Promise<void>[] = [];

    for (let i = 0; i < config.THREAD_COUNT; i++) {
        let Tdelay = i % config.BREATHING_STEP ? config.DELAY_BETWEEN_THREADS : config.BREATHING_DELAY
        // event for each browser 

        const task = accessPumboAndDextools(config, session);
        tasks.push(task);
        // await delay(config.DELAY_BETWEEN_THREADS );
        await delay(Tdelay);

    }
    await Promise.all(tasks);
}
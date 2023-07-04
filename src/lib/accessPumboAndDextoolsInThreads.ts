import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { Config } from '../types';

export async function accessPumboAndDextoolsInThreads(config: Config, session: number): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (let i = 0; i < config.THREAD_COUNT; i++) {
        // event for each browser 
        const task = accessPumboAndDextools(config, session);
        tasks.push(task);
        await delay(config.DELAY_BETWEEN_THREADS);
    }
    await Promise.all(tasks);
}
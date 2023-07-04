import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { Config } from '../types';

export async function accessPumboAndDextoolsInThreads(config: Config, session: number): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (let i = 0; i < config.THREAD_COUNT; i++) {
        tasks.push(accessPumboAndDextools(config, session));
        await delay(config.DELAY_BETWEEN_THREADS);
    }

    for (const task of tasks) {
        await task;
    }
}
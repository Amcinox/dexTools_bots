import { accessPumboAndDextools } from './accessPumboAndDextools';
import { delay } from '../utils/time';
import { Config } from '../types';

export async function accessPumboAndDextoolsInThreads(config: Config): Promise<void> {
    const tasks: Promise<void>[] = [];
    for (let i = 0; i < config.THREAD_COUNT; i++) {
        const task = accessPumboAndDextools(config);
        tasks.push(task);
        await delay(config.DELAY_BETWEEN_THREADS);
    }
    await Promise.all(tasks);
}

import { accessPumboAndDextoolsInThreads } from './accessPumboAndDextoolsInThreads';
import { minute, hour, delay } from '../utils/time';
import { Config } from '../types';
import config from '../config';
import { createLog, updateLog } from '../utils/logUtils';


interface Command {
    config: Config;
    run: (config: Config, session: number) => Promise<void>;
}
// ikon object 
const commands: Command[] = [
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 240, DELAY_BETWEEN_THREADS: 15000 },
        run: accessPumboAndDextoolsInThreads
    },

    // {
    //     config: { ...config, THREAD_COUNT: 600, DELAY_BETWEEN_THREADS: hour / 600 },
    //     run: accessPumboAndDextoolsInThreads
    // },
    // {
    //     config: { ...config, THREAD_COUNT: 1000, DELAY_BETWEEN_THREADS: hour / 1000 },
    //     run: accessPumboAndDextoolsInThreads
    // },
    // {
    //     config: { ...config, THREAD_COUNT: 1500, DELAY_BETWEEN_THREADS: hour / 1500 },
    //     run: accessPumboAndDextoolsInThreads
    // },
    // {
    //     config: { ...config, THREAD_COUNT: 1600, DELAY_BETWEEN_THREADS: hour / 1600 },
    //     run: accessPumboAndDextoolsInThreads
    // },
];



export async function executeCommands() {
    commands.forEach((command, index) => {
        setTimeout(async () => {
            console.log(`==Command ${index} Started===`)
            const start = new Date().toLocaleString()
            // to create log file
            createLog(
                index, start, command.config
            );
            await command.run(command.config, index);
            const end = new Date().toLocaleString()

            // a delay to let the last thread finish and update the log file before updating the end time
            await delay(2000)
            updateLog(index, { end: end }, "command");

        }, index * hour);
    });

}
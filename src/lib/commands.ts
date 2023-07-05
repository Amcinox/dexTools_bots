import { accessPumboAndDextoolsInThreads } from './accessPumboAndDextoolsInThreads';
import { minute, hour } from '../utils/time';
import { Config } from '../types';
import config from '../config';
import { writeLog } from '../utils/logUtils';


interface Command {
    config: Config;
    run: (config: Config, session: number) => Promise<void>;
}
// ikon object 
const commands: Command[] = [
    {
        config: { ...config, THREAD_COUNT: 200, DELAY_BETWEEN_THREADS: hour / 200 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 400, DELAY_BETWEEN_THREADS: hour / 400 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 600, DELAY_BETWEEN_THREADS: hour / 600 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 1000, DELAY_BETWEEN_THREADS: hour / 1000 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 1500, DELAY_BETWEEN_THREADS: hour / 1500 },
        run: accessPumboAndDextoolsInThreads
    },
    {
        config: { ...config, THREAD_COUNT: 1600, DELAY_BETWEEN_THREADS: hour / 1600 },
        run: accessPumboAndDextoolsInThreads
    },
];



let session = 0;
export async function executeCommands() {
    commands.forEach((command, index) => {
        setTimeout(async () => {
            console.log(`============  Command ${index} Started =============`)
            const start = new Date().toLocaleString()
            await command.run(command.config, session);
            const end = new Date().toLocaleString()
            const log = {
                start,
                config: { ...command.config, proxies: undefined },
                index,
                session,
                end,
            }
            writeLog(log, "command");

        }, index * hour);
    });
    session++;

}
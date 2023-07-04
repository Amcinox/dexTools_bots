import { accessPumboAndDextoolsInThreads } from './accessPumboAndDextoolsInThreads';
import { minute } from '../utils/time';
import { Config } from '../types';
import config from '../config';


interface Command {
    config: Config;
    run: (config: Config) => Promise<void>;
}
// ikon object 
const commands: Command[] = [{
    config: config,
    run: accessPumboAndDextoolsInThreads
},
{
    // will launch 10 threads during 1 minute 
    config: { ...config, THREAD_COUNT: 10, DELAY_BETWEEN_THREADS: minute / 10 },
    run: accessPumboAndDextoolsInThreads
}
];

export async function executeCommands() {
    commands.forEach((command, index) => {
        setTimeout(async () => {
            // console time  started 
            console.log("========== start new command  ============")
            await command.run(command.config);
        }, index * minute);
    });

}
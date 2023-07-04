
require('dotenv').config();
import { delay } from './utils/time';
import { RESTART_INTERVAL } from './config';
import { executeCommands } from './lib/commands';


process.setMaxListeners(0);

async function main() {
  while (true) {
    await executeCommands();

    await delay(RESTART_INTERVAL);
    // Reset the commands array for repeating the commands
    // commands.length = 0;
    // commands.push({
    //   config: config,
    //   run: accessPumboAndDextoolsInThreads
    // });
  }
}



main().catch((err) => console.error(err));
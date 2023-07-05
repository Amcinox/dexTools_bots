
require('dotenv').config();
import { delay } from './utils/time';
import config, { RESTART_INTERVAL } from './config';
import { executeCommands } from './lib/commands';
import { accessPumboAndDextoolsInThreads } from './lib/accessPumboAndDextoolsInThreads';


const commands = []
process.setMaxListeners(0);

async function main() {
  // while (true) {

  await executeCommands();


  // await delay(RESTART_INTERVAL);
  // Reset the commands array for repeating the commands
  //   commands.length = 0;
  //   commands.push({
  //     config: config,
  //     run: accessPumboAndDextoolsInThreads
  //   });
  // }
}




main().catch((err) => console.error({ Mainerr: err }));
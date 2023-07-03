
require('dotenv').config();
import { accessPumboAndDextoolsInThreads } from './lib/accessPumboAndDextoolsInThreads';
import { delay } from './utils/time';

const RESTART_INTERVAL = 10000; // 10 seconds


const commands = [
  accessPumboAndDextoolsInThreads,
];
process.setMaxListeners(30);

async function executeCommands() {
  for (const command of commands) {
    await command();
  }
}

async function main() {
  while (true) {
    await executeCommands();

    await delay(RESTART_INTERVAL);
    // Reset the commands array for repeating the commands
    commands.length = 0;
    commands.push(accessPumboAndDextoolsInThreads);
  }
}



main().catch((err) => console.error(err));
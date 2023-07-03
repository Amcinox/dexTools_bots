import { accessPumboAndDextoolsInThreads } from './accessPumboAndDextoolsInThreads';

export const commands = [
    accessPumboAndDextoolsInThreads,
];

export async function executeCommands() {
    for (const command of commands) {
        await command();
    }
}
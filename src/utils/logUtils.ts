import fs from 'fs';
import path from 'path';

type Type = "thread" | "command"
export function writeLog(log: any, type: Type) {
    console.log("Log Start")
    const logFileName = `log_${Date.now()}.json`;
    const logFilePath = path.join(__dirname, '..', 'logs', type, logFileName);
    fs.writeFile(logFilePath, JSON.stringify(log, null, 2), (err) => {
        if (err) {
            console.error(`Error writing log file: ${err}`);
        } else {
            console.log(`Log file "${logFileName}" created successfully.`);
        }
    });
}
import fs from 'fs';
import path from 'path';

type Type = "command" | "thread";
type Status = "error" | "success";

interface LogData {
    command: number;
    started: string;
    config: any;
    threads?: ThreadData[];
    end: string | null;
    totalCompleted: number;
    totalFailed: number;
}

interface ThreadData {
    thread: number;
    start: string;
    end: string;
    proxies: any[];
    actions: string[];
    ip: string,
    Tnumber: number,
    actionExecuted: string[],
    error: string,
    status: Status
}

export function createLog(command: number, started: string, config: any) {
    const logFolder = path.join(__dirname, '..', 'logs', 'commands');
    const logFileName = `command-${command}.json`;
    const logFilePath = path.join(logFolder, logFileName);

    const logData: LogData = {
        command,
        started,
        config,
        threads: [],
        end: null,
        totalCompleted: 0,
        totalFailed: 0,
    };

    fs.mkdir(logFolder, { recursive: true }, (err) => {
        if (err) {
            console.error(`Error creating log folder: ${err}`);
            return;
        }

        fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), (err) => {
            if (err) {
                console.error(`Error writing log file: ${err}`);
            } else {
                console.log(`Log file "${logFileName}" created successfully.`);
            }
        });
    });
}

export function updateLog(command: number, logs: any, type: Type) {
    const logFolder = path.join(__dirname, '..', 'logs', 'commands');
    const logFileName = `command-${command}.json`;
    const logFilePath = path.join(logFolder, logFileName);

    fs.readFile(logFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading log file: ${err}`);
            return;
        }

        let logData: LogData;
        try {
            logData = JSON.parse(data);
        } catch (err) {
            console.error(`Error parsing log file: ${err}`);
            return;
        }

        if (type === 'thread') {
            if (!logData.threads) {
                logData.threads = [];
            }
            logData.threads = [...logData.threads, logs];
        } else if (type === 'command') {
            logData.end = logs.end;
            logData.threads = logData.threads || [];
            const totalCompleted = logData.threads.filter((thread) => thread.status === 'success').length;
            const totalFailed = logData.threads.filter((thread) => thread.status === 'error').length;

            logData.totalCompleted = totalCompleted;
            logData.totalFailed = totalFailed;
        }

        fs.writeFile(logFilePath, JSON.stringify(logData, null, 2), (err) => {
            if (err) {
                console.error(`Error updating log file: ${err}`);
            } else {
                console.log(`Log file "${logFileName}" updated successfully.`);
            }
        });
    });
}



export function writeErrorLog(commandIndex: number, logs: any, type: Type) {
    const errorLogFolder = path.join(__dirname, '..', 'logs', 'errors');
    let errorLogFileName: string;

    if (type === 'command') {
        errorLogFileName = `command-${commandIndex}-date-${Date.now()}.json`;
    } else if (type === 'thread') {
        const threadNumber = logs.thread_number; // Assuming logs contain the thread number
        errorLogFileName = `command-${commandIndex}-thread-${threadNumber}-date.json`;
    } else {
        console.error(`Invalid log type: ${type}`);
        return;
    }

    const errorLogFilePath = path.join(errorLogFolder, errorLogFileName);

    fs.mkdir(errorLogFolder, { recursive: true }, (err) => {
        if (err) {
            console.error(`Error creating error log folder: ${err}`);
            return;
        }

        fs.writeFile(errorLogFilePath, JSON.stringify(logs, null, 2), (err) => {
            if (err) {
                console.error(`Error writing error log file: ${err}`);
            } else {
                console.log(`Error log file "${errorLogFileName}" created successfully.`);
            }
        });
    });
}
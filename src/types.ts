export interface Action {
    waitForSelector?: string;
    click?: string;
    type?: [string, string];
    bringToFront?: boolean // used to bring the main tab to the front
    log?: string;
}


export interface Proxy {
    ip: string;
    port: string;
    username: string;
    password: string;
}
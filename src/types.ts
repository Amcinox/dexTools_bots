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

export interface Config {
    ACTIONS_LENGTH: number;
    PROXIES_LENGTH: number;
    RESTART_INTERVAL: number;
    DELAY_BEFORE_CLICK: number;
    PUMBO_URL: string;
    DEXTOOLS_URL: string;
    LINKS: string[];
    THREAD_COUNT: number;
    DELAY_BETWEEN_THREADS: number;
    proxies: Proxy[];
    actions: Action[];
}

export interface ProxyResult {
    ip: string,
    port: number,
    country: string,
    state: string,
    city: string,
    zip: string,
    out_ip: string
}
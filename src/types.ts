export interface Action {
    waitForSelector?: string;
    click?: string;
    type?: [string, string];
    log?: string;
}

export interface Action {
    waitForSelector?: string;
    click?: string;
    type?: [string, string];
    bringToFront?: boolean // used to bring the main tab to the front
    log?: string;
}

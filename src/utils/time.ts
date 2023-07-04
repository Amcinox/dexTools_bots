export function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
export const hour = 60 * 60 * 1000
export const minute = 60 * 1000
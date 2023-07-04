import * as os from 'os';
const Paths: Record<NodeJS.Platform, string> = {
    linux: '/usr/bin/google-chrome',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    aix: '/opt/google/chrome/chrome',
    freebsd: '/usr/local/bin/google-chrome',
    openbsd: '/usr/local/bin/google-chrome',
    sunos: '/opt/google/chrome/chrome',
    android: '/data/data/com.android.chrome/app_chrome/Local State',
    haiku: '',
    cygwin: '',
    netbsd: '/usr/pkg/bin/google-chrome'
}

export function getChromePath(): string {
    const platform = os.platform();
    return Paths[platform];
}
import { Proxy } from "../types";
import fs from 'fs';


export const proxies: any[] = fs.readFileSync('proxy.txt', 'utf8').split('\n').filter(Boolean).map((result: string) => {
    const proxy = result.split(':');
    return {
        ip: proxy[0],
        port: proxy[1],
        username: proxy[2],
        password: proxy[3]
    }
})

// const proxy = proxies[proxyIndex];
// const [ip, port, username, password] = proxy.split(':');



// const username = process.env.PROXY_USERNAME!;
// const password = process.env.PROXY_PASSWORD!;
// const port = process.env.PROXY_PORT!;

// const ipList = [
//     "176.100.150.241",
//     "91.218.179.196",
//     "91.218.179.194",
//     "91.218.179.192",
//     "176.100.156.15",
//     "176.100.156.11",
//     "176.100.156.40",
//     "176.100.156.49",
//     "176.100.156.47",
//     "176.100.156.46",
//     "176.100.156.45",
//     "91.218.179.157",
//     "91.218.179.154",
//     "91.218.179.155",
//     "91.218.179.152",
//     "176.100.156.54",
//     "176.100.156.53",
//     "176.100.156.52",
//     "176.100.156.51",
//     "176.100.156.50",
//     "176.100.156.59",
//     "176.100.156.57",
//     "176.100.156.56",
//     "91.218.179.189",
//     "176.100.156.20",
//     "176.100.156.29",
//     "176.100.156.27",
//     "176.100.156.26",
//     "176.100.156.170",
//     "176.100.156.185",
//     "91.218.179.43",
//     "91.218.179.36",
//     "176.100.150.238",
//     "176.100.150.23",
//     "176.100.156.238",
//     "91.218.179.235",
//     "176.100.150.47",
//     "176.100.156.236",
//     "176.100.156.200",
//     "91.218.179.9",
//     "176.100.157.27",
//     "91.218.179.48",
//     "91.218.179.159",
//     "176.100.156.55",
//     "176.100.156.189",
//     "91.218.179.195",
//     "176.100.150.179",
//     "176.100.150.14",
//     "176.100.156.234"]


// 
// export const proxies: Proxy[] = ipList.map((ip) => {
//     return {
//         ip,
//         port,
//         username: "",
//         password: ""
//     }

// })


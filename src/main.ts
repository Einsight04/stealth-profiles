import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import {fileURLToPath} from 'url';

puppeteer.use(StealthPlugin());

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// const browserProfiles: number[] = [
//     1
// ]
//
// const files = await fs.readdir(path.join(__dirname, '../resources', 'stealth-browsers'));
//
// for (let file of files) {
//     await fs.rmdir(path.join(__dirname, '../resources', 'stealth-browsers', file), {recursive: true});
// }
//
// for (let profile of browserProfiles) {
//     await puppeteer.launch({
//         executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
//         userDataDir: path.join(__dirname, '../resources', `stealth-browsers\\context-${profile}`),
//         headless: false,
//         defaultViewport: null
//     });
// }


const browser = await puppeteer.launch({
    executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
    userDataDir: 'C:\\Users\\ghait\\IdeaProjects\\cheggy-backend\\src\\main\\resources\\stealth-browsers\\context-1',
    headless: false,
    defaultViewport: null
});
//
// // add cookie
// const page = await browser.newPage();
//
// // delete all current cookies
// await page.deleteCookie(
//     ...await page.cookies()
// );
//
// interface Cookie {
//     name: string;
//     value: string;
//     domain: string;
//     path: string;
//     secure: boolean;
//     httpOnly: boolean;
//     sameSite: 'Strict' | 'Lax' | 'None';
//     expires: number;
// }
//
// const cookies: Cookie[] = JSON.parse(await fs.readFile(path.join(__dirname, '../resources', 'cookie.json'), 'utf8'));
//
// for (let cookie of cookies) {
//     await page.setCookie({
//         name: cookie.name,
//         value: cookie.value,
//         domain: cookie.domain,
//         path: cookie.path,
//         secure: cookie.secure,
//         httpOnly: cookie.httpOnly,
//         sameSite: cookie.sameSite,
//         expires: cookie.expires
//     });
// }
//
// await page.goto('https://www.chegg.com');
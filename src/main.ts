import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import {fileURLToPath} from 'url';

puppeteer.use(StealthPlugin());

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

interface Cookie {
    name: string;
    value: string;
    domain: string;
    path: string;
    secure: boolean;
    httpOnly: boolean;
    sameSite: 'Strict' | 'Lax' | 'None';
    expires: number;
}

// browser profiles to generate
const browserProfiles: number[] = [
    2, 3, 4, 5
]

const cookiesFileName: string[] = await fs.readdir(path.join(__dirname, '..', 'resources/cookies'));

// fix up cookies to be used with puppeteer
for (let cookieFileName of cookiesFileName) {
    const cookiesContent: string = await fs.readFile(path.join(__dirname, '..', 'resources/cookies', cookieFileName), 'utf8');

    const cookieContentFix: string = cookiesContent
        .replace(/"sameSite": null/g, '"sameSite": "None"')
        .replace(/"sameSite": "lax"/g, '"sameSite": "Lax"')
        .replace(/"sameSite": "no_restriction"/g, '"sameSite": "None"');

    await fs.writeFile(path.join(__dirname, '..', 'resources/cookies', cookieFileName), cookieContentFix, 'utf8');
}

for (let i = 0; i < browserProfiles.length; i++) {
    const cookiesContent: Cookie[] = JSON.parse(await fs.readFile(path.join(__dirname, '../resources', cookiesFileName[i]), 'utf8'));

    const browser = await puppeteer.launch({
        executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
        userDataDir: path.join(__dirname, '../resources', `stealth-browsers\\context-${browserProfiles[i]}`),
        headless: false,
        defaultViewport: null
    });

    // add cookie
    const page = await browser.newPage();

    for (let cookieContent of cookiesContent) {
        await page.setCookie({
            name: cookieContent.name,
            value: cookieContent.value,
            domain: cookieContent.domain,
            path: cookieContent.path,
            secure: cookieContent.secure,
            httpOnly: cookieContent.httpOnly,
            sameSite: cookieContent.sameSite,
            expires: cookieContent.expires
        });
    }

    await page.goto('https://www.chegg.com');
}


// const browser = await puppeteer.launch({
//     executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
//     userDataDir: 'C:\\Users\\ghait\\IdeaProjects\\cheggy-backend\\src\\main\\resources\\stealth-browsers\\context-1',
//     headless: false,
//     defaultViewport: null
// });
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
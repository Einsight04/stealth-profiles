import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import {fileURLToPath} from 'url';

puppeteer.use(StealthPlugin());

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);


interface Cookie {
    domain: string;
    expirationDate: number;
    hostOnly: boolean;
    httpOnly: boolean;
    name: string;
    path: string;
    sameSite: string | null;
    secure: boolean;
    session: boolean;
    storeId: null;
    value: string;
}

// browser profiles to generate
const browserProfiles: number[] = [
    2, 3, 4, 5
]

const cookieFileNames: string[] = await fs.readdir(path.join(__dirname, '..', 'resources/cookies'));


for (let i = 0; i < browserProfiles.length; i++) {
    const cookiesContent: Cookie[] = JSON.parse(await fs.readFile(path.join(__dirname, '../resources/cookies', cookieFileNames[i]), 'utf8'));

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
            sameSite: cookieContent.sameSite === null || cookieContent.sameSite === 'no_restriction' ? 'None' : 'Lax',
            expires: cookieContent.expirationDate
        });
    }

    await page.goto('https://www.chegg.com');

    await browser.close();
}
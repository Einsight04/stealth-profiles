import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import {fileURLToPath} from 'url';

puppeteer.use(StealthPlugin());

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const browserProfiles: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10
]

for (let profile of browserProfiles) {
    const browser = await puppeteer.launch({
            executablePath: "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
            userDataDir: path.join(__dirname, '..', `C:\Users\ghait\WebstormProjects\playground\stealth-browsers\browserContext-${profile}`),
            headless: false,
            defaultViewport: null
        });

    browser.close();
}
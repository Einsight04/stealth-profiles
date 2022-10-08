import fs from 'fs/promises';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import path from 'path';
import {fileURLToPath} from 'url';
import fetch from 'node-fetch';


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
    7,
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
            sameSite: cookieContent.sameSite === 'lax' ? 'Lax' : 'None',
            expires: cookieContent.expirationDate
        });
    }
    // browser.close();
}
//
// const url: string = "https://study.com/academy/lesson/what-is-a-quadratic-equation-definition-examples.html"
//
// const headers: {[key: string]: string} = {
//     "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
//     "accept-encoding": "gzip, deflate, br",
//     "accept-language": "en-US,en;q=0.9",
//     "cache-control": "max-age=0",
//     "cookie": "hasSeen=true; jsessionid=2cfe3ebb0ede1b1c21ba6b9612e6484e; JSESSIONID=46799DDE6EEEACD8B5DDFBA52B820E9A; ariel=2372b14b7ace1a953ac110bd0bbfde19; aens=enp; _sv=D; _idsv=D; cocoon=\"\"; NODEID=4a146ee6; _gcl_au=1.1.1242055693.1661973177; _fbp=fb.1.1661973178031.325283265; outbrain_cid_fetch=true; _clck=d6pgvk|1|f4h|0; hasSeen=true; _uetsid=ec588dc0296011edb8b679cfdeac8e44; _uetvid=ec58bd10296011ed83adb7d24cbd0e5a; requestGuid=b05960f713dace70dc221e722c2b266e; ssoe_debug=nglPaywall-control.socialAsProof-x.reactRegModal-react.braintree-V3.instantAnswersCornerWidget-control.ccpaBannerDesktop-x.videoPaywall-v4.mergeNextGenLesson-v1.relatedLessonConcept-on.mobileAppBannerReact-control.socialImpactHome-v1.trustpilotHub-control.courseNavOnlyCurrentOpen-v1.globalCssDefer-v1",
//     "referer": "https://study.com/search/text/academy.html?q=quadratic&pageType=home",
//     "sec-fetch-dest": "document",
//     "sec-fetch-mode": "navigate",
//     "sec-fetch-site": "same-origin",
//     "sec-fetch-user": "?1",
//     "sec-gpc": "1",
//     "upgrade-insecure-requests": "1",
//     "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36"
// };
//
// const response = await fetch(url, {headers});
//
// const html: string = await response.text();
//
// await fs.writeFile(path.join(__dirname, '../resources/html.html'), html);
//
// console.log('done');
//
//
//




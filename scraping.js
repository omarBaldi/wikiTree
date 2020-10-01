const puppeteer = require('puppeteer');

const maxTime = 2;
let time;
let currentLinksToSearch;
let isFirstTime = true;
let nodeDataArray;
let linkDataArray;
let index = 0;
let browser;

async function startScraping(URLS) {

    if (isFirstTime) {
        time = 0;
        index = 1;
        isFirstTime = false;
        linkDataArray = new Array();
        nodeDataArray = new Array({ key: index, text: URLS[0].text });
        browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox'] });
    };

    currentLinksToSearch = new Array();

    for (let URL of URLS) {
        const page = await browser.newPage();
        await page.goto(URL.href, { waitUntil: 'networkidle0', timeout: 0 });

        const linksPage = await page.evaluate(() => {
            return Array
            .from(document.querySelectorAll('.mw-body-content p .mw-redirect'))
            .slice(0, 5)
            .map(elem => ({
                text: elem.innerText,
                href: elem.href
            }));
        });

 
        currentLinksToSearch = currentLinksToSearch.concat(linksPage);

        linksPage.forEach(link => {
            index += 1;
            nodeDataArray.push({ key: index, text: link.text });
            const parent = nodeDataArray.find(x => x.text === URL.text);
            linkDataArray.push({ from: parent.key, to: index });
        });

        await page.close();
    }

    time += 1;

    if (time >= maxTime) {
        isFirstTime = true;
        return { nodeDataArray, linkDataArray }
    } else {
        return startScraping(currentLinksToSearch);
    }
    
}

module.exports = { startScraping };
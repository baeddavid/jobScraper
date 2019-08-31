const puppeteer = require('puppeteer');
const $ = require('cheerio');
const fs = require('fs');
// CHANGE THIS LINE TO CHANGE WHAT INDEED PAGE TO SCRAPE
const url = 'https://www.indeed.com/jobs?q=Filter&l=Austin%2C+TX&ts=1567286113421&pts=1567277980887&rq=1&fromage=last&newcount=340';

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url);
    const result = await page.evaluate(() => {
        function cleanString(str) {
            str = str.split('');
            if(str[1] == 'n') str.splice(0, 2);
            str = str.join('').toString().trim();
            return str;
        }
        let titleArr = [];
        for(let i = 0; i < document.querySelectorAll('.title a').length; i++) {
            let job = {
                title: cleanString(document.querySelectorAll('.title a')[i].textContent),
                company: cleanString(document.querySelectorAll('.company')[i].textContent),
                desc: cleanString(document.querySelectorAll('.summary')[i].textContent),
                location: cleanString(document.querySelectorAll('.location')[i].textContent),
                ratings: cleanString(document.querySelectorAll('.slNoUnderline')[i] == undefined ? 'N/A': document.querySelectorAll('.slNoUnderline')[i].textContent),
                link: 'https://www.indeed.com' + document.querySelectorAll('.title a')[i].getAttribute('href'),
            }
            titleArr.push(job);
        }
        return titleArr;
    })
    fs.writeFile('jobs.json', JSON.stringify(result), 'utf8', (err) => {
        if(err) console.error(err);
    })
})()
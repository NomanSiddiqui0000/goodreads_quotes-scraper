const puppeteer = require('puppeteer');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

(async () => {
    try {
        let browser = await puppeteer.launch({ headless: false });
        let page = await browser.newPage();
        await page.goto('https://www.goodreads.com/quotes', { waitUntil: 'networkidle2', timeout: 60000 });

        let allData = [];
        const maxPages = 100;  // Adjust the limit for the number of pages you want to scrape
        let currentPage = 0;

        // Function to scrape quotes and image links from the current page
        async function scrapeData() {
            await page.waitForSelector('.quoteText');
            await page.waitForSelector('a.leftAlignedImage img[src]');

            let data = await page.evaluate(() => {
                let quotesArray = [];
                let textElements = document.querySelectorAll('.quoteText');
                let imgElements = document.querySelectorAll('a.leftAlignedImage img[src]');
                
                textElements.forEach((element, index) => {
                    let quote = element.innerText.trim();
                    let imgSrc = imgElements[index] ? imgElements[index].src : '';
                    quotesArray.push({ quote, image: imgSrc });
                });
                
                return quotesArray;
            });

            allData = allData.concat(data);
        }

        // Function to navigate to the next page
        async function goToNextPage() {
            const nextButtonSelector = 'a.next_page';
            const nextButton = await page.$(nextButtonSelector);
            if (nextButton) {
                await nextButton.click();
                await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });
                return true;
            } else {
                return false;
            }
        }

        // Scrape data and navigate to the next page until the limit is reached
        do {
            await scrapeData();
            currentPage++;
        } while (currentPage < maxPages && await goToNextPage());

        // Define the CSV writer
        const csvWriter = createCsvWriter({
            path: 'quotes_and_images.csv',
            header: [
                { id: 'quote', title: 'Quote' },
                { id: 'image', title: 'Image Source' }
            ]
        });

        // Write the data to the CSV file 
        await csvWriter.writeRecords(allData);
        console.log('Quotes and images have been saved to quotes_and_images.csv');

        await browser.close();
    } catch (error) {
        console.error('Error:', error);
    }
})();

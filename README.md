
# Goodreads quotes scraper
## Description

This scraper is straightforward and specifically designed to extract quotes from the Goodreads website. Built in Node.js using the Puppeteer library, it scrapes 100 pages at once, collecting approximately 8,000 records. Each record includes the main quote, the writer's name, and their image. Simply follow the steps provided to set up this project on your local machine, and you can modify and use it as needed.
## Table of Contents
- [Title](#title)
- [Desciption](#Description)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Notes](#notes)
- [License](#license)
- [Author](#author)

## Installation

## Prerequisites

- Node.js (>=14.0.0)
- npm (Node Package Manager)

1. Clone this repository:

    ```bash
    git clone https://github.com/NomanSiddiqui0000/goodreads_quotes-scraper.git
    ```

2. Navigate to the project directory:

    ```bash
    cd goodreads_quotes scraper
    ```

3. Install the required npm packages:

    ```bash
    npm install
    ```

## Usage

1. Open the `Scraper_script.js` file and adjust the `maxPages` variable if you want to scrape fewer pages. By default, it is set to scrape 100 pages.

2. Run the script:

    ```bash
    node Scraper_script.js
    ```

3. The script will navigate through the Goodreads quotes pages, scrape quotes and image sources, and save the data to `quotes_and_images.csv`.

## Configuration

- **Puppeteer Launch Options**: The script launches Puppeteer in non-headless mode for debugging purposes. Change `{ headless: false }` to `{ headless: true }` if you want to run it in headless mode.
- **CSV File Path**: The CSV file will be saved as `quotes_and_images.csv` in the root directory of the project.

## Notes

- Ensure you comply with Goodreads' terms of service when scraping their website.
- This script assumes the structure of the Goodreads quotes pages remains consistent. If Goodreads updates their site, you may need to adjust the selectors used in the script.

## License

This project is licensed under the MIT License.

## Author

**Muhammad Noman**



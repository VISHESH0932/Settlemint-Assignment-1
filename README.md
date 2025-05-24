# Table to CSV Scraper - Chrome Extension

## Overview

The "Table to CSV Scraper" is a simple Chrome extension designed to extract data from the first HTML `<table>` found on a webpage and download it as a CSV (Comma Separated Values) file. This can be useful for quickly grabbing tabular data from websites for use in spreadsheets or data analysis tools.

## Features

*   **One-Click Scraping:** Click the extension icon to scrape the table.
*   **CSV Download:** Automatically downloads the scraped data as a `.csv` file.
*   **Handles Basic CSV Escaping:** Correctly formats cells containing commas, double quotes, and newlines.
*   **Filename from Page Title:** Attempts to name the downloaded CSV file based on the web page's title for better organization.
*   **User Feedback:** Provides alerts if no table is found or if script injection fails.

## Installation

To use this extension, you need to load it into Chrome manually as an "unpacked extension":

1.  **Download or Clone the Repository:**
    *   If you have the code as a ZIP file, extract it to a folder on your computer.
    *   If you're using Git, clone the repository:
        ```bash
        git clone https://github.com/VISHESH0932/Settlemint-Assignment-1
   
2.  **Open Chrome Extensions Page:**
    *   Open Google Chrome.
    *   Navigate to `chrome://extensions/` in the address bar.

3.  **Enable Developer Mode:**
    *   In the top right corner of the Extensions page, find the "Developer mode" toggle and switch it **ON**.

4.  **Load Unpacked Extension:**
    *   Click the "Load unpacked" button that appears (usually on the top left).
    *   In the file dialog that opens, navigate to and select the `table-scraper-extension` folder (the one containing `manifest.json`).
    *   Click "Select Folder" (or "Open").

5.  **Verify Installation:**
    *   The "Table to CSV Scraper" extension should now appear in your list of extensions.
    *   You should see its icon (if you provided one) in the Chrome toolbar (you might need to click the puzzle piece "Extensions" icon and pin it).

## How to Use

1.  **Navigate to a Web Page:** Open any web page in Chrome that contains an HTML table you wish to scrape.
    *   *Note for local HTML files:* If you are testing with a local HTML file (e.g., `file:///path/to/your/table.html`), you **must** enable "Allow access to file URLs" for this extension:
        1.  Go to `chrome://extensions/`.
        2.  Find "Table to CSV Scraper" and click "Details."
        3.  Turn ON the "Allow access to file URLs" toggle.
        4.  Reload the local HTML page.

2.  **Click the Extension Icon:** Once the page has fully loaded, click the "Table to CSV Scraper" icon in your Chrome toolbar.

3.  **Download CSV:**
    *   If a table is found, a CSV file will be automatically downloaded to your browser's default download location. The filename will typically be derived from the page title (e.g., `pagename_table.csv`).
    *   If no `<table>` element is found on the page, an alert will pop up on the page indicating this.

## Functionality Details & Constraints

*   **Scrapes the First Table Only:** The extension is currently designed to find and scrape only the *first* `<table>` element it encounters in the HTML structure of the page. If a page has multiple tables, only the first one will be processed.
*   **Basic HTML Tables:** Works best with standard, well-structured HTML tables (`<table>`, `<tr>`, `<th>`, `<td>`). Complex tables generated heavily by JavaScript after initial page load, or tables built with `<div>` tags, may not be scraped correctly or at all.
*   **No `<iframe>` Support:** The extension does not currently scrape tables embedded within `<iframe>` elements.
*   **No User Interface for Table Selection:** There is no option to select a specific table if multiple exist, or to configure scraping parameters.

## Files in the Project

*   `manifest.json`: The core file that defines the extension's properties, permissions, and components.
*   `background.js`: The service worker script that handles the extension icon click, injects the content script, and manages the download process.
*   `content.js`: The script injected into web pages to find the table, extract its data, and send it back to `background.js`.
*   `icons/`: Folder containing icon for the extension (16x16, 48x48, 128x128).
*   `test.html`: A sample HTML page with a table that can be used for testing the extension.
*   `README.md`: This file.


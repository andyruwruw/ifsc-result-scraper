// Packages
import {
  Browser as PuppeteerBrowser,
  launch,
  Page,
} from 'puppeteer';

/**
 * Browser utility class for managing Puppeteer browser instances.
 */
export class Browser {
  /**
   * The Puppeteer browser instance.
   */
  static browser: PuppeteerBrowser | null = null;

  /**
   * Launches a new Puppeteer browser instance.
   *
   * @returns {Promise<PuppeteerBrowser>} A promise that resolves to the Puppeteer browser instance.
   */
  static async launch(): Promise<PuppeteerBrowser> {
    if (!this.browser) {
      this.browser = await launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
        ],
      });
    }

    return this.browser;
  }

  /**
   * Opens a new page in the Puppeteer browser.
   */
  static async newPage(): Promise<Page> {
    const browser = await this.launch();
    return browser.newPage();
  }

  /**
   * Closes the Puppeteer browser instance.
   */
  static async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }
}
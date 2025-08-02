// Local Imports
import { ElementHandle } from 'puppeteer';
import { Parser } from './parser';

/**
 * Parser class for extracting competition list data from HTML pages.
 */
export class CompetitionListParser extends Parser<string[]> {
  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  async parse(): Promise<string[]> {
    // Wait for the necessary elements to load
    await this._page.waitForSelector('div.event-filters div.el-select div.el-input input');

    // Find the form elements
    const form = await this._page.$$('div.event-filters div.el-select div.el-input input');

    // Check if the form elements are present
    if (form.length < 3) {
      throw new Error('Issue parsing competition list.');
    }

    // Search only past events.
    await form[1].type('Past events');

    const competitions = [];

    const year = new Date().getFullYear();
    const EARLIEST_DATA = 1990;

    for (let i = year; i >= EARLIEST_DATA; i -= 1) {
      const urls = await this._fetchYear(
        i,
        form,
      );

      if (urls.length > 0) {
        competitions.push(...urls);
      }

      console.log(competitions);
    }

    return competitions;
  }

  /**
   * Fetches the list of competitions for a specific year.
   *
   * @param {number} year The year for which to fetch competitions.
   * @returns {Promise<string[]>} A promise that resolves to an array of competition URLs.
   */
  async _fetchYear(
    year: number,
    form: ElementHandle[],
  ): Promise<string[]> {
    // Fill in the form fields
    await form[0].type(year.toString());

    // Wait for the page to load the results
    await this._page.waitForSelector('div.card-container div a.event-card');

    // Extract the competition links
    const result = await this._page.$$eval('div.card-container div a.event-card', (elements) => (elements.map((el) => (el.href))))

    return result;
  }
}

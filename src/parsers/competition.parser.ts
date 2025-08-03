// Local Imports
import { Parser } from './parser';

/**
 * Parser class for extracting data from competition pages.
 */
export class CompetitionParser extends Parser<string[]> {
  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  async parse(): Promise<string[]> {
    const dataPromise = new Promise(resolve => {
      // 1. Set up the event listener for all responses
      this._page.on('response', async (response) => {
        // 2. Check if the response URL is the one we want
        if (response.url().includes('/api/v1/events/')) {
          console.log('Intercepted API response:', response.url());
          try {
            // 3. Parse the JSON body and resolve the promise with the data
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      });
    });

    console.log(await dataPromise);

    return [];
  }
}

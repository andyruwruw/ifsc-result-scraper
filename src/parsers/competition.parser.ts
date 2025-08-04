// Local Imports
import { Parser } from './parser';

// Types
import { Event } from '../models/event';

/**
 * Parser class for extracting data from competition pages.
 */
export class CompetitionParser extends Parser<Event> {
  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  async parse(): Promise<Event> {
    const dataPromise = new Promise(resolve => {
      this._page.on('response', async (response) => {
        if (response.url().includes('/api/v1/events/')) {
          try {
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      });
    });

    const data = await dataPromise;

    console.log(data);

    return {} as unknown as Event;
  }
}

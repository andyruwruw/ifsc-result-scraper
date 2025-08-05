// Local Imports
import { Parser } from './parser';

// Types
import { EventResults } from '../domain/event-results.entity';

/**
 * Parser class for extracting data from event result pages.
 */
export class EventResultParser extends Parser<EventResults> {
  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  async parse(): Promise<EventResults> {
    const dataPromise = new Promise(resolve => {
      this._page.on('response', async (response) => {
        if (response.url().includes('/api/v1/category_rounds/')) {
          try {
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      });
    });

    const data = (await dataPromise) as Record<string, any>;

    return {
    } as EventResults;
  }
}

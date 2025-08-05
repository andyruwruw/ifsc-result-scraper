// Local Imports
import { Parser } from './parser';

// Types
import { Athlete } from '../domain/athlete.entity';

/**
 * Parser class for extracting data from athlete pages.
 */
export class AthleteParser extends Parser<Athlete> {
  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  async parse(): Promise<Athlete> {
    const dataPromise = new Promise(resolve => {
      this._page.on('response', async (response) => {
        if (response.url().includes('/api/v1/athletes/')) {
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

    return {} as Athlete;
  }
}

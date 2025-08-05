// Local Imports
import { AthleteParser } from '../parsers/athlete.parser';
import { Browser } from '../utils/browser';

// Types
import { Athlete } from '../domain/athlete.entity';

/**
 * Service class for fetching and parsing athlete data.
 */
export class AthleteService {
  /**
   * The queue for storing athlete IDs.
   * @type {number[]}
   */
  static _queue: number[] = [];

  /**
   * Initializes the athlete service.
   */
  static enqueue(athlete: number): void {
    AthleteService._queue.push(athlete);
  }

  /**
   * Pops the next athlete from the queue.
   *
   * @returns {number} The next athlete ID from the queue.
   */
  static pop(): number {
    return AthleteService._queue.shift() as number;
  }

  /**
   * Gets the length of the athlete queue.
   *
   * @returns {number} The length of the athlete queue.
   */
  static size(): number {
    return AthleteService._queue.length;
  }

  /**
   * Fetches the athlete data.
   *
   * @returns {Promise<string[]>} A promise that resolves to a athlete object.
   */
  async fetch(athlete: number): Promise<any> {
    return await this._getAthleteData(athlete);
  }

  /**
   * Fetches the athlete data.
   *
   * @param {number} athlete The ID of the athlete.
   * @returns {Promise<Athlete>} A promise that resolves to a athlete object.
   */
  async _getAthleteData(athlete: number): Promise<Athlete> {
    const url = `https://ifsc.results.info/athlete/${athlete}`;
    const page = await Browser.newPage();
    await page.goto(url);

    const parser = await (new AthleteParser(
      url,
      page,
    ));

    return parser.parse();
  }
}

// Local Imports
import { EventListParser } from '../parsers/event-list.parser';
import { BASE_URL } from '../config';
import { Browser } from '../utils/browser';

/**
 * Service class for fetching and parsing event list data.
 */
export class EventListService {
  /**
   * Fetches the event list data.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of event links.
   */
  async fetch(): Promise<string[]> {
    return await this._getEventList();
  }

  /**
   * Fetches the list of events.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of event URLs.
   */
  async _getEventList(): Promise<string[]> {
    const page = await Browser.newPage();
    await page.goto(BASE_URL);

    const parser = await (new EventListParser(
      BASE_URL,
      page,
    ));

    return parser.parse();
  }
}

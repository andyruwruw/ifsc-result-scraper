// Local Imports
import { EventResultParser } from '../parsers/event-results.parser';
import { Browser } from '../utils/browser';

/**
 * Service class for fetching and parsing event result data.
 */
export class EventResultsService {
  /**
   * The queue for storing event rounds.
   * @type {number[][]}
   */
  static _queue: number[][] = [];

  /**
   * Initializes the event results service.
   */
  static enqueue(
    event: number,
    round: number,
  ): void {
    EventResultsService._queue.push([
      event,
      round,
    ]);
  }

  /**
   * Pops the next event and round from the queue.
   *
   * @returns {number[]} The next event and round from the queue.
   */
  static pop(): number[] {
    return EventResultsService._queue.shift() as number[];
  }

  /**
   * Gets the length of the event results queue.
   *
   * @returns {number} The length of the event results queue.
   */
  static size(): number {
    return EventResultsService._queue.length;
  }

  /**
   * Fetches the event result data.
   *
   * event: number,
    round: number,
   * @returns {Promise<string[]>} A promise that resolves to a event object.
   */
  async fetch(
    event: number,
    round: number,
  ): Promise<any> {
    return await this._getEventResults(
      event,
      round,
    );
  }

  /**
   * Fetches the event data.
   *
   * @param {number} event The ID of the event.
   * @param {number} round The round number of the event.
   * @returns {Promise<Event>} A promise that resolves to a event object.
   */
  async _getEventResults(
    event: number,
    round: number,
  ): Promise<any> {
    const url = `https://ifsc.results.info/event/${event}/cr/${round}`;
    const page = await Browser.newPage();
    await page.goto(url);

    const parser = await (new EventResultParser(
      url,
      page,
    ));

    return parser.parse();
  }
}

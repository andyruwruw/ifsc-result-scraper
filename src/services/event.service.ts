// Local Imports
import { EventParser } from '../parsers/event.parser';
import { Browser } from '../utils/browser';

/**
 * Service class for fetching and parsing event data.
 */
export class EventService {
  /**
   * The queue for storing events.
   * @type {number[]}
   */
  static _queue: number[] = [];

  /**
   * Initializes the event service.
   */
  static enqueue(
    event: number,
    round: number,
  ): void {
    EventService._queue.push(event);
  }

  /**
   * Pops the next event and round from the queue.
   *
   * @returns {number} The next event from the queue.
   */
  static pop(): number {
    return EventService._queue.shift() as number;
  }

  /**
   * Gets the length of the event results queue.
   *
   * @returns {number} The length of the event results queue.
   */
  static size(): number {
    return EventService._queue.length;
  }

  /**
   * Fetches the event data.
   *
   * @param {number} id The ID of the event.
   * @returns {Promise<string[]>} A promise that resolves to a event object.
   */
  async fetch(id: number): Promise<any> {
    return await this._getEvent(id);
  }

  /**
   * Fetches the event data.
   *
   * @param {number} id The ID of the event.
   * @returns {Promise<Event>} A promise that resolves to a event object.
   */
  async _getEvent(id: number): Promise<any> {
    const url = `https://ifsc.results.info/api/v1/events/${id}`;
    const page = await Browser.newPage();
    await page.goto(url);

    const parser = await (new EventParser(
      url,
      page,
    ));

    return parser.parse();
  }
}

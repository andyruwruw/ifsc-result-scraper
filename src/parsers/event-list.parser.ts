// Packages
import {
  ElementHandle,
  Page
} from 'puppeteer';

// Local Imports
import { Parser } from './parser';

// Types
import { EventListItem } from '../domain/event.entity';

/**
 * Parser class for extracting event list data from HTML pages.
 */
export class EventListParser extends Parser<EventListItem[]> {
  /**
   * The year before which to scrape results.
   * Default is the current year.
   */
  protected _before = new Date().getFullYear();

  /**
   * The year after which to scrape results.
   * Default is 1990, as IFSC results are available from this year.
   */
  protected _after = 1990;

  /**
   * Constructs a new EventListParser instance.
   *
   * @param {string} url The URL of the page being parsed.
   * @param {Page} page The Puppeteer Page instance representing the HTML page to parse.
   * @param {number} before The year before which to scrape results. Default is the current year.
   * @param {number} after The year after which to scrape results. Default is 1990.
   */
  constructor(
    url: string,
    page: Page,
    before: number = new Date().getFullYear(),
    after: number = 1990,
  ) {
    super(
      url,
      page,
    );

    this._before = before;
    this._after = after;
  }

  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  async parse(): Promise<EventListItem[]> {
    // Wait for the necessary elements to load
    await this._page.waitForSelector('div.event-filters div.el-select div.el-input input');

    // Find the form elements
    const form = await this._page.$$('div.event-filters div.el-select div.el-input input');

    // Check if the form elements are present
    if (form.length < 3) {
      throw new Error('Issue parsing event list.');
    }

    // Search only past events.
    await form[1].type('Past events');

    const events = [] as EventListItem[];

    const year = Math.min(
      new Date().getFullYear(),
      this._before,
    );
    const earliest = Math.max(
      1990,
      this._after,
    );

    for (let i = year; i >= earliest; i -= 1) {
      const yearEvents = await this._fetchYear(
        i,
        form,
      );

      if (yearEvents.length > 0) {
        events.push(...yearEvents);
      }
    }

    return events;
  }

  /**
   * Fetches the list of events for a specific year.
   *
   * @param {number} year The year for which to fetch events.
   * @returns {Promise<any>} A promise that resolves to an array of event URLs.
   */
  async _fetchYear(
    year: number,
    form: ElementHandle[],
  ): Promise<EventListItem[]> {
    const dataPromise = new Promise(resolve => {
      this._page.on('response', async (response) => {
        if (response.url().includes('/api/v1/seasons/')) {
          try {
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error('Failed to parse JSON:', error);
          }
        }
      });
    });

    // Fill in the form fields
    await form[0].type(year.toString());

    const data = (await dataPromise) as Record<string, any>;
    const events = [] as EventListItem[];

    for (let i = 0; i < data.events.length; i += 1) {
      const event = data.events[i];

      events.push({
        id: event.event_id,
        href: `https://ifsc.results.info/events/${event.event_id}`,
        name: event.event,
        location: event.location,
        country: event.country,
        leagueSeason: event.league_season_id,
        cupName: event.cup_name,
        cupId: event.cup_id,
        starts: event.starts_at,
        ends: event.ends_at,
        localStart: event.local_start_date,
        localEnd: event.local_end_date,
        timezone: event.timezone.value,
        disciplines: event.disciplines.map((discipline: Record<string, any>) => ({
          id: discipline.id,
          kind: discipline.kind,
          event: discipline.event_id,
          createdAt: discipline.created_at,
          updatedAt: discipline.updated_at,
        })),
      } as EventListItem);
    }

    return events;

    // Wait for the page to load the results
    // await this._page.waitForSelector('div.card-container div a.event-card');

    // Extract the event links
    // const result = await this._page.$$eval('div.card-container div a.event-card', (elements) => (elements.map((el) => (el.href))))

    // return result;
  }
}

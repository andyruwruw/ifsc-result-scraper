// Local Imports
import { Parser } from './parser';

// Types
import { Event } from '../domain/event.entity';
import { EventResultsService } from '../services/event-results.service';

/**
 * Parser class for extracting data from event pages.
 */
export class EventParser extends Parser<Event> {
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

    const data = (await dataPromise) as Record<string, any>;

    if ('dcats' in data) {
      for (let i = 0; i < data.dcats.length; i += 1) {
        const dcat = data.dcats[i];

        for (let j = 0; j < dcat.category_rounds.length; j += 1) {
          const categoryRound = dcat.category_rounds[j];

          if (categoryRound.category_round_id) {
            EventResultsService.enqueue(
              data.id,
              categoryRound.category_round_id,
            );
          }
        }
      }
    }

    return {
      id: data.id,
      href: this._url,
      name: data.name,
      type: data.type,
      league: data.league_id,
      leagueSeason: data.league_season_id,
      season: data.season_id,
      starts: data.starts_at,
      ends: data.ends_at,
      localStart: data.local_start_date || '',
      localEnd: data.local_end_date || '',
      timezone: data.timezone.value,
      location: data.location,
      organizer: data.public_information?.organizer || '',
      organizerUrl: data.public_information?.organizer_url || '',
      venue: data.public_information?.venue || '',
      venueDescription: data.public_information?.description || '',
      cupName: data.cup_name || '',
      country: data.country || '',
      eventImage: data.event_logo || '',
      seriesImage: data.series_logo || '',
      cover: data.cover || '',
      infosheet: data.infosheet_url || '',
      additionalInfoUrl: data.additional_info_url || '',
      paraclimbing: data.paraclimbing || false,
      selfJudged: data.self_judged || false,
    } as Event;
  }
}

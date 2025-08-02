// Local Imports
import { CompetitionListParser } from '../parsers/competition-list.parser';
import { BASE_URL } from '../config';
import { Browser } from '../utils/browser';

/**
 * Service class for fetching and parsing competition list data.
 */
export class CompetitionListService {
  /**
   * Fetches the competition list data.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of competition links.
   */
  async fetch(): Promise<string[]> {
    return await this._getCompetitionList();
  }

  /**
   * Fetches the list of competitions.
   *
   * @returns {Promise<string[]>} A promise that resolves to an array of competition URLs.
   */
  async _getCompetitionList(): Promise<string[]> {
    const page = await Browser.newPage();
    await page.goto(BASE_URL);

    const parser = await (new CompetitionListParser(
      BASE_URL,
      page,
    ));

    return parser.parse();
  }
}

// Local Imports
import { CompetitionParser } from '../parsers/competition.parser';
import { Browser } from '../utils/browser';

/**
 * Service class for fetching and parsing competition data.
 */
export class CompetitionService {
  /**
   * Fetches the competition data.
   *
   * @param {string} url The URL of the competition page.
   * @returns {Promise<string[]>} A promise that resolves to a competition object.
   */
  async fetch(url: string): Promise<any> {
    return await this._getCompetition(url);
  }

  /**
   * Fetches the competition data.
   *
   * @param {string} url The URL of the competition page.
   * @returns {Promise<Competition>} A promise that resolves to a competition object.
   */
  async _getCompetition(url: string): Promise<any> {
    const page = await Browser.newPage();
    await page.goto(url);

    const parser = await (new CompetitionParser(
      url,
      page,
    ));

    return parser.parse();
  }
}

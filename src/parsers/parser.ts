// Packages
import { Page } from 'puppeteer';

/**
 * Parser class for extracting structured data from HTML pages.
 */
export abstract class Parser<T> {
  /**
   * The Cheerio instance representing the HTML page to parse.
   */
  protected _page: Page;

  /**
   * The URL of the page being parsed.
   */
  protected _url: string;

  /**
   * Constructs a new Parser instance.
   *
   * @param {string} url The URL of the page being parsed.
   * @param {Page} page The Puppeteer Page instance representing the HTML page to parse.
   */
  constructor(
    url: string,
    page: Page,
  ) {
    this._url = url;
    this._page = page;
  }

  /**
   * Parses the HTML page and returns structured data.
   *
   * @returns {Promise<T>} A promise that resolves to the parsed data.
   */
  public abstract parse(): Promise<T>;
}
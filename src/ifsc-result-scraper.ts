// Local Imports
import { EventListService } from './services/event-list.service';
import { Browser } from './utils/browser';

/**
 * Scraper class for fetching IFSC result data.
 */
export class IfscResultScraper {
  /**
   * The command to execute.
   */
  protected _command: string = '';

  /**
   * The delay between requests in milliseconds.
   */
  protected _delay: number = 0;

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
   * Initializes the scraper by launching the browser.
   */
  async initialize(): Promise<void> {
    this._readParameters();

    await Browser.launch();
  }

  /**
   * Starts the scraper.
   */
  async start() {
    if (this._command === 'help') {
      this._help();
      return;
    } else if (this._command === 'run') {
      await this.run();
    } else {
      console.error(`Unknown command: '${this._command}'`);
      this._help();
      return;
    }
  }

  /**
   * Runs the scraper to fetch IFSC results.
   * This method should be implemented to perform the actual scraping logic.
   */
  async run(): Promise<void> {
    const eventListService = new EventListService();
    
  }

  /**
   * Reads command line parameters.
   */
  _readParameters(): void {
    const args = process.argv.slice(2);

    if (args.length === 0) {
      this._command = 'help';
    } else {
      this._command = args[0];
    }

    for (let i = 1; i < args.length; i += 1) {
      if (args[i] === '--delay') {
        const delay = parseInt(
          args[i + 1],
          10,
        );

        if (isNaN(delay) || delay < 0) {
          throw new Error('Invalid delay value. It must be a non-negative integer.');
        }

        this._delay = delay;
        i += 1;
      } else if (args[i] === '--before') {
      } else if (args[i] === '--after') {
      } else if (args[i] === '--location') {
      } else if (args[i] === '--disciplines') {
      } else if (args[i] === '--league-season') {
      }
    }
  }

  /**
   * Displays help information for the scraper.
   */
  _help(): void {
    console.log(`
Usage: npm run start -- [command] [options]
Commands:
  help                      Show this help message
  run                       Start the IFSC result scraper
  leagues                   Fetch a list of leagues
Options:
  --delay <milliseconds>    Set the delay between requests (default: 0)
  --before <date>           Set the start date for scraping (format: YYYY-MM-DD)
  --after <date>            Set the end date for scraping (format: YYYY-MM-DD)
  --location <location>     Filter results by location
  --disciplines <disciplines> Filter results by disciplines (comma-separated)
  --league-season <season>  Filter results by league season
`);
    process.exit(0);
  }
}

// Local Imports
import { CompetitionListService } from './services/competition-list.service';
import { Browser } from './utils/browser';
/**
 * Main entry point for the data reader.
 */
const main = async () => {
  console.log('Data Reader is starting...');

  await Browser.launch();

  const competitionListService = new CompetitionListService();
  const list = await competitionListService.fetch();

  await Browser.close();

  console.log('Data reader is completed.');
}

main();

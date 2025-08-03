// Local Imports
import { CompetitionListService } from './services/competition-list.service';
import { CompetitionService } from './services/competition.service';
import { Browser } from './utils/browser';
/**
 * Main entry point for the data reader.
 */
const main = async () => {
  console.log('Data Reader is starting...');

  await Browser.launch();

  // Get the competition list
  const competitionListService = new CompetitionListService();
  const list = await competitionListService.fetch();

  for (let i = 0; i < 1; i += 1) {
    console.log(`Competition ${i + 1}: ${list[i]}`);

    // Get the competition data
    const competitionService = new CompetitionService();
    const competitionData = await competitionService.fetch(list[i]);
  }

  await Browser.close();

  console.log('Data reader is completed.');
}

main();

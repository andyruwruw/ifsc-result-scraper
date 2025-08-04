// Local Imports
import { CompetitionListService } from './services/competition-list.service';
import { CompetitionService } from './services/competition.service';
import { DomainProvider } from './domain';
import { CsvWriter } from './utils/csv-writer';
import { Browser } from './utils/browser';
import wait from './utils/wait';
/**
 * Main entry point for the data reader.
 */
const main = async () => {
  console.log('Data Reader is starting...');

  await Browser.launch();

  // Get the competition list
  const competitionListService = new CompetitionListService();
  const list = await competitionListService.fetch();

  const competitions = [];

  for (let i = 0; i < list.length; i += 1) {
    console.log(`Competition #${i + 1}: ID ${list[i].split('/')[list[i].split('/').length - 2]}`);

    // Get the competition data
    const competitionService = new CompetitionService();
    const competitionData = await competitionService.fetch(list[i]);

    if (competitionData) {
      competitions.push(competitionData);
    }

    // This doesn't need to be fast right?
    wait(1000 + Math.random() * 5000);
  }

  await Browser.close();

  await CsvWriter.export(
    `./export/competitions.csv`,
    competitions,
  );

  console.log('Data reader is completed.');
}

main();

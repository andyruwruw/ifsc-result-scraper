// Local Imports
import { EventListService } from './services/event-list.service';
import { EventService } from './services/event.service';
import { DomainProvider } from './domain';
import { CsvWriter } from './utils/csv-writer';
import { Browser } from './utils/browser';
import wait from './utils/wait';
import { IfscResultScraper } from './ifsc-result-scraper';

/**
 * Main entry point for the data reader.
 */
const main = async () => {
  console.log('-- Starting up IFSC Data Reader --');

  const scraper = new IfscResultScraper();

  await scraper.initialize();
  await scraper.start();

  // await Browser.launch();

  // // Get the event list
  // const eventListService = new EventListService();
  // const list = await eventListService.fetch();
  
  // const eventService = new EventService();

  // for (let i = 0; i < list.length; i += 1) {
  //   // Get the event data
  //   const eventData = await eventService.fetch(list[i]);

  //   console.log(`Event ${i + 1}/${list.length}: ${list[i].split('/')[list[i].split('/').length - 2]} ${eventData.name}`);

  //   DomainProvider.EventRepository.save(eventData);

  //   // This doesn't need to be fast right?
  //   wait(1000 + Math.random() * 5000);
  // }

  // await Browser.close();

  // await CsvWriter.export(
  //   `./export/events.csv`,
  //   await DomainProvider.EventRepository.find({}),
  // );

  console.log('-- IFSC Data Reader is completed --');
}

main();

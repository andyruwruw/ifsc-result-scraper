// Packages
import { promises as fs } from 'fs';
import { stringify } from 'csv-stringify';

/**
 * A mapping of header keys to their CSV-friendly replacements.
 * This is used to convert the keys in the data objects to a more readable format in the CSV file.
 */
const HEADER_REPLACEMENTS: Record<string, string> = {
  'id': 'ID',
  'href': 'URL',
  'name': 'Name',
  'type': 'Type',
  'league': 'League',
  'leagueSeason': 'League Season',
  'season': 'Season',
  'starts': 'Starts',
  'ends': 'Ends',
  'localStart': 'Local Starts',
  'localEnd': 'Local Ends',
  'timezone': 'Timezone',
};

/**
 * CsvWriter class provides functionality to export data to a CSV file.
 * It includes methods to convert data into a CSV format and write it to a specified file path.
 */
export class CsvWriter {
  /**
   * Asynchronously exports an array of data objects to a CSV file.
   *
   * @param {string} path - The file path where the CSV file will be created.
   * @param {Record<string, any>[]} data - An array of objects to be written to the CSV file.
   * @returns {Promise<void>} - A promise that resolves when the CSV file has been successfully written.
   */
  static async export(
    path: string,
    data: Record<string, any>[],
  ): Promise<void> {
    if (!data || data.length === 0) {
      throw new Error('No data provided to write to CSV file.');
    }

    const headers = Object.keys(data[0]).map((key) => CsvWriter.convertHeader(key));
    const csvData = data.map((row) => (headers.map(header => row[header])));

    const csvString = await stringify([
        headers,
        ...csvData
      ],
      { quoted_string: true },
    );

    await fs.writeFile(
      path,
      csvString,
      'utf8',
    );
  }

  /**
   * Converts a header key to a CSV-friendly format.
   *
   * @param {string} key - The header key to convert.
   * @returns {string} - The converted header key.
   */
  static convertHeader(key: string): string {
    // if (key in HEADER_REPLACEMENTS) {
    //   return HEADER_REPLACEMENTS[key];
    // }
    return key;
  }
}

# IFSC Result Scraper

## Usage

To start you'll need to have Node.js installed on your machine. Visit the official [Node.js website](https://nodejs.org/en/download) to download the correct version for your operating system.

Once you have Node.js, navigate to the project directory in your terminal and run the following commands:

```bash
# Install dependencies
$ npm install
```

```bash
# Run the scraper
$ npm run start
```

# Just Using the API

Keep in mind the parameters for each endpoint come form the endpoint prior.

If you want to get a list of all competitions from a year:

```
GET https://ifsc.results.info/api/v1/seasons/{season}
```

For example, 2025 season is 37, 2024 season is 36, and so on.

If you want to get an event's results:

```
GET https://ifsc.results.info/api/v1/events/{id}
```

If you want to get round results:

```
GET https://ifsc.results.info/api/v1/category_rounds/{category}/results
```

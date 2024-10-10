# Content Extractor

## Overview
The Content Extractor is responsible for parsing and extracting relevant content from the URLs provided by the Source Extractor. This content is then structured in a format suitable for use in the subsequent stages of the Stealth Persona Clone project, where it will be used to train an AI model to replicate Jeff Wilson's personality and expertise.

## Features
- **Web Page Scraping**: Uses Cheerio to extract meaningful text content from web pages.
- **YouTube Data Extraction**: Utilizes YouTube API to gather video details such as title, description, and captions.
- **Twitter Content Parsing**: Extracts and processes Twitter posts to incorporate relevant social media activity.
- **Consolidated Output**: Compiles all extracted content into a structured JSON format for easy ingestion by the AI model.

## Requirements
- **Node.js**: Make sure you have Node.js installed (>= 12.0.0).
- **YouTube API Key**: Required to extract data from YouTube.
- **Twitter API Credentials**: Set up a Twitter Developer account to fetch tweets.

## Setup
1. Clone the repository and navigate to the `ContentExtractor` folder.
   ```bash
   git clone <repo-url>
   cd Stealth-PersonaClone/ContentExtractor
   ```

2. Install the required npm packages.
   ```bash
   npm install
   ```

3. Update the credentials in the code:
   - Update your `YouTube API Key` in the source code.
   - Update your Twitter `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret`.

## Usage
To run the content extractor and generate the `scraped_content.json` file:

```bash
node content_extractor.js
```

This command will parse the URLs listed in `sources.json`, extract the relevant content, and store it in `scraped_content.json`.

## Output
- The parsed content will be saved in a JSON file called `scraped_content.json`.
- This JSON file contains all the gathered data, including web page content, YouTube video information, and Twitter posts, which will be used to train an AI model in the next phase.

## Next Steps
After generating `scraped_content.json`, proceed to the `LLMIntegration` folder to feed the content into an AI model that will simulate Jeff Wilson's responses and personality.


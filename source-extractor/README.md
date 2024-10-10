# Source Extractor

## Overview
The Source Extractor is responsible for gathering URLs and metadata related to Jeff Wilson from various online platforms, including Google, YouTube, and Twitter. This component forms the foundational step of the Stealth Persona Clone project by gathering all the content that will be further parsed and fed into an AI to replicate Jeff Wilson's personality and knowledge.

## Features
- **Google Search Integration**: Uses Google Custom Search API to find URLs containing relevant information about the persona.
- **YouTube Integration**: Gathers YouTube URLs related to Jeff Wilson, including interviews, talks, and other media content.
- **Twitter Integration**: Extracts relevant Twitter posts from the official handle.
- **Automated Extraction**: Compiles all extracted links into a structured `sources.json` file.

## Requirements
- **Node.js**: Make sure you have Node.js installed (>= 12.0.0).
- **Google API Key**: You need a valid Google API key to perform search operations.
- **Twitter API Credentials**: Set up a Twitter Developer account to get the required keys.

## Setup
1. Clone the repository and navigate to the `SourceExtractor` folder.
   ```bash
   git clone <repo-url>
   cd Stealth-PersonaClone/SourceExtractor
   ```

2. Install the required npm packages.
   ```bash
   npm install
   ```

3. Update the credentials in the code:
   - Update your `Google API Key` and `Custom Search Engine ID` in the source code.
   - Update your Twitter `consumer_key`, `consumer_secret`, `access_token_key`, and `access_token_secret`.

## Usage
To run the source extractor and generate the `sources.json` file:

```bash
node source_extractor.js
```

This command will extract URLs from Google, YouTube, and Twitter based on predefined queries and store them in `sources.json`.

## Output
- The extracted URLs and metadata will be saved in a JSON file called `sources.json`.
- This JSON file serves as the input for the next phase of the Stealth Persona Clone project, which is the Content Extractor.

## Next Steps
Once you've generated `sources.json`, proceed to the `ContentExtractor` folder to parse the data and extract meaningful content from the gathered URLs.


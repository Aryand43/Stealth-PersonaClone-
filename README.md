# PersonaClone: AI-Driven Persona Cloning Based on Web Data

## Project Overview
**PersonaClone** is an AI-driven project designed to replicate a person's consciousness or persona by gathering publicly available data from the web. This project uses web scraping, data extraction, and machine learning models (such as Large Language Models - LLMs) to simulate an individual's thoughts, behavior, and personality based on their digital footprint.

### Key Features:
- **Source Extraction**: Automatically collects relevant URLs using Google's Custom Search API.
- **Web Scraping**: Extracts data from the URLs to gather public content about a person or project.
- **AI Model**: Uses AI (e.g., GPT models) to generate text and responses that mimic the individual's persona.
- **Automation**: Efficiently automates the data gathering and persona-building process.

## Components

1. **Source Extractor**:
   - This script fetches URLs related to the target person or topic using Google Custom Search API and saves them to a `sources.json` file.
   
2. **Web Scraper** (Coming soon):
   - A web scraper that fetches and parses the content from the extracted URLs to collect the necessary data for AI training.

3. **AI Model** (Coming soon):
   - Uses Large Language Models (LLMs) such as GPT to generate text and simulate conversations based on the scraped data.

## Prerequisites

To get started, ensure you have the following:

1. **Node.js** installed on your machine.
2. **Google Custom Search API Key** and **Search Engine ID (CX)**:
   - You can get these by creating a search engine on [Google Programmable Search Engine](https://programmablesearchengine.google.com/about/).
3. **Python** (for the AI model, when implemented).

## Installation

### Step 1: Clone the repository

```bash
git clone https://github.com/your-username/persona-clone.git
cd persona-clone

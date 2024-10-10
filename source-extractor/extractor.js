const axios = require('axios');
const fs = require('fs');

const API_KEY = 'AIzaSyDqzfWJjZMX4Tyz03-U_UNEKLf3DlXz3Nw';  
const CX = '4079d1347789d44f1'; 

// Function to extract sources (URLs) based on a search query
async function extractSources(query, isYouTube = false) {
    const searchQuery = isYouTube ? `${query} site:youtube.com` : query;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(searchQuery)}&key=${API_KEY}&cx=${CX}&num=10`;

    try {
        const response = await axios.get(url);
        const urls = response.data.items ? response.data.items.map(item => item.link) : [];
        console.log(`Extracted URLs for "${searchQuery}":`, urls);

        // Append or update the results to the sources.json file
        const existingData = fs.existsSync('sources.json') ? JSON.parse(fs.readFileSync('sources.json')) : {};

        // If this query already has data, merge the new URLs (YouTube or web) with existing ones
        existingData[query] = existingData[query] ? existingData[query].concat(urls) : urls;
        fs.writeFileSync('sources.json', JSON.stringify(existingData, null, 2));
        console.log(`Sources for "${query}" saved to sources.json`);
    } catch (error) {
        console.error(`Error fetching data for "${searchQuery}":`, error);
    }
}

// List of queries
const queries = ['Jeff Wilson and Kasita', 'Kasita', 'Dumpster Project', 'Jeff Wilson and Environmental Science', 'Jeff Wilson Harvard Fellow', 'Kasita Modular Housing', 'Tiny Homes Jeff Wilson', 'Jeff Wilson Innovation Urban Design'];

// Loop over each query to extract both general and YouTube-specific sources
queries.forEach(query => {
    // Extract general web sources
    extractSources(query);
    
    // Extract YouTube sources
    extractSources(query, true);  // Pass `true` to indicate this is for YouTube search
});

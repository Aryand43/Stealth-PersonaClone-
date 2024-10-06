const axios = require('axios');
const fs = require('fs');

const API_KEY = 'AIzaSyDqzfWJjZMX4Tyz03-U_UNEKLf3DlXz3Nw';  
const CX = '4079d1347789d44f1'; 

async function extractSources(query) {
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&key=${API_KEY}&cx=${CX}&num=10`;

    try {
        const response = await axios.get(url);
        const urls = response.data.items.map(item => item.link);
        console.log(`Extracted URLs for "${query}":`, urls);

        const existingData = fs.existsSync('sources.json') ? JSON.parse(fs.readFileSync('sources.json')) : {};
        existingData[query] = urls;
        fs.writeFileSync('sources.json', JSON.stringify(existingData, null, 2));
        console.log(`Sources for "${query}" saved to sources.json`);
    } catch (error) {
        console.error(`Error fetching data for "${query}":`, error);
    }
}


const queries = ['Jeff Wilson Harvard', 'Kasita', 'Dumpster Project', 'Environmental Science'];

queries.forEach(query => {
    extractSources(query);
});

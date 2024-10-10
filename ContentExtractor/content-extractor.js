const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const Twitter = require('twitter-v2');

const YOUTUBE_API_KEY = 'AIzaSyDPrDyylFRXY8XLP5t85tbjg2HXGgWUIPU';
const twitterClient = new Twitter({
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAACQXwQEAAAAAihuw30x5jorWX0Abppnfp87Owbo%3DmRNKInjS9DCQBfzLSrClEfIxASVtXoJX3tIwD2ScwuGhDNOmXg'
});

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function scrapeWebContent(url, retries = 3) {
    try {
        const { data } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' }, timeout: 10000 });
        const $ = cheerio.load(data);
        const pageText = $('p, h1, h2, h3, h4, h5').map((i, el) => $(el).text()).get().join(' ');
        return pageText.replace(/\s+/g, ' ').trim();
    } catch (error) {
        if (retries > 0 && (error.response?.status === 503 || error.message.includes('timeout'))) {
            await delay(3000);
            return scrapeWebContent(url, retries - 1);
        }
        return null;
    }
}

async function fetchYouTubeVideoDetails(videoId) {
    try {
        const videoUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails`;
        const response = await axios.get(videoUrl, { timeout: 10000 });
        if (response.data.items.length === 0) {
            throw new Error('Video not found');
        }
        const video = response.data.items[0].snippet;
        const videoDetails = {
            type: 'YouTube',
            title: video.title,
            description: video.description,
            url: `https://www.youtube.com/watch?v=${videoId}`,
            captions: await fetchYouTubeCaptions(videoId)
        };
        return videoDetails;
    } catch (error) {
        return null;
    }
}

async function fetchYouTubeCaptions(videoId) {
    try {
        const captionsUrl = `https://video.google.com/timedtext?lang=en&v=${videoId}`;
        const { data } = await axios.get(captionsUrl, { timeout: 10000 });
        const $ = cheerio.load(data);
        const captions = $('text').map((i, el) => $(el).text()).get().join(' ');
        return captions.replace(/\s+/g, ' ').trim();
    } catch (error) {
        return null;
    }
}

async function fetchTweets(username) {
    try {
        const response = await twitterClient.get('tweets', {
            'tweet.fields': 'created_at',
            'query': `from:${username}`,
            max_results: 100
        });
        return response.data.map(tweet => ({
            type: 'Twitter',
            tweet_id: tweet.id,
            text: tweet.text,
            created_at: tweet.created_at
        }));
    } catch (error) {
        return [];
    }
}

async function scrapeAllSources() {
    const sources = JSON.parse(fs.readFileSync('sources.json', 'utf-8'));
    const scrapedData = [];

    for (const query in sources) {
        const urls = sources[query];

        const scrapePromises = urls.map(async (url) => {
            let contentDetails = null;

            if (url.includes('youtube.com/watch')) {
                const videoId = new URL(url).searchParams.get('v');
                contentDetails = await fetchYouTubeVideoDetails(videoId);
            } else {
                contentDetails = await scrapeWebContent(url);
                if (contentDetails) {
                    contentDetails = { type: 'Web', url, content: contentDetails };
                }
            }

            if (contentDetails) {
                scrapedData.push({ query, ...contentDetails });
            }
        });

        await Promise.all(scrapePromises);
    }

    const twitterData = await fetchTweets('ProfDumpster');
    if (twitterData.length > 0) {
        scrapedData.push({ query: 'Twitter Data', type: 'Twitter', tweets: twitterData });
    }

    fs.writeFileSync('filtered_scraped_content.json', JSON.stringify(scrapedData, null, 2));
}

scrapeAllSources();

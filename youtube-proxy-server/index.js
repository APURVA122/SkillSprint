const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log("🛠 API Key Loaded:", process.env.YOUTUBE_API_KEY);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// ✅ HEALTH ROUTE for UptimeRobot
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});
app.get('/api/search', async (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Missing search query.' });
    }

    const API_KEY = process.env.YOUTUBE_API_KEY;
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=long&q=${encodeURIComponent(query)}&maxResults=25&order=relevance&key=${API_KEY}`;

    try {
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();

        if (!searchResponse.ok || searchData.error) {
            console.error("🔴 YouTube Search API Error:", searchData.error || searchData);
            return res.status(500).json({ error: 'Error fetching YouTube search data.' });
        }

        const videoIds = searchData.items.map(item => item.id.videoId).join(',');

        const detailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds}&key=${API_KEY}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();

        if (!detailsResponse.ok || detailsData.error) {
            console.error("🔴 YouTube Details API Error:", detailsData.error || detailsData);
            return res.status(500).json({ error: 'Error fetching video details.' });
        }

        const videoDetails = {};
        if (detailsData.items) {
            detailsData.items.forEach(item => {
                videoDetails[item.id] = item;
            });
        }

        const results = searchData.items.map(item => {
            const details = videoDetails[item.id.videoId];
            return {
                id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description.substring(0, 200) + '...',
                thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                publishedAt: item.snippet.publishedAt,
                channelTitle: item.snippet.channelTitle,
                viewCount: details?.statistics?.viewCount || '0',
                duration: details?.contentDetails?.duration || 'PT0M0S',
            };
        });

        res.json(results);
    } catch (err) {
        console.error('🔥 Backend YouTube API Crash:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});

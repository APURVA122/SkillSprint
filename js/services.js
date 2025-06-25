// services.js - API Services and Data Operations

import { CONFIG, SAMPLE_COURSES } from './data.js';

export class StorageService {
    static saveToStorage(key, value) {
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (e) {
            console.log('Storage not available, using memory only');
        }
    }

    static getFromStorage(key) {
        try {
            if (typeof Storage !== 'undefined') {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            }
        } catch (e) {
            console.log('Storage not available');
        }
        return null;
    }
}

export class ApiService {
    constructor() {
        this.YOUTUBE_API_KEY = CONFIG.YOUTUBE_API_KEY;
        this.YOUTUBE_API_BASE = CONFIG.YOUTUBE_API_BASE;
    }

    async searchYouTubeCourses(query) {
        try {
            const searchQuery = `${query} tutorial programming course complete`;
            const url = `${this.YOUTUBE_API_BASE}/search?` +
                `part=snippet&type=video&videoDuration=long&` +
                `q=${encodeURIComponent(searchQuery)}&` +
                `maxResults=24&order=relevance&` +
                `key=${this.YOUTUBE_API_KEY}`;

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            if (data.error) {
                console.error('YouTube API Error:', data.error);
                throw new Error(data.error.message || 'YouTube API error');
            }

            if (!data.items || data.items.length === 0) {
                return [];
            }

            // Get video details for duration
            const videoIds = data.items.map(item => item.id.videoId).join(',');
            const detailsUrl = `${this.YOUTUBE_API_BASE}/videos?` +
                `part=contentDetails,statistics&id=${videoIds}&` +
                `key=${this.YOUTUBE_API_KEY}`;

            const detailsResponse = await fetch(detailsUrl);
            const detailsData = await detailsResponse.json();

            const videoDetails = {};
            if (detailsData.items) {
                detailsData.items.forEach(item => {
                    videoDetails[item.id] = item;
                });
            }

            return data.items.map(item => {
                const details = videoDetails[item.id.videoId];
                const duration = details ? this.parseDuration(details.contentDetails.duration) : 'Unknown';
                const viewCount = details?.statistics?.viewCount || 0;

                return {
                    id: item.id.videoId,
                    title: this.cleanTitle(item.snippet.title),
                    provider: 'youtube',
                    duration: duration,
                    level: this.inferLevel(item.snippet.title + ' ' + item.snippet.description),
                    description: item.snippet.description.substring(0, 200) + '...',
                    url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                    category: 'programming',
                    tags: this.extractTags(item.snippet.title + ' ' + item.snippet.description),
                    rating: 4.5,
                    students: this.formatNumber(viewCount) + ' views',
                    thumbnail: item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
                    publishedAt: item.snippet.publishedAt,
                    channelTitle: item.snippet.channelTitle
                };
            });

        } catch (error) {
            console.error('Error fetching YouTube courses:', error);
            throw error;
        }
    }

    parseDuration(duration) {
        const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        if (!match) return 'Unknown';
        
        const hours = (match[1] || '').replace('H', '');
        const minutes = (match[2] || '').replace('M', '');
        const seconds = (match[3] || '').replace('S', '');
        
        let result = '';
        if (hours) result += `${hours}h `;
        if (minutes) result += `${minutes}m`;
        if (!hours && !minutes && seconds) result = `${seconds}s`;
        
        return result.trim() || 'Unknown';
    }

    cleanTitle(title) {
        // Remove common YouTube title clutter
        return title
            .replace(/\[.*?\]/g, '')
            .replace(/\(.*?\)/g, '')
            .replace(/\s+/g, ' ')
            .trim();
    }

    inferLevel(text) {
        const textLower = text.toLowerCase();
        if (textLower.includes('beginner') || textLower.includes('basics') || textLower.includes('introduction')) {
            return 'Beginner';
        } else if (textLower.includes('advanced') || textLower.includes('expert') || textLower.includes('master')) {
            return 'Advanced';
        } else {
            return 'Intermediate';
        }
    }

    extractTags(text) {
        const commonTags = [
            'javascript', 'python', 'react', 'nodejs', 'css', 'html', 'java', 
            'c++', 'sql', 'docker', 'git', 'angular', 'vue', 'typescript',
            'mongodb', 'express', 'bootstrap', 'sass', 'php', 'laravel',
            'django', 'flask', 'mysql', 'postgresql', 'redis', 'aws',
            'firebase', 'graphql', 'rest', 'api', 'machine learning',
            'data science', 'ai', 'blockchain', 'flutter', 'react native'
        ];
        
        const textLower = text.toLowerCase();
        const foundTags = commonTags.filter(tag => 
            textLower.includes(tag.toLowerCase())
        );
        
        return foundTags.length > 0 ? foundTags.slice(0, 3) : ['programming'];
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

export class SearchService {
    constructor() {
        this.apiService = new ApiService();
    }

    async searchCourses(query, platform) {
        switch (platform) {
            case 'youtube':
                return await this.apiService.searchYouTubeCourses(query);
            case 'freecodecamp':
                return this.searchFreeCodeCampCourses(query);
            case 'sample':
                return this.searchSampleCourses(query);
            default:
                return SAMPLE_COURSES;
        }
    }

    searchFreeCodeCampCourses(query) {
        const queryLower = query.toLowerCase();
        return SAMPLE_COURSES.filter(course => 
            course.provider === 'freecodecamp' && (
                course.title.toLowerCase().includes(queryLower) ||
                course.description.toLowerCase().includes(queryLower) ||
                course.tags.some(tag => tag.toLowerCase().includes(queryLower))
            )
        );
    }

    searchSampleCourses(query) {
        const queryLower = query.toLowerCase();
        return SAMPLE_COURSES.filter(course => 
            course.title.toLowerCase().includes(queryLower) ||
            course.description.toLowerCase().includes(queryLower) ||
            course.tags.some(tag => tag.toLowerCase().includes(queryLower))
        );
    }
}
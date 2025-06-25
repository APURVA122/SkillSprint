// SkillSprint App with Real API Integration
class SkillSprint {
    constructor() {
        this.courses = [];
        this.bookmarkedCourses = new Set();
        this.courseProgress = new Map();
        this.currentSearchTerm = '';
        this.currentFilter = 'youtube';
        
        // YouTube API Configuration - Using your provided API key
            this.YOUTUBE_API_KEY = YOUTUBE_API_KEY;
        this.YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
        
        // Sample fallback data for other platforms
        this.sampleCourses = [
            {
                id: 'sample-1',
                title: 'Complete JavaScript Tutorial - Full Course for Beginners',
                provider: 'freecodecamp',
                duration: '8 hours',
                level: 'Beginner',
                description: 'Learn JavaScript from scratch with practical examples and projects. This comprehensive course covers variables, functions, objects, arrays, and more.',
                url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
                category: 'programming',
                tags: ['javascript', 'web development', 'programming'],
                rating: 4.8,
                students: 125000,
                thumbnail: 'https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg'
            },
            {
                id: 'sample-2',
                title: 'Python for Beginners - Full Course',
                provider: 'freecodecamp',
                duration: '4.5 hours',
                level: 'Beginner',
                description: 'Complete Python tutorial for absolute beginners. Learn Python programming fundamentals including data types, loops, functions, and file handling.',
                url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
                category: 'programming',
                tags: ['python', 'programming', 'beginners'],
                rating: 4.9,
                students: 200000,
                thumbnail: 'https://i.ytimg.com/vi/rfscVS0vtbw/maxresdefault.jpg'
            },
            {
                id: 'sample-3',
                title: 'React JS Full Course for Beginners',
                provider: 'freecodecamp',
                duration: '12 hours',
                level: 'Intermediate',
                description: 'Complete React.js tutorial covering components, hooks, state management, and building real projects.',
                url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
                category: 'web development',
                tags: ['react', 'javascript', 'frontend'],
                rating: 4.7,
                students: 180000,
                thumbnail: 'https://i.ytimg.com/vi/bMknfKXIFA8/maxresdefault.jpg'
            },
            {
                id: 'sample-4',
                title: 'Node.js and Express.js Full Course',
                provider: 'freecodecamp',
                duration: '8 hours',
                level: 'Intermediate',
                description: 'Learn backend development with Node.js and Express.js. Build REST APIs and full-stack applications.',
                url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
                category: 'backend',
                tags: ['nodejs', 'express', 'backend', 'api'],
                rating: 4.6,
                students: 95000,
                thumbnail: 'https://i.ytimg.com/vi/Oe421EPjeBE/maxresdefault.jpg'
            },
            {
                id: 'sample-5',
                title: 'CSS Grid and Flexbox Complete Course',
                provider: 'freecodecamp',
                duration: '3 hours',
                level: 'Beginner',
                description: 'Master CSS Grid and Flexbox layout systems. Build responsive layouts with modern CSS techniques.',
                url: 'https://www.freecodecamp.org/learn/responsive-web-design/',
                category: 'web design',
                tags: ['css', 'grid', 'flexbox', 'responsive'],
                rating: 4.8,
                students: 110000,
                thumbnail: 'https://i.ytimg.com/vi/t6CBKf8K_Ac/maxresdefault.jpg'
            }
        ];

        this.freeCodeCampCourses = [
            {
                id: 'fcc-js',
                title: 'JavaScript Algorithms and Data Structures',
                provider: 'freecodecamp',
                duration: '300 hours',
                level: 'Beginner to Advanced',
                description: 'Complete JavaScript course covering algorithms, data structures, and functional programming. Build real projects and earn a certification.',
                url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
                category: 'programming',
                tags: ['javascript', 'algorithms', 'data structures'],
                rating: 4.9,
                students: 500000,
                thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
            },
            {
                id: 'fcc-python',
                title: 'Scientific Computing with Python',
                provider: 'freecodecamp',
                duration: '300 hours',
                level: 'Intermediate',
                description: 'Learn Python for scientific computing including NumPy, Pandas, Matplotlib, and data analysis projects.',
                url: 'https://www.freecodecamp.org/learn/scientific-computing-with-python/',
                category: 'data science',
                tags: ['python', 'data science', 'numpy', 'pandas'],
                rating: 4.8,
                students: 300000,
                thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
            },
            {
                id: 'fcc-frontend',
                title: 'Front End Development Libraries',
                provider: 'freecodecamp',
                duration: '300 hours',
                level: 'Intermediate',
                description: 'Master React, Redux, Sass, Bootstrap, and jQuery. Build 5 projects to earn your certification.',
                url: 'https://www.freecodecamp.org/learn/front-end-development-libraries/',
                category: 'web development',
                tags: ['react', 'redux', 'bootstrap', 'sass'],
                rating: 4.7,
                students: 400000,
                thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
            },
            {
                id: 'fcc-backend',
                title: 'Back End Development and APIs',
                provider: 'freecodecamp',
                duration: '300 hours',
                level: 'Intermediate',
                description: 'Learn Node.js, Express.js, MongoDB, and build RESTful APIs. Complete 5 microservice projects.',
                url: 'https://www.freecodecamp.org/learn/back-end-development-and-apis/',
                category: 'backend',
                tags: ['nodejs', 'express', 'mongodb', 'api'],
                rating: 4.6,
                students: 250000,
                thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
            },
            {
                id: 'fcc-data-viz',
                title: 'Data Visualization',
                provider: 'freecodecamp',
                duration: '300 hours',
                level: 'Advanced',
                description: 'Create interactive data visualizations with D3.js. Build charts, graphs, and data-driven documents.',
                url: 'https://www.freecodecamp.org/learn/data-visualization/',
                category: 'data visualization',
                tags: ['d3js', 'data visualization', 'charts'],
                rating: 4.5,
                students: 150000,
                thumbnail: 'https://cdn.freecodecamp.org/curriculum/cat-photo-app/relaxing-cat.jpg'
            }
        ];
    }

    async init() {
        this.loadBookmarks();
        this.loadProgress();
        this.setupEventListeners();
        this.setupTheme();
        this.setupKeyboardShortcuts();
        
        // Hide API notice since we have a valid key
        document.getElementById('apiNotice').style.display = 'none';
        
        // Load sample courses initially
        this.courses = this.sampleCourses;
        this.displayCourses();
        this.updateStats();
    }

    // Event Listeners
    setupEventListeners() {
        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.handleSearch();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        document.getElementById('platformFilter').addEventListener('change', (e) => {
            this.currentFilter = e.target.value;
        });

        // Bookmarks modal
        document.getElementById('showBookmarks').addEventListener('click', () => {
            this.showBookmarksModal();
        });

        document.getElementById('closeModal').addEventListener('click', () => {
            this.hideBookmarksModal();
        });

        // Close modal when clicking outside
        document.getElementById('bookmarksModal').addEventListener('click', (e) => {
            if (e.target.id === 'bookmarksModal') {
                this.hideBookmarksModal();
            }
        });
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('searchInput').focus();
            }
            
            // Escape to close modal
            if (e.key === 'Escape') {
                this.hideBookmarksModal();
            }
        });
    }

    // Theme Management
    setupTheme() {
        const savedTheme = this.getFromStorage('skillsprint-theme') || 'light';
        this.setTheme(savedTheme);

        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('themeToggle').textContent =
            theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        this.saveToStorage('skillsprint-theme', theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Storage Management
    saveToStorage(key, value) {
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem(key, JSON.stringify(value));
            }
        } catch (e) {
            console.log('Storage not available, using memory only');
        }
    }

    getFromStorage(key) {
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

    loadBookmarks() {
        const saved = this.getFromStorage('skillsprint-bookmarks');
        if (saved && Array.isArray(saved)) {
            this.bookmarkedCourses = new Set(saved);
        }
    }

    saveBookmarks() {
        this.saveToStorage('skillsprint-bookmarks', [...this.bookmarkedCourses]);
    }

    loadProgress() {
        const saved = this.getFromStorage('skillsprint-progress');
        if (saved && typeof saved === 'object') {
            this.courseProgress = new Map(Object.entries(saved));
        }
    }

    saveProgress() {
        const progressObj = Object.fromEntries(this.courseProgress);
        this.saveToStorage('skillsprint-progress', progressObj);
    }

    // Search functionality
    async handleSearch() {
        const query = document.getElementById('searchInput').value.trim();
        const platform = document.getElementById('platformFilter').value;

        if (!query) {
            this.showNotification('Please enter a search term', 'warning');
            return;
        }

        this.currentSearchTerm = query;
        this.currentFilter = platform;
        
        this.showLoading(true);
        document.getElementById('sectionTitle').textContent = `Search Results for "${query}"`;

        try {
            let courses = [];

            switch (platform) {
                case 'youtube':
                    courses = await this.searchYouTubeCourses(query);
                    break;
                case 'freecodecamp':
                    courses = this.searchFreeCodeCampCourses(query);
                    break;
                case 'sample':
                    courses = this.searchSampleCourses(query);
                    break;
                default:
                    courses = this.sampleCourses;
            }

            this.courses = courses;
            this.displayCourses();
            this.updateStats();

            if (courses.length === 0) {
                this.showNoResults();
            }

        } catch (error) {
            console.error('Search error:', error);
            this.showNotification('Search failed. Please try again.', 'error');
            this.courses = this.sampleCourses;
            this.displayCourses();
        } finally {
            this.showLoading(false);
        }
    }

    // API Integration
    async searchYouTubeCourses(query) {
        try {
            const searchQuery = `${query} tutorial programming course complete`;
            const url = `${this.YOUTUBE_API_BASE}/search?` +
                `part=snippet&type=video&videoDuration=long&` +
                `q=${encodeURIComponent(searchQuery)}&` +
                `maxResults=50&order=relevance&` +
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
            this.showNotification('Failed to fetch YouTube courses. Using sample data.', 'warning');
            return this.searchSampleCourses(query);
        }
    }

    searchFreeCodeCampCourses(query) {
        const queryLower = query.toLowerCase();
        return this.freeCodeCampCourses.filter(course => 
            course.title.toLowerCase().includes(queryLower) ||
            course.description.toLowerCase().includes(queryLower) ||
            course.tags.some(tag => tag.toLowerCase().includes(queryLower))
        );
    }

    searchSampleCourses(query) {
        const queryLower = query.toLowerCase();
        return this.sampleCourses.filter(course => 
            course.title.toLowerCase().includes(queryLower) ||
            course.description.toLowerCase().includes(queryLower) ||
            course.tags.some(tag => tag.toLowerCase().includes(queryLower))
        );
    }

    // Utility functions
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

    // Display functions
    displayCourses() {
        const courseGrid = document.getElementById('courseGrid');
        const noResults = document.getElementById('noResults');

        if (this.courses.length === 0) {
            courseGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        courseGrid.innerHTML = this.courses.map(course => this.createCourseCard(course)).join('');

        // Add event listeners to new cards
        this.attachCourseCardListeners();
    }

    createCourseCard(course) {
        const isBookmarked = this.bookmarkedCourses.has(course.id);
        const progress = this.courseProgress.get(course.id) || 'not-started';
        
        return `
            <div class="course-card" data-course-id="${course.id}">
                <div class="course-header">
                    <div>
                        <h3 class="course-title">${course.title}</h3>
                        <div class="course-provider">${course.provider}</div>
                    </div>
                </div>
                
                <div class="course-meta">
                    <span>⏱️ ${course.duration}</span>
                    <span>📈 ${course.level}</span>
                    <span>👥 ${course.students}</span>
                    ${course.rating ? `<span>⭐ ${course.rating}</span>` : ''}
                </div>
                
                <p class="course-description">${course.description}</p>
                
                <div class="course-tags" style="margin-bottom: 1rem;">
                    ${course.tags.map(tag => `<span style="background: var(--primary-light); color: var(--primary-dark); padding: 0.25rem 0.5rem; border-radius: 0.25rem; font-size: 0.75rem; margin-right: 0.5rem;">#${tag}</span>`).join('')}
                </div>
                
                <div class="course-actions">
                    <a href="${course.url}" target="_blank" class="btn btn-primary">
                        🚀 Start Learning
                    </a>
                    
                    <button class="btn btn-outline progress-btn" data-course-id="${course.id}" data-progress="${progress}">
                        ${this.getProgressIcon(progress)} ${this.getProgressText(progress)}
                    </button>
                    
                    <button class="bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" data-course-id="${course.id}">
                        ${isBookmarked ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        `;
    }

    getProgressIcon(progress) {
        switch (progress) {
            case 'completed': return '✅';
            case 'in-progress': return '📚';
            default: return '▶️';
        }
    }

    getProgressText(progress) {
        switch (progress) {
            case 'completed': return 'Completed';
            case 'in-progress': return 'In Progress';
            default: return 'Start';
        }
    }

    attachCourseCardListeners() {
        // Bookmark buttons
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.dataset.courseId;
                this.toggleBookmark(courseId);
            });
        });

        // Progress buttons
        document.querySelectorAll('.progress-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.dataset.courseId;
                this.cycleProgress(courseId);
            });
        });
    }

    // Bookmark management
    toggleBookmark(courseId) {
        if (this.bookmarkedCourses.has(courseId)) {
            this.bookmarkedCourses.delete(courseId);
        } else {
            this.bookmarkedCourses.add(courseId);
        }
        
        this.saveBookmarks();
        this.updateBookmarkButton(courseId);
        this.updateStats();
    }

    updateBookmarkButton(courseId) {
        const btn = document.querySelector(`[data-course-id="${courseId}"].bookmark-btn`);
        if (btn) {
            const isBookmarked = this.bookmarkedCourses.has(courseId);
            btn.classList.toggle('bookmarked', isBookmarked);
            btn.textContent = isBookmarked ? '❤️' : '🤍';
        }
    }

    // Progress management
    cycleProgress(courseId) {
        const currentProgress = this.courseProgress.get(courseId) || 'not-started';
        let newProgress;
        
        switch (currentProgress) {
            case 'not-started':
                newProgress = 'in-progress';
                break;
            case 'in-progress':
                newProgress = 'completed';
                break;
            case 'completed':
                newProgress = 'not-started';
                break;
            default:
                newProgress = 'in-progress';
        }
        
        this.courseProgress.set(courseId, newProgress);
        this.saveProgress();
        this.updateProgressButton(courseId, newProgress);
        this.updateStats();
    }

    updateProgressButton(courseId, progress) {
        const btn = document.querySelector(`[data-course-id="${courseId}"].progress-btn`);
        if (btn) {
            btn.innerHTML = `${this.getProgressIcon(progress)} ${this.getProgressText(progress)}`;
            btn.dataset.progress = progress;
        }
    }

    // Stats
    updateStats() {
        document.getElementById('totalCourses').textContent = this.courses.length;
        document.getElementById('bookmarkedCourses').textContent = this.bookmarkedCourses.size;
        document.getElementById('bookmarkCount').textContent = this.bookmarkedCourses.size;
        
        let completed = 0;
        let inProgress = 0;
        
        this.courseProgress.forEach(progress => {
            if (progress === 'completed') completed++;
            if (progress === 'in-progress') inProgress++;
        });
        
        document.getElementById('completedCourses').textContent = completed;
        document.getElementById('inProgressCourses').textContent = inProgress;
    }

    // Modal management
    showBookmarksModal() {
        const modal = document.getElementById('bookmarksModal');
        const bookmarksGrid = document.getElementById('bookmarksGrid');
        
        const bookmarkedCourses = this.courses.filter(course => 
            this.bookmarkedCourses.has(course.id)
        );
        
        if (bookmarkedCourses.length === 0) {
            bookmarksGrid.innerHTML = `
                <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">📚</div>
                    <h3>No bookmarked courses yet</h3>
                    <p>Start bookmarking courses to track your learning journey!</p>
                </div>
            `;
        } else {
            bookmarksGrid.innerHTML = bookmarkedCourses
                .map(course => this.createCourseCard(course))
                .join('');
            this.attachCourseCardListeners();
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hideBookmarksModal() {
        document.getElementById('bookmarksModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // UI helpers
    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'flex' : 'none';
    }

    showNoResults() {
        document.getElementById('noResults').style.display = 'block';
        document.getElementById('courseGrid').innerHTML = '';
    }

    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? 'var(--danger-color)' : type === 'warning' ? 'var(--warning-color)' : 'var(--primary-color)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            z-index: 1001;
            box-shadow: var(--shadow-lg);
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new SkillSprint();
    app.init();
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
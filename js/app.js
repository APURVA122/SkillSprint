const { SAMPLE_COURSES } = require("./data");
const { ApiService } = require("./services");
const { UIManager } = require("./ui");

class SkillSprint {
    constructor() {
        // Core data structures
        this.courses = [];
        this.bookmarkedCourses = new Set();
        this.courseProgress = new Map();
        this.currentSearchTerm = '';
        this.currentFilter = 'youtube';
        
        // Initialize services (assuming these are imported from other files)
        this.apiService = new ApiService();
        this.storageService = new StorageService();
        this.uiService = new UIManager();
        this.dataService = new SAMPLE_COURSES();
    }

    async init() {
        try {
            // Initialize all services
            await this.initializeServices();
            
            // Load saved data
            this.loadSavedData();
            
            // Setup event listeners and UI
            this.setupEventListeners();
            this.setupTheme();
            this.setupKeyboardShortcuts();
            
            // Hide API notice and load initial data
            this.uiService.hideElement('apiNotice');
            
            // Load initial courses
            this.courses = this.dataService.getSampleCourses();
            this.displayCourses();
            this.updateStats();
            
            console.log('SkillSprint initialized successfully');
        } catch (error) {
            console.error('Failed to initialize SkillSprint:', error);
            this.uiService.showNotification('Failed to initialize application', 'error');
        }
    }

    async initializeServices() {
        // Initialize each service
        if (this.apiService.init) await this.apiService.init();
        if (this.storageService.init) await this.storageService.init();
        if (this.uiService.init) await this.uiService.init();
        if (this.dataService.init) await this.dataService.init();
    }

    loadSavedData() {
        // Load bookmarks
        const savedBookmarks = this.storageService.getBookmarks();
        if (savedBookmarks && Array.isArray(savedBookmarks)) {
            this.bookmarkedCourses = new Set(savedBookmarks);
        }
        
        // Load progress
        const savedProgress = this.storageService.getProgress();
        if (savedProgress && typeof savedProgress === 'object') {
            this.courseProgress = new Map(Object.entries(savedProgress));
        }
    }

    // Event Listeners Setup
    setupEventListeners() {
        // Search functionality
        this.uiService.addEventListener('searchBtn', 'click', () => {
            this.handleSearch();
        });

        this.uiService.addEventListener('searchInput', 'keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSearch();
            }
        });

        this.uiService.addEventListener('platformFilter', 'change', (e) => {
            this.currentFilter = e.target.value;
        });

        // Bookmarks modal
        this.uiService.addEventListener('showBookmarks', 'click', () => {
            this.showBookmarksModal();
        });

        this.uiService.addEventListener('closeModal', 'click', () => {
            this.hideBookmarksModal();
        });

        // Close modal when clicking outside
        this.uiService.addEventListener('bookmarksModal', 'click', (e) => {
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
                this.uiService.focusElement('searchInput');
            }
            
            // Escape to close modal
            if (e.key === 'Escape') {
                this.hideBookmarksModal();
            }
        });
    }

    // Theme Management
    setupTheme() {
        const savedTheme = this.storageService.getTheme() || 'light';
        this.setTheme(savedTheme);

        this.uiService.addEventListener('themeToggle', 'click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        this.uiService.setTheme(theme);
        this.storageService.saveTheme(theme);
    }

    toggleTheme() {
        const currentTheme = this.uiService.getCurrentTheme();
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    // Search functionality
    async handleSearch() {
        const query = this.uiService.getSearchQuery();
        const platform = this.uiService.getSelectedPlatform();

        if (!query) {
            this.uiService.showNotification('Please enter a search term', 'warning');
            return;
        }

        this.currentSearchTerm = query;
        this.currentFilter = platform;
        
        this.uiService.showLoading(true);
        this.uiService.updateSectionTitle(`Search Results for "${query}"`);

        try {
            let courses = [];

            switch (platform) {
                case 'youtube':
                    courses = await this.apiService.searchYouTubeCourses(query);
                    break;
                case 'freecodecamp':
                    courses = this.dataService.searchFreeCodeCampCourses(query);
                    break;
                case 'sample':
                    courses = this.dataService.searchSampleCourses(query);
                    break;
                default:
                    courses = this.dataService.getSampleCourses();
            }

            this.courses = courses;
            this.displayCourses();
            this.updateStats();

            if (courses.length === 0) {
                this.uiService.showNoResults();
            }

        } catch (error) {
            console.error('Search error:', error);
            this.uiService.showNotification('Search failed. Please try again.', 'error');
            this.courses = this.dataService.getSampleCourses();
            this.displayCourses();
        } finally {
            this.uiService.showLoading(false);
        }
    }

    // Course Display and Management
    displayCourses() {
        if (this.courses.length === 0) {
            this.uiService.showNoResults();
            return;
        }

        const courseCards = this.courses.map(course => {
            const isBookmarked = this.bookmarkedCourses.has(course.id);
            const progress = this.courseProgress.get(course.id) || 'not-started';
            
            return this.uiService.createCourseCard(course, isBookmarked, progress);
        });

        this.uiService.displayCourseCards(courseCards);
        this.attachCourseCardListeners();
    }

    attachCourseCardListeners() {
        // Bookmark buttons
        this.uiService.attachBookmarkListeners((courseId) => {
            this.toggleBookmark(courseId);
        });

        // Progress buttons
        this.uiService.attachProgressListeners((courseId) => {
            this.cycleProgress(courseId);
        });
    }

    // Bookmark Management
    toggleBookmark(courseId) {
        if (this.bookmarkedCourses.has(courseId)) {
            this.bookmarkedCourses.delete(courseId);
        } else {
            this.bookmarkedCourses.add(courseId);
        }
        
        this.storageService.saveBookmarks([...this.bookmarkedCourses]);
        this.uiService.updateBookmarkButton(courseId, this.bookmarkedCourses.has(courseId));
        this.updateStats();
    }

    // Progress Management
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
        this.storageService.saveProgress(Object.fromEntries(this.courseProgress));
        this.uiService.updateProgressButton(courseId, newProgress);
        this.updateStats();
    }

    // Statistics Update
    updateStats() {
        let completed = 0;
        let inProgress = 0;
        
        this.courseProgress.forEach(progress => {
            if (progress === 'completed') completed++;
            if (progress === 'in-progress') inProgress++;
        });

        const stats = {
            totalCourses: this.courses.length,
            bookmarkedCourses: this.bookmarkedCourses.size,
            completedCourses: completed,
            inProgressCourses: inProgress
        };

        this.uiService.updateStats(stats);
    }

    // Modal Management
    showBookmarksModal() {
        const bookmarkedCourses = this.courses.filter(course => 
            this.bookmarkedCourses.has(course.id)
        );
        
        if (bookmarkedCourses.length === 0) {
            this.uiService.showEmptyBookmarksModal();
        } else {
            const courseCards = bookmarkedCourses.map(course => {
                const progress = this.courseProgress.get(course.id) || 'not-started';
                return this.uiService.createCourseCard(course, true, progress);
            });
            
            this.uiService.showBookmarksModal(courseCards);
            this.attachCourseCardListeners();
        }
    }

    hideBookmarksModal() {
        this.uiService.hideBookmarksModal();
    }

    // Utility Methods
    getCourseById(courseId) {
        return this.courses.find(course => course.id === courseId);
    }

    getBookmarkedCourses() {
        return this.courses.filter(course => this.bookmarkedCourses.has(course.id));
    }

    getCoursesInProgress() {
        return this.courses.filter(course => 
            this.courseProgress.get(course.id) === 'in-progress'
        );
    }

    getCompletedCourses() {
        return this.courses.filter(course => 
            this.courseProgress.get(course.id) === 'completed'
        );
    }

    // Public API for external interactions
    searchCourses(query, platform = 'youtube') {
        this.uiService.setSearchQuery(query);
        this.uiService.setSelectedPlatform(platform);
        return this.handleSearch();
    }

    bookmarkCourse(courseId) {
        if (!this.bookmarkedCourses.has(courseId)) {
            this.toggleBookmark(courseId);
        }
    }

    unbookmarkCourse(courseId) {
        if (this.bookmarkedCourses.has(courseId)) {
            this.toggleBookmark(courseId);
        }
    }

    markCourseAsCompleted(courseId) {
        this.courseProgress.set(courseId, 'completed');
        this.storageService.saveProgress(Object.fromEntries(this.courseProgress));
        this.uiService.updateProgressButton(courseId, 'completed');
        this.updateStats();
    }

    markCourseAsInProgress(courseId) {
        this.courseProgress.set(courseId, 'in-progress');
        this.storageService.saveProgress(Object.fromEntries(this.courseProgress));
        this.uiService.updateProgressButton(courseId, 'in-progress');
        this.updateStats();
    }

    // Error handling
    handleError(error, context = '') {
        console.error(`Error in ${context}:`, error);
        this.uiService.showNotification(
            `An error occurred${context ? ` in ${context}` : ''}. Please try again.`, 
            'error'
        );
    }

    // Cleanup
    destroy() {
        // Clean up event listeners and resources
        if (this.apiService.destroy) this.apiService.destroy();
        if (this.uiService.destroy) this.uiService.destroy();
        if (this.storageService.destroy) this.storageService.destroy();
        if (this.dataService.destroy) this.dataService.destroy();
    }
}

// Global app instance
let skillSprintApp = null;

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        skillSprintApp = new SkillSprint();
        await skillSprintApp.init();
        
        // Make app globally accessible for debugging
        window.SkillSprintApp = skillSprintApp;
        
    } catch (error) {
        console.error('Failed to initialize SkillSprint application:', error);
        
        // Show fallback error message
        document.body.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 100vh; flex-direction: column; text-align: center; padding: 2rem;">
                <h1 style="color: #e74c3c; margin-bottom: 1rem;">⚠️ Application Error</h1>
                <p style="color: #666; margin-bottom: 2rem;">Failed to load SkillSprint. Please refresh the page or check the console for details.</p>
                <button onclick="location.reload()" style="padding: 0.75rem 1.5rem; background: #3498db; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                    🔄 Refresh Page
                </button>
            </div>
        `;
    }
});

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (skillSprintApp) {
        skillSprintApp.destroy();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SkillSprint;
}
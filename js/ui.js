// ui.js - UI Components and DOM Management

import { PROGRESS_STATES } from './data.js';

export class UIManager {
    constructor(app) {
        this.app = app;
    }

    displayCourses(courses) {
        const courseGrid = document.getElementById('courseGrid');
        const noResults = document.getElementById('noResults');

        if (courses.length === 0) {
            courseGrid.innerHTML = '';
            noResults.style.display = 'block';
            return;
        }

        noResults.style.display = 'none';
        courseGrid.innerHTML = courses.map(course => this.createCourseCard(course)).join('');

        // Add event listeners to new cards
        this.attachCourseCardListeners();
    }

    createCourseCard(course) {
        const isBookmarked = this.app.bookmarkedCourses.has(course.id);
        const progress = this.app.courseProgress.get(course.id) || PROGRESS_STATES.NOT_STARTED;
        
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
            case PROGRESS_STATES.COMPLETED: return '✅';
            case PROGRESS_STATES.IN_PROGRESS: return '📚';
            default: return '▶️';
        }
    }

    getProgressText(progress) {
        switch (progress) {
            case PROGRESS_STATES.COMPLETED: return 'Completed';
            case PROGRESS_STATES.IN_PROGRESS: return 'In Progress';
            default: return 'Start';
        }
    }

    attachCourseCardListeners() {
        // Bookmark buttons
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.dataset.courseId;
                this.app.toggleBookmark(courseId);
            });
        });

        // Progress buttons
        document.querySelectorAll('.progress-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = btn.dataset.courseId;
                this.app.cycleProgress(courseId);
            });
        });
    }

    updateBookmarkButton(courseId) {
        const btn = document.querySelector(`[data-course-id="${courseId}"].bookmark-btn`);
        if (btn) {
            const isBookmarked = this.app.bookmarkedCourses.has(courseId);
            btn.classList.toggle('bookmarked', isBookmarked);
            btn.textContent = isBookmarked ? '❤️' : '🤍';
        }
    }

    updateProgressButton(courseId, progress) {
        const btn = document.querySelector(`[data-course-id="${courseId}"].progress-btn`);
        if (btn) {
            btn.innerHTML = `${this.getProgressIcon(progress)} ${this.getProgressText(progress)}`;
            btn.dataset.progress = progress;
        }
    }

    updateStats(totalCourses, bookmarkedCount, completedCount, inProgressCount) {
        document.getElementById('totalCourses').textContent = totalCourses;
        document.getElementById('bookmarkedCourses').textContent = bookmarkedCount;
        document.getElementById('bookmarkCount').textContent = bookmarkedCount;
        document.getElementById('completedCourses').textContent = completedCount;
        document.getElementById('inProgressCourses').textContent = inProgressCount;
    }

    showLoading(show) {
        document.getElementById('loading').style.display = show ? 'flex' : 'none';
    }

    showNoResults() {
        document.getElementById('noResults').style.display = 'block';
        document.getElementById('courseGrid').innerHTML = '';
    }
}

export class ModalManager {
    constructor(app) {
        this.app = app;
    }

    showBookmarksModal() {
        const modal = document.getElementById('bookmarksModal');
        const bookmarksGrid = document.getElementById('bookmarksGrid');
        
        const bookmarkedCourses = this.app.courses.filter(course => 
            this.app.bookmarkedCourses.has(course.id)
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
                .map(course => this.app.uiManager.createCourseCard(course))
                .join('');
            this.app.uiManager.attachCourseCardListeners();
        }
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    hideBookmarksModal() {
        document.getElementById('bookmarksModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

export class NotificationService {
    static showNotification(message, type = 'info') {
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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    static addNotificationStyles() {
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
    }
}

export class ThemeManager {
    constructor() {
        this.setupTheme();
        this.setupThemeToggle();
    }

    setupTheme() {
        const savedTheme = this.getStoredTheme() || 'light';
        this.setTheme(savedTheme);
    }

    setupThemeToggle() {
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.getElementById('themeToggle').textContent =
            theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        this.saveTheme(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    saveTheme(theme) {
        try {
            if (typeof Storage !== 'undefined') {
                localStorage.setItem('skillsprint-theme', theme);
            }
        } catch (e) {
            console.log('Theme storage not available');
        }
    }

    getStoredTheme() {
        try {
            if (typeof Storage !== 'undefined') {
                return localStorage.getItem('skillsprint-theme');
            }
        } catch (e) {
            console.log('Theme storage not available');
        }
        return null;
    }
}
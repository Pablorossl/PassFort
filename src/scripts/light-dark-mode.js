/**
 * Light/Dark Mode Toggle Script
 * Manages theme switching with localStorage persistence
 */

// =========================
// Theme Management
// =========================

/**
 * Gets the current theme from localStorage or system preference
 * @returns {string} 'light' or 'dark'
 */
function getCurrentTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        return storedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
    }
    
    return 'dark';
}

/**
 * Applies the theme to the document
 * @param {string} theme - 'light' or 'dark'
 */
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    const button = document.getElementById('themeToggle');
    if (button) {
        button.textContent = theme === 'light' ? 'Dark' : 'Light';
        button.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// =========================
// Initialization
// =========================

document.addEventListener('DOMContentLoaded', function() {
    // Apply saved theme on load
    applyTheme(getCurrentTheme());
    
    // Setup toggle button
    const button = document.getElementById('themeToggle');
    if (button) {
        button.addEventListener('click', toggleTheme);
    }
});
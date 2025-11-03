/**
 * Theme toggle script for PassFort.
 * Handles switching between light and dark modes, updates UI accordingly,
 * and persists user preference in localStorage.
 */
(function() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const storageKey = 'pf-theme'; // Key for storing theme preference in localStorage

    /**
     * Applies the selected theme to the document.
     * Updates the HTML attribute, button text, aria-pressed state, and text color for accessibility.
     * @param {string} theme - 'light' or 'dark'
     */
    function applyTheme(theme) {
        if (theme === 'light') {
            // Set light theme
            html.setAttribute('data-theme', 'light');
            btn.textContent = 'Dark';
            btn.setAttribute('aria-pressed', 'true');
            // Improve contrast for all text in light mode
            document.body.style.color = '#232946';
            // Update all paragraph elements for readability in light mode
            document.querySelectorAll('p').forEach(el => {
                el.style.color = '#232946';
            });
        } else {
            // Set dark theme (default)
            html.removeAttribute('data-theme');
            btn.textContent = 'Light';
            btn.setAttribute('aria-pressed', 'false');
            // Reset text color to default for dark mode
            document.body.style.color = '';
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, label, .logo, .main-nav a, .main-nav button').forEach(el => {
                el.style.color = '';
            });
        }
    }

    // =========================
    // Initialization
    // =========================

    // Check for saved theme in localStorage
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        applyTheme(saved);
    } else {
        // Default to dark theme.
        // To respect system preference, uncomment the following lines:
        // const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        // if (prefersLight) applyTheme('light');
    }

    // =========================
    // Event Listener
    // =========================

    // Toggle theme on button click and save preference
    btn.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(storageKey, next);
    })();
})();
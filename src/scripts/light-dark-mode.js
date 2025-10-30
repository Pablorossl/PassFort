(function() {
    const html = document.documentElement;
    const btn = document.getElementById('themeToggle');
    const storageKey = 'pf-theme'; // 'dark' or 'light'

    function applyTheme(theme) {
        if (theme === 'light') {
            html.setAttribute('data-theme', 'light');
            btn.textContent = 'Dark';
            btn.setAttribute('aria-pressed', 'true');
            // Improve contrast for all text in light mode
            document.body.style.color = '#232946';
            // Also update all elements with white/light text to dark for readability
            document.querySelectorAll('p').forEach(el => {
                el.style.color = '#232946';
            });
        } else {
            html.removeAttribute('data-theme');
            btn.textContent = 'Light';
            btn.setAttribute('aria-pressed', 'false');
            document.body.style.color = '';
            document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, label, .logo, .main-nav a, .main-nav button').forEach(el => {
                el.style.color = '';
            });
        }
    }

    // Init from localStorage or system preference
    const saved = localStorage.getItem(storageKey);
    if (saved) {
        applyTheme(saved);
    } else {
        // keep default (dark). If you prefer to respect system preference uncomment:
        // const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        // if (prefersLight) applyTheme('light');
    }

    btn.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
        const next = current === 'light' ? 'dark' : 'light';
        applyTheme(next);
        localStorage.setItem(storageKey, next);
    })();
})();
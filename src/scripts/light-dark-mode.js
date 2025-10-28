(function() {
        const html = document.documentElement;
        const btn = document.getElementById('themeToggle');
        const storageKey = 'pf-theme'; // 'dark' or 'light'

        function applyTheme(theme) {
            if (theme === 'light') {
                html.setAttribute('data-theme', 'light');
                btn.textContent = 'Dark';
                btn.setAttribute('aria-pressed', 'true');
            } else {
                html.removeAttribute('data-theme');
                btn.textContent = 'Light';
                btn.setAttribute('aria-pressed', 'false');
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
        });
    })();
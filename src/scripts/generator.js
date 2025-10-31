// =========================
// Config: Colors & Texts (for i18n and customization)
// =========================
const CONFIG = {
	securityLevels: [
		{ min: 1, max: 7, bg: "#ff4d4f", color: "#fff", text: "Security level: Low" },
		{ min: 8, max: 14, bg: "#ffb300", color: "#232946", text: "Security level: Medium" },
		{ min: 15, max: 21, bg: "#ffe066", color: "#232946", text: "Security level: High" },
		{ min: 22, max: 30, bg: "#00b894", color: "#fff", text: "Security level: Very high" }
	],
	copy: {
		initial: '📋 Copy to clipboard',
		success: '✅ Copied!'
	},
	button: {
		initial: 'Create password',
		again: 'Generate again'
	}
};

// =========================
// Password Generation Logic
// =========================

/**
 * Generates a random password based on the selected options.
 * @param {number} length - Desired password length.
 * @param {boolean} uppercase - Include uppercase letters.
 * @param {boolean} numbers - Include numbers.
 * @param {boolean} symbols - Include symbols.
 * @returns {string} Generated password.
 */
function generatePassword(length, uppercase, numbers, symbols) {
	let chars = 'abcdefghijklmnopqrstuvwxyz';
	if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (numbers) chars += '0123456789';
	if (symbols) chars += '!@#$%^&*()-_=+[]{}|;:,.<>?/';
	if (!chars) return '';
	let password = '';
	for (let i = 0; i < length; i++) {
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return password;
}

// =========================
// UI Helpers
// =========================

/**
 * Returns the security config for a given password length.
 * @param {number} length
 * @returns {object} Security config (bg, color, text)
 */
function getSecurityConfig(length) {
	for (const level of CONFIG.securityLevels) {
		if (length >= level.min && length <= level.max) {
			return level;
		}
	}
	// Default config if not matched
	return { bg: "#eebbc3", color: "#232946", text: "" };
}

/**
 * Creates and returns a styled span for the generated password.
 * @param {string} password
 * @returns {HTMLElement}
 */
function createPasswordSpan(password) {
	const span = document.createElement('span');
	span.textContent = password;
	span.className = 'password-fadein generated-password';
	return span;
}

/**
 * Creates and returns a copy-to-clipboard button.
 * @param {string} password
 * @returns {HTMLElement}
 */
function createCopyButton(password) {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'password-emoji';
	btn.innerHTML = CONFIG.copy.initial;
	btn.title = CONFIG.copy.initial;
	btn.style.marginLeft = '8px';
	btn.style.fontSize = '0.85em';
	btn.style.padding = '1px 8px';
	btn.style.borderRadius = '4px';
	btn.style.border = '1px solid #d1d5db';
	btn.style.background = '#f8fafc';
	btn.style.cursor = 'pointer';
	btn.style.transition = 'background 0.2s, transform 0.2s';

	btn.onclick = function () {
		navigator.clipboard.writeText(password);
		btn.innerHTML = CONFIG.copy.success;
		btn.style.background = '#d1ffd6';
		btn.style.transform = 'scale(1.08)';
		setTimeout(() => {
			btn.innerHTML = CONFIG.copy.initial;
			btn.style.background = '#f8fafc';
			btn.style.transform = 'scale(1)';
		}, 1200);
	};
	return btn;
}

/**
 * Updates the security level UI (color, text) and returns the config.
 * @param {number} length
 * @param {HTMLElement} output
 * @param {HTMLElement} security
 */
function updateSecurityUI(length, output, security) {
	const config = getSecurityConfig(length);
	output.style.background = config.bg;
	output.style.color = config.color;
	security.innerText = config.text;
	output.style.transition = "background 0.3s, color 0.3s";
	return config;
}

/**
 * Updates the submit button text after first generation.
 */
function updateSubmitButtonText() {
	const submitBtn = document.querySelector('#passwordForm button[type="submit"]');
	if (submitBtn && submitBtn.textContent !== CONFIG.button.again) {
		submitBtn.textContent = CONFIG.button.again;
	}
}

// =========================
// Form Submission Handler
// =========================

document.getElementById('passwordForm').onsubmit = async function (e) {
	e.preventDefault();

	const length = parseInt(document.getElementById('length').value, 10);
	const uppercase = document.getElementById('mayusculas').checked;
	const numbers = document.getElementById('numeros').checked;
	const symbols = document.getElementById('simbolos').checked;

	const password = generatePassword(length, uppercase, numbers, symbols);

	const resultado = document.getElementById('resultado');
	resultado.innerHTML = '';

	// Add generated password span
	const passwordSpan = createPasswordSpan(password);
	resultado.appendChild(passwordSpan);

	// Add copy-to-clipboard button
	const copyBtn = createCopyButton(password);
	resultado.appendChild(copyBtn);

	// Restart animation
	passwordSpan.classList.remove('password-fadein');
	void passwordSpan.offsetWidth;
	passwordSpan.classList.add('password-fadein');

	// Update submit button text
	updateSubmitButtonText();
};

// =========================
// Range and Security Level UI
// =========================

document.addEventListener('DOMContentLoaded', function () {
	const range = document.getElementById('length');
	const output = document.getElementById('lengthValue');
	const security = document.getElementById('seguridad');

	function handleRangeInput() {
		output.textContent = range.value;
		updateSecurityUI(parseInt(range.value, 10), output, security);
	}

	range.addEventListener('input', handleRangeInput);
	handleRangeInput();
});
// =========================
// Config: Colors & Texts (for i18n and customization)
// =========================
const CONFIG = {
	// Security levels for password strength indicator
	securityLevels: [
		{ min: 1, max: 7, bg: "#ff4d4f", color: "#fff", text: "Security level: Low" },
		{ min: 8, max: 14, bg: "#ffb300", color: "#232946", text: "Security level: Medium" },
		{ min: 15, max: 21, bg: "#ffe066", color: "#232946", text: "Security level: High" },
		{ min: 22, max: 30, bg: "#00b894", color: "#fff", text: "Security level: Very high" }
	],
	// Texts for copy-to-clipboard button
	copy: {
		initial: '📋 Copy to clipboard',
		success: '✅ Copied!'
	},
	// Texts for the main submit button
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
		// Pick a random character from the allowed set
		password += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return password;
}

/**
 * Calculates password strength based on length and selected options.
 * Returns a value from 0 (weak) to 4 (very strong).
 */
function getPasswordStrength(length, uppercase, numbers, symbols) {
	let score = 0;
	if (length >= 8) score++;
	if (length >= 12) score++;
	if (uppercase) score++;
	if (numbers) score++;
	if (symbols) score++;
	return Math.min(score, 4);
}

// =========================
// UI Helpers
// =========================

/**
 * Returns the security config for a given password length.
 * Used to determine the color and label for the strength indicator.
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
 * The button provides feedback when the password is copied.
 * @param {string} password
 * @returns {HTMLElement}
 */
function createCopyButton(password) {
	const btn = document.createElement('button');
	btn.type = 'button';
	btn.className = 'password-emoji';
	btn.innerHTML = CONFIG.copy.initial;
	btn.title = CONFIG.copy.initial;
	// Inline styles for button appearance
	btn.style.marginLeft = '8px';
	btn.style.fontSize = '0.85em';
	btn.style.padding = '1px 8px';
	btn.style.borderRadius = '4px';
	btn.style.border = '1px solid #d1d5db';
	btn.style.background = '#f8fafc';
	btn.style.cursor = 'pointer';
	btn.style.transition = 'background 0.2s, transform 0.2s';

	// Copy password to clipboard and show feedback
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
 * Updates the password strength meter UI.
 * @param {number} strength - Strength value from 0 to 4.
 */
function updateStrengthMeter(strength) {
	const meter = document.getElementById('strength-meter');
	const label = document.getElementById('strength-label');
	const levels = [
		{ text: "Very Weak", color: "#ff4d4f" },
		{ text: "Weak", color: "#ffb300" },
		{ text: "Medium", color: "#ffe066" },
		{ text: "Strong", color: "#00b894" },
		{ text: "Very Strong", color: "#00adb5" }
	];
	meter.value = strength;
	meter.max = 4;
	meter.style.setProperty('--strength-color', levels[strength].color);
	label.textContent = levels[strength].text;
	label.style.color = levels[strength].color;
}

/**
 * Updates the security level UI (color, text) and returns the config.
 * Changes the background and text color of the length indicator,
 * and updates the security level label.
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
 * Changes the button label to "Generate again".
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

/**
 * Handles the password form submission.
 * Generates a password, updates the UI, and sets up copy functionality.
 */
document.getElementById('passwordForm').onsubmit = async function (e) {
	e.preventDefault();

	const length = parseInt(document.getElementById('length').value, 10);
	const uppercase = document.getElementById('mayusculas').checked;
	const numbers = document.getElementById('numeros').checked;
	const symbols = document.getElementById('simbolos').checked;

	const password = generatePassword(length, uppercase, numbers, symbols);

	const resultado = document.getElementById('resultado');
	resultado.innerHTML = '';

	// Add generated password span to the result area (hidden by default)
	const passwordSpan = createPasswordSpan('*'.repeat(password.length));
	resultado.appendChild(passwordSpan);

	// Add show/hide password toggle
	const toggleBtn = document.createElement('button');
	toggleBtn.type = 'button';
	toggleBtn.textContent = '👁 Show';
	toggleBtn.style.marginLeft = '8px';
	toggleBtn.style.fontSize = '0.85em';
	toggleBtn.style.padding = '1px 8px';
	toggleBtn.style.borderRadius = '4px';
	toggleBtn.style.border = '1px solid #d1d5db';
	toggleBtn.style.background = '#f8fafc';
	toggleBtn.style.cursor = 'pointer';
	toggleBtn.style.transition = 'background 0.2s, transform 0.2s';

	let isVisible = false;
	toggleBtn.onclick = function () {
		isVisible = !isVisible;
		passwordSpan.textContent = isVisible ? password : '*'.repeat(password.length);
		toggleBtn.textContent = isVisible ? '🙈 Hide' : '👁 Show';
	};

	resultado.appendChild(toggleBtn);

	// Add copy-to-clipboard button to the result area
	const copyBtn = createCopyButton(password);
	resultado.appendChild(copyBtn);

	// Show security indicator after generating password
	let security = document.getElementById('seguridad');
	if (!security) {
		security = document.createElement('div');
		security.id = 'seguridad';
		resultado.appendChild(security);
	} else {
		resultado.appendChild(security);
	}
	const output = document.getElementById('lengthValue');
	updateSecurityUI(length, output, security);

	// Restart fade-in animation for the password
	passwordSpan.classList.remove('password-fadein');
	void passwordSpan.offsetWidth;
	passwordSpan.classList.add('password-fadein');

	// Update submit button text to "Generate again"
	updateSubmitButtonText();

	// Update strength meter
	const strength = getPasswordStrength(length, uppercase, numbers, symbols);
	updateStrengthMeter(strength);
};

// =========================
// Range and Security Level UI
// =========================

/**
 * Handles the range input for password length.
 * Updates the length value display and security level indicator.
 */
document.addEventListener('DOMContentLoaded', function () {
	const range = document.getElementById('length');
	const output = document.getElementById('lengthValue');
	let security = document.getElementById('seguridad');
	if (security) security.innerText = ''; // Hide security indicator initially

	const uppercase = document.getElementById('mayusculas');
	const numbers = document.getElementById('numeros');
	const symbols = document.getElementById('simbolos');

	function handleRangeInput() {
		output.textContent = range.value;
		// Do not show security indicator until password is generated
		if (security) security.innerText = '';
		const strength = getPasswordStrength(
			parseInt(range.value, 10),
			uppercase.checked,
			numbers.checked,
			symbols.checked
		);
		updateStrengthMeter(strength);
	}

	range.addEventListener('input', handleRangeInput);
	uppercase.addEventListener('change', handleRangeInput);
	numbers.addEventListener('change', handleRangeInput);
	symbols.addEventListener('change', handleRangeInput);
	handleRangeInput();
});


// To improve:
// 1. The selector for 'form#passwordForm > div[style]' in the CSS may be fragile if the inline style changes.
// 2. The password generator uses Math.random(), which is not cryptographically secure. For higher security, consider using window.crypto.getRandomValues for password generation.


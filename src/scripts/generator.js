// =========================
// Password Generation Logic
// =========================
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

	// Password text
	const passwordSpan = document.createElement('span');
	passwordSpan.textContent = "Generated password: " + password;
	resultado.appendChild(passwordSpan);

	// Copy to clipboard button with emoji and effect
	const copyBtn = document.createElement('button');
	copyBtn.type = 'button';
	copyBtn.className = 'password-emoji';
	copyBtn.innerHTML = '📋 Copy to clipboard';
	copyBtn.title = 'Copy to clipboard';
	copyBtn.style.marginLeft = '8px';
	copyBtn.style.fontSize = '0.85em';
	copyBtn.style.padding = '1px 8px';
	copyBtn.style.borderRadius = '4px';
	copyBtn.style.border = '1px solid #d1d5db';
	copyBtn.style.background = '#f8fafc';
	copyBtn.style.cursor = 'pointer';
	copyBtn.style.transition = 'background 0.2s, transform 0.2s';

	copyBtn.onclick = function () {
		navigator.clipboard.writeText(password);
		copyBtn.innerHTML = '✅ Copied!';
		copyBtn.style.background = '#d1ffd6';
		copyBtn.style.transform = 'scale(1.08)';
		setTimeout(() => {
			copyBtn.innerHTML = '📋 Copy to clipboard';
			copyBtn.style.background = '#f8fafc';
			copyBtn.style.transform = 'scale(1)';
		}, 1200);
	};

	resultado.appendChild(copyBtn);
};

// =========================
// Range and Security Level UI
// =========================
document.addEventListener('DOMContentLoaded', function () {
	const range = document.getElementById('length');
	const output = document.getElementById('lengthValue');
	const security = document.getElementById('seguridad');

	function updateLengthValue() {
		output.textContent = range.value;
		const val = parseInt(range.value, 10);
		if (val >= 1 && val <= 7) {
			output.style.background = "#e74c3c"; // red
			output.style.color = "#fff";
			security.innerText = "Security level: Low";
		} else if (val >= 8 && val <= 14) {
			output.style.background = "#f39c12"; // orange
			output.style.color = "#232946";
			security.innerText = "Security level: Medium";
		} else if (val >= 15 && val <= 21) {
			output.style.background = "#f7e017"; // yellow
			output.style.color = "#232946";
			security.innerText = "Security level: High";
		} else if (val >= 22 && val <= 30) {
			output.style.background = "#27ae60"; // green
			output.style.color = "#fff";
			security.innerText = "Security level: Very high";
		} else {
			output.style.background = "#eebbc3"; // default color
			output.style.color = "#232946";
			security.innerText = "";
		}
	}
	range.addEventListener('input', updateLengthValue);
	updateLengthValue();
});
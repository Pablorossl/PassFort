document.getElementById('passwordForm').onsubmit = async function(e) {
	e.preventDefault();
	// PENDIENTE: Crear una petición AJAX al backend
	const longitud = document.getElementById('length').value;
	const mayusculas = document.getElementById('mayusculas').checked;
	const numeros = document.getElementById('numeros').checked;
	const simbolos = document.getElementById('simbolos').checked;

	document.getElementById('resultado').innerText = "Generated password: ********";
	// Elimina la línea que resetea el nivel de seguridad para que se mantenga el valor calculado
	// document.getElementById('seguridad').innerText = "Security level:";
}

document.addEventListener('DOMContentLoaded', function() {
	const range = document.getElementById('length');
	const output = document.getElementById('lengthValue');
	const seguridad = document.getElementById('seguridad');

	function updateLengthValue() {
		output.textContent = range.value;
		const val = parseInt(range.value, 10);
		if (val >= 1 && val <= 7) {
			output.style.background = "#e74c3c"; // red
			output.style.color = "#fff";
			seguridad.innerText = "Security level: Low";
		} else if (val >= 8 && val <= 14) {
			output.style.background = "#f39c12"; // orange
			output.style.color = "#232946";
			seguridad.innerText = "Security level: Medium";
		} else if (val >= 15 && val <= 21) {
			output.style.background = "#f7e017"; // yellow
			output.style.color = "#232946";
			seguridad.innerText = "Security level: High";
		} else if (val >= 22 && val <= 30) {
			output.style.background = "#27ae60"; // green
			output.style.color = "#fff";
			seguridad.innerText = "Security level: Very high";
		} else {
			output.style.background = "#eebbc3"; // default color
			output.style.color = "#232946";
			seguridad.innerText = "";
		}
	}

	range.addEventListener('input', updateLengthValue);
	updateLengthValue(); // Inicializa el color y el nivel al cargar
});
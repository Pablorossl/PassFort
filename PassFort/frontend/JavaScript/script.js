document.getElementById('passwordForm').onsubmit = async function(e) {
    e.preventDefault();
    // PENDIENTE: Crear una petición AJAX al backend
    const longitud = document.getElementById('length').value;
    const mayusculas = document.getElementById('mayusculas').checked;
    const numeros = document.getElementById('numeros').checked;
    const simbolos = document.getElementById('simbolos').checked;

    document.getElementById('resultado').innerText = "Contraseña generada: ********";
    document.getElementById('seguridad').innerText = "Nivel de seguridad:";
}

document.addEventListener('DOMContentLoaded', function() {
    const range = document.getElementById('length');
    const output = document.getElementById('lengthValue');

    function updateLengthValue() {
        output.textContent = range.value;
        const val = parseInt(range.value, 10);
        if (val >= 1 && val <= 7) {
            output.style.background = "#e74c3c"; // rojo
            output.style.color = "#fff";
            seguridad.innerText = "Nivel de seguridad: Baja";
        } else if (val >= 8 && val <= 14) {
            output.style.background = "#f39c12"; // naranja
            output.style.color = "#232946";
            seguridad.innerText = "Nivel de seguridad: Media";
        } else if (val >= 15 && val <= 21) {
            output.style.background = "#f7e017"; // amarillo
            output.style.color = "#232946";
            seguridad.innerText = "Nivel de seguridad: Alta";
        } else if (val >= 22 && val <= 30) {
            output.style.background = "#27ae60"; // verde
            output.style.color = "#fff";
            seguridad.innerText = "Nivel de seguridad: Muy alta";
        } else {
            output.style.background = "#eebbc3"; // color por defecto
            output.style.color = "#232946";
            seguridad.innerText = "";
        }
    }

    range.addEventListener('input', updateLengthValue);
    updateLengthValue(); // Inicializa el color al cargar
});
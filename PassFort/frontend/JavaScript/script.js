document.getElementById('passwordForm').onsubmit = async function(e) {
            e.preventDefault();
            // Crear una petición AJAX a tu backend en Python
            const longitud = document.getElementById('length').value;
            const mayusculas = document.getElementById('mayusculas').checked;
            const numeros = document.getElementById('numeros').checked;
            const simbolos = document.getElementById('simbolos').checked;
            // Simulación de resultado
            document.getElementById('resultado').innerText = "Contraseña generada: ********";
            document.getElementById('seguridad').innerText = "Nivel de seguridad:";
            }
const express = require('express');
const router = express.Router();

// Función para generar la contraseña
function generarPassword({ length, mayusculas, numeros, simbolos }) {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (mayusculas) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numeros) chars += '0123456789';
    if (simbolos) chars += '!@#$%^&*()-_=+[]{};:,.<>?';

    if (!chars) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}

// Ejemplo de endpoint para generar contraseñas
router.post('/generate', (req, res) => {
    const { length, mayusculas, numeros, simbolos } = req.body;

    // Validación básica
    if (!length || length < 5 || length > 30) {
        return res.status(400).json({ error: 'Longitud inválida' });
    }

    const password = generarPassword({
        length,
        mayusculas,
        numeros,
        simbolos
    });

    res.json({ password });
});

module.exports = router;

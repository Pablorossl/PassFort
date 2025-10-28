const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const passwordRoutes = require('./routes/password');
app.use('/api/password', passwordRoutes);

// Ejemplo de ruta
app.get('/', (req, res) => {
    res.send('Backend funcionando correctamente');
});

// Ruta GET de prueba para /api/password/generate
app.get('/api/password/generate', (req, res) => {
    res.send('Usa POST para generar una contraseña');
});

// Aquí puedes agregar más rutas para tu API

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

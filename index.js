const express = require('express');
const path = require('path');
const app = express();

// Configurer Express pour servir des fichiers statiques
app.use('/static', express.static(path.join(__dirname, 'static')));

// Définir un point de route simple
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

// Démarrer le serveur sur le port 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
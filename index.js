const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Middleware pour traiter les données de formulaire
app.use(bodyParser.urlencoded({ extended: true }));

// Définir le dossier contenant les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Définir un point de route simple
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates/index.html'));
});

// Démarrer le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

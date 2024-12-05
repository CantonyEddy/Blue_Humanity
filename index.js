const express = require('express');
const app = express();

// Définir un point de route simple
app.get('/', (req, res) => {
    res.send('Bonjour, votre application Node.js est maintenant une application web !');
});

// Démarrer le serveur sur le port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

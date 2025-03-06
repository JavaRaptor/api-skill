const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8000;

// Middleware CORS
app.use(cors());
app.use(express.static("public"));


// Fonction pour lire les fichiers JSON
function readJSONFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
}

// Endpoints de l'API qui retournent les données des fichiers JSON
app.get('/api/classes', (req, res) => {
    const classes = readJSONFile(path.join(__dirname, 'data', 'classes.json'));
    res.json(classes);
});

app.get('/api/items', (req, res) => {
    const items = readJSONFile(path.join(__dirname, 'data', 'items.json'));
    res.json(items);
});

app.get('/api/skills', (req, res) => {
    const competences = readJSONFile(path.join(__dirname, 'data', 'skills.json'));
    res.json(competences);
});

app.get('/api/map', (req, res) => {
    const map = readJSONFile(path.join(__dirname, 'data', 'map.json'));
    res.json(map);
});

app.get('/api/constellations', (req, res) => {
    const map = readJSONFile(path.join(__dirname, 'data', 'constellation.json'));
    res.json(map);
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

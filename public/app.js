// app.js

// Fonction pour récupérer les données depuis l'API
async function fetchData(endpoint) {
    const response = await fetch(`http://localhost:8000/api/${endpoint}`);
    const data = await response.json();
    return data;
}

// Fonction pour afficher les données des classes sous forme de cartes
async function displayClasses() {
    const classes = await fetchData('classes');
    const classesList = document.getElementById('classes-list');
    classesList.innerHTML = classes.map(item => 
        `<a href="../details.html?type=classes&id=${item.id}" class="card">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </a>`).join('');
}

// Fonction pour afficher les données des items sous forme de cartes
async function displayItems() {
    const items = await fetchData('items');
    const itemsList = document.getElementById('items-list');
    itemsList.innerHTML = items.map(item => 
        `<a href="../details.html?type=items&id=${item.id}" class="card">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </a>`).join('');
}

// Fonction pour afficher les compétences sous forme de cartes
async function displayCompetences() {
    const competences = await fetchData('skills');
    const competencesList = document.getElementById('competences-list');
    competencesList.innerHTML = competences.map(item => 
        `<a href="../details.html?type=skills&id=${item.id}" class="card">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
        </a>`).join('');
}

async function displayMap() {
    const data = await fetchData('map');
    const mapList = document.getElementById('map-list');
    
    // Sépare les continents et les villes
    const continents = data.continent || [];
    const cities = data.city || [];

    // Création des sections pour continents et villes
    mapList.innerHTML = `
        <section id="continents">
            <h2>Continents</h2>
            <div class="cards-container">
                ${continents.map(item => 
                    `<a href="../details.html?type=continent&id=${item.id}" class="card">
                        <h3>${item.name}</h3>
                        <p>Position inter-continental : ${item.position}</p>
                        <p>${item.description}</p>
                    </a>`).join('')}
            </div>
        </section>
        
        <section id="cities">
            <h2>Villes</h2>
            <div class="cards-container">
                ${cities.map(item => 
                    `<a href="../details.html?type=city&id=${item.id}" class="card">
                        <h3>${item.name}</h3>
                        <p>Continent : ${item.continent}</p>
                        <p>${item.description}</p>
                    </a>`).join('')}
            </div>
        </section>
    `;
}

async function displayConstellations() {
    const data = await fetchData('constellations');
    const constellationsList = document.getElementById('constellations-list');

    constellationsList.innerHTML = data.map(nebula => 
        `<section>
            <h2>${nebula.nom}</h2>
            <div class="cards-container">
                ${nebula.constellations.map(constellation => 
                    `<a href="../details.html?type=constellations&id=${constellation.nom}" class="card">
                        <h3>${constellation.nom}</h3>
                        <p>${constellation.description}</p>
                        <p><strong>Compétences:</strong> ${constellation.Competence.join(', ')}</p>
                    </a>`).join('')}
            </div>
        </section>`
    ).join('');
}


// Appeler les fonctions pour remplir les sections
displayClasses();
displayItems();
displayCompetences();
displayMap();
displayConstellations();
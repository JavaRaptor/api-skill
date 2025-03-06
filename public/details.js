// Fonction pour récupérer les paramètres de l'URL (type et id)
function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
        type: urlParams.get('type'),  // 'class', 'item' ou 'competence'
        id: urlParams.get('id')       // ID de l'élément
    };
}

// Fonction pour récupérer les données depuis le fichier JSON correspondant
async function fetchData(type) {
    const response = await fetch(`api/${type}`); // Charge le fichier correspondant au type
    const data = await response.json();
    return data;
}

// Fonction pour récupérer les détails de l'élément (classe, item ou compétence)
// Fonction pour récupérer les détails de l'élément (classe, item ou compétence)
async function fetchDetails(type, id) {
    const data = await fetchData(type); // Récupérer les données du type
    const details = data.find(item => item.id === parseInt(id));  // Trouver l'élément par son ID
    
    // Si c'est une classe, récupérer les compétences associées
    if (type === 'classes') {
        const competences = await fetchData('skills'); // Charger toutes les compétences
        details.competences = competences.filter(skill => {
            // Vérifier si la compétence est associée à cette classe
            return skill.classes.includes(details.id) || skill.classes.includes("all");
        });
    }

    return details;
}


// Fonction pour afficher les détails dans la page HTML
// Fonction pour afficher les détails dans la page HTML
async function displayDetails() {
    const { type, id } = getUrlParams();  // Récupère les paramètres de l'URL
    const details = await fetchDetails(type, id);  // Récupère les données détaillées
    const detailsSection = document.getElementById('details-section');  // Cible la section pour afficher les détails

    if (details) {
        if (type === 'classes') {
            // Affichage des détails d'une classe
            detailsSection.innerHTML = `
                <div class="detail-card">
                    <h2>${details.name}</h2>
                    <h3>Classe Basique : ${details.base_class}</h3>
                    <h3>Rank : ${details.rank}</h3>
                    <p><strong>Description:</strong> ${details.description}</p>
                    <h3>Compétences disponibles</h3>
                    <ul>
                        ${details.competences.map(skill => 
                            `<li><a href="details.html?type=skills&id=${skill.id}"><strong>${skill.name}</strong>: ${skill.description}</a></li>`
                        ).join('')}
                    </ul>
                </div>
            `;
        } else if (type === 'items') {
            // Affichage des détails d'un item
            detailsSection.innerHTML = `
                <div class="detail-card">
                    <h2>${details.nom}</h2>
                    <p><strong>Description:</strong> ${details.description}</p>
                    <p><strong>Effet:</strong> ${details.effet}</p>
                </div>
            `;
        } else if (type === 'skills') {
            // Affichage des détails d'une compétence
            detailsSection.innerHTML = `
                <div class="detail-card">
                    <h2>${details.name}</h2>
                    <h3>Niveau requis : ${details.required_level}</h3>
                    <h3>Cooldown : ${details.cooldown}</h3>
                    <h3>Competence Basique : ${details.skills_base}</h3>
                    <h3>Rank : ${details.rank}</h3>
                    <h3>Niveau Maximum : ${details.level_max}</h3>
                    <h3>Type : ${details.type}</h3>
                    <p><strong>Description:</strong> ${details.description}</p>
                    <p><strong>Effet:</strong> ${details.effet}</p>
                    <p><strong>Mana Requis:</strong> ${details.required_mana}</p>
                </div>
            `;
        }
    } else {
        detailsSection.innerHTML = "<p>Les détails n'ont pas pu être chargés.</p>";
    }
}


// Appel de la fonction pour afficher les détails au chargement de la page
displayDetails();

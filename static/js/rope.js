// Récupérer le canvas et son contexte
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function line(x1, y1, x2, y2) {
    // Coordonnées des deux points
    const pointA = { x: x1, y: y1 }; // Point de départ
    const pointB = { x: x2, y: y2 }; // Point d'arrivée

    // Dessiner la ligne
    ctx.beginPath(); // Commencer un nouveau chemin
    ctx.moveTo(pointA.x, pointA.y); // Déplacer le curseur au point A
    ctx.lineTo(pointB.x, pointB.y); // Tracer une ligne jusqu'au point B
    ctx.strokeStyle = "blue"; // Couleur de la ligne
    ctx.lineWidth = 2; // Épaisseur de la ligne
    ctx.stroke(); // Appliquer le dessin
}


const rope = document.getElementById('rope');
const button = document.getElementById('raise-btn');

let ropePosition = 600; // Position initiale du fil (en bas)
let isRaising = false;
let lastClickTime = 0; // Pour détecter les spams de clic

// Fonction pour remonter le fil
function raiseRope() {
    if (ropePosition > 100) {
        ropePosition -= 12; // Remonte
        rope.style.top = ropePosition + 'px';
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pos = rope.getBoundingClientRect();
    line(265, 0, 265, pos.top - 65);
}

// Fonction pour descendre le fil
function lowerRope() {
    if (ropePosition < 600) {
        ropePosition += 2; // Descend
        rope.style.top = ropePosition + 'px';
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const pos = rope.getBoundingClientRect();
    line(265, 0, 265, pos.top - 65);
}

// Gestion du clic sur le bouton
button.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < 200) { // Vérifie si le clic précédent est proche (spam clics)
        raiseRope();
    }
    lastClickTime = now;
});

// Intervalle pour descendre le fil
setInterval(() => {
    if (!isRaising) {
        lowerRope();
    }
}, 50);

raiseRope();
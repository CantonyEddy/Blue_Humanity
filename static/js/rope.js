import { loadGameData, saveGameData } from "./dataManager.js";
import { getRandomFish } from "./fish.js";
import {getEarnPerSecond} from "./loop.js"

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
    ctx.strokeStyle = "black"; // Couleur de la ligne
    ctx.lineWidth = 2; // Épaisseur de la ligne
    ctx.stroke(); // Appliquer le dessin
}

const rope = document.getElementById('rope');
const pumpContainer = document.querySelector('.pump-container');
const fishingPopUp = document.querySelector('#fishingPopUp');
const scoreBoard = document.querySelector('#scoreboard-container');

let ropePosition = 600; // Position initiale du fil (en bas)
let isRaising = false;
let lastClickTime = 0; // Pour détecter les spams de clic
let hidePopUpAt = Date.now();
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

// Gestion du clic sur la pompe
pumpContainer.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClickTime < 200) { // Vérifie si le clic précédent est proche (spam clics)
        isRaising = true;
        raiseRope();
        if(ropePosition <= 100) {
            let data = loadGameData();
            let fish = getRandomFish();
            if (fish.image == 4) {
                data.money += 20;
                data.carbageCollected += 1;
                data.carbageRecycled += 1;
                fishingPopUp.innerHTML = `Vous avez pêché un déchet ! Vous avez gagné 20 crédits pour l'avoir recyclé!`;
            }else {
                data.money += fish.value;
                data.collectedFishCount += 1;
                fishingPopUp.innerHTML = `Vous avez pêché un poisson ! Vous avez gagné ${fish.value} crédits!`;
            }
            saveGameData(data);
            fishingPopUp.style.display = 'block';
            ropePosition = 600;
            hidePopUpAt = Date.now() + 3000;
            updateScoreBoard();
        }
        setTimeout(() => {
            isRaising = false;
        }, 500); // Durée de l'animation en millisecondes
    }
    lastClickTime = now;
});

// Intervalle pour descendre le fil
setInterval(() => {
    if (Date.now() > hidePopUpAt) {
        fishingPopUp.style.display = 'none';
    }
    if (!isRaising) {
        lowerRope();
    }
}, 50);

raiseRope();

function updateScoreBoard() {
    scoreBoard.innerHTML = `Crédits: ${loadGameData().money}<br>
    Déchets recyclés: ${loadGameData().carbageRecycled}<br>
    Poissons pêchés: ${loadGameData().collectedFishCount}<br>
    Gain par seconde: ${getEarnPerSecond(loadGameData())}`;
}

export { updateScoreBoard };
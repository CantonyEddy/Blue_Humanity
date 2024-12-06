import {loadGameData, newGameData, saveGameData} from './dataManager.js'

let credits = ["Eddy", "Dylan", "Alonzo", "Yannis", "Aymeric", "Loan"]

function generateFishDiv() {
    let data = loadGameData();
    let fishDiv = document.createElement('div');
    fishDiv.classList.add('fish');
    let imgNumber = Math.floor(Math.random()*4)+1
    let fishImg = document.createElement('img');
    fishImg.src = `static/img/fish_${imgNumber}.png`; 
    fishImg.alt = 'fish';
    fishDiv.appendChild(fishImg);
    let percent = data.upgrades.CreditsFishLuck.level * data.upgrades.CreditsFishLuck.increase;
    let fishCredits = Math.floor(Math.random() * 100) < percent ? true : false;
    if (fishCredits && imgNumber != 4) {
        let fishCreditsDiv = document.createElement('span');
        fishCreditsDiv.innerHTML = credits[Math.floor(Math.random() * credits.length)];
        fishDiv.appendChild(fishCreditsDiv);
    }

    fishDiv.style.left = '-100px';
    fishDiv.style.animationDelay= `${Math.random()*4}s`;
    fishDiv.style.animationDuration = `${Math.random()*5 + 20}s`;
    fishDiv.style.bottom = `${Math.floor(Math.random() * (300-55))}px`;

    if (imgNumber == 4) {
        fishImg.style.transform = `rotate(${Math.floor(Math.random() * 120)-60}deg)`;
        fishDiv.style.animationDuration = `${Math.random()*5 + 40}s`;
    }
    return fishDiv;

}

function getRandomFish() {
    let data = loadGameData();
    let fishCredits = false;
    let percent = data.upgrades.CreditsFishLuck.level * data.upgrades.CreditsFishLuck.increase;
    if (Math.floor(Math.random() * 100) < percent) {
        fishCredits = true;
    }
    let fishValue = 1 + data.upgrades.CreditsFishValue.level * data.upgrades.CreditsFishValue.increase;
    if (fishCredits) {
        fishValue *= 2;
    }
    return {
        value: fishValue,
        credits: fishCredits,
        image: Math.floor(Math.random()*4)+1
    };
}

for (let i = 0; i < 15; i++) {
    document.getElementById('fond-container').appendChild(generateFishDiv());
}


setInterval(() => {
    if(document.getElementById('fond-container').children.length > 20 || (Math.random() * document.getElementById('fond-container').children.length) >= 10) {
            document.getElementById('fond-container').children[0].remove();
    }
    document.getElementById('fond-container').appendChild(generateFishDiv());
    
}, 15000);

export {getRandomFish}


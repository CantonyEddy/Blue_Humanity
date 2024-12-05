function saveGameData(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

function loadGameData() {
    let data = localStorage.getItem("data");
    if (data) {
        return JSON.parse(data);
    }
    return newGameData();
}

function newGameData() {
    let newData = {
        upgrades: {
            "CreditsFishLuck": {
                name: "Améliorer la chance de pêcher un poisson",
                description: "Augmente la chance de pêcher un poisson",
                price: 100,
                level: 0,
                increase: 2
            },
            "CreditsFishValue": {
                name: "Améliorer la valeur des poissons",
                description: "Augmente la valeur des poissons",
                price: 100,
                level: 0,
                increase: 2
            },
            "PumpDecreaseSpeed": {
                name: "Diminuer la vitesse de dégonflage",
                description: "Diminue la vitesse de dégonflage",
                price: 100,
                level: 0,
                increase: 2
            },
            "PumpIncreaseSpeed": {
                name: "Augmenter la pression par pompage",
                description: "Augmente la vitesse de gonflage",
                price: 100,
                level: 0,
                increase: 2
            }
        },
        autoClicker: {
            "Phytoplanctons": {
                name: "Phytoplanctons",
                description: "Microorganismes végétaux qui produisent de l'oxygen comme les poumons du corps humain",
                price: 100,
                level: 0,
                moneyPerSecondPerLevel: 1,
                priceIncreasePerLevel: 1.1
            },
            "ocean_currents": {
                name: "Courants océaniques",
                description: " Les courants marins transportent les nutriments et l'énergie dans l'océan, de manière similaire à la circulation sanguine dans le corps.",
                price: 300,
                level: 0,
                moneyPerSecondPerLevel: 15,
                priceIncreasePerLevel: 1.15  
            },
            "starFish": {
                name: "Etoile de mer",
                description: "Les étoiles de mer régénèrent leurs bras, un processus similaire à la régénération de la peau humaine après une blessure.",
                price: 1000,
                level: 0,
                moneyPerSecondPerLevel: 50,
                priceIncreasePerLevel: 1.35
            },
            "cleaner_fish": {
                name: "Poisson nettoyeur",
                description: "Ils débarrassent d'autres poissons des parasites, comme le système immunitaire élimine les agents pathogènes.",
                price: 2500,
                level: 0,
                moneyPerSecondPerLevel: 200,
                priceIncreasePerLevel: 1.5
            }
        },
        score: 0,
        money: 0,
        collectedFishCount: 0,
        rebirth: 0,
        carbageCollected: 0,
        carbageRecycled: 0,
    }
    saveGameData(newData);
    return newData;
}
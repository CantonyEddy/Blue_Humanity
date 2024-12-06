import { loadGameData } from "./dataManager.js";

let data = loadGameData();
setInterval(() => {
    data = loadGameData();
    let autoclickerGeneration = 0
    for (let key in data.autoClicker) {
        autoclickerGeneration += data.autoClicker[key].moneyPerSecondPerLevel * data.autoClicker[key].level;
    }
    data.money += autoclickerGeneration;
    data.pumpScore -= 10 - data.upgrades.PumpDecreaseSpeed.level;
    saveGameData(data);
}, 1000);


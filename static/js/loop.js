import { loadGameData, saveGameData } from "./dataManager.js";
import {updateScoreBoard} from "./rope.js"

let data = loadGameData();
setInterval(() => {
    data = loadGameData();
    let autoclickerGeneration = getEarnPerSecond(data);
    data.money += autoclickerGeneration;
    data.pumpScore -= 10 - data.upgrades.PumpDecreaseSpeed.level;
    saveGameData(data);
    updateScoreBoard();
}, 1000);

function getEarnPerSecond(data) {
    let autoclickerGeneration = 0
    for (let key in data.autoClicker) {
        autoclickerGeneration += data.autoClicker[key].moneyPerSecondPerLevel * data.autoClicker[key].level;
    }
    return autoclickerGeneration;
}

export { getEarnPerSecond };
import { loadGameData, saveGameData } from "./dataManager.js";

document.addEventListener("DOMContentLoaded", function () {
  // Create the popup container
  const popup = document.createElement("div");
  popup.id = "upgrade-popup";
  popup.innerHTML = `
        <div class="popup-header">
            <button id="regular-upgrades-btn" class="active">Regular Upgrades</button>
            <button id="autoclicker-upgrades-btn">Autoclicker Upgrades</button>
            <button id="close-popup">Close</button>
        </div>
        <div id="popup-content">
            <div id="upgrades-grid"></div>
        </div>
    `;
  document.body.appendChild(popup);

  // Upgrades data

  // Utility to render upgrades
  function renderUpgrades(category) {
    let data = loadGameData();
    let upgrades = data.upgrades;
    let autoClicker = data.autoClicker;
    let bump = { regular: upgrades, autoclicker: autoClicker };
    // Simulated player money
    let playerMoney = data.money;
    const upgradesGrid = document.getElementById("upgrades-grid");
    upgradesGrid.innerHTML = ""; // Clear current grid

    Object.entries(bump[category]).forEach(([key, upgrade]) => {
      // Create a card for each upgrade
      const card = document.createElement("div");
      card.className = "upgrade-card";

      // Populate the card
      card.innerHTML = `
                <h3>${upgrade.name}</h3>
                ${upgrade.description ? `<p>${upgrade.description}</p>` : ""}
                <p><strong>Level:</strong> ${upgrade.level}</p>
                <p><strong>Money per second:</strong> ${
                  upgrade.moneyPerSecondPerLevel * upgrade.level
                }</p>
                <p><strong>Price:</strong> ${upgrade.price}</p>
                <button class="level-up-btn" data-key="${key}">Level Up</button>
            `;

      // Append the card to the grid
      upgradesGrid.appendChild(card);

      // Add level up functionality
      card.querySelector(".level-up-btn").addEventListener("click", () => {
        if (category == "regular") {
          if (data.money >= upgrade.price) {
            data.money -= upgrade.price;
            upgrade.level++;
            upgrade.price *= (upgrade.level * 4) / 3;
            upgrade.price = Math.round(upgrade.price);
            saveGameData(data);
            renderUpgrades(category); // Re-render to reflect changes
          } else {
            alert("Not enough money!");
            renderUpgrades(category); // Re-render to reflect changes
          }
        } else if (category == "autoclicker") {
          console.log(data.money, upgrade.price);
          if (data.money >= upgrade.price) {
            data.money -= upgrade.price;
            upgrade.price *= upgrade.priceIncreasePerLevel;
            upgrade.price = Math.round(upgrade.price);
            upgrade.level++;
            saveGameData(data);
            renderUpgrades(category); // Re-render to reflect changes
          } else {
            alert("Not enough money!");
            renderUpgrades(category); // Re-render to reflect changes
          }
        }
      });
    });
  }

  // Show regular upgrades by default
  renderUpgrades("regular");

  // Event listeners for switching categories
  document
    .getElementById("regular-upgrades-btn")
    .addEventListener("click", function () {
      renderUpgrades("regular");
      this.classList.add("active");
      document
        .getElementById("autoclicker-upgrades-btn")
        .classList.remove("active");
    });

  document
    .getElementById("autoclicker-upgrades-btn")
    .addEventListener("click", function () {
      renderUpgrades("autoclicker");
      this.classList.add("active");
      document
        .getElementById("regular-upgrades-btn")
        .classList.remove("active");
    });

  // Show and hide popup logic
  const popupButton = document.getElementById("popup-button");
  const closePopup = document.querySelector("#close-popup");
  popupButton.addEventListener("click", () => (popup.style.display = "block"));
  closePopup.addEventListener("click", () => (popup.style.display = "none"));
});

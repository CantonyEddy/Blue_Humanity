document.addEventListener('DOMContentLoaded', function () {
    // Create the popup container
    const popup = document.createElement('div');
    popup.id = 'upgrade-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Upgrades</h2>
            <ul id="upgrades-list">
                <!-- Dynamically populated -->
            </ul>
            <button id="close-popup">Close</button>
        </div>
    `;
    document.body.appendChild(popup);

    // Populate upgrades list dynamically
    const upgrades = {
        CreditsFishLuck: "Increase fish luck",
        CreditsFishValue: "Increase fish value",
        PumpDecreaseSpeed: "Decrease deflation speed",
        PumpIncreaseSpeed: "Increase pump speed"
    };

    const upgradesList = document.getElementById('upgrades-list');
    for (let key in upgrades) {
        const listItem = document.createElement('li');
        listItem.textContent = upgrades[key];
        upgradesList.appendChild(listItem);
    }

    // Show and hide popup logic
    const popupButton = document.getElementById('popup-button');
    const closePopup = document.getElementById('close-popup');
    popupButton.addEventListener('click', () => popup.style.display = 'flex');
    closePopup.addEventListener('click', () => popup.style.display = 'none');
});
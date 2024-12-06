document.addEventListener('DOMContentLoaded', function () {
    // Create the popup container
    const popup = document.createElement('div');
    popup.id = 'upgrade-popup';
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
    const upgrades = {
        regular: {
            CreditsFishLuck: {
                name: "Increase fish luck",
                description: null, // Regular upgrades don't need descriptions
                level: 0,
                mps: 0,
                price: 100
            },
            CreditsFishValue: {
                name: "Increase fish value",
                description: null,
                level: 0,
                mps: 0,
                price: 200
            }
        },
        autoclicker: {
            Phytoplanctons: {
                name: "Phytoplankton",
                description: "Generates money per second automatically.",
                level: 0,
                mps: 1,
                price: 300
            },
            StarFish: {
                name: "Starfish",
                description: "Significantly boosts money generation.",
                level: 0,
                mps: 5,
                price: 500
            }
        }
    };

    // Simulated player money
    let playerMoney = 1000;

    // Utility to render upgrades
    function renderUpgrades(category) {
        const upgradesGrid = document.getElementById('upgrades-grid');
        upgradesGrid.innerHTML = ''; // Clear current grid

        Object.entries(upgrades[category]).forEach(([key, upgrade]) => {
            // Create a card for each upgrade
            const card = document.createElement('div');
            card.className = 'upgrade-card';

            // Populate the card
            card.innerHTML = `
                <h3>${upgrade.name}</h3>
                ${upgrade.description ? `<p>${upgrade.description}</p>` : ''}
                <p><strong>Level:</strong> ${upgrade.level}</p>
                <p><strong>Money per second:</strong> ${upgrade.mps * upgrade.level}</p>
                <p><strong>Price:</strong> ${upgrade.price}</p>
                <button class="level-up-btn" data-key="${key}">Level Up</button>
            `;

            // Append the card to the grid
            upgradesGrid.appendChild(card);

            // Add level up functionality
            card.querySelector('.level-up-btn').addEventListener('click', () => {
                if (playerMoney >= upgrade.price) {
                    playerMoney -= upgrade.price;
                    upgrade.level++;
                    upgrade.price = Math.ceil(upgrade.price * 1.5); // Increase price exponentially
                    renderUpgrades(category); // Re-render to reflect changes
                } else {
                    alert("Not enough money!");
                }
            });
        });
    }

    // Show regular upgrades by default
    renderUpgrades('regular');

    // Event listeners for switching categories
    document.getElementById('regular-upgrades-btn').addEventListener('click', function () {
        renderUpgrades('regular');
        this.classList.add('active');
        document.getElementById('autoclicker-upgrades-btn').classList.remove('active');
    });

    document.getElementById('autoclicker-upgrades-btn').addEventListener('click', function () {
        renderUpgrades('autoclicker');
        this.classList.add('active');
        document.getElementById('regular-upgrades-btn').classList.remove('active');
    });

    // Show and hide popup logic
    const popupButton = document.getElementById('popup-button');
    const closePopup = document.getElementById('close-popup');
    popupButton.addEventListener('click', () => popup.style.display = 'block');
    closePopup.addEventListener('click', () => popup.style.display = 'none');
});
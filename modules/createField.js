import Ship from "./ship.js";
import SHIPS from "./startShips.js";
import { createMatrix } from "./utils.js";

export const createField = () => {

    const boardSize = 10;
    const field = document.getElementById('field');
    const gameGrid = document.createElement('div');
    gameGrid.className = 'gameGrid';

    const fieldMatrix = createMatrix(boardSize);

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `${j}${i}`;
            gameGrid.appendChild(cell);
        }
    }

    field.append(gameGrid);

    const allShips = []

    const createShips = () => {
        SHIPS.forEach((ship) => {
            const shipItem = new Ship({ boardSize: boardSize, shipLength: ship.length })
            allShips.push(
                {
                    name: ship.name,
                    locations: shipItem.generateShip(),
                });
        });
        generateShipLocations();
    };

    function generateShipLocations() {
        for (let i = 0; i < allShips.length; i++) {
            for (let j = 0; j < allShips[i].locations.length; j++) {
                const shipName = allShips[i].name;
                const row = allShips[i].locations[j][1];
                const col = allShips[i].locations[j][0];
                fieldMatrix[row][col] = shipName;
            }
        }
    }

    createShips();
    console.log(fieldMatrix);

    return fieldMatrix;
}

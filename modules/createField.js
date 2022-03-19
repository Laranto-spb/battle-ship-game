import Ship from "./ship.js";
import SHIPS from "./startShips.js";

export const createField = () => {

    const boardSize = 10;
    const field = document.getElementById('field');
    const gameGrid = document.createElement('div');
    gameGrid.className = 'gameGrid';

    const fieldMatrix = [];

    for (let i = 0; i < 10; i++) {
        fieldMatrix[i] = [...Array(10)].map(cell => 'o');
    }

    for (let i = 0; i < boardSize; i++) {
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `[${j}, ${i}]`
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
    };

    createShips();

    console.log(allShips);

    return fieldMatrix;
}

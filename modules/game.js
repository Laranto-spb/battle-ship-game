import Ship from "./ship.js";
import SHIPS from "../data/startShips.js";
import { createMatrix } from "./utils.js";

const boardSize = 10;
const allShips = []
const fieldMatrix = createMatrix(boardSize);

class Game {

  createBoard = () => {
    const field = document.getElementById('field');
    const gameGrid = document.createElement('div');
    gameGrid.className = 'gameGrid';
    gameGrid.id = 'board';

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `${j}${i}`;
        gameGrid.appendChild(cell);
      }
    }

    field.append(gameGrid);

    const createShips = () => {
      SHIPS.forEach((ship) => {
        const shipItem = new Ship({ boardSize: boardSize, shipLength: ship.length })
        allShips.push(
          {
            name: ship.name,
            locations: shipItem.generateShip(),
            hits: [0, 0, 0]
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
  }

  start = () => {
    console.log('Game started');
    this.createBoard();
    this.hit();
  }

  hit = () => {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell) => {
      cell.addEventListener('click', (e) => {
        const cellCoordinate = e.target.id;
        this.checkKick(cellCoordinate, cell, fieldMatrix);
      })
    })
  }

  checkKick = (coordinate, item, matrix) => {
    const row = coordinate[1];
    const col = coordinate[0];

    if (matrix[row][col]) {
      console.log('HIT');
      item.classList.add('crashed');
      const shipName = matrix[row][col];
      allShips.forEach(s => {
        if (s.name === shipName) {
          console.log(s.locations);
          console.log(coordinate)
        }
      })

    } else {
      console.log('MISS');
      item.classList.add('missed');
    }
  }

  checkSunk = () => {

  }
}

export const game = new Game();
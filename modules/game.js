import Ship from "./ship.js";
import SHIPS from "../data/startShips.js";
import { createMatrix } from "./utils.js";
import { createLogs } from "./createLogs.js";

const boardSize = 10;
const allShips = [];
const fieldMatrix = createMatrix(boardSize);
let attempts = 0;
let hits = 0;

const field = document.getElementById("field");
const gameGrid = document.createElement("div");

class Game {
  createBoard = () => {
    gameGrid.className = "gameGrid col-8";
    gameGrid.id = "board";

    for (let i = 0; i < boardSize; i++) {
      for (let j = 0; j < boardSize; j++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = `${j}${i}`;
        gameGrid.appendChild(cell);
      }
    }

    field.append(gameGrid);

    const createShips = () => {
      let locations;
      SHIPS.forEach((ship) => {
        const shipItem = new Ship({
          boardSize: boardSize,
          shipLength: ship.length,
        });
        do {
          locations = shipItem.generateShip();
          allShips.push({
            name: ship.name,
            locations: locations,
            hits: [...Array(ship.length)].map((item) => (item = 0)),
            isSunk: false,
          });
        } while (collision(locations));
      });
      putShipsOnBoard();
    };

    const collision = (locations) => {
      allShips.forEach((ship) => {
        locations.forEach((loc) => {
          if (ship.locations.indexOf(loc) >= 0) {
            return true;
          }
        });
      });
      return false;
    };

    function putShipsOnBoard() {
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
  };

  start = () => {
    console.log("Game started");
    console.log(fieldMatrix);
    this.createBoard();
    this.hit();
    createLogs();
  };

  hit = () => {
    const cells = document.querySelectorAll(".cell");

    cells.forEach((cell) => {
      const checkHit = (e) => {
        const cellCoordinate = e.target.id;
        if (
          e.target.classList.contains("missed") ||
          e.target.classList.contains("crashed")
        ) {
          createLogs("ONCE AGAIN?");
        } else {
          attempts += 1;
          this.checkKick(cellCoordinate, cell, fieldMatrix);
          const result = this.checkResult();
          if (result) {
            gameGrid.classList.add("hidden");
          }
        }
      };
      cell.addEventListener("click", checkHit);
    });
  };

  checkSunk = (ship) => {
    const hitSumm = ship.hits.reduce((prev, current) => prev + current);
    if (hitSumm === ship.name) {
      return true;
    } else {
      return false;
    }
  };

  checkKick = (coordinate, item, matrix) => {
    const row = coordinate[1];
    const col = coordinate[0];

    if (matrix[row][col]) {
      item.classList.add("crashed");
      const shipName = matrix[row][col];
      hits += 1;
      allShips.forEach((s) => {
        if (s.name === shipName) {
          s.locations.map((location, index) => {
            +location == coordinate ? (s.hits[index] = 1) : 0;
          });
          const isSunk = this.checkSunk(s);
          isSunk ? (s.isSunk = true) : "";
          isSunk
            ? createLogs("SUNKED", attempts)
            : createLogs("TRY MORE", attempts);
        }
      });
    } else {
      createLogs("MISSED", attempts);
      item.classList.add("missed");
    }
  };

  checkResult = () => {
    let totalSunked = 0;
    allShips.forEach((ship) => {
      ship.isSunk ? totalSunked++ : "";
    });
    if (totalSunked === 4) {
      createLogs(`GAME OVER, hits - ${hits}, attempts -  ${attempts}`);
      return true;
    } else {
      return false;
    }
  };
}

export const game = new Game();

import { getRandom } from "./utils.js";

class Ship {

    constructor(props) {
        this.boardSize = props.boardSize;
        this.shipLength = props.shipLength;
    }


    generateShip = () => {
        const direction = getRandom(2);
        let row, col;

        if (direction === 1) {
            row = getRandom(this.boardSize);
            col = getRandom(this.boardSize - this.shipLength + 1);
        } else {
            row = getRandom(this.boardSize - this.shipLength + 1);
            col = getRandom(this.boardSize);
        }

        const newShipLocations = [];

        for (let i = 0; i < this.shipLength; i++) {
            if (direction === 1) {
                newShipLocations.push(row + '' + (col + i));
            } else {
                newShipLocations.push((row + i) + '' + col);
            }
        }
        return newShipLocations;
    }
}

export default Ship;
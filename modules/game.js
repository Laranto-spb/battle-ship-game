import { createField } from "./createField.js";

class Game {

  start = () => {
    console.log('Game started');
    const field = createField();
  }
}

export const game = new Game();
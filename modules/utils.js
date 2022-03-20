export const getRandom = (max) => {
  return Math.floor(Math.random() * max);
};

export const createMatrix = (size) => {
  const matrix = [];

  for (let i = 0; i < size; i++) {
    matrix[i] = [...Array(size)].map((cell) => 0);
  }

  return matrix;
};

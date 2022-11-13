/**
 *
 * @param {number} height - Number of lines
 * @param {number} width - Number of columns
 * @param {number} bombs - Number of bombs (bombs < heigth * width)
 */
function printTable(table) {
  for (let i = 0; i < table.length; i++) {
    const line = table[i].join(" ");
    console.log(line);
  }
}
function generateGame(height, width, bombs) {
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < height && y < width;
  const oneIfBomb = (x, y) => (inBounds(x, y) && table[x][y] === "b" ? 1 : 0);
  const zeroCell = (x, y) => inBounds(x, y) && table[x][y] === 0;
  const lost = () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        state[i][j] = "r";
      }
    }
  };
  let plays = 0;
  let bombsRevealed = 0;
  let result = "";
  const tryCell = (x, y) => {
    if (inBounds(x, y)) {
      if (state[x][y] === "r") return;
      plays++;
      if (table[x][y] === "b") {
        lost();
      } else {
        const arrToReveal = [{ x, y }];
        while (arrToReveal.length > 0) {
          const toReveal = arrToReveal[0];
          state[toReveal.x][toReveal.y] = "r";
          arrToReveal.splice(0, 1);
          if (
            zeroCell(toReveal.x - 1, toReveal.y - 1) &&
            state[toReveal.x - 1][toReveal.y - 1] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x - 1, y: toReveal.y - 1 });
          }
          if (
            zeroCell(toReveal.x - 1, toReveal.y) &&
            state[toReveal.x - 1][toReveal.y] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x - 1, y: toReveal.y });
          }
          if (
            zeroCell(toReveal.x - 1, toReveal.y + 1) &&
            state[toReveal.x - 1][toReveal.y + 1] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x - 1, y: toReveal.y + 1 });
          }
          if (
            zeroCell(toReveal.x, toReveal.y - 1) &&
            state[toReveal.x][toReveal.y - 1] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x, y: toReveal.y - 1 });
          }
          if (
            zeroCell(toReveal.x, toReveal.y + 1) &&
            state[toReveal.x][toReveal.y + 1] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x, y: toReveal.y + 1 });
          }
          if (
            zeroCell(toReveal.x + 1, toReveal.y - 1) &&
            state[toReveal.x + 1][toReveal.y - 1] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x + 1, y: toReveal.y - 1 });
          }
          if (
            zeroCell(toReveal.x + 1, toReveal.y) &&
            state[toReveal.x + 1][toReveal.y] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x + 1, y: toReveal.y });
          }
          if (
            zeroCell(toReveal.x + 1, toReveal.y + 1) &&
            state[toReveal.x + 1][toReveal.y + 1] !== "r"
          ) {
            arrToReveal.push({ x: toReveal.x + 1, y: toReveal.y + 1 });
          }
        }
      }
    }
  };
  const flagCell = (x, y) => {
    if (inBounds(x, y)) {
      if (state[x][y] === "r") return;
      plays++;
      state[x][y] = "f";
    }
  };
  const state = Array(height)
    .fill()
    .map(() => Array(width).fill("h"));
  const table = Array(height)
    .fill()
    .map(() => Array(width).fill("-"));
  for (let i = 0; i < bombs; ) {
    const x = Math.floor(Math.random() * height);
    const y = Math.floor(Math.random() * width);
    if (table[x][y] !== "b") {
      table[x][y] = "b";
      i++;
    }
  }
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (table[i][j] === "b") continue;
      let cntBombs = 0;
      cntBombs += oneIfBomb(i - 1, j - 1);
      cntBombs += oneIfBomb(i - 1, j);
      cntBombs += oneIfBomb(i - 1, j + 1);
      cntBombs += oneIfBomb(i, j - 1);
      cntBombs += oneIfBomb(i, j + 1);
      cntBombs += oneIfBomb(i + 1, j - 1);
      cntBombs += oneIfBomb(i + 1, j);
      cntBombs += oneIfBomb(i + 1, j + 1);
      table[i][j] = cntBombs;
    }
  }
  return { table, state, tryCell, flagCell, height, width };
}

// const game = generateGame(10, 10, 50);
// printTable(game.table);
// printTable(game.state);
// game.tryCell(0, 0);
// printTable(game.table);
// printTable(game.state);

export default generateGame;
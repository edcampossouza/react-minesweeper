/**
 *
 * @param {number} height - Number of lines
 * @param {number} width - Number of columns
 * @param {number} bombs - Number of bombs (bombs < heigth * width)
 */
// function printTable(table) {
//   for (let i = 0; i < table.length; i++) {
//     const line = table[i].join(" ");
//     console.log(line);
//   }
// }
function generateGame(height, width, bombs) {
  const inBounds = (x, y) => x >= 0 && y >= 0 && x < height && y < width;
  const oneIfBomb = (x, y) => (inBounds(x, y) && table[x][y] === "b" ? 1 : 0);
  const safeCell = (x, y) => inBounds(x, y) && typeof table[x][y] === "number";
  const lost = () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        state[i][j] = "r";
      }
    }
    stats.result = "lost";
  };
  const stats = {
    bombsFlagged: 0,
    result: null,
    plays: 0,
    correctFlags: 0,
  };
  const insertCellInArray = (cell, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].x === cell.x && arr[i].y === cell.y) {
        return;
      }
    }
    arr.push(cell);
  };
  const tryCell = (x, y) => {
    if (inBounds(x, y)) {
      if (state[x][y] === "r" || state[x][y] === "f") return;
      stats.plays++;
      if (table[x][y] === "b") {
        lost();
      } else {
        const arrToReveal = [{ x, y }];
        while (arrToReveal.length > 0) {
          const toReveal = arrToReveal[0];
          console.log(">>", x, y);
          if (state[toReveal.x][toReveal.y] === "f") {
            stats.bombsFlagged--;
          }
          state[toReveal.x][toReveal.y] = "r";
          arrToReveal.splice(0, 1);
          if (table[toReveal.x][toReveal.y] !== 0) continue;
          if (
            safeCell(toReveal.x - 1, toReveal.y - 1) &&
            state[toReveal.x - 1][toReveal.y - 1] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x - 1, y: toReveal.y - 1 },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x - 1, toReveal.y) &&
            state[toReveal.x - 1][toReveal.y] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x - 1, y: toReveal.y },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x - 1, toReveal.y + 1) &&
            state[toReveal.x - 1][toReveal.y + 1] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x - 1, y: toReveal.y + 1 },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x, toReveal.y - 1) &&
            state[toReveal.x][toReveal.y - 1] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x, y: toReveal.y - 1 },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x, toReveal.y + 1) &&
            state[toReveal.x][toReveal.y + 1] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x, y: toReveal.y + 1 },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x + 1, toReveal.y - 1) &&
            state[toReveal.x + 1][toReveal.y - 1] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x + 1, y: toReveal.y - 1 },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x + 1, toReveal.y) &&
            state[toReveal.x + 1][toReveal.y] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x + 1, y: toReveal.y },
              arrToReveal
            );
          }
          if (
            safeCell(toReveal.x + 1, toReveal.y + 1) &&
            state[toReveal.x + 1][toReveal.y + 1] !== "r"
          ) {
            insertCellInArray(
              { x: toReveal.x + 1, y: toReveal.y + 1 },
              arrToReveal
            );
          }
        }
      }
    }
  };
  const resetGame = () => {
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) state[i][j] = "h";
    }
    stats.bombsFlagged = 0;
    stats.result = null;
    stats.plays = 0;
    stats.correctFlags = 0;
  };
  const flagCell = (x, y) => {
    if (stats.result) return;
    if (inBounds(x, y)) {
      if (state[x][y] === "f") {
        stats.bombsFlagged--;
        if (table[x][y] === "b") stats.correctFlags--;
        state[x][y] = "h";
        return;
      }
      if (state[x][y] === "r" || stats.bombsFlagged === bombs) return;

      state[x][y] = "f";
      stats.bombsFlagged++;
      if (table[x][y] === "b") {
        stats.correctFlags++;
        if (stats.correctFlags === bombs) stats.result = "won";
      }
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
  return {
    table,
    state,
    height,
    width,
    bombs,
    stats,
    tryCell,
    flagCell,
    resetGame,
  };
}

// const game = generateGame(10, 10, 50);
// printTable(game.table);
// printTable(game.state);
// game.tryCell(0, 0);
// printTable(game.table);
// printTable(game.state);

export default generateGame;

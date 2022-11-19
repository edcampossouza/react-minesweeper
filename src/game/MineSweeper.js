import { useState } from "react";
import Bomb from "../assets/bomb.png";
import "./Game.css";

const MineSweeper = ({ game }) => {
  const [gameTable, setGameTable] = useState(game.table);
  const [gameState, setGameState] = useState(game.state);
  const [gameStats, setGameStats] = useState(game.stats);
  const cellClickHandler = (x, y) => {
    console.log(x, y);
    game.tryCell(x, y);
    const state = game.state.map((row) => row.slice());
    console.log(game.stats);
    setGameState(state);
  };
  // return (
  //   <table className="game-table">
  //     <tbody>
  //       {gameState.map((row, rowIndex) => (
  //         <MineRow
  //           key={rowIndex}
  //           row={row}
  //           rowIndex={rowIndex}
  //           clickHandler={cellClickHandler}
  //         />
  //       ))}
  //     </tbody>
  //   </table>
  // );
  const gameTableRows = () => {
    const rows = [];
    for (let i = 0; i < gameTable.length; i++) {
      const data = [];
      for (let j = 0; j < gameTable[i].length; j++) {
        data.push(
          <MineCell
            key={i * gameState.length + j}
            cell={gameTable[i][j]}
            state={gameState[i][j]}
            x={i}
            y={j}
            clickHandler={cellClickHandler}
          />
        );
      }
      rows.push(<tr key={i}>{data}</tr>);
    }
    return rows;
  };

  return (
    <div>
      <table className="stats-table">
        <tbody>
          <tr>
            <td>Plays</td>
            <td>{gameStats.plays}</td>
          </tr>
          <tr>
            <td>Bombs Revealed</td>
            <td>{gameStats.bombsRevealed}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>{gameTableRows()}</tbody>
      </table>
      {gameStats.result === "lost" ? (
        <p className="lost-message">YOU LOST</p>
      ) : null}
    </div>
  );
};

const MineRow = ({ row, rowIndex, clickHandler }) => {
  return (
    <tr>
      {row.map((cell, columnIndex) => (
        <MineCell
          key={rowIndex + "." + columnIndex}
          cell={cell}
          clickHandler={clickHandler}
          x={rowIndex}
          y={columnIndex}
        />
      ))}
    </tr>
  );
};

const MineCell = ({ cell, state, x, y, clickHandler }) => {
  return (
    <td onClick={() => clickHandler(x, y)} className="game-cell">
      {state === "h" ? (
        ""
      ) : cell === "b" ? (
        <img className="cell-icon" src={Bomb} />
      ) : (
        cell
      )}
    </td>
  );
};

export default MineSweeper;

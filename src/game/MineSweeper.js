import { useState } from "react";
import Bomb from "../assets/bomb.png";
import "./Game.css";

const MineSweeper = ({ game }) => {
  const [gameState, setGameState] = useState(game.state);
  const cellClickHandler = (x, y) => {
    console.log(x, y);
    game.tryCell(x, y);
    const state = game.state.map((row) => row.slice());
    console.log(game.stats);
    setGameState(state);
  };
  const gameTableRows = () => {
    const rows = [];
    for (let i = 0; i < game.table.length; i++) {
      const data = [];
      for (let j = 0; j < game.table[i].length; j++) {
        data.push(
          <MineCell
            key={i * gameState.length + j}
            cell={game.table[i][j]}
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
            <td>{game.stats.plays}</td>
          </tr>
          <tr>
            <td>Bombs Revealed</td>
            <td>
              {game.stats.bombsRevealed}/{game.bombs}
            </td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>{gameTableRows()}</tbody>
      </table>
      {game.stats.result === "lost" ? (
        <p className="lost-message">YOU LOST</p>
      ) : null}
    </div>
  );
};

const MineCell = ({ cell, state, x, y, clickHandler }) => {
  return (
    <td onClick={() => clickHandler(x, y)} className="game-cell">
      {state === "h" ? (
        ""
      ) : cell === "b" ? (
        <img className="cell-icon" src={Bomb} alt="bomb"/>
      ) : (
        cell
      )}
    </td>
  );
};

export default MineSweeper;

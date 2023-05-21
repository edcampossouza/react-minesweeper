import { useState } from "react";
import Bomb from "../assets/bomb.png";
import Flag from "../assets/flag.png";
import Crosshair from "../assets/crosshair.png";
import "./Game.css";

const MineSweeper = ({ game }) => {
  const [mode, setMode] = useState("probing");
  const [gameState, setGameState] = useState(game.state);
  const cellClickHandler = (x, y) => {
    console.log(x, y);
    if (mode === "probing") game.tryCell(x, y);
    else game.flagCell(x, y);
    const state = game.state.map((row) => row.slice());
    console.log(game.stats);
    setGameState(state);
  };
  const refresh = () => {
    const state = game.state.map((row) => row.slice());
    console.log(game.stats);
    setGameState(state);
  };
  const resetGame = () => {
    game.resetGame();
    refresh();
  };
  const changeMode = () => {
    setMode(mode === "probing" ? "marking" : "probing");
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
      <div className="menu-bar">
        <table className="stats-table">
          <tbody>
            <tr>
              <td>Mode</td>
              <td>Plays</td>
              <td>Bombs Marked</td>
            </tr>
            <tr>
              <td>
                {mode === "marking" && (
                  <img className="image" src={Flag} onClick={changeMode} />
                )}
                {mode === "probing" && (
                  <img className="image" src={Crosshair} onClick={changeMode} />
                )}
              </td>
              <td className="stats-num">{game.stats.plays}</td>
              <td className="stats-num">{game.stats.bombsFlagged}/{game.bombs}</td>
            </tr>
            <tr>
              <td>
                <span>{mode}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table>
        <tbody>{gameTableRows()}</tbody>
      </table>
      {game.stats.result === "lost" ? (
        <p className="lost-message">YOU LOST</p>
      ) : game.stats.result === "won" ? (
        <p className="won-message">YOU WON</p>
      ) : null}
    </div>
  );
};

const MineCell = ({ cell, state, x, y, clickHandler }) => {
  return (
    <td
      onClick={() => clickHandler(x, y)}
      className={`game-cell ${cell === 0 && state === "r" ? "empty-cell" : ""}`}
    >
      {state === "h" ? (
        ""
      ) : state === "f" ? (
        <img className="cell-icon" src={Flag} alt="flag" />
      ) : cell === "b" ? (
        <img className="cell-icon" src={Bomb} alt="bomb" />
      ) : (
        cell || ""
      )}
    </td>
  );
};

export default MineSweeper;

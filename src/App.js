import logo from "./logo.svg";
import "./App.css";
import MineSweeper from "./game/MineSweeper";
import generateGame from "./logic/game";
import { useState } from "react";

function Welcome({ setGame, options }) {
  return (
    <>
      <h1>Select the board size:</h1>
      <ul>
        {options.map((op) => (
          <li className="list-option" key={op.size} onClick={() => setGame(op.size, op.bombs)}>
            {op.size} x {op.size} ({op.bombs} bombs)
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const options = [
    { size: 8, bombs: 10 },
    { size: 16, bombs: 40 },
    { size: 20, bombs: 100 },
  ];

  const [styleApp, setStyleApp] = useState("");
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [game, setGame] = useState(null);
  const [playing, setPlaying] = useState(false);
  function setGameOptions(size, bombs) {
    setStyleApp("hidden");
    setGame(generateGame(size, size, bombs));
    setPlaying(true);
  }

  return (
    <div className="App">
      {playing ? (
        <MineSweeper game={game} />
      ) : (
        <Welcome options={options} setGame={setGameOptions} />
      )}
    </div>
  );
}

export default App;

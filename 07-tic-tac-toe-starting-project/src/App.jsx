import { useState } from "react";

import Header from "./components/Header/Header";
import PlayerInfo from "./components/PlayerInfo/PlayerInfo";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";

import { WINNING_COMBINATIONS, INIT_GAMEBOARD } from "./assets/util";
import GameOver from "./components/GameOver/GameOver";


function getPlayerTurn(gameTurns) {
  let currPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currPlayer = "O";
  }

  return currPlayer;
}

function App() {
  const [playersName, setPlayersName] = useState({
    X: 'Player 1',
    O: 'Player 2',
  });
  const [gameTurns, setGameTurns] = useState([]); // holds the players's turns
  // const [playerTurn, setPlayerTurn] = useState("X");

  // getting the current player turn
  const playerTurn = getPlayerTurn(gameTurns);

  // getting the current board from all the players' turns
  let gameBoard = [...INIT_GAMEBOARD.map(array => [...array])];

  // make the board based on the players' turns 
  for (const turn of gameTurns) {
    const {tile, player} = turn;
    const {row, col} = tile;

    gameBoard[row][col] = player;
  }

  // the winner
  let winner = null;

  // check if there is any combination in gameBoard that can be considered as win
  for (const combination of WINNING_COMBINATIONS) {
    let firstCondition = gameBoard[combination[0].row][combination[0].column];
    let secondCondition = gameBoard[combination[1].row][combination[1].column];
    let thirdCondition = gameBoard[combination[2].row][combination[2].column];

    if (firstCondition && secondCondition && thirdCondition) {
      if (firstCondition === secondCondition && secondCondition === thirdCondition) {
        // make sure to notify the player wins 
        winner = firstCondition;
        break;
      }
    }
  }

  // draw if there is 9 turns and 
  const draw = gameTurns.length === 9 && !winner;

  function handleChangePlayerTurn(rowIndex, colIndex) {
    // setPlayerTurn((prevPlayerTurn) => (prevPlayerTurn === 'X' ? "O" : "X"));
    console.log(rowIndex);
    console.log(colIndex);
    setGameTurns((prevTurns) => {
      const currPlayer = getPlayerTurn(prevTurns);

      const updatedTurns = [
        { tile: { row: rowIndex, col: colIndex }, player: currPlayer, }, 
        ...prevTurns
      ];

      return updatedTurns;
    });
  }

  function handleChangeName(symbol, newPlayerName) {
    setPlayersName((prevPlayersName) => {
      return {
        ...prevPlayersName,
        [symbol]: newPlayerName
      }
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  return (
    <>
      {/* how to know when the player win? */}
      {/* if already know how, how to notify the players which player win? */}
      <Header />
      <main>
        <div id = "game-container">
          <ol id = "players" className = "highlight-player">
            <PlayerInfo name = "Player 1" symbol = "X" isActive = {playerTurn === "X"} handleChangeName = {handleChangeName}/>
            <PlayerInfo name = "Player 2" symbol = "O" isActive = {playerTurn === "O"} handleChangeName = {handleChangeName}/>
          </ol>
          {(winner || draw) && <GameOver winner = {winner} handleRestartGame = {handleRestartGame} playersName = {playersName}/> }
          {/* GAME BOARD */}
          <GameBoard 
            handleChangePlayerTurn = {handleChangePlayerTurn} 
            gameBoard = {gameBoard}/>
        </div>
        <Log turns = {gameTurns}/>
      </main>
    </>
  );
}

export default App;

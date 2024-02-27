import { useState } from "react";

export default function GameBoard({handleChangePlayerTurn, gameBoard}) {
    // deriving state from the parent
    // let gameBoard = initGameBoard;

    // for (const turn of turns) {
    //     const {tile, player} = turn;
    //     const {row, col} = tile;

    //     gameBoard[row][col] = player;
    // }


    // const [gameBoard, setGameBoard] = useState([...initGameBoard]);

    // function handleTileClick(colInd, rowInd) {
    //     if (gameBoard[rowInd][colInd] === null) {
    //         setGameBoard((prevGameBoard) => {
    //             const updatedGameBoard = [...prevGameBoard];
    //             updatedGameBoard[rowInd][colInd] = playerTurn;
    //             return updatedGameBoard;
    //         });
    //         handleChangePlayerTurn();
    //     }
    // }

    return (
        <ol id = "game-board">
            {gameBoard.map((row, rowInd) => {
                return (
                    <li key = {rowInd}>
                        <ol>
                            {row.map((playerSymbol, colInd) => {
                                return (<li key = {colInd}>
                                    <button onClick = {() => handleChangePlayerTurn(rowInd, colInd)} disabled = {playerSymbol}>{playerSymbol}</button>
                                </li>);
                            })}
                        </ol>
                    </li>
                );
            })}
        </ol>
    );
}
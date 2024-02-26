export default function GameOver({ winner, handleRestartGame, playersName }) {
    // console.log(playersName[winner]);
    return (
        <div id = "game-over">
            <h2>Game Over!</h2>
            {winner ? <p>{playersName[winner]} won!</p> : <p>It's a draw</p>}
            <p>
                <button onClick = {handleRestartGame}>Rematch!</button>
            </p>
        </div>
    );
}
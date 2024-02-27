// import GameLogo from '../../../public/game-logo.png';
import GameLogo from '/game-logo.png?url';

export default function Header() {
    return (
        <header>
            <img src = {GameLogo} alt = "The logo for the tic tac toe game"/>
            <h1>Tic-Tac-Toe</h1>
        </header>
    );
}
import reactLogo from '../../assets/react-core-concepts.png';
import './Header.css';

const reactMessage = ['Fundamental', 'Crucial', 'Core'];

function getRandNum(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Header() {
  const message = reactMessage[getRandNum(2)];

  return (
    <header>
      <img src={reactLogo} alt="Stylized atom" />
      <h1>React Essentials</h1>
      <p>
        {message} React concepts you will need for almost any app you are
        going to build!
      </p>
    </header>
  );
}

export default Header;
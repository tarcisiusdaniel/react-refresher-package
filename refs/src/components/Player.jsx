import { useRef, useState } from "react";

export default function Player() {
  const name = useRef();
  const [enteredPlayerName, setEnteredPlayerName] = useState('unknown entity');

  function handleClick() {
    // setClicked(true);
    setEnteredPlayerName(name.current.value);
    name.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName}</h2>
      <p>
        <input 
          ref = {name}
        type="text" />
        <button onClick = {handleClick}>Set Name</button>
      </p>
    </section>
  );
}

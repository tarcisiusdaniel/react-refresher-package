import { log } from "../../log";
import { useState } from "react";

export default function ConfigureCounter({onSet}) {
    log('<ConfigureCounter /> rendered', 1);
    const [enteredNumber, setEnteredNumber] = useState(0);

    function handleChange(event) {
        setEnteredNumber(+event.target.value);
    }

    function handleSetClick() {
        console.log("hello");
        onSet(enteredNumber);
        setEnteredNumber(0);
    }

    return (
        <section id="configure-counter">
          <h2>Set Counter</h2>
          <input type="number" onChange={handleChange} value={enteredNumber} />
          <button onClick={handleSetClick}>Set</button>
        </section>
    )
}
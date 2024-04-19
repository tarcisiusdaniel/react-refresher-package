import { useEffect, useState} from "react";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {
  // make the delete confirmation to have time limit
  // if time limit passed before confirming things (yes or no), delete the item
  const [remainingTime, setRemainingTime] = useState(TIMER);

  // this will create infinite loop
  // bcs every ten seconds it updates a state, causing this component to be re-rendered
  // that is why the remaining time will always be at 3000

  // SOLUTION: use useEffect
  // treat the remaining time as a side effect after this component is rendered
  useEffect(() => {
    const deleteInterval = setInterval(() => {
      // console.log("Interval");
      setRemainingTime(prevTime => prevTime - 10);
    }, 10);

    // executed before the termination of this component (from onConfirm line 32)
    return () => {
      clearInterval(deleteInterval);
    }
  }, []);
  

  useEffect(() => {
    // console.log('Set timer...');
    const deleteTimer = setTimeout(() => {
      onConfirm();
    }, 3000);
    
    // declare the clean up function
    // this will be returned or executed when
    // before the termination of the component from the DOM tree
    // repeating rendering (makes the useeffect callback function to be rerun) of this function
    return () => {
      // console.log('Clearing timeout...');
      clearTimeout(deleteTimer);
    }
  }, []);
  

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      <progress value = {remainingTime} max = {TIMER}/>
    </div>
  );
}

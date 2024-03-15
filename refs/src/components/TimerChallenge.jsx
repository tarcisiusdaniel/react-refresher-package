import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge ({ title, targetTime }) {
    const timer = useRef(); // this value will be changed but everytime this change no rerendering, that's why useRef
    const resultRef = useRef();

    const[timeLeft, setTimeLeft] = useState(targetTime * 1000); //ms

    let timerIsActive = timeLeft > 0 && timeLeft < targetTime * 1000;
    // this is when you let the result modal the lost
    if (timeLeft <= 0) {
        clearInterval(timer.current); // not called if not using useRef, why?
        // works if the timer variable is declared outside of the component
        resultRef.current.open();
        // console.log("hi" + timeLeft);
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeLeft(prevTimeLeft => prevTimeLeft - 10);
        }, 10);
    }

    function handleReset() {
        setTimeLeft(targetTime * 1000);
    }

    // this is when you let the result modal know you win
    function handleStop() {
        clearInterval(timer.current);
        resultRef.current.open();
        // setTimerStarted(false);
    }
    // use useState only when the variable is closely related to the things rendered from the JSX code
    // use useRef only when the variablle is not close related (works on the background of the component, e.g. inputs, timer, all the prev examples)
    return  (
        <>
            <ResultModal ref = {resultRef} targetTime = {targetTime} timeLeft = {timeLeft} handleReset = {handleReset}/>
            <section className = "challenge">
                <h2>{title}</h2>
                <p className = "challenge-time">
                    {targetTime} second{targetTime > 1 ? 's' : ''}
                </p>
                <p>
                    <button onClick = {timerIsActive ? handleStop : handleStart}>
                        {timerIsActive ? 'Stop' : 'Start'} Challenge
                    </button>
                </p>
                <p className = {timerIsActive ? 'active' : undefined}>
                    {timerIsActive ? 'Time is running...' : 'Timer inactive'}
                </p>
            </section>
        </>
    );
}
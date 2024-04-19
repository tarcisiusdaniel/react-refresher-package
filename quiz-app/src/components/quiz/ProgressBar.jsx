import { useState, useEffect, useRef } from "react";

const PROGRESS_TIME = 5000;
const INTERVAL_SPEED = 10;

export default function ProgressBar({onFinish, intervalSpeed}) {
    const [remainingTime, setRemainingTime] = useState(PROGRESS_TIME);
    useEffect(() => {
        // console.log("timeout");
        const timeout = setTimeout(onFinish, PROGRESS_TIME);

        return (
            () => {
                clearTimeout(timeout);
            }
        );
    }, [onFinish]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - INTERVAL_SPEED)
        }, INTERVAL_SPEED);

        return () => clearInterval(interval);
    }, []);

    return (
        <progress value = {remainingTime} max = {PROGRESS_TIME}></progress>
    );
}
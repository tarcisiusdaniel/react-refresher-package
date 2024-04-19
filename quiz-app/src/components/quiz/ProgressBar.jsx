import { useState, useEffect, useRef } from "react";

const PROGRESS_TIME = 10000;
const INTERVAL_SPEED = 10;

export default function ProgressBar({onFinish, intervalSpeed}) {
    const [remainingTime, setRemainingTime] = useState(PROGRESS_TIME);
    useEffect(() => {
        const timeout = setTimeout(onFinish, remainingTime);

        return (
            () => {
                clearTimeout(timeout);
            }
        );
    }, [onFinish, remainingTime]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime((prevTime) => prevTime - intervalSpeed)
        }, 10);

        return () => clearInterval(interval);
    }, [intervalSpeed]);

    return (
        <progress value = {remainingTime} max = {PROGRESS_TIME}></progress>
    );
}
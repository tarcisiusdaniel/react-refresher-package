import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef (function ResultModal({targetTime, timeLeft, handleReset}, ref) {
    const dialog = useRef();

    const userLost = timeLeft <= 0;
    const formattedRemainingTime = (timeLeft / 1000).toFixed(2);
    const score = (1 - formattedRemainingTime / targetTime).toFixed(2) * 100;
    
    useImperativeHandle(ref, () => {
        return {
            open() {
                dialog.current.showModal();
            }
        }
    });

    return (
        <dialog ref = {dialog} className = "result-modal" onClose = {handleReset}>
            {userLost && <h2>You lost</h2>}
            {!userLost && <h2>Your score: {score}</h2>}
            <p>
                The target time was <strong>{targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong>
            </p>
            <form method = "dialog" onSubmit = {handleReset}>
                <button>Close</button>
            </form>
        </dialog>
    );
})

export default ResultModal;
import { useState, useEffect, useCallback, useRef } from "react";

import QUESTIONS from '../resources/questions';
import ProgressBar from "./quiz/ProgressBar";
import QuizComplete from "./quiz/QuizComplete";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [intervalSpeed, setIntervalSpeed] = useState(10);
    // this is derived state
    // a state created by using other state as vocal point
    // better than creating lots of state and each uses useState
    const activeQuestionIndex = userAnswers.length;
    const [shuffledActiveQuestionAnswers, setShuffledActiveQuestionAnswers] = useState([]);
    const [currUserAnswer, setCurrUserAnswer] = useState("N/A");
    // currUserAnswer.current = "N/A";

    console.log(userAnswers);

    useEffect(() => {
        if (activeQuestionIndex < QUESTIONS.length) {
            setShuffledActiveQuestionAnswers((prev) => {
                const answers = [...QUESTIONS[activeQuestionIndex].answers];
                answers.sort(() => Math.random() - 0.5);
                return answers;
            })
        }

    }, [activeQuestionIndex]);

    // make sure that when we click on the answer, 
    // the timeout is resetted
    function handleSelectAnswer(answer) {
        setIntervalSpeed(25);
        setCurrUserAnswer(answer);
    }

    // add the current answer to user answer, and reset everything other state
    const handleQuestionTimedOut = () => {
        setUserAnswers((prevUserAnswers) => {
            let added = currUserAnswer;
            return [...prevUserAnswers, added];
        });
        setIntervalSpeed(10);
    };

    if (activeQuestionIndex === QUESTIONS.length) {
        // console.log(userAnswers);
        return (
            <QuizComplete 
                userAnswers = {userAnswers}/>
        )
    }

    return (
        <div id = "quiz">
            <div id = "question">
                <ProgressBar 
                    key = {activeQuestionIndex} //whenever this changes, the old component will be destrroyed in the DOM, and replaced by a new one
                    onFinish = {handleQuestionTimedOut} 
                    intervalSpeed = {intervalSpeed} 
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id = "answers">
                    {shuffledActiveQuestionAnswers.map((answer, ind) => {
                        return (
                            <li key = {ind} className = "answer">
                                <button onClick = {() => handleSelectAnswer(answer)}>{answer}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>  
    );
}
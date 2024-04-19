import { useState, useEffect, useCallback, useRef } from "react";

import QUESTIONS from '../resources/questions';
import ProgressBar from "./quiz/ProgressBar";
import QuizComplete from "./quiz/QuizComplete";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    // const [intervalSpeed, setIntervalSpeed] = useState(10);
    // const [rightAnswers, setRightAnswers] = useState([]);
    const currUserAnswer = useRef();
    currUserAnswer.current = "N/A";

    // console.log(currUserAnswer);
    // console.log(userAnswers);

    // this is derived state
    // a state created by using other state as vocal point
    // better than creating lots of state and each uses useState
    const activeQuestionIndex = userAnswers.length;

    let shuffledActiveQuestionAnswers = (activeQuestionIndex < QUESTIONS.length) ? [...QUESTIONS[activeQuestionIndex].answers] : [];
    shuffledActiveQuestionAnswers.sort(() => Math.random() - 0.5);

    // make sure that when we click on the answer, 
    // the timeout is resetted
    function handleSelectAnswer(answer) {
        currUserAnswer.current = answer;
        // setIntervalSpeed(25);
    }

    // add the current answer to user answer, and reset everything other state
    const handleQuestionTimedOut = () => {
        // setRightAnswers((prevRightAnswers) => {
        //     return [...prevRightAnswers, QUESTIONS[activeQuestionIndex].answers[0]];
        // });
        setUserAnswers((prevUserAnswers) => {
            let added = currUserAnswer.current;
            return [...prevUserAnswers, added];
        });
        // setIntervalSpeed(10);
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
                    // intervalSpeed={intervalSpeed}
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
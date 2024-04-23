import { useState, useEffect, useRef } from "react";

import QUESTIONS from '../resources/questions';
import ProgressBar from "./quiz/ProgressBar";
import QuizComplete from "./quiz/QuizComplete";

// what to do after
// we need to show the right answer after each question is answered
// wrong answer picked: the wrong answer becomes red, the right one is green
// right answer picked: the right answer becomes green
// all other answers becomes blurred and disabled (cannot be clicked) 

// if not answered until the end, don't show anything (done)


export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const [intervalSpeed, setIntervalSpeed] = useState(10);
    // this is derived state
    // a state created by using other state as vocal point
    // better than creating lots of state and each uses useState
    const activeQuestionIndex = userAnswers.length;
    const [shuffledActiveQuestionAnswers, setShuffledActiveQuestionAnswers] = useState([]);
    const [currUserAnswer, setCurrUserAnswer] = useState("N/A");
    let currRightAnswer = "N/A";
    if (activeQuestionIndex < QUESTIONS.length) {
        currRightAnswer = QUESTIONS[activeQuestionIndex].answers[0];
    }

    // console.log(userAnswers);

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
        // make all the answer disabled, except the user answer and the right answer
        // wrong answer becomes red, right answer becomes green
        // if the user answer is correct, only show the green
    }

    // add the current answer to user answer, and reset everything other state
    const handleQuestionTimedOut = () => {
        setUserAnswers((prevUserAnswers) => {
            let added = currUserAnswer;
            return [...prevUserAnswers, added];
        });
        setCurrUserAnswer("N/A");
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
                    {shuffledActiveQuestionAnswers.map((answer) => {
                        return (
                            <li key = {answer + Math.random()} className = "answer">
                                <button onClick = {() => handleSelectAnswer(answer)}>{answer}</button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>  
    );
}
import { useState } from "react";

import QuizComplete from "../assets/quiz-complete.png";
import QUESTIONS from '../resources/questions';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    // this is derived state
    // a state created by using other state as vocal point
    // better than creating lots of state and each uses useState
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = userAnswers.length === QUESTIONS.length;

    function handleSelectAnswer(answer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer];
        });
    }

    if (quizIsComplete) {
        return (
            <div id = "summary">
                <img src = {QuizComplete} alt = "Quiz complete" />
                <h2>Quiz Completed</h2>
            </div>
        )
    }

    console.log("hey wassup");
    const shuffledActiveQuestionAnswers = [...QUESTIONS[activeQuestionIndex].answers];
    shuffledActiveQuestionAnswers.sort(() => Math.random() - 0.5);

    return (
        <div id = "quiz">
            <div id = "question">
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
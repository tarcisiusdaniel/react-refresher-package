import { useState } from "react";

import QUESTIONS from '../resources/questions';

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    const activeQuestionIndex = userAnswers.length;

    function handleSelectAnswer(answer) {
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, answer];
        });
    }

    return (
        <div id = "quiz">
            <div id = "question">
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id = "answers">
                    {QUESTIONS[activeQuestionIndex].answers.map((answer, ind) => {
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
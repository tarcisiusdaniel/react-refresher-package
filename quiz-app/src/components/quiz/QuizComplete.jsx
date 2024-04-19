import CompleteLogo from '../../assets/quiz-complete.png';
import QUESTIONS from '../../resources/questions';

export default function Complete({userAnswers}) {
    const userResult = [];
    let correct = 0;
    let incorrect = 0;
    let skipped = 0;
    for (let i = 0; i < QUESTIONS.length; i++) {
        const currAnswer = {
            question: QUESTIONS[i].text,
            userAnswer: userAnswers[i],
            rightAnswer: QUESTIONS[i].answers[0],
        }
        if (currAnswer.userAnswer === "N/A") {
            skipped += 1;
        }
        else if (currAnswer.userAnswer === currAnswer.rightAnswer) {
            correct += 1;
        }
        else {
            incorrect += 1;
        }
        // console.log(currAnswer.userAnswer === currAnswer.rightAnswer);
        userResult.push(currAnswer);
    }

    let correctPercentage = Math.round(parseFloat(correct) / 7.0 * 100);
    let incorrectPercentage = Math.round(parseFloat(incorrect) / 7.0 * 100);
    let skippedPercentage = Math.round(parseFloat(skipped) / 7.0 * 100);

    return (
        <div id = "summary">
            <img src = {CompleteLogo} alt = "Quiz complete" />
            <h2>Quiz Completed</h2>
            {/* The part that gives the percentage of right, wrong, and skipped */}
            <div id = "summary-stats">
                <p>
                    <span className = "number">{skippedPercentage}%</span>
                    <span className = "text">Skipped</span>
                </p>
                <p>
                    <span className = "number">{correctPercentage}%</span>
                    <span className = "text">Answered Correctly</span>
                </p>
                <p>
                    <span className = "number">{incorrectPercentage}%</span>
                    <span className = "text">Answered Incorrectly</span>
                </p>
            </div>
            {/* The part that lists out all user's answers to each question */}
            <ol>
                {
                    userResult.map((curr, ind) => {
                        return (
                            <li key = {ind}>
                                <h3>{ind + 1}</h3>
                                <div className = "answer-container">
                                    <span className = "question">{curr.question}</span>
                                    <span className = {"user-answer " + (
                                        (curr.userAnswer === "N/A") ? 
                                            "skipped" :
                                            (curr.userAnswer === curr.rightAnswer) ? "correct" : "wrong"
                                    )}>{curr.userAnswer}</span>
                                </div>
                            </li>
                        );
                    })
                }
            </ol>
        </div>
    )
}
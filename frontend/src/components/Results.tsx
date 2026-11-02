import type { StoryResult } from "../types/attempt.ts" 

type StoryResultsProps = {
    result: StoryResult
    onReturnToLIbrary: () => void
}


function Results({result, onReturnToLIbrary}: StoryResultsProps) {
    return (
        <section className='story-card'>
        <h2>Story Completed!</h2>
        <p>You reached the end of {result.storyTitle}</p>

        <p>Score: {result.correctAnswers} / {result.totalQuestions}</p>

        <p>{result.scorePercentage}% correct</p>

        <h3>Answer review</h3>
        {result.answers.map((answer) => {
            const feedback = result.feedback.find(
                (item) => item.questionId === answer.questionId
            )
        
             return (<article key={answer.sceneId}>
                <h4>Question {answer.questionId}: {answer.questionText}</h4>

                <p>Your answer: [{answer.selectedChoiceText}] is {answer.isCorrect ? "Correct" : "Incorrect"}</p>

                <p>Correct answer: {feedback.correctChoiceText}</p>

                <p>Explanation: {feedback.explanation}</p>
            </article>
            )
            })}
        
        <button type='button' onClick={onReturnToLIbrary}>
            Return to Library</button>
        </section>
    )
}

export default Results
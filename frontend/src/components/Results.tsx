import type { StoryResult } from "../types/attempt" 

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
        {result.answers.map((answer, index) => (
            <article key={answer.sceneId}>
                <h4>Question {index +1}: {answer.questionText}</h4>

                <p>Your answer: {answer.selectedChoiceText}</p>

                <p>Correct answer: {answer.correctChoiceText}</p>

                <p>{answer.isCorrect ? "Correct" : "Incorrect"}</p>

                <p>{answer.explanation}</p>
            </article>
        ))}
        
        
        <button type='button' onClick={onReturnToLIbrary}>
            Return to Library</button>
        </section>
    )
}

export default Results
import { useState } from "react";
import type { Story } from "../types/story.ts";
import Results from "../components/Results.tsx";
import type { AnswerFeedback, AnswerRecord, StoryResult } from "../types/attempt.ts";
import { calculateScore } from "../utils/scoring.ts";
import { checkAnswer } from "../utils/checking.ts";


type StoryPlayerProps = {
    story: Story
    onBack: () => void
}

function StoryPlayer({story, onBack} : 
                    StoryPlayerProps) {
    const [sceneIndex, setSceneIndex] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const [answers, setAnswers] = useState<AnswerRecord[]>([])
    const [result, setResult] = useState<StoryResult | null>(null)
    const [isCorrect, setIsCorrect] = useState(false)
    const [feedbackItems, setFeedbackItems] = useState<AnswerFeedback[]>([])

    const scene = story.scenes[sceneIndex]
    const currentFeedback = scene.question ?
                      feedbackItems.find(
                        (item) => item.questionId === scene.question?.id
                      ) : undefined

    function submitAnswer() {
        if (selectedChoice === null || submitted || !scene.question) {
            return
        }

        const selectedOption = scene.question.choices.find(
            (choice) => choice.id === selectedChoice,
        )

        if (!selectedOption) {
            return
        }

        const answerFeedback = checkAnswer(scene.question.id, selectedOption.id, scene.question.choices);

        if (!answerFeedback) {
            return
        }

        const answerRecord: AnswerRecord = {
            sceneId: scene.id,
            questionId: scene.question.id,
            questionText: scene.question.text,
            selectedChoiceId: selectedOption.id,
            selectedChoiceText: selectedOption.text,
            isCorrect: answerFeedback.isCorrect,
        }

        setAnswers((previousAnswers) => [
            ...previousAnswers,
            answerRecord,
        ])

        setSubmitted(true)
        setIsCorrect(answerFeedback.isCorrect)

        setFeedbackItems((previousFeedback) => [
          ...previousFeedback,
          answerFeedback
        ])
    }

    function continueStory() {
        if (sceneIndex < story.scenes.length - 1) {
            setSceneIndex(sceneIndex + 1)
            setSelectedChoice(null)
            setSubmitted(false)
            setIsCorrect(false)
        } else {
            const finalResult = calculateScore(
                story.id,
                story.title,
                answers,
                feedbackItems
            )
            setResult(finalResult)
        }
    }

        return (
              <div className='app'>
                <header className='header'>
                  <h1>StoryLine</h1>
                  <button type='button' onClick={onBack}>
                    Back to Library</button>
                </header>
        
                <main className='player'>
                  {result ? (
                    <Results 
                        result={result}
                        onReturnToLIbrary={onBack}
                    />
                  ) : (
                    <>
                      <div className='progress'>
                        Scene {sceneIndex + 1} of {story.scenes.length}
                      </div>
                      <h2>{scene.title}</h2>
        
                      <section className='dialogue'>
                        {scene.dialogue.map((line, index) => {
                          const character = story.characters.find(
                            (character) => character.id === line.characterId
                          )
                        
                          return (
                            <div className='dialogue-line' key={index}>
                            <strong>{character?.name ?? line.characterId}</strong>
                            <p>{line.text}</p>
                          </div>
                          )
                          
                        })}
                      </section>
                      {scene.question ? 
                      (
                        <section className='question'>
                        <h3>{scene.question.text}</h3>
        
                        <div className='choices'>
                          {scene.question.choices.map((choice) => (
                            <button type='button' key={choice.id}
                            className={selectedChoice === choice.id
                                      ? 'choice selected' : 'choice'
                            }
                            disabled={submitted}
                            onClick={() => setSelectedChoice(choice.id)}
                            >
        
                              {choice.text}
        
                            </button>
                          ))}
        
                        </div>
                          {submitted && (
                            <div className='feedback' role='status'>
                              <h4>
                                {isCorrect ? 'Correct!' : 'Not quite'}
                              </h4>
        
                              <p>{currentFeedback.explanation}</p>
        
                            </div>
                          )}
        
                          {!submitted ? (
                            <button type='button' 
                            disabled={selectedChoice === null}
                            onClick={submitAnswer}
                            >Check Answer</button>
                          ) : (
                            <button type='button' onClick={continueStory}>
                              {sceneIndex < story.scenes.length - 1
                              ? 'Continue' : 'Finish Story'}
                            </button>
                          )}
        
                      </section>
                      ) : (
                        <button type='button' onClick={continueStory}>
                              {sceneIndex < story.scenes.length - 1
                              ? 'Continue' : 'Finish Story'}
                            </button>
                      )
                      
                      }
                      
                    </>
                  )}
                </main>
        
              </div>
            )
}

export default StoryPlayer
import { useState } from "react";
import type { Story } from "../types/story";
import Results from "../components/Results";
import type { AnswerRecord, StoryResult } from "../types/attempt";
import { calculateScore } from "../utils/scoring";


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

    const scene = story.scenes[sceneIndex]
    const isCorrect = selectedChoice === scene.question.correctChoiceId


    function submitAnswer() {
        if (selectedChoice === null || submitted) {
            return
        }

        const selectedOption = scene.question.choices.find(
            (choice) => choice.id === selectedChoice,
        )

        const correctOption = scene.question.choices.find(
            (choice) => choice.id === scene.question.correctChoiceId,
        )

        if (!selectedOption || !correctOption) {
            return
        }

        const answerRecord: AnswerRecord = {
            sceneId: scene.id,
            questionText: scene.question.text,
            selectedChoiceId: selectedOption.id,
            selectedChoiceText: selectedOption.text,
            correctChoiceId: correctOption.id,
            correctChoiceText: correctOption.text,
            explanation: scene.question.explanation,
            isCorrect: selectedOption.id === scene.question.correctChoiceId,
        }

        setAnswers((previousAnswers) => [
            ...previousAnswers,
            answerRecord,
        ])

        setSubmitted(true)
    }

    function continueStory() {
        if (sceneIndex < story.scenes.length - 1) {
            setSceneIndex(sceneIndex + 1)
            setSelectedChoice(null)
            setSubmitted(false)
        } else {
            const finalResult = calculateScore(
                story.id,
                story.title,
                answers,
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
                        {scene.dialogue.map((line, index) => (
                          <div className='dialogue-line' key={index}>
                            <strong>{line.speaker}</strong>
        
                            <p>{line.text}</p>
        
                          </div>
                        ))}
                      </section>
        
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
        
                              <p>{scene.question.explanation}</p>
        
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
                    </>
                  )}
                </main>
        
              </div>
            )
}

export default StoryPlayer
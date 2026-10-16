import { useState } from "react";
import type { Story } from "../types/story";

type StoryPlayerProps = {
    story: Story
    onBack: () => void
}

function StoryPlayer({story, onBack} : 
                    StoryPlayerProps) {
    const [sceneIndex, setSceneIndex] = useState(0)
    const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false)
    const [finished, setFinished] = useState(false)

    const scene = story.scenes[sceneIndex]
    const isCorrect = selectedChoice === scene.question.correctChoiceId


    function submitAnswer() {
        if (selectedChoice !== null) {
            setSubmitted(true)
        }
    }

    function continueStory() {
        if (sceneIndex < story.scenes.length - 1) {
            setSceneIndex(sceneIndex + 1)
            setSelectedChoice(null)
            setSubmitted(false)
        } else {
            setFinished(true)
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
                  {finished ? (
                    <section className='story-card'>
                      <h2>Story Completed!</h2>
                      <p>You reached the end of {story.title}</p>
        
                      <button type='button' onClick={onBack}>
                          Return to Library</button>
                    </section>
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
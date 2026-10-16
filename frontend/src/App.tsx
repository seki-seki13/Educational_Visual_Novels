import './App.css'
import { stories } from './data/stories'
import type { Story } from './data/stories'
import { useState } from 'react'



function App() {
  const [activeStory, setActiveStory] = useState<Story | null>(null)
  const [sceneIndex, setSceneIndex] = useState(0)
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [finished, setFinished] = useState(false)

  function openStory(story : Story) {
    setActiveStory(story)
    setSceneIndex(0)
    setSelectedChoice(null)
    setSubmitted(false)
    setFinished(false)
  }

  function returnHome() {
    setActiveStory(null)
  }

  function submitAnswer() {
    if (selectedChoice != null) {
      setSubmitted(true)
    }
  }

  function continueStory() {
    if (!activeStory) return

    if (sceneIndex < activeStory.scenes.length - 1) {
      setSceneIndex(sceneIndex + 1)
      setSelectedChoice(null)
      setSubmitted(false)
    } else {
      setFinished(true)
    }
  }

  if (activeStory) {
    const scene = activeStory.scenes[sceneIndex]
    const isCorrect = selectedChoice === scene.question.correctChoiceId

    return (
      <div className='app'>
        <header className='header'>
          <h1>StoryLine</h1>
          <button type='button' onClick={returnHome}>
            Back to Library</button>
        </header>

        <main className='player'>
          {finished ? (
            <section className='story-card'>
              <h2>Story Completed!</h2>
              <p>You reached the end of {activeStory.title}</p>

              <button type='button' onClick={returnHome}>
                  Return to Library</button>
            </section>
          ) : (
            <>
              <div className='progress'>
                Scene {sceneIndex + 1} of {activeStory.scenes.length}
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
                      {sceneIndex < activeStory.scenes.length - 1
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


  return (
    <div className="app">
      <header className="header">
        <h1>Storyline</h1>

        <nav>
          <a href="#home">Home</a>
          <a href="#library">My Library</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <main className="main-content" id="home">
        <section className="hero">
          <p className="eyebrow">LEARN THROUGH VISUAL NOVELS</p>

          <h2>History is more than dates.</h2>

          <p>
            Step into the past, meet the people who shaped it,
            and test your understanding along the way.
          </p>

          <button type="button"
          onClick={() =>
            document.getElementById('library')?.scrollIntoView({
              behavior: 'smooth',
            })
          }>
            Explore stories</button>
        </section>

        <section className="featured" id="library">
          <h2>Explore stories</h2>

          <div className="story-list">
            {stories.map((story) => (
              <article className="story-card" key={story.id}>
                <img
                className='story-image'
                src={story.image}
                alt={`Cover Illustration for ${story.title}`}/>

                <div className='story-card-content'>
                  <p className="story-period">
                    {story.period} - {story.location}
                  </p>

                  <h3>{story.title}</h3>

                  <p>{story.description}</p>

                  <button type='button' 
                  onClick={() => openStory(story)}>
                    Start Reading</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="about">
        <p>Storyline — learn history by experiencing it.</p>
      </footer>
    </div>
  )
}

export default App

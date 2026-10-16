import './App.css'
import { stories } from './data/mockStories'
import type { Story } from './types/story'
import { useState } from 'react'
import StoryPlayer from './pages/StoryPlayer'



function App() {
  const [activeStory, setActiveStory] = useState<Story | null>(null)


  function openStory(story : Story) {
    setActiveStory(story)
  }

  function returnHome() {
    setActiveStory(null)
  }

  if (activeStory) {
    return (
      <StoryPlayer 
      story={activeStory}
      onBack={returnHome}/>
    )}

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

import './App.css'
import type { Story } from './types/story.ts'
import { useState } from 'react'
import StoryPlayer from './pages/StoryPlayer.tsx'
import Library from './pages/Library.tsx'



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

  return <Library onOpenStory={openStory}/>
  }

export default App

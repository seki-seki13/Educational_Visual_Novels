import kenesaryImage from "../assets/kenesary.png"
import type { Story } from "../types/story"


export const stories: Story[] = [
  {
    id: 'kenesary-rebellion',
    title: "Kenesary's Rebellion",
    period: '1837–1847',
    location: 'Kazakhstan',
    description:
      'Explore the longest uprising of the Kazakh people on the territory of modern Kazakhstan under the leadership of Khan Kenesary Qasymov against the Russian Empire.',
    image: kenesaryImage,
    scenes: [
      {
        id: 'introduction',
        title: 'Before the story begins',
        dialogue: [
          {
            speaker: 'Guide',
            text:
              "Welcome, historian. In this story, you'll explore the events associated with Kenesary's Rebellion. Read carefully and use the questions to check your understanding.",
          },
          {
            speaker: 'Guide',
            text:
              'Your first task is to identify the period associated with the rebellion.',
          },
        ],
        question: {
          text: 'Which period is associated with Kenesary’s Rebellion?',
          choices: [
            { id: 'a', text: '1837–1847' },
            { id: 'b', text: '1916–1917' },
            { id: 'c', text: '1723–1727' },
          ],
          correctChoiceId: 'a',
          explanation:
            'The rebellion is conventionally dated from 1837 to 1847.',
        },
      },
      {
        id: 'reflection',
        title: 'Think like a historian',
        dialogue: [
          {
            speaker: 'Guide',
            text:
              'Dates help establish a timeline, but understanding history requires more than memorising years.',
          },
          {
            speaker: 'Guide',
            text:
              'As you continue studying, look for the causes, participants, and consequences described in reliable historical sources.',
          },
        ],
        question: {
          text: 'What is a useful next step when studying a historical event?',
          choices: [
            {
              id: 'a',
              text: 'Memorise a date without learning the context',
            },
            {
              id: 'b',
              text: 'Examine its causes, participants, and consequences',
            },
            {
              id: 'c',
              text: 'Assume every account says exactly the same thing',
            },
          ],
          correctChoiceId: 'b',
          explanation:
            'Historical understanding involves examining context and comparing evidence, not just memorising dates.',
        },
      },
    ],
  },
]

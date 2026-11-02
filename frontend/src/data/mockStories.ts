import kenesaryImage from "../assets/kenesary.png"
import type { Story } from "../types/story.ts"

export const stories: Story[] = [
  {
    id: 'kenesary-rebellion',
    title: "Kenesary's Rebellion",
    period: '1837–1847',
    location: 'Kazakhstan',
    description:
      'Explore the longest uprising of the Kazakh people on the territory of modern Kazakhstan under the leadership of Khan Kenesary Qasymov against the Russian Empire.',
    image: kenesaryImage,

    characters: [
      {
        id: 'kenesary',
        name: 'Kenesary',
        assetId: 'historical-male-01',
        description: 'Khan Kenesary Qasymov.'
      },
      {
        id: 'guide',
        name: 'Guide',
        assetId: 'guide-neutral-01',
        description: 'A narrator who introduces the historical material.'
      },
      {
        id: 'soldier-1',
        name: 'Soldier',
        assetId: 'historical-male-02',
        description: 'A soldier serving under Kenesary.'
      }
    ],

    scenes: [
        {
        id: 'intro-scene',
        title: 'At the Encampment',
        backgroundId: 'steppe-camp-day',
        dialogue: [
          {
            characterId: 'kenesary',
            text: 'How many men have arrived at the encampment?'
          },
          {
            characterId: 'soldier-1',
            text: 'Nearly five hundred, Khan. More are expected by tomorrow.'
          },
          {
            characterId: 'kenesary',
            text: 'Have the scouts returned?'
          },
          {
            characterId: 'soldier-1',
            text: 'Not yet. They were sent to observe the movements of the Russian forces.'
          }
        ]
      },
      {
        id: 'introduction',
        title: 'Before the story begins',
        backgroundId: 'historical-background-01',
        dialogue: [
          {
            characterId: 'guide',
            text:
              "Welcome, historian. In this story, you'll explore the events associated with Kenesary's Rebellion. Read carefully and use the questions to check your understanding.",
          },
          {
            characterId: 'guide',
            text:
              'Your first task is to identify the period associated with the rebellion.',
          },
        ],
        question: {
          id: 'question-period',
          text: 'Which period is associated with Kenesary’s Rebellion?',
          choices: [
            { id: 'a', text: '1837–1847' },
            { id: 'b', text: '1916–1917' },
            { id: 'c', text: '1723–1727' },
          ],
        },
      },
      {
        id: 'reflection',
        title: 'Think like a historian',
        backgroundId: 'historical-background-01',
        dialogue: [
          {
            characterId: 'guide',
            text:
              'Dates help establish a timeline, but understanding history requires more than memorising years.',
          },
          {
            characterId: 'guide',
            text:
              'As you continue studying, look for the causes, participants, and consequences described in reliable historical sources.',
          },
        ],
        question: {
          id: 'question-historical-method',
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
        },
      },
    ],
  },
]
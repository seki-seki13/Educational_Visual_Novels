export type CharacterAsset = {
  id: string
  image: string
}

export type BackgroundAsset = {
  id: string
  image: string
}

export type StoryCharacter = {
  id: string
  name: string
  assetId: string
  description?: string
}

export type DialogueLine = {
  characterId: string
  text: string
}

export type Choice = {
  id: string
  text: string
}

export type Question = {
  id: string
  text: string
  choices: Choice[]

}

export type QuestionAnswerKey = {
  questionId: string
  correctChoiceId: string
  explanation: string
}

export type Scene = {
  id: string
  title: string
  backgroundId: string
  dialogue: DialogueLine[]
  question?: Question
}

export type Story = {
  id: string
  title: string
  period: string
  location: string
  description: string
  image: string
  characters: StoryCharacter[]
  scenes: Scene[]
}
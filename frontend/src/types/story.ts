export type Choice = {
  id: string
  text: string
}

export type Scene = {
  id: string
  title: string
  dialogue: {
    speaker: string
    text: string
  }[]
  question: {
    text: string
    choices: Choice[]
    correctChoiceId: string
    explanation: string
  }
}

export type Story = {
  id: string
  title: string
  period: string
  location: string
  description: string
  image: string
  scenes: Scene[]
}
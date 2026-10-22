export type AnswerRecord = {
    sceneId: string
    questionText: string
    selectedChoiceId: string
    selectedChoiceText: string
    correctChoiceId: string
    correctChoiceText: string
    explanation: string
    isCorrect: boolean
}

export type StoryResult = {
    storyId: string
    storyTitle: string
    totalQuestions: number
    correctAnswers: number
    scorePercentage: number
    answers: AnswerRecord[]
}
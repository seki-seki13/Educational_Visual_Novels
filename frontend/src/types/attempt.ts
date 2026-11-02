export type AnswerRecord = {
    sceneId: string
    questionId: string
    questionText: string
    selectedChoiceId: string
    selectedChoiceText: string
    isCorrect: boolean
}

export type AnswerFeedback = {
    questionId: string
    correctChoiceText: string
    isCorrect: boolean
    explanation: string
}

export type StoryResult = {
    storyId: string
    storyTitle: string
    totalQuestions: number
    correctAnswers: number
    scorePercentage: number
    answers: AnswerRecord[]
    feedback: AnswerFeedback[]
}
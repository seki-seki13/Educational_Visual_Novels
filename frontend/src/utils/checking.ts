import { mockAnswerKeys } from "../data/mockAnswerKeys.ts";
import type { AnswerFeedback } from "../types/attempt.ts";
import type { Choice } from "../types/story.ts";

export function checkAnswer(
    questionId: string,
    selectedChoiceId: string,
    choices: Choice[]
) : AnswerFeedback | null {
    const answerKey = mockAnswerKeys.find(
        (key) => key.questionId === questionId
    )

    if (!answerKey) {
        return null
    }

    const correctChoice = choices.find (
        (choice) => choice.id === answerKey.correctChoiceId
    )

    if (!correctChoice) {
        return null
    }

    return {
        questionId,
        correctChoiceText: correctChoice.text, 
        isCorrect: selectedChoiceId === answerKey.correctChoiceId,
        explanation: answerKey.explanation
    }
}
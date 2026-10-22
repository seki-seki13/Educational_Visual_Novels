import type { AnswerRecord, StoryResult } from '../types/attempt'

export function calculateScore(
  storyId: string,
  storyTitle: string,
  answers: AnswerRecord[],
): StoryResult {
  const correctAnswers = answers.filter(
    (answer) => answer.isCorrect,
  ).length

  const totalQuestions = answers.length

  const scorePercentage =
    totalQuestions === 0
      ? 0
      : Math.round((correctAnswers / totalQuestions) * 100)

  return {
    storyId,
    storyTitle,
    totalQuestions,
    correctAnswers,
    scorePercentage,
    answers,
  }
}
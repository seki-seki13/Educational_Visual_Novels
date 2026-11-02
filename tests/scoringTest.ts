import { assertEquals } from 'jsr:@std/assert@1'
import { calculateScore } from "../frontend/src/utils/scoring.ts"
import type { AnswerRecord } from '../frontend/src/types/attempt.ts'

function makeAnswer(isCorrect: boolean) : AnswerRecord {
    return {
        sceneId: 'scene-1',
        questionText: 'Which period is associated with the rebellion?',
        selectedChoiceId: isCorrect ? 'a' : 'b',
        selectedChoiceText: isCorrect ? '1837-1847' : '1916-1917',
        correctChoiceId: 'a',
        correctChoiceText: '1837-1847',
        explanation: 'The rebelion is dated from 1837 to 1847',
        isCorrect,
    }
}

Deno.test('two correct answers produce 100%', () => {
  const answers = [makeAnswer(true), makeAnswer(true)]

  const result = calculateScore('test-story', 'Test Story', answers)

  assertEquals(result.correctAnswers, 2)
  assertEquals(result.totalQuestions, 2)
  assertEquals(result.scorePercentage, 100)
})

Deno.test('one correct answer out of two produces 50%', () => {
  const answers = [makeAnswer(true), makeAnswer(false)]

  const result = calculateScore('test-story', 'Test Story', answers)

  assertEquals(result.correctAnswers, 1)
  assertEquals(result.totalQuestions, 2)
  assertEquals(result.scorePercentage, 50)
})

Deno.test('2 out of 3 correct answers produce a rounded 67%', () => {
  const answers = [makeAnswer(false), makeAnswer(true), makeAnswer(true)]

  const result = calculateScore('test-story', 'Test Story', answers)

  assertEquals(result.correctAnswers, 2)
  assertEquals(result.totalQuestions, 3)
  assertEquals(result.scorePercentage, 67)
})

Deno.test('all incorrect answers produce 0%', () => {
  const answers = [makeAnswer(false), makeAnswer(false)]

  const result = calculateScore('test-story', 'Test Story', answers)

  assertEquals(result.correctAnswers, 0)
  assertEquals(result.totalQuestions, 2)
  assertEquals(result.scorePercentage, 0)
})

Deno.test('no answers produce 0% without crashing', () => {
  const result = calculateScore('test-story', 'Test Story', [])

  assertEquals(result.correctAnswers, 0)
  assertEquals(result.totalQuestions, 0)
  assertEquals(result.scorePercentage, 0)
})
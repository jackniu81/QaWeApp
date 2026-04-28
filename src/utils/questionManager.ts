import javascriptData from '../data/javascript.json'
import reactData from '../data/react.json'
import typescriptData from '../data/typescript.json'
import htmlData from '../data/html.json'
import cssData from '../data/css.json'
import javaData from '../data/java.json'
import goData from '../data/go.json'
import vueData from '../data/vue.json'
import angularData from '../data/angular.json'
import type { StackId } from './constants'

const stackDataMap: Record<StackId, any[]> = {
  javascript: javascriptData.questions || [],
  react: reactData.questions || [],
  typescript: typescriptData.questions || [],
  html: htmlData.questions || [],
  css: cssData.questions || [],
  java: javaData.questions || [],
  go: goData.questions || [],
  vue: vueData.questions || [],
  angular: angularData.questions || []
}

export function loadQuestionsByStack(stackId: string) {
  const lowerStackId = (stackId || '').toLowerCase() as StackId
  const rawQuestions = stackDataMap[lowerStackId]
  if (!rawQuestions) {
    return []
  }
  return rawQuestions.map(question => ({
    ...question,
    stack: question.stack || lowerStackId
  }))
}

export function getRandomQuestion(allQuestions: any[], askedIds: string[]) {
  const availableQuestions = allQuestions.filter(
    q => !askedIds.includes(q.id)
  )
  if (availableQuestions.length === 0) {
    return null
  }
  const randomIndex = Math.floor(Math.random() * availableQuestions.length)
  return availableQuestions[randomIndex]
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getQuestionsByDifficulty(questions: any[], difficulty: string) {
  return questions.filter(q => q.difficulty === difficulty)
}

export function getQuestionsByCategory(questions: any[], category: string) {
  return questions.filter(q => q.category === category)
}

export function getCategories(questions: any[]) {
  const categories = new Set<string>()
  questions.forEach(q => categories.add(q.category))
  return Array.from(categories)
}

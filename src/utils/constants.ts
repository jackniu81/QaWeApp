export const QUESTIONS_PER_SESSION = 10
export const STACK_IDS = ['javascript', 'react', 'typescript', 'html', 'css', 'java', 'go', 'vue', 'angular'] as const
export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard'] as const

export type StackId = (typeof STACK_IDS)[number]

export const STACK_NAMES: Record<StackId, string> = {
  javascript: 'JavaScript',
  react: 'React',
  typescript: 'TypeScript',
  html: 'HTML',
  css: 'CSS',
  java: 'Java',
  go: 'Go',
  vue: 'Vue',
  angular: 'Angular'
}

export const VALIDATION_RULES = {
  ID_PATTERN: /^[a-z]+-\d{3}$/,
  MAX_QUESTION_LENGTH: 500,
  MAX_ANSWER_LENGTH: 2000,
  MAX_CATEGORY_LENGTH: 50
}

export default {
  QUESTIONS_PER_SESSION,
  STACK_IDS,
  DIFFICULTY_LEVELS,
  STACK_NAMES,
  VALIDATION_RULES
}

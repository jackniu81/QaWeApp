import { View, Text, Button } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { useState, useEffect } from 'react'

import './index.scss'
import type { Question } from '../../types/dataStructure'
import { STACK_IDS, STACK_NAMES, QUESTIONS_PER_SESSION, type StackId } from '../../utils/constants'
import { loadQuestionsByStack, getRandomQuestion, shuffleArray } from '../../utils/questionManager'

export default function QuestionsPage() {
  const router = useRouter()
  const [stackId, setStackId] = useState<StackId>(STACK_IDS[0])
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [askedIds, setAskedIds] = useState<string[]>([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const maxQuestions = Math.min(QUESTIONS_PER_SESSION, questions.length)
  const progressLabel = maxQuestions ? `${Math.min(askedIds.length, maxQuestions)}/${maxQuestions}` : '0/0'
  const stackLabel = STACK_NAMES[stackId] || stackId

  const startSession = (pool: Question[]) => {
    if (!pool.length) {
      setError('No questions available for this stack.')
      setCurrentQuestion(null)
      setAskedIds([])
      setSessionComplete(true)
      return
    }

    const first = getRandomQuestion(pool, [])
    if (!first) {
      setError('Unable to load questions, please try again.')
      setCurrentQuestion(null)
      setAskedIds([])
      setSessionComplete(true)
      return
    }

    setCurrentQuestion(first)
    setAskedIds([first.id])
    setShowAnswer(false)
    setSessionComplete(false)
    setError('')
  }

  const isStackId = (value: string): value is StackId => {
    return STACK_IDS.includes(value as StackId)
  }

  useEffect(() => {
    setLoading(true)
    const requestedStack = (router.params?.stack || STACK_IDS[0]).toLowerCase()
    const targetStack: StackId = isStackId(requestedStack) ? requestedStack : STACK_IDS[0]
    setStackId(targetStack)

    const loaded = loadQuestionsByStack(targetStack)
    if (!loaded.length) {
      setQuestions([])
      setCurrentQuestion(null)
      setAskedIds([])
      setSessionComplete(true)
      setError('No questions found for that stack yet.')
      setLoading(false)
      return
    }

    const randomized = shuffleArray(loaded)
    setQuestions(randomized)
    startSession(randomized)
    setLoading(false)
  }, [router.params?.stack])

  useEffect(() => {
    if (sessionComplete) {
      Taro.showToast({ title: 'Session complete', icon: 'success', duration: 1500 })
    }

    if (error) {
      Taro.showToast({ title: error, icon: 'none', duration: 1500 })
    }
  }, [sessionComplete, error])

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer)
  }

  const handleBack = () => {
    Taro.redirectTo({ url: '/pages/stack-selection/index' })
  }

  const handleNext = () => {
    if (!questions.length) {
      return
    }

    if (sessionComplete && questions.length) {
      startSession(questions)
      return
    }

    if (askedIds.length >= maxQuestions) {
      setSessionComplete(true)
      return
    }

    const next = getRandomQuestion(questions, askedIds)
    if (!next) {
      setSessionComplete(true)
      return
    }

    const newAsked = [...askedIds, next.id]
    setCurrentQuestion(next)
    setAskedIds(newAsked)
    setShowAnswer(false)

    if (newAsked.length >= maxQuestions) {
      setSessionComplete(true)
    }
  }

  if (loading) {
    return (
      <View className='questions-page'>
        <Text className='questions-page__loading'>Loading interview questions…</Text>
      </View>
    )
  }

  return (
    <View className='questions-page'>
      <View className='questions-page__header'>
        <View className='questions-page__back-icon' onClick={handleBack}>
          <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M15 18L9 12L15 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
          </svg>
        </View>
        <Text className='questions-page__stack-name'>{stackLabel} Interview Questions</Text>
        {error && <Text className='questions-page__error'>{error}</Text>}
      </View>

      <View className='questions-page__card'>
        <View className='questions-page__meta'>
          <Text className='questions-page__badge'>{currentQuestion?.difficulty || 'unknown'}</Text>
        </View>
        <View className='questions-page__question-row' onClick={handleToggleAnswer}>
          <Text className='questions-page__question'>({progressLabel}) {currentQuestion?.question ?? 'No question loaded'}</Text>
          <Text className='questions-page__expand-icon'>{showAnswer ? 'hide answer' : 'show answer'}</Text>
        </View>

        {showAnswer && currentQuestion && (
          <View className='questions-page__answer'>
            <Text className='questions-page__answer-label'>Answer:</Text>
            <Text className='questions-page__answer-body'>{currentQuestion.answer}</Text>
          </View>
        )}

        {sessionComplete && (
          <Text className='questions-page__complete'>Session complete. Tap Next to restart.</Text>
        )}
      </View>

      <View className='questions-page__footer'>
        <View className='questions-page__actions'>
          <Button
            className='questions-page__button questions-page__button--primary'
            onClick={handleNext}
          >
            {sessionComplete ? 'Restart Session' : 'Next'}
          </Button>
        </View>
      </View>
    </View>
  )
}

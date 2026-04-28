import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'

import './index.scss'
import { STACK_METADATA } from '../../types/dataStructure'
import { QUESTIONS_PER_SESSION } from '../../utils/constants'

export default function StackSelection() {
  const [stacks] = useState(STACK_METADATA)
  const [error] = useState('')

  const handleStackTap = (stackId: string) => {
    Taro.navigateTo({
      url: `/pages/questions/index?stack=${stackId}`
    })
  }

  return (
    <View className='stack-selection'>
      <View className='stack-selection__header'>
        
        <Text className='stack-selection__title'>Interview Q&A</Text>
        <br />
        <Text className='stack-selection__subtitle'>Choose a stack and try 10 curated interview prompts</Text>
      </View>

      {error && <View className='stack-selection__error'>{error}</View>}

      <View className='stack-selection__cards'>
        {stacks.map(stack => (
          <View
            key={stack.id}
            className='stack-selection__card'
            onClick={() => handleStackTap(stack.id)}
            data-stack={stack.id}
          >
            <View className='stack-selection__icon'>{stack.icon}</View>
            <View className='stack-selection__content'>
              <Text className='stack-selection__name'>{stack.name}</Text>
              <Text className='stack-selection__description'>{stack.description}</Text>
            </View>
            <View className='stack-selection__badge'>{QUESTIONS_PER_SESSION}× sessions</View>
          </View>
        ))}
      </View>
    </View>
  )
}

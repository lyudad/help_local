import React from 'react'
import { mergeAll, flatten } from 'ramda'

import { Text } from 'components'
import { TouchableOpacity } from 'react-native'
import { color } from 'theme'
import { containerPresets } from './question-mark-in-black-circle.presets'
import { IQuestionMarkInBlackCircleProps } from './question-mark-in-black-circle.props'

export const QuestionMarkInBlackCircle = (
  props: IQuestionMarkInBlackCircleProps,
): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    onQuestionMarkPress,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  return (
    <TouchableOpacity onPress={onQuestionMarkPress} style={style}>
      <Text text='?' color={color.palette.white} />
    </TouchableOpacity>
  )
}

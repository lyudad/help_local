import React, { useCallback } from 'react'
import { mergeAll, flatten } from 'ramda'
import { TouchableOpacity } from 'react-native'

import { Text } from 'components'
import { color } from 'theme'
import { containerPresets } from './mode-changer-text.presets'
import { IModeChangerTextProps } from './mode-changer-text.props'

export const ModeChangerText = (props: IModeChangerTextProps): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    text,
    isActive,
    onToggle,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  const onPress = useCallback(onToggle, [isActive])
  return (
    <TouchableOpacity style={style} {...{ onPress }}>
      <Text
        preset='underlineBold'
        {...{ text }}
        color={isActive ? color.secondary : color.primary}
      />
    </TouchableOpacity>
  )
}

/* eslint-disable no-param-reassign */
import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/core'
import { TextStyle } from 'react-native'

import { Text } from 'components'
import { color } from 'theme'
import { IInlineTouchableTextProps } from './inline-touchable-text.props'

/**
 * The main problem that this components solves is the
 * vertical align of touchable text which is inside some inline text
 */
export const InlineTouchableText = ({
  text,
  onTextPress,
  textStyle,
}: IInlineTouchableTextProps): JSX.Element => {
  if (!textStyle) {
    textStyle = { color: color.secondary }
  }

  const [style, setStyle] = useState<TextStyle>(textStyle)
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout>>(
    null,
  )
  const onPress = (): void => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      setTimeoutId(null)
    }
    setStyle({
      ...style,
      color: color.palette.greySlow,
    })
    setTimeoutId(
      setTimeout(() => {
        setStyle({ ...style, ...textStyle })
        if (onTextPress) {
          onTextPress()
        }
      }, 600),
    )
  }
  useFocusEffect(
    useCallback(() => () => timeoutId && clearTimeout(timeoutId), [timeoutId]),
  )
  return <Text {...{ style, onPress, text }} />
}

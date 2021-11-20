import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { containerPresets } from './toast.presets'
import { ToastProps } from './toast.props'
import { Text } from '../text/text'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Toast(props: ToastProps): JSX.Element {
  // grab the props
  const { preset = 'success', styleContainer, text, tx } = props

  const containerStyle = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleContainer,
    ]),
  )

  return (
    <View style={containerStyle}>
      <Text
        text={text}
        tx={tx}
        color={preset === 'success' ? 'green' : 'red'}
      />
    </View>
  )
}

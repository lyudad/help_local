import * as React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import { BallIndicator } from 'react-native-indicators'

import { color } from 'theme'
import { containerPresets } from './loader.presets'
import { LoaderProps } from './loader.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Loader({
  preset = 'primary',
  styleContainer,
}: LoaderProps): JSX.Element {
  const containerStyle = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleContainer,
    ]),
  )

  return (
    <View style={containerStyle}>
      <BallIndicator color={color.primary} size={30} count={10} />
    </View>
  )
}

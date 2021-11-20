import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  height: '100%',
}

const GRADIENT: ViewStyle = {
  flex: 1,
  width: '100%',
  borderRadius: 5,
}
export function MaskedElement(): JSX.Element {
  return (
    <View style={CONTAINER}>
      <LinearGradient colors={['#FFFFFF', '#FFFFFF00']} style={GRADIENT} />
    </View>
  )
}

import React from 'react'
import { View, ViewStyle } from 'react-native'

import { color } from 'theme'

const FULL: ViewStyle = {
  flex: 1,
  backgroundColor: color.transparent,
  paddingHorizontal: '5%',
}

export const WithHorizontalPaddings = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: ViewStyle
}): JSX.Element => {
  return <View style={[FULL, style]}>{children}</View>
}

WithHorizontalPaddings.defaultProps = {
  style: {},
}

import React from 'react'
import { View, ViewStyle } from 'react-native'
import { color } from 'theme'

const VIEW: ViewStyle = {
  marginHorizontal: 1,
  backgroundColor: color.palette.white,
  shadowColor: color.secondary,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
}

interface PropsType {
  children: React.ReactNode
  style?: ViewStyle
  borderRadius?: number
}

export const ViewWithShadow = ({
  children,
  style,
  borderRadius,
}: PropsType): JSX.Element => {
  return <View style={{ ...VIEW, borderRadius, ...style }}>{children}</View>
}

ViewWithShadow.defaultProps = {
  style: {},
  borderRadius: 4,
}

import React from 'react'
import { View, Text, ViewStyle, TextStyle } from 'react-native'

interface LabelProps {
  text: string
  viewStyle: ViewStyle
  textStyle: TextStyle
}

export const Label = ({
  text,
  viewStyle,
  textStyle,
}: LabelProps): JSX.Element => {
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  )
}

interface RailProps {
  viewStyle: ViewStyle
}

export const Rail = ({ viewStyle }: RailProps): JSX.Element => {
  return <View style={viewStyle} />
}

interface RailSelectedProps {
  viewStyle: ViewStyle
}

export const RailSelected = ({ viewStyle }: RailSelectedProps): JSX.Element => {
  return <View style={viewStyle} />
}

interface ThumbProps {
  viewStyle: ViewStyle
}

export const Thumb = ({ viewStyle }: ThumbProps): JSX.Element => {
  return <View style={viewStyle} />
}

import React from 'react'
import { View, ViewStyle } from 'react-native'
import { RowSpaceBetweenProps } from './row-space-between.props'

const VIEW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}

export const RowSpaceBetween = ({
  StartItem,
  EndItem,
  style,
}: RowSpaceBetweenProps): JSX.Element => (
  <View style={{ ...VIEW, ...style }}>
    {StartItem}
    {EndItem}
  </View>
)

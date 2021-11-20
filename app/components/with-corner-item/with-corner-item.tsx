import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { cornerItemPresets, viewPresets } from './with-corner-item.presets'
import { WithCornerItemProps } from './with-corner-item.props'

export const WithCornerItem = (props: WithCornerItemProps): JSX.Element => {
  const { children, CornerItem, preset, style } = props

  const cornerItemStyle = mergeAll(
    flatten([cornerItemPresets[preset] || cornerItemPresets.primary]),
  )
  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, style]),
  )

  return (
    <View style={viewStyle}>
      {children}
      {CornerItem && <View style={cornerItemStyle}>{CornerItem}</View>}
    </View>
  )
}

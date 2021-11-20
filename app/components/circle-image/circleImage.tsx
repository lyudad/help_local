import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import FastImage from 'react-native-fast-image'

import {
  imagePresets,
  cornerItemPresets,
  viewPresets,
} from './circleImage.presets'
import { ICircleImageProps } from './circleImage.props'

export function CircleImage(props: ICircleImageProps): JSX.Element {
  const { preset = 'primary', source, size, cornerItem, ...rest } = props

  let borderRadius = 0
  if (size) {
    borderRadius = (size * 2) / 2
  } else {
    borderRadius = imagePresets[preset]
      ? imagePresets[preset].borderRadius
      : imagePresets.primary.borderRadius
  }

  const viewStyle = mergeAll(
    flatten([
      viewPresets[preset] || viewPresets.primary,
      size && { width: size, height: size },
    ]),
  )

  const imageStyle = mergeAll(
    flatten([
      imagePresets[preset] || imagePresets.primary,
      size && { width: size, height: size },
      { borderRadius },
    ]),
  )

  const cornerItemStyle = mergeAll(
    flatten([cornerItemPresets[preset] || cornerItemPresets.primary]),
  )

  return (
    <View style={viewStyle}>
      <FastImage source={source} style={imageStyle} {...rest} />
      {cornerItem && <View style={cornerItemStyle}>{cornerItem}</View>}
    </View>
  )
}

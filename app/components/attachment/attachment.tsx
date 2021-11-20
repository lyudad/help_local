import React from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, TouchableOpacity } from 'react-native'

import { RowSpaceBetween, SVGIcon, Text } from 'components'
import { color } from 'theme'
import { containerPresets, startItemPresets } from './attachment.presets'
import { IAttachmentProps } from './attachment.props'
import { CircleImage } from '../circle-image/circleImage'

export const Attachment = (props: IAttachmentProps): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    uri,
    text,
    onDeletePress,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )
  const startItemStyle = mergeAll(
    flatten([startItemPresets[preset] || startItemPresets.primary]),
  )

  let newText: string = text
  if (newText.length > 25) {
    newText = `${newText.substring(0, 25)}...`
  }

  return (
    <RowSpaceBetween
      style={style}
      StartItem={
        <View style={startItemStyle}>
          {uri ? (
            <CircleImage size={66} source={{ uri }} />
          ) : (
            <SVGIcon icon='attachment' color={color.primary} />
          )}
          <Text text='__' color={color.palette.white} />
          <Text {...{ text: newText }} preset='header5' />
        </View>
      }
      EndItem={
        <TouchableOpacity onPress={() => onDeletePress()}>
          <SVGIcon icon='cross' />
        </TouchableOpacity>
      }
    />
  )
}

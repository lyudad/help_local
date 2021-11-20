import React from 'react'
import { mergeAll, flatten } from 'ramda'
import { View } from 'react-native'

import { Text } from 'components'
import { circleViewPresets, letterPresets } from './avatar.presets'
import { IAvatarProps } from './avatar.props'
import { CircleImage } from '../circle-image/circleImage'

export const Avatar = (props: IAvatarProps): JSX.Element => {
  const { preset = 'primary', source, letter = 'A', size } = props

  let borderRadius = 0
  if (size) {
    borderRadius = (size * 2) / 2
  } else {
    borderRadius = circleViewPresets[preset]
      ? circleViewPresets[preset].borderRadius
      : circleViewPresets.primary.borderRadius
  }

  const circleViewStyle = mergeAll(
    flatten([
      circleViewPresets[preset] || circleViewPresets.primary,
      size && { width: size, height: size },
      { borderRadius },
    ]),
  )
  const letterStyle = mergeAll(
    flatten([letterPresets[preset] || letterPresets.primary]),
  )

  let newLetter: string = letter
  if (newLetter.length > 1) {
    newLetter = newLetter.charAt(0).toUpperCase()
  }

  return (
    <>
      {source ? (
        <CircleImage {...{ source, size }} />
      ) : (
        <View style={circleViewStyle}>
          <Text text={newLetter} style={letterStyle} />
        </View>
      )}
    </>
  )
}

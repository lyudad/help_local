import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import { HrProps } from './hr.props'
import { presets } from './hr.presets'

export const Hr = (props: HrProps): JSX.Element => {
  // grab the props
  const {
    preset = 'default',
    color,
    thickness,
    length,
    style: styleOverride,
    ...rest
  } = props

  // figure out which content to use
  const style = mergeAll(
    flatten([
      presets[preset] || presets.default,
      styleOverride,
      color && { borderColor: color },
      length && { width: length },
      thickness && { borderBottomWidth: thickness },
    ]),
  )

  return <View {...rest} style={style} />
}

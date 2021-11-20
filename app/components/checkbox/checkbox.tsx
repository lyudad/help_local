import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { SVGIcon, Text } from 'components'
import { color } from 'theme'
import { CheckboxProps } from './checkbox.props'
import {
  wrapperPresets,
  outlinePresets,
  fillPresets,
  textOnFillPresets,
  iconOnFillBoxPresets,
  labelPresets,
} from './checkbox.presets'

export function Checkbox(props: CheckboxProps) {
  const {
    preset = 'primary',
    iconOnFill,
    iconOnFillColor = color.palette.white,
    style,
    multiline,
    outlineStyle: outlineStyleOverride,
    fillStyle: fillStyleOverride,
    textOnFillStyle: textOnFillStyleOverride,
  } = props

  const numberOfLines = multiline ? 0 : 1

  const wrapperStyle = mergeAll(
    flatten([wrapperPresets[preset] || wrapperPresets.primary, style]),
  )
  const outlineStyle = mergeAll(
    flatten([
      outlinePresets[preset] || outlinePresets.primary,
      outlineStyleOverride,
    ]),
  )
  const fillStyle = mergeAll(
    flatten([fillPresets[preset] || fillPresets.primary, fillStyleOverride]),
  )
  const textOnFillStyle = mergeAll(
    flatten([
      textOnFillPresets[preset] || textOnFillPresets.primary,
      textOnFillStyleOverride,
    ]),
  )
  const iconOnFillBoxStyle = mergeAll(
    flatten([iconOnFillBoxPresets[preset] || iconOnFillBoxPresets.primary]),
  )
  const labelStyle = mergeAll(
    flatten([labelPresets[preset] || labelPresets.primary]),
  )

  const onPress = props.onToggle
    ? () => props.onToggle && props.onToggle(!props.value)
    : null

  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={!props.onToggle}
      onPress={onPress}
      style={wrapperStyle}
    >
      <View style={outlineStyle}>
        {props.value && (
          <View style={fillStyle}>
            {props.textOnFill && (
              <Text text={props.textOnFill} style={textOnFillStyle} />
            )}
            {iconOnFill && (
              <View style={iconOnFillBoxStyle}>
                <SVGIcon icon={iconOnFill} color={iconOnFillColor} />
              </View>
            )}
          </View>
        )}
      </View>
      <Text
        text={props.text}
        tx={props.tx}
        numberOfLines={numberOfLines}
        style={labelStyle}
      />
    </TouchableOpacity>
  )
}

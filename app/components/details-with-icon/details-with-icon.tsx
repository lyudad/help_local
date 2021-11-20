import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Text, SVGIcon } from 'components'
import { color } from 'theme'
import {
  containerPresets,
  titlePresets,
  contentPresets,
  itemPresets,
  itemTextsViewPresets,
} from './details-with-icon.presets'
import { DetailsWithIconProps } from './details-with-icon.props'

export function DetailsWithIcon(props: DetailsWithIconProps): JSX.Element {
  const {
    preset = 'primary',
    title,
    items,
    style,
    titleStyle: titleStyleOverride,
    contentStyle: contentStyleOverride,
    iconColor = color.primary,
    iconSize = 27,
  } = props

  const containerStyle = mergeAll(
    flatten([containerPresets[preset] || containerPresets.primary, style]),
  )
  const titleStyle = mergeAll(
    flatten([titlePresets[preset] || titlePresets.primary, titleStyleOverride]),
  )
  const contentStyle = mergeAll(
    flatten([
      contentPresets[preset] || contentPresets.primary,
      contentStyleOverride,
    ]),
  )
  const itemStyle = mergeAll(
    flatten([itemPresets[preset] || itemPresets.primary]),
  )
  const itemTextsViewStyle = mergeAll(
    flatten([itemTextsViewPresets[preset] || itemTextsViewPresets.primary]),
  )

  return (
    <View style={containerStyle}>
      {title && <Text text={title} preset='header3bold' style={titleStyle} />}
      <View style={contentStyle}>
        {items.map((item) => (
          <View key={item.name}>
            <View key={item.name} style={itemStyle}>
              <SVGIcon icon={item.icon} color={iconColor} size={iconSize} />
              <View style={itemTextsViewStyle}>
                <Text text={item.name} preset='subtitle' />
                <Text text={item.value} preset='header4bold' />
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  )
}

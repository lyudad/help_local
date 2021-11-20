import React from 'react'
import { mergeAll, flatten } from 'ramda'
import { TextStyle, View } from 'react-native'

import { translate } from 'i18n'
import FlipToggle from 'react-native-flip-toggle-button'
import { color } from 'theme'
import { containerPresets } from './toggle.presets'
import { IToggleProps } from './toggle.props'

export const Toggle = (props: IToggleProps): JSX.Element => {
  const { preset = 'primary', style: styleOverride, value, onToggle } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  const toggleText: TextStyle = {
    color: value ? color.primary : color.secondary,
  }

  return (
    <View style={style}>
      <FlipToggle
        value={value}
        buttonWidth={75}
        buttonHeight={30}
        buttonRadius={50}
        sliderWidth={24}
        sliderHeight={24}
        sliderRadius={50}
        onLabel={translate('common.on')}
        offLabel={translate('common.off')}
        buttonOnColor={color.transparent}
        buttonOffColor={color.transparent}
        sliderOffColor={color.palette.lighterGrey}
        sliderOnColor={color.primary}
        labelStyle={toggleText}
        onToggle={() => onToggle()}
      />
    </View>
  )
}

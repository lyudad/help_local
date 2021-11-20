import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Range2, Text } from 'components'
import { containerPresets, rangePresets } from './range-with-title.presets'
import { IRangeWithTitleProps } from './range-with-title.props'
import { ShowError } from '../show-error'

export const RangeWithTitle = (props: IRangeWithTitleProps): JSX.Element => {
  const {
    preset = 'primary',
    style,
    rangeStyle: rangeStyleOverride,
    min = 0,
    max = 30,
    onValueChanged,
    withoutTitle = false,
    value,
    error,
    isShorter = false,
  } = props

  const containerStyle = mergeAll(
    flatten([containerPresets[preset] || containerPresets.primary, style]),
  )

  const rangeStyle = mergeAll(
    flatten([rangePresets[preset] || rangePresets.primary, rangeStyleOverride]),
  )

  return (
    <View style={containerStyle}>
      {!withoutTitle && (
        <Text tx='rangeWithTitle.howFar' preset='header4slim' />
      )}
      <Range2
        isShorter={isShorter}
        {...{ min, max, value }}
        style={rangeStyle}
        onValueChanged={onValueChanged}
      />
      <ShowError text={error} />
    </View>
  )
}

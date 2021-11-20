import React, { useCallback } from 'react'
import RangeSlider from 'rn-range-slider'
import { mergeAll, flatten } from 'ramda'
import { View, ViewStyle } from 'react-native'

import { Text } from 'components'
import { translate } from 'i18n'
import {
  // Label,
  Rail,
  RailSelected,
  Thumb,
} from './additional-elements'
import { RangeProps } from './range.props'
import {
  rangePresets,
  labelPresets,
  labelTextPresets,
  railPresets,
  railSelectedPresets,
  thumbPresets,
} from './range.presets'

export const Range = ({
  style,
  preset = 'primary',
  disableRange = false,
  onValueChanged,
  min = 0,
  max = 30,
  value,
}: RangeProps): JSX.Element => {
  const rangeStyle = mergeAll(
    flatten([rangePresets[preset] || rangePresets.primary, style]),
  )
  const labelStyle = mergeAll(
    flatten([labelPresets[preset] || labelPresets.primary]),
  )
  const labelTextStyle = mergeAll(
    flatten([labelTextPresets[preset] || labelTextPresets.primary]),
  )
  const railStyle = mergeAll(
    flatten([railPresets[preset] || railPresets.primary]),
  )
  const railSelectedStyle = mergeAll(
    flatten([railSelectedPresets[preset] || railSelectedPresets.primary]),
  )
  const thumbStyle = mergeAll(
    flatten([thumbPresets[preset] || thumbPresets.primary]),
  )

  const renderThumb = useCallback(() => <Thumb viewStyle={thumbStyle} />, [])
  const renderRail = useCallback(() => <Rail viewStyle={railStyle} />, [])
  const renderRailSelected = useCallback(
    () => <RailSelected viewStyle={railSelectedStyle} />,
    [],
  )

  let percentOfMovingLabelToRight = 1
  if (value > 0) {
    percentOfMovingLabelToRight = Math.ceil((value / max) * 100) - 7
  }
  if (percentOfMovingLabelToRight < 1) {
    percentOfMovingLabelToRight = 1
  }
  if (percentOfMovingLabelToRight > 80) {
    percentOfMovingLabelToRight = 80
  }
  const LABEL_VIEW_ADDITION: ViewStyle = {
    left: `${percentOfMovingLabelToRight}%`,
  }

  /*
  const renderLabel = useCallback(
    (value) => (
      <Label textStyle={labelTextStyle} viewStyle={labelStyle} text={value} />
    ),
    [],
  ) */

  // const handleValueChange = useCallback(onValueChanged, [])

  return (
    <>
      <RangeSlider
        style={rangeStyle}
        {...{ min, max }}
        step={1}
        // floatingLabel
        low={value}
        disableRange={disableRange}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        // renderLabel={renderLabel}
        onValueChanged={onValueChanged}
      />
      <View style={{ ...labelStyle, ...LABEL_VIEW_ADDITION }}>
        <Text
          text={`${value ? value.toString() : 0} ${translate('common.miles')}`}
          style={labelTextStyle}
        />
      </View>
    </>
  )
}

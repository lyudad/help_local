import React from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, ViewStyle } from 'react-native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'

import { Text } from 'components'
import { translate } from 'i18n'
import { ALIGN_SELF_START, WINDOW_WIDTH } from 'constants/common-styles'
import { Range2Props } from './range2.props'
import {
  rangePresets,
  labelPresets,
  labelTextPresets,
  railPresets,
  railSelectedPresets,
  thumbPresets,
} from './range2.presets'

export const Range2 = ({
  style,
  preset = 'primary',
  disableRange = false,
  onValueChanged,
  min = 0,
  max = 30,
  value,
  isShorter,
}: Range2Props): JSX.Element => {
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

  return (
    <>
      <MultiSlider
        // onValuesChangeStart={this.disableScroll}
        // onValuesChangeFinish={this.enableScroll}
        onValuesChange={(v) => onValueChanged(v[0], v[1])}
        containerStyle={rangeStyle}
        trackStyle={railStyle}
        selectedStyle={railSelectedStyle}
        sliderLength={WINDOW_WIDTH - (isShorter ? 82 : 70)}
        {...{ min, max }}
        markerStyle={thumbStyle}
        enabledOne={!disableRange}
        values={[value]}
      />
      <View
        style={{
          ...labelStyle,
          ...LABEL_VIEW_ADDITION,
          ...ALIGN_SELF_START,
        }}
      >
        <Text
          text={`${value ? value.toString() : 0} ${translate('common.miles')}`}
          style={labelTextStyle}
        />
      </View>
    </>
  )
}

import * as React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { MaterialIndicator } from 'react-native-indicators'
import { mergeAll, flatten } from 'ramda'

import { ROW } from 'constants/common-styles'
import { color, spacing } from 'theme'
import { Text } from '../text/text'
import { viewPresets, textPresets } from './button.presets'
import { ButtonProps } from './button.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Button(props: ButtonProps) {
  // grab the props
  const {
    preset = 'primary',
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    componentBeforeText,
    loadingIndicatorColor = color.palette.white,
    ...rest
  } = props

  const viewStyle = mergeAll(
    flatten([
      viewPresets[preset] || viewPresets.primary,
      styleOverride,
      componentBeforeText && ROW,
    ]),
  )
  const textStyle = mergeAll(
    flatten([
      textPresets[preset] || textPresets.primary,
      textStyleOverride,
      componentBeforeText && {
        paddingHorizontal: 0,
        paddingRight: spacing[4],
        paddingLeft: spacing[2],
      },
    ]),
  )

  const componentBeforeTextWrapperStyle = mergeAll(
    flatten([{ paddingLeft: spacing[3] }]),
  )

  const content = children || <Text tx={tx} text={text} style={textStyle} />

  return (
    <TouchableOpacity style={viewStyle} {...rest}>
      {componentBeforeText && !preset.includes('Loading') && (
        <View style={componentBeforeTextWrapperStyle}>
          {componentBeforeText}
        </View>
      )}
      {preset.includes('Loading') ? (
        <Text>
          <MaterialIndicator
            color={loadingIndicatorColor}
            size={20}
            count={20}
          />
        </Text>
      ) : (
        content
      )}
    </TouchableOpacity>
  )
}

/* eslint-disable */
import * as React from 'react'
import {
  View,
  TextInput,
  TextInputProps,
  ViewStyle,
  Keyboard,
  Platform,
} from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Text, ShowError, SVGIcon } from 'components'
import { translate } from 'i18n'
import { color, spacing } from 'theme'
import {
  wrapperPresets,
  viewPresets,
  inputPresets,
  errorViewPresets,
  errorTextPresets,
  leftPartPresets,
  leftTextPresets,
  rightTextContainerPresets,
  rightTextPresets,
} from './input.presets'
import { InputProps } from './input.props'

const LEFT_ICON_CONTAINER: ViewStyle = {
  marginRight: spacing[4],
}

export function Input(props: InputProps & TextInputProps): JSX.Element {
  const {
    preset = 'primary',
    placeholder,
    leftIcon,
    leftText,
    rightText,
    presetLeftText,
    colorLeftText,
    rigthIcon,
    placeholderTextColor = color.placeholder,
    wrapperStyle: wrapperStyleOverride,
    styleContainer,
    style: styleOverride,
    errorTx,
    errorText,
    disabled,
    numberOfLines,
    onBlur,
    onFocus,
    ...rest
  } = props

  const i18nText = placeholder && translate(placeholder)
  const [plcHolder, setPlcHolder] = React.useState<string>(i18nText)
  React.useEffect(() => setPlcHolder(i18nText), [placeholder, i18nText])
  const wrapperStyle = mergeAll(
    flatten([
      wrapperPresets[preset] || wrapperPresets.primary,
      wrapperStyleOverride,
    ]),
  )
  let viewStyle: ViewStyle = mergeAll(
    flatten([
      viewPresets[preset] || viewPresets.primary,
      styleContainer,
      {
        ...(disabled && {
          backgroundColor: color.palette.background,
          borderColor: color.palette.middleGrey,
        }),
        ...(numberOfLines &&
          ({
            height: numberOfLines * 17 + 36,
          } as ViewStyle)),
        ...((errorText || errorTx) && {
          borderColor: color.error,
          borderWidth: 2,
        }),
      },
    ]),
  )
  const inputStyle = mergeAll(
    flatten([
      inputPresets[preset] || inputPresets.primary,
      styleOverride,
      { ...(disabled && { color: color.palette.moreGrey }) },
      {
        ...(numberOfLines &&
          Platform.OS === 'ios' &&
          ({ height: numberOfLines * 17 + 30 } as ViewStyle)),
      },
    ]),
  )
  const errorViewStyle = mergeAll(
    flatten([errorViewPresets[preset] || errorViewPresets.primary]),
  )
  const errorTextStyle = mergeAll(
    flatten([errorTextPresets[preset] || errorTextPresets.primary]),
  )
  const leftPartStyle = mergeAll(
    flatten([leftPartPresets[preset] || leftPartPresets.primary]),
  )
  const leftTextStyle = mergeAll(
    flatten([leftTextPresets[preset] || leftTextPresets.primary]),
  )
  const rightTextContainerStyle = mergeAll(
    flatten([rightTextContainerPresets[preset] || leftPartPresets.primary]),
  )
  const rightTextStyle = mergeAll(
    flatten([rightTextPresets[preset] || leftPartPresets.primary]),
  )
  const placeHolderColor = placeholderTextColor || color.palette.black

  return (
    <View style={wrapperStyle}>
      <View style={viewStyle}>
        <View style={leftPartStyle}>
          {leftIcon && (
            <View style={LEFT_ICON_CONTAINER}>
              <SVGIcon icon={leftIcon} />
            </View>
          )}
          {leftText && (
            <Text
              text={leftText}
              preset={presetLeftText}
              color={colorLeftText}
              style={leftTextStyle}
            />
          )}
          {rightText && (
            <View style={rightTextContainerStyle}>
              <Text
                text={rightText}
                preset={presetLeftText}
                color={colorLeftText}
                style={rightTextStyle}
              />
            </View>
          )}
          <TextInput
            editable={!disabled}
            style={inputStyle}
            {...{
              ...rest,
              ...{ numberOfLines },
            }}
            placeholder={plcHolder}
            placeholderTextColor={placeHolderColor}
            onSubmitEditing={Keyboard.dismiss}
            onFocus={(e) => {
              setPlcHolder('')
              if (onFocus) onFocus(e)
            }}
            onBlur={(e) => {
              setPlcHolder(i18nText)
              if (onBlur) onBlur(e)
            }}
          />
        </View>
        {rigthIcon && <SVGIcon icon={rigthIcon} />}
      </View>
      {(errorTx !== '' || errorText !== '') && (
        <ShowError
          style={errorViewStyle}
          {...{ errorTextStyle }}
          text={errorText || translate(errorTx)}
        />
      )}
    </View>
  )
}

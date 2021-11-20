import React, { useState } from 'react'
import { View, TextInput, TextInputProps } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { translate } from 'i18n'
import { color } from 'theme'
import { SVGIcon } from '../svg-icon'
import {
  viewPresets,
  dropdownPresets,
  dropdownInputPresets,
  globalWrapperPresets,
} from './dropdownInput.presets'
import { DropdownInputProps } from './dropdownInput.props'

export const DropdownInput = (
  props: DropdownInputProps & TextInputProps,
): JSX.Element => {
  // grab the props
  const {
    preset = 'primary',
    children,
    placeholder,
    placeholderTextColor,
    styleContainer,
    styleDropdown,
    leftIcon,
    style: styleOverride,
    showCommonPlaceholder,
    onChangeText,
    defaultValue,
    globalWrapperStyle,
    isSearchingMode,
    changeValue,
    ...rest
  } = props

  const [value, setValue] = useState<string>(defaultValue || '')
  if (changeValue) {
    setValue(changeValue)
  }

  const i18nText =
    (placeholder && translate(placeholder)) ||
    (showCommonPlaceholder && translate('dropdownInput.commonPlaceholder'))

  const mergedGlobalWrapperStyle = mergeAll(
    flatten([
      globalWrapperPresets[preset] || globalWrapperPresets.primary,
      globalWrapperStyle,
    ]),
  )

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleContainer]),
  )
  const inputStyle = mergeAll(
    flatten([
      dropdownInputPresets[preset] || dropdownInputPresets.primary,
      styleOverride,
    ]),
  )
  const dropDownStyle = mergeAll(
    flatten([
      dropdownPresets[preset] || dropdownPresets.primary,
      styleDropdown,
    ]),
  )

  const placeHolderColor = placeholderTextColor || color.palette.black

  return (
    <View style={mergedGlobalWrapperStyle}>
      <View style={viewStyle}>
        {leftIcon && <SVGIcon icon={leftIcon} />}
        <TextInput
          value={value}
          style={inputStyle}
          {...rest}
          placeholder={i18nText}
          onChangeText={(text) => {
            if (onChangeText) {
              onChangeText(text)
            }
            setValue(text)
          }}
          placeholderTextColor={placeHolderColor}
        />

        <SVGIcon
          icon={isSearchingMode ? 'chevronRight' : 'chevronDown'}
          width={isSearchingMode ? 20 : 11}
          height={isSearchingMode ? 11 : 20}
        />
      </View>
      {isSearchingMode && <View style={dropDownStyle}>{children}</View>}
    </View>
  )
}

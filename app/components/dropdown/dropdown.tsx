/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  View,
  TouchableOpacity as TouchableOpacity2,
  ViewStyle,
} from 'react-native'
import { mergeAll, flatten } from 'ramda'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'

import { SVGIcon } from '../svg-icon'
import { Text } from '../text/text'
import {
  wrapperPresets,
  viewPresets,
  dropdownPresets,
} from './dropdown.presets'
import { DropdownProps, IChild } from './dropdown.props'
import { ShowError } from 'components'
import { translate } from 'i18n'
import { color } from 'theme'

export function Dropdown(props: DropdownProps): JSX.Element {
  const {
    preset = 'primary',
    children,
    placeholder,
    placeholderTextColor,
    styleContainer,
    styleDropdown,
    style: styleOverride,
    isItemsContainerRelative,
    dropdownTouchableItemStyle,
    isItemsContainerScrollable,
    dropdownScrollViewStyle,
    isCloseSelector,
    errorText,
    errorTx,
    onDropdownOpen,
    onDropdownClose,
  } = props

  const [isOpen, toggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    if (isCloseSelector) {
      toggleDropdown(false)
    }
  }, [isCloseSelector])

  const style = mergeAll(
    flatten([wrapperPresets[preset] || wrapperPresets.primary, styleOverride]),
  )

  const viewStyle = mergeAll(
    flatten([
      viewPresets[preset] || viewPresets.primary,
      styleContainer,
      {
        ...((errorText || errorTx) && {
          borderColor: color.error,
          borderWidth: 2,
        }),
      },
    ]),
  )

  const dropDownStyle = mergeAll(
    flatten([
      dropdownPresets[preset] || dropdownPresets.primary,
      styleDropdown,
      isItemsContainerRelative &&
        ({
          position: 'relative',
          top: 1,
        } as ViewStyle),
    ]),
  )

  const onItemPress = (child) => {
    toggleDropdown(false)
    if (isOpen) {
      child.props.action()
    }
  }

  return (
    <View style={style}>
      <TouchableOpacity2
        style={viewStyle}
        onPress={() => {
          if (isOpen && onDropdownClose) onDropdownClose()
          if (!isOpen && onDropdownOpen) onDropdownOpen()
          toggleDropdown(!isOpen)
        }}
      >
        <Text text={placeholder} color={placeholderTextColor} />
        <SVGIcon icon={isOpen ? 'chevronRight' : 'chevronDown'} size={11} />
      </TouchableOpacity2>
      {isOpen &&
        (isItemsContainerScrollable ? (
          <View style={dropDownStyle}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={dropdownScrollViewStyle}
            >
              {children.map(
                (child: IChild): JSX.Element => (
                  <TouchableOpacity2
                    style={dropdownTouchableItemStyle}
                    key={child.props.childKey}
                    onPress={() => {
                      onItemPress(child)
                    }}
                  >
                    {child}
                  </TouchableOpacity2>
                ),
              )}
            </ScrollView>
          </View>
        ) : (
          <View style={dropDownStyle}>
            {children.map(
              (child: IChild): JSX.Element => (
                <TouchableOpacity
                  containerStyle={dropdownTouchableItemStyle}
                  key={child.props.childKey}
                  onPress={() => {
                    onItemPress(child)
                  }}
                >
                  {child}
                </TouchableOpacity>
              ),
            )}
          </View>
        ))}
      {(errorTx !== '' || errorText !== '') && (
        <ShowError
          //style={errorViewStyle}
          //{...{ errorTextStyle }}
          text={errorText || translate(errorTx)}
        />
      )}
    </View>
  )
}

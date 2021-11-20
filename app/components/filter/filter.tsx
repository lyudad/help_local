import React, { useState } from 'react'
import { mergeAll, flatten } from 'ramda'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import { BOTTOM_NAVIGATION_HEIGHT, SVGIcon, Text } from 'components'
import { color } from 'theme'
import LinearGradient from 'react-native-linear-gradient'
import { WINDOW_HEIGHT } from 'constants/common-styles'
import {
  containerPresets,
  btnPresets,
  headerPresets,
  miniBoxPresets,
  hrPresets,
} from './filter.presets'
import { IFilterProps } from './filter.props'
import { RowSpaceBetween } from '../space-between/row-space-between'
import { Button } from '../button/button'
import { ViewWithShadow } from '../view-with-shadow/view-with-shadow'
import { Hr } from '../hr/hr'

export const Filter = (props: IFilterProps): JSX.Element => {
  const {
    preset = 'primary',
    children,
    style: styleOverride,
    onApplyPress,
    onClearAllPress,
    onClosePress,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )
  const btnStyle = mergeAll(flatten([btnPresets[preset] || btnPresets.primary]))
  const headerStyle = mergeAll(
    flatten([headerPresets[preset] || headerPresets.primary]),
  )
  const miniBoxStyle = mergeAll(
    flatten([miniBoxPresets[preset] || miniBoxPresets.primary]),
  )
  const hrStyle = mergeAll(flatten([hrPresets[preset] || hrPresets.primary]))

  const [isGradient, setIsGradient] = useState<boolean>(true)

  const GRADIENT: ViewStyle = {
    height: 70,
    width: '105%',
    position: 'absolute',
    zIndex: 9,
    bottom: 77,
  }

  return (
    <ViewWithShadow style={style}>
      {isGradient && (
        <LinearGradient colors={['#FFFFFF00', '#FFFFFF']} style={GRADIENT} />
      )}
      <RowSpaceBetween
        style={headerStyle}
        StartItem={<Text tx='common.filters' preset='header4bold' />}
        EndItem={
          <View style={miniBoxStyle}>
            <TouchableOpacity onPress={() => onClearAllPress()}>
              <Text
                tx='common.clearAll'
                preset='subtitleBolderLink'
                color={color.primary}
              />
            </TouchableOpacity>
            <Text text='__' color={color.palette.white} />
            <TouchableOpacity onPress={() => onClosePress()}>
              <SVGIcon icon='cross' />
            </TouchableOpacity>
          </View>
        }
      />
      <Hr style={hrStyle} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        onScroll={(e) => {
          const {
            layoutMeasurement,
            contentOffset,
            contentSize,
          } = e.nativeEvent
          setIsGradient(
            Math.round(contentSize.height) >
              WINDOW_HEIGHT - (BOTTOM_NAVIGATION_HEIGHT + 154) &&
              Math.round(layoutMeasurement?.height) +
                Math.round(contentOffset?.y) <
                Math.round(contentSize.height) - 20,
          )
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'position'}
        >
          {children}
        </KeyboardAvoidingView>
      </ScrollView>
      <Button
        tx='common.applyFilter'
        preset='secondary'
        style={btnStyle}
        onPress={onApplyPress}
      />
    </ViewWithShadow>
  )
}

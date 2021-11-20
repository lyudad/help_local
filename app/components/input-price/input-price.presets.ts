import { ViewStyle, Platform } from 'react-native'

import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {}

const BASE_INPUT: ViewStyle = {
  paddingLeft: Platform.OS === 'ios' ? 30 : 20,
}

const BASE_DOLLAR: ViewStyle = {
  position: 'absolute',
  top: 13,
  left: 15,
}

const BASE_HR: ViewStyle = {
  position: 'absolute',
  top: 13,
  right: 15,
}

const PADDING_LEFT: ViewStyle = {
  paddingLeft: spacing[6] + 4,
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const inputPresets: { primary: ViewStyle } = {
  primary: { ...BASE_INPUT },
}

export const dollarPresets: { primary: ViewStyle } = {
  primary: { ...BASE_DOLLAR },
}

export const hrPresets: { primary: ViewStyle } = {
  primary: { ...BASE_HR },
}

export const paddingLeft: { primary: ViewStyle } = {
  primary: { ...PADDING_LEFT },
}

export type IInputPricePresetNames = keyof typeof containerPresets

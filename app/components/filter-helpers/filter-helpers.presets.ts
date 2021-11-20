import { ViewStyle } from 'react-native'

const BASE_CONTAINER: ViewStyle = {}

const BASE_BTN: ViewStyle = {}

const DROPDOWN: ViewStyle = {
  position: 'relative',
  top: 0,
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const btnPresets: { primary: ViewStyle } = {
  primary: { ...BASE_BTN },
}

export const dropdownPresets: { primary: ViewStyle } = {
  primary: { ...DROPDOWN },
}

export type IFilterHelpersPresetNames = keyof typeof containerPresets

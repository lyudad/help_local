import { ViewStyle } from 'react-native'

const BASE_CONTAINER: ViewStyle = {}

const BASE_BTN: ViewStyle = {}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const btnPresets: { primary: ViewStyle } = {
  primary: { ...BASE_BTN },
}

export type IHeaderClientFilterPresetNames = keyof typeof containerPresets

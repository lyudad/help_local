import { TextStyle, ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {}
const BASE_TITLE: TextStyle = {}
const BASE_BTNS_WRAPPER: ViewStyle = {
  marginTop: spacing[4],
}
const BASE_BTNS: ViewStyle = {
  width: '47%',
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}
export const titlePresets: { primary: TextStyle } = {
  primary: { ...BASE_TITLE },
}
export const btnsWrapperPresets: { primary: ViewStyle } = {
  primary: { ...BASE_BTNS_WRAPPER },
}
export const btnsPresets: { primary: ViewStyle } = {
  primary: { ...BASE_BTNS },
}

export type ITwoButtonsWithTitlePresetNames = keyof typeof containerPresets

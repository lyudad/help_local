import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.lightGreen,
  paddingHorizontal: '5%',
  paddingVertical: spacing[2] - 1,
  width: '100%',
}
const BASE_TEXT: TextStyle = {
  fontSize: 13,
  fontWeight: 'normal',
  color: color.palette.black,
}
const BASE_BTN_TEXT: TextStyle = {
  fontSize: 13,
  fontWeight: 'bold',
  color: color.palette.primary,
  textDecorationLine: 'underline',
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}
export const textPresets: { primary: TextStyle } = {
  primary: { ...BASE_TEXT },
}
export const btnTextPresets: { primary: TextStyle } = {
  primary: { ...BASE_BTN_TEXT },
}

export type InfoWithUndoBtnPresetNames = keyof typeof containerPresets

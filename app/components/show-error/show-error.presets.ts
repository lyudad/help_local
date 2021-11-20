import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_VIEW: ViewStyle = {
  alignSelf: 'flex-start',
  paddingTop: spacing[1],
}

const BASE_ERROR_TEXT: TextStyle = {
  color: color.error,
}

export const viewPresets: {
  primary: ViewStyle
} = {
  primary: { ...BASE_VIEW },
}

export const errorTextPresets: {
  primary: ViewStyle
} = {
  primary: { ...BASE_ERROR_TEXT },
}

/**
 * A list of preset names.
 */
export type IShowErrorPresetsNames = keyof typeof viewPresets

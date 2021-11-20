import { ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  borderWidth: 1,
  borderColor: color.palette.grey,
  padding: spacing[4],
  borderRadius: 4,
  minHeight: 145,
}

const BASE_INNERE_ROW: ViewStyle = {
  flexDirection: 'row',
}

const BASE_INPUT_ON_ROW: ViewStyle = {
  position: 'absolute',
  top: 28,
  left: 11,
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const innereRowPresets: { primary: ViewStyle } = {
  primary: { ...BASE_INNERE_ROW },
}

export const inputOnRowPresets: { primary: ViewStyle } = {
  primary: { ...BASE_INPUT_ON_ROW },
}

export type IHelperDescriptionInputPresetNames = keyof typeof containerPresets

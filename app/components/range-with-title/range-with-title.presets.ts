import { ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  paddingBottom: spacing[4],
}

const BASE_RANGE: ViewStyle = {
  marginTop: spacing[4],
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}
export const rangePresets: { primary: ViewStyle } = {
  primary: { ...BASE_RANGE },
}

export type IRangeWithTitlePresetNames = keyof typeof containerPresets

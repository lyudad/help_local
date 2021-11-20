import { ViewStyle } from 'react-native'
import { color } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  borderColor: color.secondary,
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export type ISsnInputPresetNames = keyof typeof containerPresets

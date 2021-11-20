import { ViewStyle } from 'react-native'
import { color } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  width: 80,
  height: 30,
  backgroundColor: color.palette.background,
  borderRadius: 50,
  alignItems: 'center',
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export type ITogglePresetNames = keyof typeof containerPresets

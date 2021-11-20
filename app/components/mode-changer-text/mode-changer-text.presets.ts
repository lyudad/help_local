import { ViewStyle } from 'react-native'

const BASE_CONTAINER: ViewStyle = {}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export type IModeChangerTextPresetNames = keyof typeof containerPresets

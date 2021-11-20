import { ViewStyle } from 'react-native'
import { color } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  width: 18,
  height: 18,
  backgroundColor: color.secondary,
  borderRadius: 15,
  justifyContent: 'center',
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export type IQuestionMarkInBlackCirclePresetNames = keyof typeof containerPresets

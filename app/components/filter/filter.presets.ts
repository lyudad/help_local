import { ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  padding: spacing[4],
}

const BASE_BTN: ViewStyle = {
  marginVertical: spacing[2],
}

const BASE_HEADER: ViewStyle = {
  alignItems: 'center',
}

const BASE_MINI_BOX: ViewStyle = {
  flexDirection: 'row',
}

const BASE_HR: ViewStyle = {
  marginVertical: spacing[2],
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const btnPresets: { primary: ViewStyle } = {
  primary: { ...BASE_BTN },
}

export const headerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_HEADER },
}

export const miniBoxPresets: { primary: ViewStyle } = {
  primary: { ...BASE_MINI_BOX },
}

export const hrPresets: { primary: ViewStyle } = {
  primary: { ...BASE_HR },
}

export type IFilterPresetNames = keyof typeof containerPresets

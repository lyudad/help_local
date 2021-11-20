import { ViewStyle } from 'react-native'

const BASE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const BASE_START_ITEM: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const startItemPresets: { primary: ViewStyle } = {
  primary: { ...BASE_START_ITEM },
}

export type IAttachmentPresetNames = keyof typeof containerPresets

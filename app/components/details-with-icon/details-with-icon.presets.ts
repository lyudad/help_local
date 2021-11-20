import { ViewStyle, TextStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {}
const BASE_TITLE: TextStyle = {}
const BASE_CONTENT: ViewStyle = {
  paddingTop: spacing[3],
}
const BASE_ITEM: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginVertical: spacing[1] + 2,
}
const BASE_ITEM_TEXTS_VIEW: ViewStyle = {
  marginLeft: spacing[5] - 2,
  alignItems: 'flex-start',
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}
export const titlePresets: { primary: TextStyle } = {
  primary: { ...BASE_TITLE },
}
export const contentPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTENT },
}
export const itemPresets: { primary: ViewStyle } = {
  primary: { ...BASE_ITEM },
}
export const itemTextsViewPresets: { primary: ViewStyle } = {
  primary: { ...BASE_ITEM_TEXTS_VIEW },
}

export type DetailsWithIconPresetNames = keyof typeof containerPresets

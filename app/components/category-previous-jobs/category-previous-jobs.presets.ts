import { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_WRAPPER: ViewStyle = {
  width: '100%',
  marginTop: spacing[3],
}

const BASE_MODAL_ITEM: ViewStyle = {
  width: '100%',
  marginTop: spacing[3],
  paddingBottom: spacing[3],
  borderBottomWidth: 1,
  borderBottomColor: color.palette.black01,
}
const BASE_MODAL_ITEM_TITLE: ViewStyle = {
  alignItems: 'center',
  marginBottom: spacing[1],
}
const BASE_MODAL_ITEM_TOP_PART: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: spacing[2],
}
const BASE_MODAL_ITEM_BOTTOM_PART: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const BASE_CIRCLE_AVATAR: ImageStyle = {
  borderRadius: 24,
  marginRight: spacing[3],
  height: 34,
  width: 34,
}
const BASE_MODAL_BTN: ViewStyle = {
  width: 80,
  height: 24,
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.primary,
}
const BASE_ROW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}

export const wrapperPresets: { primary: ViewStyle } = {
  primary: { ...BASE_WRAPPER },
}

export const modalItemPresets: { primary: ViewStyle } = {
  primary: { ...BASE_MODAL_ITEM },
}

export const modalItemTitlePresets: { primary: ViewStyle } = {
  primary: { ...BASE_MODAL_ITEM_TITLE },
}

export const modalItemTopPartPresets: { primary: ViewStyle } = {
  primary: { ...BASE_MODAL_ITEM_TOP_PART },
}

export const modalItemBottomPartPresets: { primary: ViewStyle } = {
  primary: { ...BASE_MODAL_ITEM_BOTTOM_PART },
}

export const circleAvatarPresets: { primary: ImageStyle } = {
  primary: { ...BASE_CIRCLE_AVATAR },
}

export const modalBtnPresets: { primary: TextStyle } = {
  primary: { ...BASE_MODAL_BTN },
}

export const rowContainerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_ROW_CONTAINER },
}

export type ICategoryPreviousJobsPresetNames = keyof typeof modalItemPresets

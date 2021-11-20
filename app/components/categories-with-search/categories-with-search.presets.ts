import { TextStyle, ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  marginVertical: spacing[2],
}

const BASE_LIST_WRAPPER: ViewStyle = {
  marginTop: spacing[5] - 2,
}

const BASE_LIST_ITEM: ViewStyle = {
  marginVertical: spacing[2],
}

const LEFT_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const BASE_CHECKBOX: ViewStyle = {
  marginRight: spacing[1],
}

const BASE_TRASH: ViewStyle = {
  marginRight: 10,
  position: 'relative',
  // top: -11,
}

const BASE_PRICE_TEXT: TextStyle = {
  fontSize: 14,
  fontWeight: '300',
}

const BASE_EDIT_PRICE_INPUT: ViewStyle = {
  width: 120,
}

const CHANGE_TYPE_BTN: ViewStyle = {
  alignSelf: 'flex-end',
  marginTop: spacing[1],
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const listWrapperPresets: { primary: ViewStyle } = {
  primary: { ...BASE_LIST_WRAPPER },
}

export const listItemPresets: { primary: ViewStyle } = {
  primary: { ...BASE_LIST_ITEM },
}

export const leftViewPresets: { primary: ViewStyle } = {
  primary: { ...LEFT_VIEW },
}

export const checkboxPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CHECKBOX },
}

export const trashPresets: { primary: ViewStyle } = {
  primary: { ...BASE_TRASH },
}

export const priceTextPresets: { primary: TextStyle } = {
  primary: { ...BASE_PRICE_TEXT },
}

export const editPriceInputPresets: { primary: ViewStyle } = {
  primary: { ...BASE_EDIT_PRICE_INPUT },
}

export const changeTypeBtnPresets: { primary: ViewStyle } = {
  primary: { ...CHANGE_TYPE_BTN },
}

export type CategoriesWithSearchPresetNames = keyof typeof containerPresets

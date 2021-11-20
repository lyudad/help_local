import { TextStyle, ViewStyle } from 'react-native'
import { color, spacing, typography } from 'theme'

const BASE_VIEW: ViewStyle = {}

const BASE_INPUT_BOX: ViewStyle = {
  width: '100%',
  height: 45,
  borderRadius: 4,
  alignItems: 'center',
  borderWidth: 1,
  backgroundColor: color.palette.white,
  flexDirection: 'row',
  borderColor: color.palette.black,
  paddingLeft: spacing[4],
}

const BASE_INPUT: TextStyle = {
  fontFamily: typography.primary,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[2],
  fontSize: 14,
  flex: 1,
  color: color.secondary,
}

const BASE_ARROW_VIEW: ViewStyle = {
  height: 40,
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: spacing[4],
}

const BASE_DROPDOWN_CONTAINER: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  padding: spacing[4],
  alignItems: 'flex-start',
  zIndex: 1,
  marginHorizontal: 1,

  shadowColor: color.secondary,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}

const BASE_DROPDOWN_ITEM: ViewStyle = {
  flexDirection: 'row',
  marginTop: spacing[2],
}

export const viewPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_VIEW,
  },
}

export const inputBoxPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_INPUT_BOX,
  },
}

export const inputPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_INPUT,
  },
}

export const arrowViewPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_ARROW_VIEW,
  },
}

export const dropdownContainerPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_DROPDOWN_CONTAINER,
  },
}

export const dropdownItemPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_DROPDOWN_ITEM,
  },
}

/**
 * A list of preset names.
 */
export type SearchCategoryDropdownPresetNames = keyof typeof viewPresets

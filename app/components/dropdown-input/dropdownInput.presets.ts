import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing, typography } from 'theme'

const BASE_GLOBAL_WARAPPER = {}

const BASE_VIEW: ViewStyle = {
  width: '100%',
  height: 52,
  borderRadius: 4,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.dim,
  backgroundColor: color.palette.white,
}

const BASE_PLACEHOLDER: TextStyle = {
  fontFamily: typography.primary,
  color: color.placeholder,
  paddingVertical: spacing[3],
  fontSize: 14,
}

const BASE_DROPDOWN: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  position: 'absolute',
  top: 56,
  padding: spacing[4],
  alignItems: 'flex-start',
  zIndex: 1,

  shadowColor: color.secondary,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}

export const globalWrapperPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_GLOBAL_WARAPPER,
  },
}

export const viewPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_VIEW,
    flexDirection: 'row',
    borderColor: color.palette.black,
    paddingHorizontal: spacing[4],
  },
}

export const dropdownInputPresets: { primary: TextStyle } = {
  primary: {
    ...BASE_PLACEHOLDER,
    flex: 1,
    color: color.secondary,
  },
}

export const dropdownPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_DROPDOWN,
  },
}

/**
 * A list of preset names.
 */
export type DropdownInputPresetNames = keyof typeof viewPresets

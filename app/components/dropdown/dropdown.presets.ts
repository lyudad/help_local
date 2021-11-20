import { ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_WRPAPPER: ViewStyle = {}

const BASE_VIEW: ViewStyle = {
  width: '100%',
  height: 45,
  borderRadius: 4,
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: color.dim,
  backgroundColor: color.palette.white,
}

const BASE_DROPDOWN: ViewStyle = {
  width: '100%',
  backgroundColor: color.palette.white,
  position: 'absolute',
  top: 56,
  padding: spacing[4],
  alignItems: 'flex-start',
  zIndex: 10,

  shadowColor: color.secondary,
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}

export const wrapperPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_WRPAPPER,
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

export const dropdownPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_DROPDOWN,
  },
}

export type DropdownPresetNames = keyof typeof viewPresets

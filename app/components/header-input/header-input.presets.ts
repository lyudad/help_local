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
  flex: 1,
  fontFamily: typography.primary,
  fontSize: 14,
  paddingHorizontal: spacing[4],
  marginBottom: -spacing[2] + 4,
  color: color.secondary,
}

const BASE_RIGHT_ICON_VIEW: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: spacing[4],
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

export const rightIconViewPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_RIGHT_ICON_VIEW,
  },
}

/**
 * A list of preset names.
 */
export type HeaderInputPresetNames = keyof typeof viewPresets

import { ViewStyle, TextStyle, Platform } from 'react-native'
import { color, spacing, typography } from 'theme'

const BASE_WRAPPER: ViewStyle = {}

const BASE_VIEW: ViewStyle = {
  width: '100%',
  height: 46,
  borderRadius: 4,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: spacing[4],
  borderWidth: 1,
  borderColor: color.dim,
  backgroundColor: color.palette.white,
}

const LEFT_PART: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const BASE_PLACEHOLDER: TextStyle = {
  width: '100%',
  fontFamily: typography.primary,
  color: color.secondary,
  fontSize: 14,
}
const BASE_INPUT: TextStyle = {
  top: Platform.OS === 'android' ? 2 : 0,
}

const LEFT_TEXT: TextStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginLeft: spacing[4],
}

const RIGHT_TEXT_CONTAINER: ViewStyle = {
  flex: 1,
}

const RIGHT_TEXT: TextStyle = {
  textAlign: 'right',
}

const BASE_ERROR_VIEW: ViewStyle = {
  alignSelf: 'flex-start',
  paddingTop: spacing[1],
}

const BASE_ERROR_TEXT: TextStyle = {
  color: color.error,
}

export const wrapperPresets: {
  primary: ViewStyle
} = {
  primary: { ...BASE_WRAPPER },
}

export const viewPresets: {
  primary: ViewStyle
  centered: ViewStyle
  milestone: ViewStyle
} = {
  primary: { ...BASE_VIEW },
  centered: { ...BASE_VIEW },
  milestone: { ...BASE_VIEW },
}
export const leftPartPresets: {
  primary: ViewStyle
} = {
  primary: { ...LEFT_PART },
}
export const leftTextPresets: {
  primary: ViewStyle
  milestone: ViewStyle
} = {
  primary: { ...LEFT_TEXT },
  milestone: { ...LEFT_TEXT },
}

export const rightTextContainerPresets: {
  primary: ViewStyle
  milestone: ViewStyle
} = {
  primary: { ...RIGHT_TEXT_CONTAINER },
  milestone: { ...RIGHT_TEXT_CONTAINER },
}
export const rightTextPresets: {
  primary: TextStyle
  milestone: TextStyle
} = {
  primary: { ...RIGHT_TEXT },
  milestone: { ...RIGHT_TEXT },
}

export const inputPresets: {
  primary: TextStyle
  centered: TextStyle
  milestone: TextStyle & ViewStyle
} = {
  primary: {
    ...BASE_PLACEHOLDER,
    ...BASE_INPUT,
  },
  centered: {
    ...BASE_PLACEHOLDER,
    textAlign: 'center',
  },
  milestone: {
    ...BASE_PLACEHOLDER,
    width: 'auto',
    paddingRight: spacing[3],
    paddingLeft: 0,
  },
}

export const errorViewPresets: {
  primary: ViewStyle
} = {
  primary: { ...BASE_ERROR_VIEW },
}

export const errorTextPresets: {
  primary: ViewStyle
} = {
  primary: { ...BASE_ERROR_TEXT },
}

/**
 * A list of preset names.
 */
export type InputPresetNames = keyof typeof viewPresets

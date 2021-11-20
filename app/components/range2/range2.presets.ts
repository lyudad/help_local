import { ViewStyle, TextStyle, Platform } from 'react-native'
import { color, spacing } from 'theme'

const BASE_RANGE: ViewStyle = {
  alignItems: 'center',
}

const BASE_LABEL_VIEW: ViewStyle = {
  position: 'relative',
  alignItems: 'flex-start',
  marginTop: spacing[2],
}

const BASE_LABEL_TEXT: TextStyle = {
  fontSize: 16,
  color: color.secondary,
}

const BASE_RAIL_VIEW: ViewStyle = {
  height: 14,
  borderRadius: 100,
  backgroundColor: color.palette.white,

  ...Platform.select({
    ios: {
      shadowColor: color.secondary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,

      elevation: 4,
    },
    default: {
      backgroundColor: color.palette.milky,
    },
  }),
}

const BASE_RAIL_SELECTED_VIEW: ViewStyle = {
  height: 14,
  backgroundColor: color.primary,
  borderRadius: 100,
}

const THUMB_RADIUS = 12
const BASE_THUMB_VIEW: ViewStyle = {
  width: THUMB_RADIUS * 2,
  height: THUMB_RADIUS * 2,
  borderRadius: THUMB_RADIUS,
  backgroundColor: color.palette.greenSlow,
  top: 6,
  zIndex: 99999999,
}

export const rangePresets: {
  primary: ViewStyle
} = {
  primary: { ...BASE_RANGE },
}

export const labelPresets: {
  primary: ViewStyle
} = {
  primary: {
    ...BASE_LABEL_VIEW,
  },
}

export const labelTextPresets: {
  primary: TextStyle
} = {
  primary: {
    ...BASE_LABEL_TEXT,
  },
}

export const railPresets: {
  primary: ViewStyle
} = {
  primary: {
    ...BASE_RAIL_VIEW,
  },
}

export const railSelectedPresets: {
  primary: ViewStyle
} = {
  primary: {
    ...BASE_RAIL_SELECTED_VIEW,
  },
}

export const thumbPresets: {
  primary: ViewStyle
} = {
  primary: {
    ...BASE_THUMB_VIEW,
  },
}

/**
 * A list of preset names.
 */
export type RangePresetNames = keyof typeof rangePresets

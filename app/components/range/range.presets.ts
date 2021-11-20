import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_RANGE: ViewStyle = {}

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
  flex: 1,
  height: 14,
  borderRadius: 100,
  backgroundColor: color.palette.milky,
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

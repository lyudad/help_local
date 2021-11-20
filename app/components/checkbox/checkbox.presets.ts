import { TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_WRAPPER: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: spacing[1],
  alignSelf: 'flex-start',
}

const BASE_DIMENSIONS = { width: 17, height: 17 }

const BASE_OUTLINE: ViewStyle = {
  ...BASE_DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 4,
  borderColor: color.secondary,
  borderWidth: 1,
  backgroundColor: color.palette.white,
}

const BASE_FILL: ViewStyle = {
  width: BASE_DIMENSIONS.width,
  height: BASE_DIMENSIONS.height,
  backgroundColor: color.primary,
  borderRadius: 4,
  borderWidth: 0,
}

const BASE_TEXT_ON_FILL_STYLE: TextStyle = {
  color: color.secondary,
  position: 'absolute',
  top: -4,
  left: 4,
  fontSize: 9,
}

const BASE_ICON_ON_FILL_BOX_STYLE: ViewStyle = {
  paddingTop: 4,
  paddingLeft: 3,
}

const BASE_LABEL: TextStyle = { paddingLeft: spacing[2] }

export const wrapperPresets: { primary: ViewStyle } = {
  primary: { ...BASE_WRAPPER },
}

export const outlinePresets: {
  primary: ViewStyle
  secondary: ViewStyle
} = {
  primary: { ...BASE_OUTLINE },
  secondary: { ...BASE_OUTLINE, backgroundColor: color.secondary },
}

export const fillPresets: {
  primary: ViewStyle
  secondary: ViewStyle
} = {
  primary: { ...BASE_FILL },
  secondary: { ...BASE_FILL, backgroundColor: color.secondary },
}

export const textOnFillPresets: { primary: TextStyle } = {
  primary: { ...BASE_TEXT_ON_FILL_STYLE },
}

export const iconOnFillBoxPresets: { primary: ViewStyle } = {
  primary: { ...BASE_ICON_ON_FILL_BOX_STYLE },
}

export const labelPresets: { primary: TextStyle } = {
  primary: { ...BASE_LABEL },
}

export type CheckboxPresetNames = keyof typeof outlinePresets

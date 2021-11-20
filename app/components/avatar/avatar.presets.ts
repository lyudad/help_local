import { TextStyle, ViewStyle } from 'react-native'
import { color } from 'theme'

const BASE_CIRCLE_VIEW: ViewStyle = {
  backgroundColor: color.secondary,
  height: 50,
  width: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
}

const BASE_LETTER: TextStyle = {
  paddingTop: 14,
  color: color.palette.white,
  fontSize: 26,
  fontWeight: '300',
}

export const circleViewPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CIRCLE_VIEW },
}

export const letterPresets: { primary: TextStyle } = {
  primary: { ...BASE_LETTER },
}

export type IAvatarPresetNames = keyof typeof circleViewPresets

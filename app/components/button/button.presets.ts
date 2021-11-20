import { ViewStyle, TextStyle } from 'react-native'
import { color, spacing, typography } from 'theme'

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[3] + 2,
  paddingHorizontal: spacing[1],
  borderRadius: 4,
  justifyContent: 'center',
  alignItems: 'center',
  maxHeight: 47,
}

const BASE_TEXT: TextStyle = {
  paddingHorizontal: spacing[4],
  fontFamily: typography.primary,
  fontSize: 13,
  fontWeight: 'bold',
  lineHeight: 19.5,
  color: color.palette.white,
  textTransform: 'uppercase',
}

export const viewPresets: {
  primary: ViewStyle
  primaryLoading: ViewStyle
  primaryDisabled: ViewStyle
  secondary: ViewStyle
  secondaryLoading: ViewStyle
  secondaryDisabled: ViewStyle
  transparent: ViewStyle
  fourth: ViewStyle
  fifth: ViewStyle
  sixthLoading: ViewStyle
  sixth: ViewStyle
  seventh: ViewStyle
  eighth: ViewStyle
  nineth: ViewStyle
  ninethLoading: ViewStyle
  tenth: ViewStyle
  link: ViewStyle
  disabled: ViewStyle
} = {
  primary: {
    ...BASE_VIEW,
    backgroundColor: color.primary,
    alignSelf: 'stretch',
  },
  primaryLoading: {
    ...BASE_VIEW,
    backgroundColor: color.palette.lighterGreen,
    alignSelf: 'stretch',
  },
  primaryDisabled: {
    ...BASE_VIEW,
    backgroundColor: color.palette.lighterGreen,
    alignSelf: 'stretch',
  },
  secondary: {
    ...BASE_VIEW,
    backgroundColor: color.secondary,
    alignSelf: 'stretch',
  },
  secondaryLoading: {
    ...BASE_VIEW,
    backgroundColor: color.palette.black05,
    alignSelf: 'stretch',
  },
  secondaryDisabled: {
    ...BASE_VIEW,
    backgroundColor: color.palette.black05,
    alignSelf: 'stretch',
  },
  transparent: {
    ...BASE_VIEW,
    backgroundColor: color.transparent,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.palette.white,
  },
  fourth: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
    alignSelf: 'stretch',
    shadowColor: color.secondary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  fifth: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.palette.secondary,
  },
  sixth: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.palette.primary,
    paddingVertical: spacing[2],
  },
  sixthLoading: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: color.palette.primary,
    paddingVertical: spacing[2],
  },
  seventh: {
    ...BASE_VIEW,
    backgroundColor: color.palette.white,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: color.secondary,
    paddingVertical: spacing[3],
  },
  eighth: {
    ...BASE_VIEW,
    backgroundColor: color.palette.secondary,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: color.palette.white,
    paddingVertical: spacing[3],
  },
  ninethLoading: {
    ...BASE_VIEW,
    backgroundColor: color.palette.greySlow,
    alignSelf: 'stretch',
  },
  nineth: {
    ...BASE_VIEW,
    backgroundColor: color.palette.soGrey,
    alignSelf: 'stretch',
  },
  tenth: {
    ...BASE_VIEW,
    backgroundColor: color.palette.secondary,
    alignSelf: 'stretch',
    borderWidth: 1,
    borderColor: color.palette.white,
    paddingVertical: spacing[2],
  },
  /**
   * A button without extras.
   */
  link: {
    ...BASE_VIEW,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: 'flex-end',
  },
  disabled: {
    ...BASE_VIEW,
    backgroundColor: color.palette.background,
  },
}

export const textPresets: {
  primary: TextStyle
  secondary: TextStyle
  secondaryLoading: TextStyle
  transparent: TextStyle
  fourth: TextStyle
  fifth: TextStyle
  sixth: TextStyle
  sixthLoading: TextStyle
  seventh: TextStyle
  link: TextStyle
  eighth: TextStyle
  nineth: TextStyle
  disabled: TextStyle
} = {
  primary: {
    ...BASE_TEXT,
  },
  secondary: {
    ...BASE_TEXT,
  },
  secondaryLoading: {
    ...BASE_TEXT,
  },
  transparent: {
    ...BASE_TEXT,
  },
  fourth: {
    ...BASE_TEXT,
    color: color.palette.black,
  },
  fifth: {
    ...BASE_TEXT,
    color: color.palette.black,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 19,
  },
  sixth: {
    ...BASE_TEXT,
    color: color.primary,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  sixthLoading: {
    ...BASE_TEXT,
    color: color.primary,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  seventh: {
    ...BASE_TEXT,
    color: color.palette.grey,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 21,
  },
  eighth: {
    ...BASE_TEXT,
    color: color.palette.white,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 19,
  },
  nineth: {
    ...BASE_TEXT,
    color: color.secondary,
    lineHeight: 19,
  },
  link: {
    ...BASE_TEXT,
    color: color.palette.secondary,
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 15.72,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  disabled: {
    ...BASE_TEXT,
    color: color.palette.moreGrey,
  },
}

/**
 * A list of preset names.
 */
export type ButtonPresetNames = keyof typeof viewPresets

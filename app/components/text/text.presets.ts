import { TextStyle } from 'react-native'
import { color, typography } from 'theme'

/**
 * All text will start off looking like this.
 */
const BASE: TextStyle = {
  fontFamily: typography.primary,
  color: color.secondary,
  fontSize: 15,
  lineHeight: 21,
  textAlign: 'center',
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets: {
  default: TextStyle
  bold: TextStyle
  underline: TextStyle
  underlineBold: TextStyle
  superLarge: TextStyle
  largest: TextStyle
  header1: TextStyle
  header2plusBold: TextStyle
  header2: TextStyle
  header2bold: TextStyle
  header3: TextStyle
  header3_500: TextStyle
  header3bold: TextStyle
  header4: TextStyle
  header4bold: TextStyle
  header4slim: TextStyle
  header5bold: TextStyle
  header5: TextStyle
  header5slimmest: TextStyle
  smallest: TextStyle
  smallestBold: TextStyle
  subtitle: TextStyle
  subtitleBolder: TextStyle
  subtitleBold: TextStyle
  subtitleBoldLink: TextStyle
  subtitleBolderLink: TextStyle
  link: TextStyle
  linkBolder: TextStyle
  linkBold: TextStyle
  linkBoldBlack: TextStyle
  privacyPollicy: TextStyle
  privacyPollicyUnderline: TextStyle
  iconSlimest: TextStyle

  // old
  fieldLabel: TextStyle
  secondary: TextStyle
} = {
  /**
   * The default text styles.
   */
  default: BASE,

  /**
   * A bold version of the default text.
   */
  bold: { ...BASE, fontWeight: 'bold' },

  /**
   * A underline version of the default text.
   */
  underline: { ...BASE, textDecorationLine: 'underline' },

  /**
   * A underline&bold version of the default text.
   */
  underlineBold: {
    ...BASE,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  /**
   * Large headers.
   */
  // new version
  superLarge: {
    ...BASE,
    fontSize: 45,
    lineHeight: 67,
    fontWeight: 'bold',
  },
  largest: {
    ...BASE,
    fontSize: 35,
    lineHeight: 67,
    fontWeight: '700',
    fontFamily: typography.bold,
  },
  header1: {
    ...BASE,
    fontSize: 30,
    fontWeight: 'bold',
    lineHeight: 34,
  },
  header2plusBold: {
    ...BASE,
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 37,
  },
  header2: {
    ...BASE,
    fontSize: 21,
    fontWeight: '400',
    lineHeight: 31.5,
  },
  header2bold: {
    ...BASE,
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 31.5,
  },
  header3_500: {
    ...BASE,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 27,
  },
  header3: {
    ...BASE,
    fontSize: 18,
    fontWeight: '600',
  },
  header3bold: {
    ...BASE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header4: {
    ...BASE,
    fontSize: 15,
    fontWeight: '600',
    lineHeight: 22.5,
  },
  header4bold: {
    ...BASE,
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22.5,
  },
  header4slim: {
    ...BASE,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22.5,
  },
  smallest: {
    ...BASE,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 15.72,
  },
  smallestBold: {
    ...BASE,
    fontSize: 11,
    fontWeight: 'bold',
    lineHeight: 15.72,
  },
  header5bold: {
    ...BASE,
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 21,
  },
  header5: {
    ...BASE,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 21,
  },
  header5slimmest: {
    ...BASE,
    fontSize: 14,
    fontWeight: '300',
    lineHeight: 21,
  },
  subtitle: {
    ...BASE,
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 18,
  },
  subtitleBolder: {
    ...BASE,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  subtitleBold: {
    ...BASE,
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  subtitleBolderLink: {
    ...BASE,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    textDecorationLine: 'underline',
  },
  subtitleBoldLink: {
    ...BASE,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    textDecorationLine: 'underline',
  },
  link: {
    ...BASE,
    fontSize: 13,
    fontWeight: 'normal',
    lineHeight: 18,
    color: color.primary,
    textDecorationLine: 'underline',
  },
  linkBolder: {
    ...BASE,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
    color: color.primary,
    textDecorationLine: 'underline',
  },
  linkBold: {
    ...BASE,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    color: color.primary,
    textDecorationLine: 'underline',
  },
  linkBoldBlack: {
    ...BASE,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    color: color.palette.black,
    textDecorationLine: 'underline',
  },
  privacyPollicy: {
    ...BASE,
    fontSize: 11,
    fontWeight: 'normal',
    lineHeight: 16,
    color: color.palette.black05,
  },
  privacyPollicyUnderline: {
    ...BASE,
    fontSize: 11,
    fontWeight: 'normal',
    lineHeight: 16,
    color: color.palette.black05,
    textDecorationLine: 'underline',
  },
  iconSlimest: {
    ...BASE,
    fontSize: 30,
    fontWeight: '100',
    lineHeight: 30,
  },
  // old version
  /* header2: {
    ...BASE,
    fontSize: 18,
    fontWeight: 'normal',
    lineHeight: 27,
  } as TextStyle,
  header2bold: {
    ...BASE,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 27,
  } as TextStyle, */

  /**
   * Field labels that appear on forms above the inputs.
   */
  fieldLabel: { ...BASE, fontSize: 12, color: color.dim },
  /**
   * A smaller piece of secondard information.
   */
  secondary: { ...BASE, fontSize: 9, color: color.dim },
}

/**
 * A list of preset names.
 */
export type TextPresets = keyof typeof presets

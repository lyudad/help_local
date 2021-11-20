import { ViewStyle } from 'react-native'
import { color } from 'theme'

/**
 * All lines will start off looking like this.
 */
const BASE: ViewStyle = {
  width: '100%',
  borderBottomWidth: 1,
  borderColor: color.palette.lightGrey,
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const presets: {
  default: ViewStyle
  shorter: ViewStyle
} = {
  /**
   * The default line styles.
   */
  default: BASE,

  /**
   * 90% width
   */
  shorter: {
    ...BASE,
    width: '90%',
  },
}

/**
 * A list of preset names.
 */
export type HrPresetsNames = keyof typeof presets

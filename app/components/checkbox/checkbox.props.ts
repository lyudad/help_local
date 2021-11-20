import { ViewStyle, TextStyle } from 'react-native'
import { CheckboxPresetNames } from './checkbox.presets'

export interface CheckboxProps {
  /**
   * Additional container style. Useful for margins.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * Additional outline style.
   */
  outlineStyle?: ViewStyle | ViewStyle[]

  /**
   * Additional fill style. Only visible when checked.
   */
  fillStyle?: ViewStyle | ViewStyle[]

  /**
   * Additional style for text on fill box. Only visible when checked.
   */
  textOnFillStyle?: TextStyle

  /**
   * Text will be shown in the fill box when checked.
   */
  textOnFill?: string

  /**
   * SVG icon will be shown in the fill box when checked.
   */
  iconOnFill?: string

  /**
   * SVG icon size
   */
  iconOnFillColor?: string

  /**
   * Is the checkbox checked?
   */
  value?: boolean

  /**
   * The text to display if there isn't a tx.
   */
  text?: string

  /**
   * The i18n lookup key.
   */
  tx?: string

  /**
   * Multiline or clipped single line?
   */
  multiline?: boolean

  /**
   * Fires when the user tabs to change the value.
   */
  onToggle?: (newValue: boolean) => void

  preset?: CheckboxPresetNames
}

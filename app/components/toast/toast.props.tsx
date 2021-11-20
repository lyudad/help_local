import { ViewStyle } from 'react-native'

export interface ToastProps {
  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string
  /**
   * Text which is looked up via i18n.
   */
  tx?: string
  /**
   * An optional style of Modal Container which override useful for padding & margin.
   */
  styleContainer?: ViewStyle | ViewStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: 'success' | 'dangerous'
}

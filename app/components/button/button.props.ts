import { ReactNode } from 'react'
import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native'
import { ButtonPresetNames } from './button.presets'

export interface ButtonProps extends TouchableOpacityProps {
  /**
   * Text which is looked up via i18n.
   */
  tx?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  componentBeforeText?: ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: ViewStyle | ViewStyle[]

  /**
   * An optional style override useful for the button text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: ButtonPresetNames

  disabled?: boolean

  loadingIndicatorColor?: string

  /**
   * One of the different types of text presets.
   */
  children?: React.ReactNode
}

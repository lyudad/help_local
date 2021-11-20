import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native'
import { InputPresetNames } from './input.presets'
import { TextPresets } from '../text/text.presets'

export interface InputProps extends TouchableOpacityProps {
  /**
   *Placeholder text which is looked up via i18n.
   */
  placeholder?: string

  /**
   * Placeholder text color
   */
  placeholderTextColor?: string

  /**
   * Left icon name in input
   */
  leftIcon?: string

  /**
   * Left text - before  input
   */
  leftText?: string
  /**
   * Left text presets
   */
  presetLeftText?: TextPresets
  /**
   * Left text color
   */
  colorLeftText?: string
  /**
   * Right text presets
   */
  rightText?: string
  /**
   * Right text presets
   */
  presetRightText?: TextPresets
  /**
   * Right text color
   */
  colorRightText?: string

  /**
   * Right icon name in input
   */
  rigthIcon?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * Error tx
   */
  errorTx?: string

  /**
   * Error text
   */
  errorText?: string

  /**
   * An optional style override useful for input.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  style?: any

  /**
   * An optional style override useful for padding & margin.
   */
  styleContainer?: ViewStyle | ViewStyle[]

  /**
   * Global wrapper style
   */
  wrapperStyle?: ViewStyle

  /* An optional style override useful for the input text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * Editable or not
   */
  disabled?: boolean

  /**
   * One of the different types of text presets.
   */
  preset?: InputPresetNames
}

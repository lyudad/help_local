import { ViewStyle, TextStyle, TouchableOpacityProps } from 'react-native'
import { DropdownInputPresetNames } from './dropdownInput.presets'

export interface DropdownInputProps extends TouchableOpacityProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * default start value
   */
  defaultValue?: string

  /**
   *
   */
  changeValue?: string

  /**
   *
   */
  leftIcon?: string

  /**
   * If true, variants block is shown
   */
  isSearchingMode?: boolean

  /**
   * This prop can be used to update children when user starts to type
   */
  onChangeText?: (text: string) => void

  /**
   *Placeholder text which is looked up via i18n.
   */
  placeholder?: string

  /**
   *Placeholder text which is looked up via i18n.
   */
  showCommonPlaceholder?: boolean

  /**
   * Placeholder text color
   */
  placeholderTextColor?: string

  /**
   * The text to display if not using `tx` or nested components.
   */
  text?: string

  /**
   * An optional style override useful for input.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  style?: any

  /**
   * An optional style override useful for input.
   */
  globalWrapperStyle?: ViewStyle

  /**
   * An optional style override useful for padding & margin.
   */
  styleContainer?: ViewStyle | ViewStyle[]

  /**
   * An optional style for dropdown.
   */
  styleDropdown?: ViewStyle | ViewStyle[]

  /* An optional style override useful for the input text.
   */
  textStyle?: TextStyle | TextStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: DropdownInputPresetNames
}

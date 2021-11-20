import { ViewStyle } from 'react-native'
import { DropdownPresetNames } from './dropdown.presets'

export interface DropdownProps {
  /**
   * Children components.
   */
  children?: React.ReactNode[]

  style?: ViewStyle

  /**
   *Placeholder text which is looked up via i18n.
   */
  placeholder?: string

  /**
   * Placeholder text color
   */
  placeholderTextColor?: string

  /**
   * An optional style override useful for padding & margin.
   */
  styleContainer?: ViewStyle | ViewStyle[]

  /**
   * An optional style for dropdown.
   */
  styleDropdown?: ViewStyle | ViewStyle[]
  /**
   * An optional style for dropdown
   */
  dropdownTouchableItemStyle?: ViewStyle | ViewStyle[]

  /**
   * if true then the dropdown's items container  will be relative
   */
  isItemsContainerRelative?: boolean

  isItemsContainerScrollable?: boolean

  dropdownScrollViewStyle?: ViewStyle | ViewStyle[]

  /**
   * close dropdown when user click clear all
   */
  isCloseSelector?: boolean

  /**
   * Error tx
   */
  errorTx?: string

  /**
   * Error text
   */
  errorText?: string

  onDropdownOpen?: () => void
  onDropdownClose?: () => void

  /**
   * One of the different types of text presets.
   */
  preset?: DropdownPresetNames
}

export interface IChild {
  props: ChildrenProps
}
type ChildrenProps = {
  childKey: string
  action: () => void
}

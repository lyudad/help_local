import { ViewStyle } from 'react-native'
import { IDropdownWithTextItemsPresetNames } from './dropdown-with-text-items.presets'

export interface IDropdownWithTextItemsProps {
  items: string[]

  onItemPress: (pressedItemIndex: number, itemText: string) => void

  style?: ViewStyle

  placeholder?: string

  placeholderTextColor?: string

  styleContainer?: ViewStyle | ViewStyle[]

  styleDropdown?: ViewStyle | ViewStyle[]

  dropdownScrollViewStyle?: ViewStyle | ViewStyle[]

  isItemsContainerRelative?: boolean

  isItemsContainerScrollable?: boolean

  showsVerticalScrollIndicator?: boolean

  errorTx?: string

  errorText?: string

  onDropdownOpen?: () => void
  onDropdownClose?: () => void

  preset?: IDropdownWithTextItemsPresetNames
}

import { ViewStyle } from 'react-native'
import { HeaderInputPresetNames } from './header-input.presets'

export interface HeaderInputPresetProps {
  style?: ViewStyle
  showCommonPlaceholder?: boolean
  placeholder?: string
  placeholderColor?: string
  disabled?: boolean

  filterActivityStatusFromParent?: 'active' | 'not-active'

  /**
   *Action for input filter
   */
  toggleFilterModal?: () => void

  /**
   * By default input value gets selected category name
   */
  resetInputValueAfterCategorySelected?: boolean
  /**
   * One of the different types of text presets.
   */
  preset?: HeaderInputPresetNames
}

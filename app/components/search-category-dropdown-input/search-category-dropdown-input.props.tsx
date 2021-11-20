import { ICategory, IChosenCategory } from 'app/interfaces/common/category'
import { ViewStyle } from 'react-native'
import { SearchCategoryDropdownPresetNames } from './search-category-dropdown-input.presets'

export interface SearchCategoryDropdownProps {
  onSelectCategory: (category: ICategory) => void
  onIsShowAllCategiriesModeChanged?: (isOpened: boolean) => void
  onIsSearchingModeChanged?: (isOpened: boolean) => void
  style?: ViewStyle
  showCommonPlaceholder?: boolean
  placeholder?: string
  placeholderColor?: string
  disabled?: boolean
  error?: string
  isCloseSelector?: boolean
  isResetInputValue?: boolean
  isShowAllCategiriesMode?: boolean
  isSearchingMode?: boolean
  /**
   * this prop is used to exclude categories that were already chosen
   */
  chosenCategories?: Array<IChosenCategory>
  /**
   * By default input value gets selected category name
   */
  resetInputValueAfterCategorySelected?: boolean
  /**
   * One of the different types of text presets.
   */
  preset?: SearchCategoryDropdownPresetNames
}

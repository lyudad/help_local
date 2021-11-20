import { ViewStyle } from 'react-native'

import { IChosenCategory } from 'app/interfaces/common/category'
import { CategoriesWithSearchPresetNames } from './categories-with-search.presets'

export interface CategoriesWithSearchProps {
  style?: ViewStyle
  isEditMode?: boolean
  useTrashInEditMode?: boolean
  chosenCategories: Array<IChosenCategory>
  onChosenCategoriesChange: (newChosenCategories: IChosenCategory[]) => void
  toggleCheck: (id: number) => void
  toggleType: (id: number) => void
  addCategory: (category: IChosenCategory) => void
  removeCategory: (id: number) => void
  changePrice: (price: string, categoryId: number) => void
  error?: string
  /**
   * One of the different types of text presets.
   */
  preset?: CategoriesWithSearchPresetNames
}

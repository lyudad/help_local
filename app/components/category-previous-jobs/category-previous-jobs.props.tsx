import { ICategory } from 'interfaces'
import { ViewStyle } from 'react-native'
import { ICategoryPreviousJobsPresetNames } from './category-previous-jobs.presets'

export interface ICategoryPreviousJobsProps {
  category: ICategory
  shouldNavigateToPostJob?: boolean

  style?: ViewStyle
  preset?: ICategoryPreviousJobsPresetNames
}

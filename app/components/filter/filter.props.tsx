import { ViewStyle } from 'react-native'
import { IFilterPresetNames } from './filter.presets'

export interface IFilterProps {
  children: React.ReactNode
  style?: ViewStyle
  onClearAllPress: () => void
  onClosePress: () => void
  onApplyPress: () => void
  /**
   * One of the different types of text presets.
   */
  preset?: IFilterPresetNames
}

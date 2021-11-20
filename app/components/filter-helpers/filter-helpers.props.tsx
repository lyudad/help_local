import { ViewStyle } from 'react-native'
import { IFilterHelpersPresetNames } from './filter-helpers.presets'

export interface IFilterHelpersApplyData {
  maxHourlyRate?: number
  text?: string
}

export interface IFilterHelpersProps {
  style?: ViewStyle

  onClosePress: () => void

  onFilterHelpersApply?: (filterData: IFilterHelpersApplyData) => void

  preset?: IFilterHelpersPresetNames
}

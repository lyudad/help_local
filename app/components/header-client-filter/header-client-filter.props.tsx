import { ViewStyle } from 'react-native'
import { IHeaderClientFilterPresetNames } from './header-client-filter.presets'

export interface IFilterHelpersApplyData {
  maxHourlyRate?: number
  text?: string
}

export interface IHeaderClientFilterProps {
  style?: ViewStyle

  onClosePress: () => void

  onFilterHelpersApply: () => void

  preset?: IHeaderClientFilterPresetNames
}

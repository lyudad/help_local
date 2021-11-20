import { IJobsFilter } from 'interfaces'
import { ViewStyle } from 'react-native'
import { IHeaderHelperFilterPresetNames } from './header-helper-filter.presets'

export interface IFilterHelpersApplyData {
  maxHourlyRate?: number
  text?: string
}

export interface IHeaderHelperFilterProps {
  style?: ViewStyle

  onClosePress: () => void
  onClearAllPress: () => void
  onFilterJobsApply: (jobsFilter?: IJobsFilter) => void

  preset?: IHeaderHelperFilterPresetNames
}

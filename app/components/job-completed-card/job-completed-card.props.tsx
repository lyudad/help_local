import { IBidInfo, IJobInfo, ITrackerInfo } from 'interfaces'
import { ViewStyle } from 'react-native'

export interface IJobCompletedCardProps {
  isClient?: boolean
  jobInfo?: IJobInfo
  bidInfo?: IBidInfo
  trackerInfo?: ITrackerInfo[]
  loadingTrackerInfo?: boolean

  style?: ViewStyle
}

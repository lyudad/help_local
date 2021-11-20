import { ITrackerInfo } from 'interfaces'
import { ViewStyle } from 'react-native'

export interface IViewTimeLogsContentProps {
  trackerInfo: ITrackerInfo[]
  loadingTrackerInfo?: boolean

  style?: ViewStyle
}

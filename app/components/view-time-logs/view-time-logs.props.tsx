import { ITrackerInfo } from 'interfaces'
import { TextStyle, ViewStyle } from 'react-native'

export interface IViewTimeLogsProps {
  trackerInfo: ITrackerInfo[]
  loadingTrackerInfo?: boolean
  customActionOnViewTimeLogsPress?: () => void

  style?: ViewStyle
  textStyle?: TextStyle
}

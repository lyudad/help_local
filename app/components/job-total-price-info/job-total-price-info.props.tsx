import { ITrackerInfo } from 'interfaces'
import { ViewStyle } from 'react-native'

export interface IJobTotalPriceInfoProps {
  isHourly?: boolean
  trackerInfo?: ITrackerInfo[]
  loadingTrackerInfo?: boolean
  title: string
  completedAt: Date
  rate?: number
  isTotalGreen?: boolean
  customActionOnViewTimeLogsPress?: () => void
  withoutTimelog?: boolean
  calculatedTaxIncluded?: number
  calculatedTotal?: number
  calculatedHoursLogged?: number
  calculatedRate?: number
  calculatedFee?: number
  hourRate?: number

  style?: ViewStyle
}

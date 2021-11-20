import { ITrackerInfo } from 'interfaces'
import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

export interface IJobTimerProps {
  trackerInfo: ITrackerInfo[]
  requestedAmount: number
  isComplete?: boolean
  content?: ReactNode
  isHourly?: boolean
  loadingTrackerInfo?: boolean
  isClient?: boolean

  style?: ViewStyle
}

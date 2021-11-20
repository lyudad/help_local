import { ViewStyle } from 'react-native'

export interface JobMiniCardProps {
  title: string
  status: 'active' | 'pending'
  date: Date
  jobId: number
  style?: ViewStyle
}

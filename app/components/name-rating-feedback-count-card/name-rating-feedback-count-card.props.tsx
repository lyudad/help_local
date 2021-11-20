import { ViewStyle } from 'react-native'

export interface INameRatingFeedbackCountCardProps {
  firstName: string
  lastName: string
  avgRating: number
  feedbackCount: number

  style?: ViewStyle
}

import { IAttachment } from 'interfaces'
import { ViewStyle } from 'react-native'
import { HelperHeaderCardPresetNames } from './helper-header-card.presets'

export interface HelperHeaderCardProps {
  style?: ViewStyle

  avatar: IAttachment | null

  firstName: string

  lastName: string

  id: string

  withSendMsgBtn?: boolean

  jobIdForMsg?: number

  isPreviouslyUsed?: boolean

  stars: number

  reviews: number

  withBid?: boolean

  rate?: number

  withoutHr?: boolean

  nameAndReviewNotPressable?: boolean
  avatarNotPressable?: boolean

  sendAction?: () => void

  onAvatarPress?: () => void

  onHelperPress: () => void

  preset?: HelperHeaderCardPresetNames
}

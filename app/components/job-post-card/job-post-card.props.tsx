import { ReactNode } from 'react'
import { ViewStyle } from 'react-native'

import { AdditionalHeaderTypes } from 'interfaces'

export interface JobPostCardProps {
  id?: number
  style?: ViewStyle
  header?: string
  title: string
  date?: Date
  additionalHeader?: AdditionalHeaderTypes
  address?: string
  fixPrice?: number
  minPrice?: number
  maxPrice?: number
  description: string
  isReadMoreForDescription?: boolean
  firstName?: string
  lastName?: string
  stars?: number
  reviewsNumber?: number
  isFull?: boolean
  isBid?: boolean
  helperId2SendMsg?: string
  withoutDots?: boolean
  customFooter?: ReactNode
  isHourly?: boolean
  isRemoved?: boolean
  isValidForNavigateFullList?: boolean
  alreadySentBidId?: number
  isBidSentMiniBtn?: boolean
  sendAction?: () => void
  onBlockPress?: (jobId: number) => void
  isCompleted?: boolean
}

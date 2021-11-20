import { IJobPostId } from 'interfaces'
import { ILimitAndOffset } from '../common'
import { INames } from './profile'

export interface ICreateFeedbackThunkResponse {
  newFbId: number
  fbPostedFor: 'client' | 'helper'
}

export interface ICreateFeedbackThunkParams extends IJobPostId {
  score: number
  targetId: string
  description: string
  postingFbFor: 'client' | 'helper'
}

export interface IGetFeedbacksThunkParams extends ILimitAndOffset {
  targetId?: string
  userJobId?: number
}

export interface IFeedback {
  id: number
  score: number
  description: string
  createdAt: string
  createdBy: INames & {
    id: string
  }
}

export interface IGetFeedbacksThunkResponse {
  totalCount: number
  rows: IFeedback[]
}

export interface ICreateReliabilityFeedbackOnHelperThunkParams {
  notificationId: number
  reliable: boolean
}

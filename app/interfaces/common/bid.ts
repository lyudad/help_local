import { IFirstLastNamesAndAvatar, IScreeningQuestions } from 'interfaces'
import { IAddress } from '.'
import { IAttachment, ISuccess, ITotalTimeTracked } from './other'

export interface IHiredBidInfo {
  id?: number
  requestedAmount?: number
  materialsCost?: number
  isCompleted?: boolean
  completedAt: string
  createdByInfo?: IFirstLastNamesAndAvatar & {
    id: string
    profileId: number
    avgRating: number
    feedbackCount: number
  }
}

export interface IJobBidsListItem {
  id: number
  requestedAmount: number
  description: string
  isHired: boolean
  materialsCost: number
  createdBy: IFirstLastNamesAndAvatar & {
    id: string
    profileId: number
    avgRating: number | null
    feedbackCount: number
    reliability: number
    jobsHeld: number
  }
}

export interface IJobPostAndBidIds {
  jobPostId: number
  bidId: number
}

export interface IBid {
  id: number
  jobPost: IJobPost
  createdAt: string
}
export interface IJobPost {
  id: number
  title: string
}

export interface IBidInfo {
  id: number
  requestedAmount: number
  isCompleted: boolean
  completedAt: string
  materialsCost: number
  createdAt: string
  deletedAt: string
  isHired: boolean
  attachments?: IAttachment[]
  totalTimeTracked?: ITotalTimeTracked
  jobPostInfo: {
    id: number
    title: string
    completed: boolean
    description: string
    fixPrice?: number
    maxPrice?: number
    minPrice?: number
    startAt: string
    endAt: string
    createdAt: string
    attachments?: IAttachment[]
    feedbackSent: boolean
    createdBy: IFirstLastNamesAndAvatar & {
      id: string
      avgRating: number
      feedbackCount: number
    }
    address?: IAddress
    coverLetterNeeded: boolean
    screeningQuestions?: IScreeningQuestions[]
    deletedAt: string
  }
}

export interface IRemoveBidResult extends ISuccess {
  removedBidId: number
  removedFrom: 'active' | 'pending'
}

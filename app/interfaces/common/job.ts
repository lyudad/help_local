/* eslint-disable */
import { IScreeningQuestion } from 'interfaces'
import { IAddress, ICategory } from '.'
import { INames } from '../user'
import { IHiredBidInfo } from './bid'
import {
  IAttachment,
  IPickedFileAndId,
  IIdAndTitle,
  ILimitAndOffset,
  ISuccess,
  ITitle,
  ITotalTimeTracked,
} from './other'

export interface ICreatedBy {
  id: string
  firstName: string
  lastName: string
}

export interface IStartBaseJob {
  title: string
  description: string
  coverLetterNeeded: boolean
  frequencyType: IJobFrequencyType
  startAt: Date
  endAt: Date
  fixPrice?: number
  maxPrice?: number
  minPrice?: number
}

export interface IBaseJob extends IStartBaseJob {
  screeningQuestions?: IScreeningQuestion[]
}

export type IJobFrequencyType = 'one_time' | 'recurring'

export interface IPostNewJob extends IStartBaseJob {
  recurringInterval?: IJobRecurringInterval
  isPublic: boolean
  address?: string
  inviteIds: string[]
  attachmentIds: string[]
  screeningQuestions?: ITitle[]
  localeImages?: IPickedFileAndId[]
}

export interface IPostNewJobForApi extends IPostNewJob {
  categoryId: number
}

export interface IPostNewJobForThunk extends IPostNewJob {
  category: ICategory
}

export type IJobRecurringInterval = 'day' | 'week' | 'month'

export interface IJobRecurringIntervalObject {
  days?: number
  months?: number
}

export interface IGetArchivedJobsCredentials extends ILimitAndOffset {
  categoryId: number
}

export interface IArchivedJob {
  id: number
  title: string
  deletedAt: string
  completed: boolean
  helperInfo: INames & {
    id: string
    avatar: IAttachment
  }
}

export interface IRecurringJobsListItem extends IIdAndTitle {
  startAt: Date
  recurringInterval: IJobRecurringIntervalObject
}

export interface IBidPreview {
  bidCount: number
  avatarPreviews?: IAttachment[]
}

export interface IJobInfo extends IBaseJob {
  id: number
  completed: boolean
  category: ICategory
  recurringInterval: {
    days?: number
    months?: number
  }
  createdBy: ICreatedBy
  createdAt: Date
  attachments?: IAttachment[]
  bidSent: boolean
  bidPreviews?: IBidPreview
  address: IAddress | null
  isPublic: boolean
  hiredBidInfo?: IHiredBidInfo
  totalTimeTracked?: ITotalTimeTracked
  feedbackSent: boolean
}

export enum EJobStatus {
  active = 'active',
  pending = 'pending',
}

export interface IUpdateJob {
  id: number
  description?: string
  coverLetterNeeded?: boolean
  frequencyType?: IJobFrequencyType
  startAt?: Date
  endAt?: Date
  fixPrice?: number
  maxPrice?: number
  minPrice?: number
  screeningQuestions?: ITitle[]
  recurringInterval?: IJobRecurringInterval
  isPublic?: boolean
  address?: string
  attachmentIds?: string[]
  localeImages?: IPickedFileAndId[]
  previousImages?: string[]
}

export interface IJobsToInviteUser {
  id: number
  title: string
  isInvitedAlready: boolean
}

export interface IBodyOfJobsToInviteUser {
  userToInviteId: string
  categoryId: number
}

export interface IBodyInviteUserToJob {
  userToInviteId: string
  jobPostId: number
}

export interface IJobPostId {
  jobPostId: number
}

export interface IRemoveJobResult extends ISuccess {
  removedJobId: number
  removedFrom: 'active' | 'pending'
}

import { IJobRecurringIntervalObject } from 'interfaces'

export interface IPostJob {
  id: number
  address: IAddress
  category: ICategory
  createdAt: Date
  createdBy: ICreatedBy
  city: string
  description: string
  fixPrice: number | null
  maxPrice: number | null
  minPrice: number | null
  title: string
  stars: number
  reviewsNumber: number
  bidSent: boolean
  completed: boolean
}
export interface IJob {
  id: number
  attachments: IAttachments[]
  address: IAddress
  category: ICategory
  createdAt: Date
  createdBy: ICreatedBy
  description: string
  coverLetterNeeded: boolean
  frequencyType: string
  recurringInterval: IJobRecurringIntervalObject
  startAt: Date
  endAt: Date
  fixPrice: number | null
  maxPrice: number | null
  minPrice: number | null
  title: string
  screeningQuestions: IScreeningQuestions[]
  stars: number
  reviewsNumber: number
  feedbackSent: boolean
  isPublic: boolean
  completed: boolean
  bidSent: boolean
}
interface ICategory {
  id: number
  title: string
}
interface ICreatedBy {
  id: string
  firstName: string
  lastName: string
  avgRating: number
  feedbackCount: number
}
interface IAddress {
  id: number
  place_id: string
  formatted: string
  city: string
  street_name: string
  street_number: number
  country: string
  zipcode: string
  state_long: null | number
  state_short: null | number
  latitude: number
  longitude: number
}

export interface IAttachments {
  id: number
  createdAt: Date
  ownerId: null | number
  sourceUrl: string
  storageKey: string
  subtype: string
  type: string
}
export interface IScreeningQuestions {
  id: number
  jobPostId: number
  title: string
  answer?: string
}

export interface IJobListBody {
  limit?: null | number
  offset?: null | number

  search?: null | string
  milesRange?: null | number
  maxHourlyRate?: null | number
  minHourlyRate?: null | number
  maxFxiedPrice?: null | number
  minFixedPrice?: null | number
  createdAtOrder?: null | number
  jobFrequency?: null | 'one_time' | 'recurring'
  categoryIds?: null | number[]
}

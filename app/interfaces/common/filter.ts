import { ICategory } from 'interfaces'

export interface IHelperFilter {
  helperName?: string | null
  jobType?: ICategory | null
  successRaiting?: number | null
  maxHourlyRate?: number | null
  reliabilityPercentage?: number | null
  minJobsHeld?: number | null
}

export interface IJobsFilter {
  search?: null | string
  milesRange?: null | number
  maxHourlyRate?: null | number
  minHourlyRate?: null | number
  maxFxiedPrice?: null | number
  minFixedPrice?: null | number
  createdAtOrder?: null | ICreatedOrder
  jobFrequency?: null | IJobFrequency
  categoryIds?: null | ICategory
}

export interface IJobFrequency {
  title: string
  value: 'one_time' | 'recurring' | null
}
export interface ICreatedOrder {
  title: string
  value: number | null
}

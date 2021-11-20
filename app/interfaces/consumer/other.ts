export interface IGetHelpersForConsumer {
  locationInfo?: {
    latitude: number
    longitude: number
  }
  categoryIds?: number[]
  limit?: number
  offset?: number
  search?: string
  maxHourlyRate?: number
  previouslyUsed?: boolean
  maxFixedPrice?: number
  minJobsHeld?: number
  minAvgScore?: number
  maxAvgScore?: number
  minReliabilityScore?: number
  maxReliabilityScore?: number
}

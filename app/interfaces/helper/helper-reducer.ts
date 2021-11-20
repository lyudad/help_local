import {
  IBid,
  IJobFrequency,
  ICreatedOrder,
  ICategory,
  FullProfile,
  ERequestStatus,
} from 'interfaces'
import { IBidInfo, OrNull } from '../common'
import { IPostJob, IJob } from './postJob'

export interface IHelperRequestsStatus {
  bidOnJobRequestStatus: ERequestStatus
  updateBidOnJobRequestStatus: ERequestStatus
}
export interface IHelperReducerState {
  profileAfterSetupHelperProfile: OrNull<FullProfile> | null
  jobList: IPostJob[]
  isAllJobsGet: boolean
  job: null | IJob
  acceptedBids: IBid[]
  pendingBids: IBid[]
  archivedBids: IBid[]
  isBidCanceled: boolean
  loading: boolean
  error: string
  autoShowError: boolean
  bidInfo: IBidInfo | null
  initedJobTrackerId: number
  loadings: {
    loadingBidInfo: boolean
    loadingInitJobTracker: boolean
    loadingEndJobTracker: boolean
    loadingMarkJobAsComplete: boolean
    loadingCancelBidOnJob: boolean
    isBidOnJobLoading: boolean
    isUpdateBidOnJobLoading: boolean
  }
  requestsStatus: IHelperRequestsStatus
  whichBidHasActiveTimer: number | null

  search: null | string
  milesRange: number
  maxHourlyRate: null | number
  minHourlyRate: null | number
  maxFxiedPrice: null | number
  minFixedPrice: null | number
  createdAtOrder: null | ICreatedOrder
  jobFrequency: null | IJobFrequency
  categoryIds: null | ICategory
}

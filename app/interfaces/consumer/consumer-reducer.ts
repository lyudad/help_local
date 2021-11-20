import {
  IHelperInfo,
  IArchivedJob,
  IArchivedJobCategory,
  IJobInfo,
  IRecurringJobsListItem,
  IIdAndTitle,
  IJobsToInviteUser,
  ICategory,
  IJobBidsListItem,
} from 'interfaces'
import { ERequestStatus, IPostNewJobForThunk } from '../common'

export interface IConsumerRequestsStatus {
  lastInviteUserToJobRequestStatus: ERequestStatus
  lastGetJobsToInviteUserRequestStatus: ERequestStatus
  removeJobRequestStatus: ERequestStatus
}
export interface IConsumerReducerState {
  lastPostedJobId: number | null
  loadingHelpers: boolean
  error: string
  autoShowError: boolean
  previouslyUsedHelpers: Array<IHelperInfo>
  isAllPreviouslyUsedHelpersGet: boolean
  helpers: Array<IHelperInfo>
  isAllHelpersGet: boolean
  helper: IHelperInfo | null
  archivedJobCategories: Array<IArchivedJobCategory>
  archivedJobs: Array<IArchivedJob>
  jobInfo: IJobInfo | null
  activeJobs: IIdAndTitle[]
  pendingJobs: IIdAndTitle[]
  recurringJobs: IRecurringJobsListItem[]
  jobsToInviteUser: IJobsToInviteUser[]
  jobBids: IJobBidsListItem[]
  wasJobUpdated: boolean
  loadings: {
    loadingRemoveJob: boolean
    loadingCompleteJob: boolean
    isArchivedJobCategoriesLoading: boolean
    isActiveJobsLoading: boolean
    isPendingJobsLoading: boolean
    isRecurringJobsLoading: boolean
    isGetJobsToInviteUserLoading: boolean
    isInviteUserToJobLoading: boolean
  }
  requestsStatus: IConsumerRequestsStatus
  cachedJob: IPostNewJobForThunk | null
  lastPostedCachedJobId: number | null
  pendingJobsCategoriesList: number[]
  isPendingJobsCategoriesListUpdated: boolean

  // Filter
  helperName: string | null
  jobType: ICategory | null
  successRaiting: number | null
  reliabilityPercentage: number | null
  maxHourlyRate: number | null
  minJobsHeld: number | null
}

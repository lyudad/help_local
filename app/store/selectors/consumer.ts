import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export const consumer = {
  lastPostedJobId: createSelector(
    (state: RootState) => state.consumer.lastPostedJobId,
    (value) => value,
  ),
  loadingHelpers: createSelector(
    (state: RootState) => state.consumer.loadingHelpers,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.consumer.error,
    (value) => value,
  ),
  previouslyUsedHelpers: createSelector(
    (state: RootState) => state.consumer.previouslyUsedHelpers,
    (value) => value,
  ),
  isAllPreviouslyUsedHelpersGet: createSelector(
    (state: RootState) => state.consumer.isAllPreviouslyUsedHelpersGet,
    (value) => value,
  ),
  helpers: createSelector(
    (state: RootState) => state.consumer.helpers,
    (value) => value,
  ),
  isAllHelpersGet: createSelector(
    (state: RootState) => state.consumer.isAllHelpersGet,
    (value) => value,
  ),
  helper: createSelector(
    (state: RootState) => state.consumer.helper,
    (value) => value,
  ),
  archivedJobCategories: createSelector(
    (state: RootState) => state.consumer.archivedJobCategories,
    (value) => value,
  ),
  archivedJobs: createSelector(
    (state: RootState) => state.consumer.archivedJobs,
    (value) => value,
  ),
  jobInfo: createSelector(
    (state: RootState) => state.consumer.jobInfo,
    (value) => value,
  ),
  activeJobs: createSelector(
    (state: RootState) => state.consumer.activeJobs,
    (value) => value,
  ),
  pendingJobs: createSelector(
    (state: RootState) => state.consumer.pendingJobs,
    (value) => value,
  ),
  recurringJobs: createSelector(
    (state: RootState) => state.consumer.recurringJobs,
    (value) => value,
  ),
  jobsToInviteUser: createSelector(
    (state: RootState) => state.consumer.jobsToInviteUser,
    (value) => value,
  ),
  jobBids: createSelector(
    (state: RootState) => state.consumer.jobBids,
    (value) => value,
  ),
  wasJobUpdated: createSelector(
    (state: RootState) => state.consumer.wasJobUpdated,
    (value) => value,
  ),
  requestsStatus: createSelector(
    (state: RootState) => state.consumer.requestsStatus,
    (value) => value,
  ),
  lastPostedCachedJobId: createSelector(
    (state: RootState) => state.consumer.lastPostedCachedJobId,
    (value) => value,
  ),

  loadingRemoveJob: createSelector(
    (state: RootState) => state.consumer.loadings.loadingRemoveJob,
    (value) => value,
  ),
  loadingCompleteJob: createSelector(
    (state: RootState) => state.consumer.loadings.loadingCompleteJob,
    (value) => value,
  ),
  isArchivedJobCategoriesLoading: createSelector(
    (state: RootState) =>
      state.consumer.loadings.isArchivedJobCategoriesLoading,
    (value) => value,
  ),
  isActiveJobsLoading: createSelector(
    (state: RootState) => state.consumer.loadings.isActiveJobsLoading,
    (value) => value,
  ),
  isPendingJobsLoading: createSelector(
    (state: RootState) => state.consumer.loadings.isPendingJobsLoading,
    (value) => value,
  ),
  isRecurringJobsLoading: createSelector(
    (state: RootState) => state.consumer.loadings.isRecurringJobsLoading,
    (value) => value,
  ),
  isGetJobsToInviteUserLoading: createSelector(
    (state: RootState) => state.consumer.loadings.isGetJobsToInviteUserLoading,
    (value) => value,
  ),
  isInviteUserToJobLoading: createSelector(
    (state: RootState) => state.consumer.loadings.isInviteUserToJobLoading,
    (value) => value,
  ),
  cachedJob: createSelector(
    (state: RootState) => state.consumer.cachedJob,
    (value) => value,
  ),
  isPendingJobsCategoriesListUpdated: createSelector(
    (state: RootState) => state.consumer.isPendingJobsCategoriesListUpdated,
    (value) => value,
  ),
  pendingJobsCategoriesList: createSelector(
    (state: RootState) => state.consumer.pendingJobsCategoriesList,
    (value) => value,
  ),

  // Filter
  helperName: createSelector(
    (state: RootState) => state.consumer.helperName,
    (value) => value,
  ),
  jobType: createSelector(
    (state: RootState) => state.consumer.jobType,
    (value) => value,
  ),
  successRaiting: createSelector(
    (state: RootState) => state.consumer.successRaiting,
    (value) => value,
  ),
  maxHourlyRate: createSelector(
    (state: RootState) => state.consumer.maxHourlyRate,
    (value) => value,
  ),
  reliabilityPercentage: createSelector(
    (state: RootState) => state.consumer.reliabilityPercentage,
    (value) => value,
  ),
  minJobsHeld: createSelector(
    (state: RootState) => state.consumer.minJobsHeld,
    (value) => value,
  ),
  autoShowError: createSelector(
    (state: RootState) => state.consumer.autoShowError,
    (value) => value,
  ),
}

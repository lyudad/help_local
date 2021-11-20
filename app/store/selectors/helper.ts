import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export const helper = {
  jobList: createSelector(
    (state: RootState) => state.helper.jobList,
    (value) => value,
  ),
  isAllJobsGet: createSelector(
    (state: RootState) => state.helper.isAllJobsGet,
    (value) => value,
  ),
  job: createSelector(
    (state: RootState) => state.helper.job,
    (value) => value,
  ),
  acceptedBids: createSelector(
    (state: RootState) => state.helper.acceptedBids,
    (value) => value,
  ),
  archivedBids: createSelector(
    (state: RootState) => state.helper.archivedBids,
    (value) => value,
  ),
  pendingBids: createSelector(
    (state: RootState) => state.helper.pendingBids,
    (value) => value,
  ),
  loading: createSelector(
    (state: RootState) => state.helper.loading,
    (value) => value,
  ),
  bidInfo: createSelector(
    (state: RootState) => state.helper.bidInfo,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.helper.error,
    (value) => value,
  ),
  loadingBidInfo: createSelector(
    (state: RootState) => state.helper.loadings.loadingBidInfo,
    (value) => value,
  ),
  autoShowError: createSelector(
    (state: RootState) => state.helper.autoShowError,
    (value) => value,
  ),
  initedJobTrackerId: createSelector(
    (state: RootState) => state.helper.initedJobTrackerId,
    (value) => value,
  ),
  loadingInitJobTracker: createSelector(
    (state: RootState) => state.helper.loadings.loadingInitJobTracker,
    (value) => value,
  ),
  loadingEndJobTracker: createSelector(
    (state: RootState) => state.helper.loadings.loadingEndJobTracker,
    (value) => value,
  ),
  loadingMarkJobAsComplete: createSelector(
    (state: RootState) => state.helper.loadings.loadingMarkJobAsComplete,
    (value) => value,
  ),
  loadingCancelBidOnJob: createSelector(
    (state: RootState) => state.helper.loadings.loadingCancelBidOnJob,
    (value) => value,
  ),
  isBidOnJobLoading: createSelector(
    (state: RootState) => state.helper.loadings.isBidOnJobLoading,
    (value) => value,
  ),
  isUpdateBidOnJobLoading: createSelector(
    (state: RootState) => state.helper.loadings.isUpdateBidOnJobLoading,
    (value) => value,
  ),
  isBidCanceled: createSelector(
    (state: RootState) => state.helper.isBidCanceled,
    (value) => value,
  ),
  profileAfterSetupHelperProfile: createSelector(
    (state: RootState) => state.helper.profileAfterSetupHelperProfile,
    (value) => value,
  ),
  whichBidHasActiveTimer: createSelector(
    (state: RootState) => state.helper.whichBidHasActiveTimer,
    (value) => value,
  ),
  requestsStatus: createSelector(
    (state: RootState) => state.helper.requestsStatus,
    (value) => value,
  ),

  // Job Filters
  search: createSelector(
    (state: RootState) => state.helper.search,
    (value) => value,
  ),
  milesRange: createSelector(
    (state: RootState) => state.helper.milesRange,
    (value) => value,
  ),
  maxHourlyRate: createSelector(
    (state: RootState) => state.helper.maxHourlyRate,
    (value) => value,
  ),
  minHourlyRate: createSelector(
    (state: RootState) => state.helper.minHourlyRate,
    (value) => value,
  ),
  maxFxiedPrice: createSelector(
    (state: RootState) => state.helper.maxFxiedPrice,
    (value) => value,
  ),
  minFixedPrice: createSelector(
    (state: RootState) => state.helper.minFixedPrice,
    (value) => value,
  ),
  createdAtOrder: createSelector(
    (state: RootState) => state.helper.createdAtOrder,
    (value) => value,
  ),
  jobFrequency: createSelector(
    (state: RootState) => state.helper.jobFrequency,
    (value) => value,
  ),
  categoryIds: createSelector(
    (state: RootState) => state.helper.categoryIds,
    (value) => value,
  ),
}

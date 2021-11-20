/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { translate } from 'i18n'

import {
  IHelperReducerState,
  IPostJob,
  IJob,
  IRemoveBidResult,
  IBidInfo,
  IJobsFilter,
  OrNull,
  FullProfile,
  IBid,
  ERequestStatus,
  IHelperRequestsStatus,
} from 'interfaces'
import {
  getJobList,
  getAcceptedBids,
  getPendingBids,
  getArchivedBids,
  getBidInfo,
  setJobFilter,
  initJobTracker,
  endJobTracker,
  markJobAsComplete,
  cancelBidOnJob,
  cleanJobAndBidInfo,
  bidOnJob,
  updateBidOnJob,
} from './thunk'

const ACTIVE = 'active'

const initialState: IHelperReducerState = {
  profileAfterSetupHelperProfile: null,
  jobList: [],
  isAllJobsGet: false,
  job: null,
  acceptedBids: [],
  archivedBids: [],
  pendingBids: [],
  isBidCanceled: false,
  loading: false,
  bidInfo: null,
  error: '',
  autoShowError: true,
  initedJobTrackerId: 0,
  loadings: {
    loadingBidInfo: false,
    loadingInitJobTracker: false,
    loadingEndJobTracker: false,
    loadingMarkJobAsComplete: false,
    loadingCancelBidOnJob: false,
    isBidOnJobLoading: false,
    isUpdateBidOnJobLoading: false,
  },
  requestsStatus: {
    bidOnJobRequestStatus: ERequestStatus.NOT_SENT_YET,
    updateBidOnJobRequestStatus: ERequestStatus.NOT_SENT_YET,
  },
  whichBidHasActiveTimer: null,

  // header jobs filter

  search: null,
  milesRange: 0,
  maxHourlyRate: null,
  minHourlyRate: null,
  maxFxiedPrice: null,
  minFixedPrice: null,
  createdAtOrder: null,
  jobFrequency: null,
  categoryIds: null,
}

const userSlice = createSlice({
  name: 'helper',
  initialState,
  reducers: {
    setProfileAfterSetupHelperProfile(
      state,
      { payload }: PayloadAction<OrNull<FullProfile> | null>,
    ) {
      state.profileAfterSetupHelperProfile = payload
    },
    setJobList(state, { payload }: PayloadAction<IPostJob[]>) {
      state.jobList = payload
    },
    setPendingBids(state, { payload }: PayloadAction<IBid[]>) {
      state.pendingBids = [...payload]
    },
    setIsAllJobsGet(state, { payload }: PayloadAction<boolean>) {
      state.isAllJobsGet = payload
    },
    setBidInfo(state, { payload }: PayloadAction<IBidInfo | null>) {
      state.bidInfo = payload
    },
    setWhichBidHasActiveTimer(
      state,
      { payload }: PayloadAction<number | null>,
    ) {
      state.whichBidHasActiveTimer = payload
    },
    setJob(state, { payload }: PayloadAction<IJob>) {
      state.job = payload
    },
    setIsBidCanceled(state, { payload }: PayloadAction<boolean>) {
      state.isBidCanceled = payload
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
    },
    setMilesRange(state, { payload }: PayloadAction<number | null>) {
      state.milesRange = payload
    },
    setRequestsStatus(
      state,
      { payload }: PayloadAction<IHelperRequestsStatus>,
    ) {
      state.requestsStatus = payload
    },
    setJobBidSent(
      state,
      {
        payload,
      }: PayloadAction<{
        jobId: number
        bidSent: boolean
      }>,
    ) {
      state.jobList = state.jobList.map((job: IPostJob): IPostJob => {
        if (job.id === payload.jobId) {
          return { ...job, bidSent: payload.bidSent } as IPostJob
        }
        return job
      })
    },
    resetAll(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getJobList.fulfilled, (state, { payload }) => {
      state.jobList = payload.isNewArr
        ? payload.jobList
        : [...state.jobList, ...payload.jobList]
      state.isAllJobsGet = payload.jobList.length === 0
      state.loading = false
    })
    builder.addCase(getJobList.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(getAcceptedBids.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getAcceptedBids.fulfilled, (state, { payload }) => {
      state.loading = false
      state.acceptedBids = payload
    })
    builder.addCase(getAcceptedBids.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getPendingBids.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getPendingBids.fulfilled, (state, { payload }) => {
      state.loading = false
      state.pendingBids = payload
    })
    builder.addCase(getPendingBids.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getArchivedBids.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getArchivedBids.fulfilled, (state, { payload }) => {
      state.loading = false
      state.archivedBids = payload
    })
    builder.addCase(getArchivedBids.rejected, (state) => {
      state.loading = false
    })

    builder.addCase(getBidInfo.pending, (state) => {
      state.loadings.loadingBidInfo = true
    })
    builder.addCase(getBidInfo.fulfilled, (state, { payload }) => {
      state.loadings.loadingBidInfo = false
      state.bidInfo = payload
    })
    builder.addCase(getBidInfo.rejected, (state, action) => {
      state.loadings.loadingBidInfo = false
      state.error = action.payload
    })

    builder.addCase(
      setJobFilter.fulfilled,
      (state, { payload }: PayloadAction<IJobsFilter>) => {
        state.search = payload.search ? payload.search : null
        state.milesRange = payload.milesRange ? payload.milesRange : null
        state.categoryIds = payload.categoryIds ? payload.categoryIds : null
        state.maxHourlyRate = payload.maxHourlyRate
          ? payload.maxHourlyRate
          : null
        state.minHourlyRate = payload.minHourlyRate
          ? payload.minHourlyRate
          : null
        state.maxFxiedPrice = payload.maxFxiedPrice
          ? payload.maxFxiedPrice
          : null
        state.minFixedPrice = payload.minFixedPrice
          ? payload.minFixedPrice
          : null
        state.createdAtOrder = payload.createdAtOrder
          ? payload.createdAtOrder
          : null
        state.jobFrequency = payload.jobFrequency ? payload.jobFrequency : null
        state.categoryIds = payload.categoryIds ? payload.categoryIds : null
      },
    )

    builder.addCase(initJobTracker.pending, (state) => {
      state.loadings.loadingInitJobTracker = true
    })
    builder.addCase(initJobTracker.fulfilled, (state, { payload }) => {
      state.initedJobTrackerId = payload.id
      state.loadings.loadingInitJobTracker = false
    })
    builder.addCase(initJobTracker.rejected, (state, action) => {
      state.loadings.loadingInitJobTracker = false
      state.error = action.payload
    })

    builder.addCase(endJobTracker.pending, (state) => {
      state.loadings.loadingEndJobTracker = true
    })
    builder.addCase(endJobTracker.fulfilled, (state) => {
      state.loadings.loadingEndJobTracker = false
    })
    builder.addCase(endJobTracker.rejected, (state, action) => {
      state.loadings.loadingEndJobTracker = false
      state.error = action.payload
    })

    builder.addCase(markJobAsComplete.pending, (state) => {
      state.loadings.loadingMarkJobAsComplete = true
    })
    builder.addCase(markJobAsComplete.fulfilled, (state, { payload }) => {
      state.loadings.loadingMarkJobAsComplete = false
      if (payload.success) {
        state.bidInfo = { ...state.bidInfo, isCompleted: true }
      }
    })
    builder.addCase(markJobAsComplete.rejected, (state, action) => {
      state.loadings.loadingMarkJobAsComplete = false
      state.error = action.payload
    })

    builder.addCase(bidOnJob.pending, (state) => {
      state.loadings.isBidOnJobLoading = true
    })
    builder.addCase(bidOnJob.fulfilled, (state) => {
      state.loadings.isBidOnJobLoading = false
      state.requestsStatus = {
        ...state.requestsStatus,
        bidOnJobRequestStatus: ERequestStatus.SUCCESS,
      }
    })
    builder.addCase(bidOnJob.rejected, (state, action) => {
      state.loadings.isBidOnJobLoading = false
      state.error = action.payload
      state.requestsStatus = {
        ...state.requestsStatus,
        bidOnJobRequestStatus: ERequestStatus.FAIL,
      }
    })

    builder.addCase(updateBidOnJob.pending, (state) => {
      state.loadings.isUpdateBidOnJobLoading = true
    })
    builder.addCase(updateBidOnJob.fulfilled, (state) => {
      state.loadings.isUpdateBidOnJobLoading = false
      state.requestsStatus = {
        ...state.requestsStatus,
        updateBidOnJobRequestStatus: ERequestStatus.SUCCESS,
      }
    })
    builder.addCase(updateBidOnJob.rejected, (state, action) => {
      state.loadings.isUpdateBidOnJobLoading = false
      state.error = action.payload
      state.requestsStatus = {
        ...state.requestsStatus,
        updateBidOnJobRequestStatus: ERequestStatus.FAIL,
      }
    })

    builder.addCase(cancelBidOnJob.pending, (state) => {
      state.loadings.loadingCancelBidOnJob = true
    })
    builder.addCase(cancelBidOnJob.rejected, (state, action) => {
      state.loadings.loadingCancelBidOnJob = false
      state.error = action.payload
    })
    builder.addCase(
      cancelBidOnJob.fulfilled,
      (state, { payload }: PayloadAction<IRemoveBidResult>) => {
        state.loadings.loadingCancelBidOnJob = false
        if (payload.success) {
          state.isBidCanceled = true
          if (payload.removedFrom !== ACTIVE) {
            state.pendingBids = [
              ...state.pendingBids.filter(
                (pBid) => pBid.id !== payload.removedBidId,
              ),
            ]
          } else {
            state.acceptedBids = [
              ...state.acceptedBids.filter(
                (aBid) => aBid.id !== payload.removedBidId,
              ),
            ]
          }
        } else {
          state.error = translate('common.couldntMakeRequest')
        }
      },
    )

    builder.addCase(cleanJobAndBidInfo.fulfilled, (state) => {
      state.job = null
      state.bidInfo = null
    })
  },
})

export const {
  setJobList,
  setJob,
  resetAll,
  setError,
  setIsBidCanceled,
  setBidInfo,
  setProfileAfterSetupHelperProfile,
  setMilesRange,
  setWhichBidHasActiveTimer,
  setIsAllJobsGet,
  setPendingBids,
  setJobBidSent,
  setRequestsStatus,
} = userSlice.actions
export default userSlice.reducer

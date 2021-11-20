/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { translate } from 'i18n'
import {
  IArchivedJob,
  IArchivedJobCategory,
  IConsumerReducerState,
  IIdAndTitle,
  IJobBidsListItem,
  IJobInfo,
  IRecurringJobsListItem,
  IRemoveJobResult,
  IHelperFilter,
  IHelperInfo,
  IJobsToInviteUser,
  ERequestStatus,
  IConsumerRequestsStatus,
  IPostNewJobForThunk,
} from 'interfaces'
import {
  getArchivedJobCategories,
  getArchivedJobs,
  getHelpers,
  getJobBids,
  getHelperById,
  getMyActiveJobs,
  getMyPendingJobs,
  getMyRecurringJobs,
  getJobsToInviteUser,
  removeJob,
  getSuggestionsHelpers,
  setFilter,
  completeJob,
  inviteUserToJob,
} from './thunk'

const ACTIVE = 'active'

const initialState: IConsumerReducerState = {
  lastPostedJobId: null,
  loadingHelpers: false,
  error: '',
  autoShowError: true,
  previouslyUsedHelpers: [],
  isAllPreviouslyUsedHelpersGet: false,
  helpers: [],
  helper: null,
  isAllHelpersGet: false,
  archivedJobCategories: [],
  archivedJobs: [],
  jobInfo: null,
  activeJobs: [],
  pendingJobs: [],
  recurringJobs: [],
  jobsToInviteUser: [],
  jobBids: [],
  wasJobUpdated: false,
  loadings: {
    loadingRemoveJob: false,
    loadingCompleteJob: false,
    isArchivedJobCategoriesLoading: false,
    isActiveJobsLoading: false,
    isPendingJobsLoading: false,
    isRecurringJobsLoading: false,
    isGetJobsToInviteUserLoading: false,
    isInviteUserToJobLoading: false,
  },
  requestsStatus: {
    lastInviteUserToJobRequestStatus: ERequestStatus.NOT_SENT_YET,
    lastGetJobsToInviteUserRequestStatus: ERequestStatus.NOT_SENT_YET,
    removeJobRequestStatus: ERequestStatus.NOT_SENT_YET,
  },
  cachedJob: null,
  lastPostedCachedJobId: null,
  pendingJobsCategoriesList: [],
  isPendingJobsCategoriesListUpdated: false,

  // Filter
  helperName: null,
  jobType: null,
  successRaiting: null,
  maxHourlyRate: null,
  reliabilityPercentage: null,
  minJobsHeld: null,
}

const consumerSlice = createSlice({
  name: 'consumer',
  initialState,
  reducers: {
    setHelpers(state, { payload }: PayloadAction<IHelperInfo[]>) {
      state.helpers = payload
    },
    removeHelperFromList(
      state,
      {
        payload,
      }: PayloadAction<{
        id: string
        removeFromPrevUsedList?: boolean
      }>,
    ) {
      if (!payload.removeFromPrevUsedList) {
        state.helpers = state.helpers.filter(
          (helper) => helper.userInfo.id !== payload.id,
        )
      } else {
        state.previouslyUsedHelpers = state.previouslyUsedHelpers.filter(
          (helper) => helper.userInfo.id !== payload.id,
        )
      }
    },
    setPreviouslyUsedHelpers(state, { payload }: PayloadAction<IHelperInfo[]>) {
      state.previouslyUsedHelpers = payload
    },
    setPendingJobsCategoriesList(state, { payload }: PayloadAction<number[]>) {
      state.pendingJobsCategoriesList = payload
    },
    setIsPendingJobsCategoriesListUpdated(
      state,
      { payload }: PayloadAction<boolean>,
    ) {
      state.isPendingJobsCategoriesListUpdated = payload
    },
    setJobsToInviteUser(
      state,
      { payload }: PayloadAction<IJobsToInviteUser[]>,
    ) {
      state.jobsToInviteUser = payload
    },
    setIsAllHelpersGet(state, { payload }: PayloadAction<boolean>) {
      state.isAllHelpersGet = payload
    },
    setRequestsStatus(
      state,
      { payload }: PayloadAction<IConsumerRequestsStatus>,
    ) {
      state.requestsStatus = payload
    },
    setIsAllPreviouslyUsedHelpersGet(
      state,
      { payload }: PayloadAction<boolean>,
    ) {
      state.isAllPreviouslyUsedHelpersGet = payload
    },
    setLastPostedJobId(state, { payload }: PayloadAction<number>) {
      state.lastPostedJobId = payload
    },
    setWasJobUpdated(state, { payload }: PayloadAction<boolean>) {
      state.wasJobUpdated = payload
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
    },
    resetArchvedJobs(state) {
      state.archivedJobs = []
    },
    resetFilter(state) {
      state.helperName = null
      state.jobType = null
      state.successRaiting = null
      state.maxHourlyRate = null
      state.reliabilityPercentage = null
      state.minJobsHeld = null
    },
    setJobInfo(state, { payload }: PayloadAction<IJobInfo | null>) {
      if (payload) {
        state.jobInfo = { ...payload }
      } else {
        state.jobInfo = null
      }
    },
    setAll(state, { payload }: PayloadAction<IConsumerReducerState>) {
      state = { ...payload }
    },
    setCachedJob(
      state,
      { payload }: PayloadAction<IPostNewJobForThunk | null>,
    ) {
      if (payload) {
        state.cachedJob = { ...payload }
      } else {
        state.cachedJob = null
      }
    },
    setLastPostedCachedJobId(state, { payload }: PayloadAction<number | null>) {
      state.lastPostedCachedJobId = payload
    },
    resetAll(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHelpers.pending, (state) => {
      state.loadingHelpers = true
    })
    builder.addCase(getHelpers.fulfilled, (state, { payload }) => {
      state.loadingHelpers = false
      const pushToArray = (arr, obj) => {
        const index = arr.findIndex((e) => e.id === obj.id)
        if (index === -1) {
          arr.push(obj)
        } else {
          arr[index] = obj
        }
      }
      const createUniqArray = (
        list: IHelperInfo[],
        isPreviouslyUsedHelpers = false,
      ): IHelperInfo[] => {
        const newHelperLit = isPreviouslyUsedHelpers
          ? state.previouslyUsedHelpers
          : state.helpers.slice()
        list.forEach((helper: IHelperInfo) => {
          pushToArray(newHelperLit, helper)
        })
        return newHelperLit
      }

      if (payload.loadedPreviouslyUsedHelpers) {
        state.previouslyUsedHelpers = payload.isNewArr
          ? payload.helpers
          : createUniqArray(payload.helpers, true)
        state.isAllPreviouslyUsedHelpersGet = payload.helpers.length < 2
      } else {
        state.helpers = payload.isNewArr
          ? payload.helpers
          : createUniqArray(payload.helpers)
        state.isAllHelpersGet = payload.helpers.length === 0
      }
    })
    builder.addCase(getHelpers.rejected, (state, action) => {
      state.loadingHelpers = false
      state.error = action.payload
    })

    builder.addCase(getSuggestionsHelpers.pending, (state) => {
      state.loadingHelpers = true
    })
    builder.addCase(getSuggestionsHelpers.fulfilled, (state, { payload }) => {
      state.loadingHelpers = false
      state.helpers = payload.helpers
      state.isAllHelpersGet = payload.helpers.length === 0
    })
    builder.addCase(getSuggestionsHelpers.rejected, (state, action) => {
      state.loadingHelpers = false
      state.error = action.payload
    })

    builder.addCase(getHelperById.pending, (state) => {
      state.loadingHelpers = true
    })
    builder.addCase(getHelperById.fulfilled, (state, { payload }) => {
      state.loadingHelpers = false
      state.helper = payload.helper
    })
    builder.addCase(getHelperById.rejected, (state, action) => {
      state.loadingHelpers = false
      state.error = action.payload
    })

    builder.addCase(getJobsToInviteUser.pending, (state) => {
      state.loadings.isGetJobsToInviteUserLoading = true
    })
    builder.addCase(getJobsToInviteUser.fulfilled, (state, { payload }) => {
      state.loadings.isGetJobsToInviteUserLoading = false
      state.requestsStatus = {
        ...state.requestsStatus,
        lastGetJobsToInviteUserRequestStatus: ERequestStatus.SUCCESS,
      }
      state.jobsToInviteUser = payload
    })
    builder.addCase(getJobsToInviteUser.rejected, (state, action) => {
      state.loadings.isGetJobsToInviteUserLoading = false
      state.requestsStatus = {
        ...state.requestsStatus,
        lastGetJobsToInviteUserRequestStatus: ERequestStatus.FAIL,
      }
      state.error = action.payload
    })

    builder.addCase(getArchivedJobCategories.pending, (state) => {
      state.loadings.isArchivedJobCategoriesLoading = true
    })
    builder.addCase(
      getArchivedJobCategories.fulfilled,
      (state, { payload }: PayloadAction<Array<IArchivedJobCategory>>) => {
        state.loadings.isArchivedJobCategoriesLoading = false
        state.archivedJobCategories = [...payload]
      },
    )
    builder.addCase(getArchivedJobCategories.rejected, (state, action) => {
      state.loadings.isArchivedJobCategoriesLoading = false
      state.error = action.payload
    })
    builder.addCase(
      getArchivedJobs.fulfilled,
      (state, { payload }: PayloadAction<Array<IArchivedJob>>) => {
        state.archivedJobs = [...state.archivedJobs, ...payload]
      },
    )
    builder.addCase(getArchivedJobs.rejected, (state, action) => {
      state.error = action.payload
    })
    builder.addCase(getMyActiveJobs.pending, (state) => {
      state.loadings.isActiveJobsLoading = true
    })
    builder.addCase(
      getMyActiveJobs.fulfilled,
      (state, { payload }: PayloadAction<IIdAndTitle[]>) => {
        state.loadings.isActiveJobsLoading = false
        state.activeJobs = [...payload]
      },
    )
    builder.addCase(getMyActiveJobs.rejected, (state, action) => {
      state.loadings.isActiveJobsLoading = false
      state.error = action.payload
    })
    builder.addCase(getMyPendingJobs.pending, (state) => {
      state.loadings.isPendingJobsLoading = true
    })
    builder.addCase(
      getMyPendingJobs.fulfilled,
      (state, { payload }: PayloadAction<IIdAndTitle[]>) => {
        state.loadings.isPendingJobsLoading = false
        state.pendingJobs = [...payload]
      },
    )
    builder.addCase(getMyPendingJobs.rejected, (state, action) => {
      state.loadings.isPendingJobsLoading = false
      state.error = action.payload
    })
    builder.addCase(getMyRecurringJobs.pending, (state) => {
      state.loadings.isRecurringJobsLoading = true
    })
    builder.addCase(
      getMyRecurringJobs.fulfilled,
      (state, { payload }: PayloadAction<IRecurringJobsListItem[]>) => {
        state.loadings.isRecurringJobsLoading = false
        state.recurringJobs = [...payload]
      },
    )
    builder.addCase(getMyRecurringJobs.rejected, (state, action) => {
      state.loadings.isRecurringJobsLoading = false
      state.error = action.payload
    })
    builder.addCase(
      getJobBids.fulfilled,
      (state, { payload }: PayloadAction<IJobBidsListItem[]>) => {
        state.jobBids = [...payload]
      },
    )
    builder.addCase(getJobBids.rejected, (state, action) => {
      state.error = action.payload
    })

    builder.addCase(removeJob.pending, (state) => {
      state.loadings.loadingRemoveJob = true
    })
    builder.addCase(removeJob.rejected, (state, action) => {
      state.requestsStatus = {
        ...state.requestsStatus,
        removeJobRequestStatus: ERequestStatus.FAIL,
      }
      state.loadings.loadingRemoveJob = false
      state.error = action.payload
    })
    builder.addCase(
      removeJob.fulfilled,
      (state, { payload }: PayloadAction<IRemoveJobResult>) => {
        let requestStatus: ERequestStatus = ERequestStatus.SUCCESS
        state.loadings.loadingRemoveJob = false
        if (payload.success) {
          if (payload.removedFrom !== ACTIVE) {
            state.pendingJobs = [
              ...state.pendingJobs.filter(
                (pJob) => pJob.id !== payload.removedJobId,
              ),
            ]
          } else {
            state.activeJobs = [
              ...state.activeJobs.filter(
                (aJob) => aJob.id !== payload.removedJobId,
              ),
            ]
          }
        } else {
          state.error = translate('common.couldntMakeRequest')
          requestStatus = ERequestStatus.FAIL
        }
        state.requestsStatus = {
          ...state.requestsStatus,
          removeJobRequestStatus: requestStatus,
        }
      },
    )

    builder.addCase(
      setFilter.fulfilled,
      (state, { payload }: PayloadAction<IHelperFilter>) => {
        state.helperName = payload.helperName ? payload.helperName : null
        state.jobType = payload.jobType ? payload.jobType : null
        state.successRaiting = payload.successRaiting
          ? payload.successRaiting
          : null
        state.maxHourlyRate = payload.maxHourlyRate
          ? payload.maxHourlyRate
          : null
        state.reliabilityPercentage = payload.reliabilityPercentage
          ? payload.reliabilityPercentage
          : null
        state.minJobsHeld = payload.minJobsHeld ? payload.minJobsHeld : null
      },
    )

    builder.addCase(completeJob.pending, (state) => {
      state.loadings.loadingCompleteJob = true
    })
    builder.addCase(completeJob.fulfilled, (state) => {
      state.loadings.loadingCompleteJob = false
      if (state.jobInfo) {
        state.jobInfo = { ...state.jobInfo, completed: true }
      }
    })
    builder.addCase(completeJob.rejected, (state, action) => {
      state.loadings.loadingCompleteJob = false
      state.error = action.payload
    })

    builder.addCase(inviteUserToJob.pending, (state) => {
      state.loadings.isInviteUserToJobLoading = true
    })
    builder.addCase(inviteUserToJob.fulfilled, (state, { payload }) => {
      state.loadings.isInviteUserToJobLoading = false
      if (payload.success) {
        state.requestsStatus = {
          ...state.requestsStatus,
          lastInviteUserToJobRequestStatus: ERequestStatus.SUCCESS,
        }
      } else {
        state.requestsStatus = {
          ...state.requestsStatus,
          lastInviteUserToJobRequestStatus: ERequestStatus.FAIL,
        }
        state.error = translate('common.couldntMakeRequest')
      }
    })
    builder.addCase(inviteUserToJob.rejected, (state, action) => {
      state.loadings.isInviteUserToJobLoading = false
      state.requestsStatus = {
        ...state.requestsStatus,
        lastInviteUserToJobRequestStatus: ERequestStatus.FAIL,
      }
      state.error = action.payload
    })
  },
})

export const {
  setLastPostedJobId,
  setError,
  resetArchvedJobs,
  setAll,
  resetAll,
  setJobInfo,
  setWasJobUpdated,
  resetFilter,
  setHelpers,
  setPreviouslyUsedHelpers,
  setIsAllHelpersGet,
  setIsAllPreviouslyUsedHelpersGet,
  setJobsToInviteUser,
  setRequestsStatus,
  setCachedJob,
  setLastPostedCachedJobId,
  removeHelperFromList,
  setIsPendingJobsCategoriesListUpdated,
  setPendingJobsCategoriesList,
} = consumerSlice.actions
export default consumerSlice.reducer

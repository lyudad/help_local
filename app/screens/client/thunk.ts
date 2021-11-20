/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from 'app/api/'
import {
  IArchivedJob,
  IArchivedJobCategory,
  ICommonCreateAsyncThunkThirdType,
  IGetArchivedJobsCredentials,
  IGetHelpersForConsumer,
  IHelperInfo,
  IIdAndTitle,
  IJobBidsListItem,
  IJobInfo,
  IJobPostAndBidIds,
  IJobPostId,
  ILimitAndOffset,
  IRecurringJobsListItem,
  IRemoveJobResult,
  ISuccess,
  IUpdateJob,
  IJobsToInviteUser,
  IBodyOfJobsToInviteUser,
  IBodyInviteUserToJob,
  IHelperFilter,
  IPostNewJobForThunk,
  IPostNewJobForApi,
  ICreateReliabilityFeedbackOnHelperThunkParams,
  INotification,
} from 'interfaces'
import {
  setLoading,
  setErrorAndUnsetLoading,
  setError,
} from 'app/store/commonSlice'
import {
  setHelpers,
  setIsAllHelpersGet,
  setIsPendingJobsCategoriesListUpdated,
  setJobInfo,
  setLastPostedCachedJobId,
  setLastPostedJobId,
  setPendingJobsCategoriesList,
  setWasJobUpdated,
} from './reducers'
import { translate } from 'i18n'
import { RootState } from 'app/store/rootReducer'
import { setNotifications } from 'screens/both/reducers'
import { delay } from 'utils/delay'

export const postJob = createAsyncThunk(
  'postJob',
  async (
    params: {
      job: IPostNewJobForThunk
      isCached?: boolean
    },
    thunkAPI,
  ) => {
    try {
      const data = params.job
      thunkAPI.dispatch(setLoading(true))
      if (!data.title) {
        const res: { count: number } = await Api.getJobsCountOfCategory(
          data.category.id,
        )
        data.title = `${data.category.title} ${translate('postJob.title')} #${
          res.count + 1
        }`
      }

      const promises = data.localeImages.map(({ file }) => {
        const dataForUpload = new FormData()
        dataForUpload.append('file_attachment', file)
        return Api.singleUploadFile(dataForUpload)
      })
      const attachmentIds = await Promise.all(promises).then((response) =>
        response.map((res) => res.id),
      )

      const dataClone: IPostNewJobForThunk = Object.assign({}, data)
      delete dataClone.category
      delete dataClone.localeImages
      const newDataWithCategoryId: IPostNewJobForApi = {
        categoryId: data.category.id,
        ...dataClone,
        attachmentIds,
      }
      const result: { id: number } = await Api.postJob(newDataWithCategoryId)
      thunkAPI.dispatch(setLoading(false))
      if (params.isCached)
        thunkAPI.dispatch(setLastPostedCachedJobId(result.id))
      else thunkAPI.dispatch(setLastPostedJobId(result.id))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const updateJob = createAsyncThunk<
  ISuccess,
  IUpdateJob,
  ICommonCreateAsyncThunkThirdType
>('updateJob', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true))

    const promises = data.localeImages.map(({ file }) => {
      const dataForUpload = new FormData()
      dataForUpload.append('file_attachment', file)
      return Api.singleUploadFile(dataForUpload)
    })
    const attachmentIds = await Promise.all(promises).then((response) =>
      response.map((res) => res.id),
    )
    const fullAttachmentIds = attachmentIds.concat(data.previousImages)

    const result: ISuccess = await Api.updateJob({
      ...data,
      attachmentIds: fullAttachmentIds.length > 0 ? fullAttachmentIds : null,
    })
    thunkAPI.dispatch(setLoading(false))
    if (result.success) thunkAPI.dispatch(setWasJobUpdated(true))
    else thunkAPI.dispatch(setError(translate('common.couldntMakeRequest')))
    return null
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const getHelpers = createAsyncThunk<
  {
    helpers: Array<IHelperInfo>
    loadedPreviouslyUsedHelpers: boolean
    isNewArr: boolean
  },
  IGetHelpersForConsumer,
  ICommonCreateAsyncThunkThirdType
>('getHelpers', async (data, thunkAPI) => {
  try {
    const hps: Array<any> = await Api.getHelpers({ ...data })

    const helpers: Array<IHelperInfo> = hps.map(
      (helper): IHelperInfo => ({
        ...helper,
        isHelptBest: false,
        previouslyUsed: data.previouslyUsed,
      }),
    )

    return {
      helpers,
      isNewArr: data.offset === 0,
      loadedPreviouslyUsedHelpers: data?.previouslyUsed
        ? data.previouslyUsed
        : false,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

const unshiftToArray = (arr, obj) => {
  const index = arr.findIndex((e) => e.id === obj.id)
  if (index === -1) {
    arr.unshift(obj)
  } else {
    arr[index] = obj
  }
}

export const getSuggestionsHelpers = createAsyncThunk<
  {
    helpers: Array<IHelperInfo>
    loadedPreviouslyUsedHelpers: boolean
  },
  IGetHelpersForConsumer,
  ICommonCreateAsyncThunkThirdType
>('getSuggestionsHelpers', async (data, thunkAPI) => {
  try {
    const suggestinosHps: Array<any> = await Api.getSuggestionsHelpers(null)

    const hps: Array<any> = await Api.getHelpers({ ...data })

    suggestinosHps.forEach((helper: IHelperInfo) => {
      unshiftToArray(hps, helper)
    })

    const helpers: Array<IHelperInfo> = hps.map((helper) => ({
      ...helper,
      isHelptBest: false,
    }))
    return {
      helpers,
      loadedPreviouslyUsedHelpers: data?.previouslyUsed
        ? data.previouslyUsed
        : false,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getArchivedJobCategories = createAsyncThunk<
  Array<IArchivedJobCategory>,
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getArchivedJobCategories', async (data = {}, thunkAPI) => {
  try {
    return await Api.getArchivedJobCategories({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getArchivedJobs = createAsyncThunk<
  Array<IArchivedJob>,
  IGetArchivedJobsCredentials,
  ICommonCreateAsyncThunkThirdType
>('getArchivedJobs', async (data, thunkAPI) => {
  try {
    return await Api.getArchivedJobs({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getJobInfo = createAsyncThunk<
  IJobInfo,
  { id: number },
  ICommonCreateAsyncThunkThirdType
>('getJobInfo', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true))
    const result: IJobInfo = await Api.getJobInfo({ ...data })
    thunkAPI.dispatch(setLoading(false))
    thunkAPI.dispatch(setJobInfo(result))
    return null
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const getMyActiveJobs = createAsyncThunk<
  IIdAndTitle[],
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getMyActiveJobs', async (data, thunkAPI) => {
  try {
    return await Api.getMyActiveJobs<IIdAndTitle[]>({
      ...data,
      jobFrequency: 'one_time',
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getMyRecurringJobs = createAsyncThunk<
  IRecurringJobsListItem[],
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getMyRecurringJobs', async (data, thunkAPI) => {
  try {
    return await Api.getMyActiveJobs<IRecurringJobsListItem[]>({
      ...data,
      jobFrequency: 'recurring',
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getMyPendingJobs = createAsyncThunk<
  IIdAndTitle[],
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getMyPendingJobs', async (data, thunkAPI) => {
  try {
    return await Api.getMyPendingJobs({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const updatePendingJobsCategoriesList = createAsyncThunk<
  null,
  null,
  ICommonCreateAsyncThunkThirdType
>('updatePendingJobsCategoriesList', async (_, thunkAPI) => {
  try {
    const myPendingJobs: IIdAndTitle[] = await Api.getMyPendingJobs({})
    const pendingJobsCategoriesList: number[] = []
    for (let i = 0; i < myPendingJobs.length; i++) {
      const jobInfo: IJobInfo = await Api.getJobInfo({
        id: myPendingJobs[i].id,
      })
      pendingJobsCategoriesList.push(jobInfo.category.id)
    }
    thunkAPI.dispatch(setPendingJobsCategoriesList(pendingJobsCategoriesList))
    delay(100)
    thunkAPI.dispatch(setIsPendingJobsCategoriesListUpdated(true))
    return null
  } catch (error) {
    thunkAPI.dispatch(setError(error))
    return Promise.reject()
  }
})

export const getJobBids = createAsyncThunk<
  IJobBidsListItem[],
  { jobId: number },
  ICommonCreateAsyncThunkThirdType
>('getJobBids', async (data, thunkAPI) => {
  try {
    return await Api.getJobBids({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getHelperById = createAsyncThunk<
  { helper: IHelperInfo },
  number,
  ICommonCreateAsyncThunkThirdType
>('getHelperById', async (data, thunkAPI) => {
  try {
    const hlp: IHelperInfo = await Api.getHelperById(data)
    const helper: IHelperInfo = {
      ...hlp,
      isHelptBest: false,
    }
    return {
      helper,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const markBidAsHired = createAsyncThunk<
  { success: boolean },
  IJobPostAndBidIds,
  ICommonCreateAsyncThunkThirdType
>('markBidAsHired', async (data, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true))
    const result: { success: boolean } = await Api.markBidAsHired({ ...data })
    thunkAPI.dispatch(setLoading(false))
    if (result.success) thunkAPI.dispatch(setJobInfo(null))
    else thunkAPI.dispatch(setError(translate('common.couldntMakeRequest')))
    return null
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const getJobsToInviteUser = createAsyncThunk<
  IJobsToInviteUser[],
  IBodyOfJobsToInviteUser,
  ICommonCreateAsyncThunkThirdType
>('getJobsToInviteUser', async (data, thunkAPI) => {
  try {
    return await Api.getJobsToInviteUser(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const removeJob = createAsyncThunk<
  IRemoveJobResult,
  IJobPostId & { removeFrom: 'active' | 'pending' },
  ICommonCreateAsyncThunkThirdType
>('removeJob', async (data, thunkAPI) => {
  try {
    const result: ISuccess = await Api.removeJob({ jobPostId: data.jobPostId })
    thunkAPI.dispatch(setHelpers([]))
    thunkAPI.dispatch(setIsAllHelpersGet(false))
    return {
      ...result,
      removedJobId: data.jobPostId,
      removedFrom: data.removeFrom,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const inviteUserToJob = createAsyncThunk<
  ISuccess,
  IBodyInviteUserToJob,
  ICommonCreateAsyncThunkThirdType
>('inviteUserToJob', async (data, thunkAPI) => {
  try {
    return await Api.inviteUserToJob(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const setFilter = createAsyncThunk<
  IHelperFilter,
  IHelperFilter,
  ICommonCreateAsyncThunkThirdType
>('setFilter', async (data) => {
  return data
})

export const completeJob = createAsyncThunk<
  ISuccess,
  IJobPostId,
  ICommonCreateAsyncThunkThirdType
>('completeJob', async (data, thunkAPI) => {
  try {
    return await Api.completeJob({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const createReliabilityFeedbackOnHelper = createAsyncThunk<
  null,
  ICreateReliabilityFeedbackOnHelperThunkParams,
  { state: RootState }
>('createReliabilityFeedbackOnHelper', async (data, thunkAPI) => {
  const notifications: INotification[] = [
    ...thunkAPI.getState().user.notifications,
  ]
  try {
    thunkAPI.dispatch(
      setNotifications(
        notifications.filter(
          (notification) => notification.id !== data.notificationId,
        ),
      ),
    )
    await Api.createReliabilityFeedbackOnHelper({ ...data })
    return null
  } catch (error) {
    thunkAPI.dispatch(setError(error))
    thunkAPI.dispatch(setNotifications(notifications))
    return Promise.reject()
  }
})

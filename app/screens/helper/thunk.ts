/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { DocumentPickerResponse } from 'react-native-document-picker'

import * as Api from 'app/api/'
import {
  setLoading,
  setErrorAndUnsetLoading,
  setError,
} from 'app/store/commonSlice'
import { translate } from 'i18n'
import {
  FullProfile,
  HelperProfile,
  IAddedCategory,
  IMiniHelperProfile,
  ICommonCreateAsyncThunkThirdType,
  ILimitAndOffset,
  IBid,
  IBidInfo,
  IJobsFilter,
  IJobListBody,
  IPostJob,
  IJobPostId,
  ISuccess,
  IRemoveBidResult,
  IUpdateJobBidBody,
  IPickedFileAndId,
  IShortCategoryWithAttachments,
  IShortCategoryWithIsActiveAndAttachmentIds,
  INumberId,
} from 'interfaces'
import {
  setHelperProfile,
  setJobsInfo,
  setProfile,
} from 'screens/both/reducers'
import {
  setJob,
  setJobBidSent,
  setPendingBids,
  setProfileAfterSetupHelperProfile,
} from './reducers'
import { IJobBidQuery } from 'interfaces'
import { ISetupHelperProfileApiData } from 'app/api/'

export const getJobList = createAsyncThunk<
  {
    jobList: IPostJob[]
    isNewArr: boolean
  },
  IJobListBody,
  ICommonCreateAsyncThunkThirdType
>('getJobList', async (data, thunkAPI) => {
  try {
    const jobList: IPostJob[] = await Api.getJobList({ ...data })
    return { jobList, isNewArr: data.offset === 0 }
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const getJobById = createAsyncThunk(
  'getJobById',
  async (id: number, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const res = await Api.getJobById(id)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setJob(res))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const bidOnJob = createAsyncThunk<
  INumberId,
  {
    data: IJobBidQuery
    localeFiles?: { file: DocumentPickerResponse; id: string }[]
  },
  ICommonCreateAsyncThunkThirdType
>('bidOnJob', async (data, thunkAPI) => {
  try {
    const promises = data.localeFiles.map(({ file }) => {
      const dataForUpload = new FormData()
      dataForUpload.append('file_attachment', file)
      return Api.singleUploadFile(dataForUpload)
    })
    const attachmentIds = await Promise.all(promises).then((response) =>
      response.map((res) => res.id),
    )

    const res: INumberId = await Api.bidOnJob({ ...data.data, attachmentIds })
    const newPendingBids: IBid[] = await Api.getPendingBids({})
    thunkAPI.dispatch(setPendingBids(newPendingBids))
    thunkAPI.dispatch(
      setJobBidSent({
        jobId: data.data.job_post_id,
        bidSent: true,
      }),
    )
    return res
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const updateBidOnJob = createAsyncThunk<
  ISuccess,
  {
    data: IUpdateJobBidBody
    localeFiles?: { file: DocumentPickerResponse; id: string }[]
    previousFiles?: string[]
  },
  ICommonCreateAsyncThunkThirdType
>('updateBidOnJob', async (data, thunkAPI) => {
  try {
    const promises = data.localeFiles.map(({ file }) => {
      const dataForUpload = new FormData()
      dataForUpload.append('file_attachment', file)
      return Api.singleUploadFile(dataForUpload)
    })
    const attachmentIds = await Promise.all(promises).then((response) =>
      response.map((res) => res.id),
    )

    const fullAttachmentIds = attachmentIds.concat(data.previousFiles)

    return await Api.updateBidOnJob({
      ...data.data,
      attachmentIds: fullAttachmentIds.length > 0 ? fullAttachmentIds : null,
    })
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export interface ISetupHelperProfileThunkData {
  milesRange: number
  description: string
  isActive: boolean
  jobsInfo: Array<IShortCategoryWithAttachments>
  //ssn: string | null
  dob: string | null
  address: string
  localAvatar?: IPickedFileAndId
}

export const setupHelperProfile = createAsyncThunk(
  'setupHelperProfile',
  async (data: ISetupHelperProfileThunkData, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const dataForApi: ISetupHelperProfileApiData = {
        ...data,
        avatarId: null,
        jobsInfo: [],
      }
      let avatarId: string = null
      if (data.localAvatar) {
        const dataForUpload = new FormData()
        dataForUpload.append('file_attachment', data.localAvatar.file)
        const res = await Api.singleUploadFile(dataForUpload)
        avatarId = res.id
      }
      for (let i = 0; i < data.jobsInfo.length; i++) {
        const promises = data.jobsInfo[i].attachments.map(({ file }) => {
          const dataForUpload = new FormData()
          dataForUpload.append('file_attachment', file)
          return Api.singleUploadFile(dataForUpload)
        })
        const attachmentIds = await Promise.all(promises).then((response) =>
          response.map((res) => res.id),
        )

        dataForApi.jobsInfo.push({
          ...data.jobsInfo[i],
          attachmentIds,
        })
      }
      const res: ISuccess = await Api.setupHelperProfile({
        ...dataForApi,
        avatarId,
      })
      if (res.success) {
        const profile: FullProfile = await Api.getProfile()
        thunkAPI.dispatch(setProfileAfterSetupHelperProfile(profile))
      }
      thunkAPI.dispatch(setLoading(false))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export interface IUpdateActiveOfJobInfoThunkData {
  id: number
  status: boolean
  prevJobInfo: Array<IAddedCategory>
}
export const updateActiveOfJobInfo = createAsyncThunk(
  'updateActiveOfJobInfo',
  async (
    { id, status, prevJobInfo }: IUpdateActiveOfJobInfoThunkData,
    thunkAPI,
  ) => {
    try {
      const result: { success: boolean } = await Api.updateActiveOfJobInfo({
        categoryId: id,
        isActive: status,
      })
      if (!result.success) {
        thunkAPI.dispatch(setJobsInfo(prevJobInfo))
      }
      return null
    } catch (error) {
      thunkAPI.dispatch(setJobsInfo(prevJobInfo))
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export interface IUpdateHelperProfileThunkData {
  miniHelperProfile: IMiniHelperProfile
  dontTurnOnLoading?: boolean
}
export const updateHelperProfile = createAsyncThunk(
  'updateHelperProfile',
  async (
    { miniHelperProfile, dontTurnOnLoading }: IUpdateHelperProfileThunkData,
    thunkAPI,
  ) => {
    try {
      if (!dontTurnOnLoading) thunkAPI.dispatch(setLoading(true))
      // @ts-ignore
      const dataForApi: IMiniHelperProfile<IShortCategoryWithIsActiveAndAttachmentIds> = {
        ...miniHelperProfile,
        jobsInfo: [],
      }
      for (let i = 0; i < miniHelperProfile.jobsInfo.length; i++) {
        const images: IPickedFileAndId[] = []
        const alreadyUploadedImagesIds: string[] = []
        for (
          let i2 = 0;
          i2 < miniHelperProfile.jobsInfo[i].images.length;
          i2++
        ) {
          // @ts-ignore
          if (miniHelperProfile.jobsInfo[i].images[i2].file) {
            // @ts-ignore
            images.push(miniHelperProfile.jobsInfo[i].images[i2])
          } else {
            // @ts-ignore
            alreadyUploadedImagesIds.push(
              miniHelperProfile.jobsInfo[i].images[i2].id,
            )
          }
        }
        const promises = images.map(({ file }) => {
          const dataForUpload = new FormData()
          dataForUpload.append('file_attachment', file)
          return Api.singleUploadFile(dataForUpload)
        })
        const attachmentIds = await Promise.all(promises).then((response) =>
          response.map((res) => res.id),
        )
        dataForApi.jobsInfo.push({
          ...miniHelperProfile.jobsInfo[i],
          attachmentIds: [...alreadyUploadedImagesIds, ...attachmentIds],
        })
      }
      const result: { success: boolean } = await Api.updateHelperProfile({
        ...dataForApi,
      })
      if (result.success) {
        const profile: FullProfile = await Api.getProfile()
        thunkAPI.dispatch(setProfile(profile))
      } else {
        thunkAPI.dispatch(setError(translate('common.couldntMakeRequest')))
      }
      thunkAPI.dispatch(setLoading(false))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export interface IUpdateHelperProfileWithPrevStateThunkData {
  miniHelperProfile: IMiniHelperProfile
  prevHelperProfile: HelperProfile
}
export const updateHelperProfileWithPrevState = createAsyncThunk(
  'updateHelperProfileWithPrevState',
  async (
    {
      miniHelperProfile,
      prevHelperProfile,
    }: IUpdateHelperProfileWithPrevStateThunkData,
    thunkAPI,
  ) => {
    try {
      // @ts-ignore
      const dataForApi: IMiniHelperProfile<IShortCategoryWithIsActiveAndAttachmentIds> = {
        ...miniHelperProfile,
        jobsInfo: [],
      }
      for (let i = 0; i < miniHelperProfile.jobsInfo.length; i++) {
        const images: IPickedFileAndId[] = []
        const alreadyUploadedImagesIds: string[] = []
        for (
          let i2 = 0;
          i2 < miniHelperProfile.jobsInfo[i].images.length;
          i2++
        ) {
          // @ts-ignore
          if (miniHelperProfile.jobsInfo[i].images[i2].file) {
            // @ts-ignore
            images.push(miniHelperProfile.jobsInfo[i].images[i2])
          } else {
            // @ts-ignore
            alreadyUploadedImagesIds.push(
              miniHelperProfile.jobsInfo[i].images[i2].id,
            )
          }
        }
        const promises = images.map(({ file }) => {
          const dataForUpload = new FormData()
          dataForUpload.append('file_attachment', file)
          return Api.singleUploadFile(dataForUpload)
        })
        const attachmentIds = await Promise.all(promises).then((response) =>
          response.map((res) => res.id),
        )
        dataForApi.jobsInfo.push({
          ...miniHelperProfile.jobsInfo[i],
          attachmentIds: [...alreadyUploadedImagesIds, ...attachmentIds],
        })
      }

      const result: { success: boolean } = await Api.updateHelperProfile({
        ...dataForApi,
      })
      if (result.success) {
        const profile: FullProfile = await Api.getProfile()
        thunkAPI.dispatch(setHelperProfile(profile.helperProfile))
      } else {
        thunkAPI.dispatch(setError(translate('common.couldntMakeRequest')))
        thunkAPI.dispatch(setHelperProfile(prevHelperProfile))
      }
      return null
    } catch (error) {
      thunkAPI.dispatch(setHelperProfile(prevHelperProfile))
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const getAcceptedBids = createAsyncThunk<
  IBid[],
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getAcceptedBids', async (data, thunkAPI) => {
  try {
    return await Api.getAcceptedBids(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getPendingBids = createAsyncThunk<
  IBid[],
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getPendingBids', async (data, thunkAPI) => {
  try {
    return await Api.getPendingBids(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getArchivedBids = createAsyncThunk<
  IBid[],
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getArchivedBids', async (data, thunkAPI) => {
  try {
    return await Api.getArchivedBids(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getBidInfo = createAsyncThunk<
  IBidInfo,
  { id: number },
  ICommonCreateAsyncThunkThirdType
>('getBidInfo', async (data, thunkAPI) => {
  try {
    return await Api.getBidInfo(data)
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const setJobFilter = createAsyncThunk<
  IJobsFilter,
  IJobsFilter,
  ICommonCreateAsyncThunkThirdType
>('setFilter', async (data) => {
  return data
})

export const initJobTracker = createAsyncThunk<
  { id: number },
  IJobPostId,
  ICommonCreateAsyncThunkThirdType
>('initJobTracker', async (data, thunkAPI) => {
  try {
    return await Api.initJobTracker({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const endJobTracker = createAsyncThunk<
  ISuccess,
  IJobPostId & { id: number },
  ICommonCreateAsyncThunkThirdType
>('endJobTracker', async (data, thunkAPI) => {
  try {
    return await Api.endJobTracker({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const markJobAsComplete = createAsyncThunk<
  ISuccess,
  IJobPostId,
  ICommonCreateAsyncThunkThirdType
>('markJobAsComplete', async (data, thunkAPI) => {
  try {
    return await Api.markJobAsComplete({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const cancelBidOnJob = createAsyncThunk<
  IRemoveBidResult,
  IJobPostId & { bidId: number; removeFrom: 'active' | 'pending' },
  ICommonCreateAsyncThunkThirdType
>('cancelBidOnJob', async (data, thunkAPI) => {
  try {
    const result: ISuccess = await Api.cancelBidOnJob({
      jobPostId: data.jobPostId,
    })
    return {
      ...result,
      removedBidId: data.bidId,
      removedFrom: data.removeFrom,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const cleanJobAndBidInfo = createAsyncThunk<
  null,
  null,
  ICommonCreateAsyncThunkThirdType
>('cleanJobAndBidInfo', async () => {
  return null
})

export const blockJob = createAsyncThunk<
  null,
  IJobPostId,
  ICommonCreateAsyncThunkThirdType
>('blockJob', async (data, thunkAPI) => {
  try {
    await Api.blockJob({ ...data })
    return null
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

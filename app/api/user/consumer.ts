/* eslint-disable */
import { get, post } from 'app/services/api'
import {
  ICreateReliabilityFeedbackOnHelperThunkParams,
  IGetHelpersForConsumer,
  IIdAndTitle,
  IJobBidsListItem,
  IJobFrequencyType,
  IJobInfo,
  IJobPostId,
  ILimitAndOffset,
  ISuccess,
} from 'interfaces'

export const getHelpers = async (data?: IGetHelpersForConsumer): Promise<any> =>
  await post('helpers/match', data)

export const getSuggestionsHelpers = async (
  data?: IGetHelpersForConsumer,
): Promise<any> => {
  try {
    return await post('helpers/suggestions', data)
  } catch (error) {
    throw error
  }
}

export const getJobInfo = async (data: { id: number }): Promise<IJobInfo> => {
  try {
    return await get<IJobInfo>('job/' + data.id)
  } catch (error) {
    throw error
  }
}

export const getMyActiveJobs = async <T>(
  data: ILimitAndOffset & { jobFrequency: IJobFrequencyType },
): Promise<T> => {
  try {
    return await get<T>('job/dashboard/active', data)
  } catch (error) {
    throw error
  }
}

export const getMyPendingJobs = async (
  data: ILimitAndOffset,
): Promise<IIdAndTitle[]> => {
  try {
    return await get<IIdAndTitle[]>('job/dashboard/pending', data)
  } catch (error) {
    throw error
  }
}

export const getHelperById = async (id: number): Promise<any> => {
  try {
    return await get(`helpers/${id}`)
  } catch (error) {
    throw error
  }
}

export const getJobBids = async (data: {
  jobId: number
}): Promise<IJobBidsListItem[]> =>
  await get<IJobBidsListItem[]>('job/bid', { jobPostId: data.jobId })

export const completeJob = async (data: IJobPostId): Promise<ISuccess> =>
  await post<ISuccess>('job/complete', data)

export const createReliabilityFeedbackOnHelper = async (
  data: ICreateReliabilityFeedbackOnHelperThunkParams,
): Promise<{ id: number }> =>
  await post<{ id: number }>('feedback/helper/reliability', data)

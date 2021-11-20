/* eslint-disable */
import { post, put, del, get } from 'app/services/api/common'
import {
  IJobPostAndBidIds,
  IJobPostId,
  IPostNewJobForApi,
  ISuccess,
  IUpdateJob,
} from 'interfaces'

export const postJob = async (data: IPostNewJobForApi): Promise<any> =>
  await post('job', data)

export const updateJob = async (data: IUpdateJob): Promise<ISuccess> =>
  await put<ISuccess>('job', data)

export const markBidAsHired = async (
  data: IJobPostAndBidIds,
): Promise<ISuccess> => await post<ISuccess>('job/bid/hire', data)

export const removeJob = async (data: IJobPostId): Promise<ISuccess> =>
  await del<ISuccess>('job', data)

export const getJobsCountOfCategory = async (categoryId: number) =>
  await get('job/count', { categoryId })

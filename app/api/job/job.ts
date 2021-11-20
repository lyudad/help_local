/* eslint-disable */
import { post, get, put } from 'app/services/api'
import {
  IBid,
  ILimitAndOffset,
  IJobsToInviteUser,
  IBodyOfJobsToInviteUser,
  IBodyInviteUserToJob,
  IJobListBody,
  IPostJob,
  IUpdateJobBidBody,
  ISuccess,
} from 'interfaces'

export const getJobList = async (data: IJobListBody): Promise<IPostJob[]> => {
  try {
    return await post('job/match', {
      ...data,
      ...(data.maxFxiedPrice && { maxFixedPrice: data.maxFxiedPrice }),
    })
  } catch (error) {
    throw error
  }
}

export const getJobById = async (id): Promise<any> => {
  try {
    return await get(`job/${id}`)
  } catch (error) {
    throw error
  }
}

export const updateBidOnJob = async (
  data: IUpdateJobBidBody,
): Promise<ISuccess> => {
  try {
    return await put(`job/bid`, data)
  } catch (error) {
    throw error
  }
}

export const bidOnJob = async (data) => {
  try {
    return await post<{ id: number }>(`job/bid`, data)
  } catch (error) {
    throw error
  }
}

export const getAcceptedBids = async (
  data: ILimitAndOffset,
): Promise<IBid[]> => {
  try {
    return await get<IBid[]>('bids/accepted', data)
  } catch (error) {
    throw error
  }
}

export const getArchivedBids = async (
  data: ILimitAndOffset,
): Promise<IBid[]> => {
  try {
    return await get<IBid[]>('bids/archive', data)
  } catch (error) {
    throw error
  }
}

export const getPendingBids = async (
  data: ILimitAndOffset,
): Promise<IBid[]> => {
  try {
    return await get<IBid[]>('bids/pending', data)
  } catch (error) {
    throw error
  }
}

export const getJobsToInviteUser = async (
  data: IBodyOfJobsToInviteUser,
): Promise<IJobsToInviteUser[]> => {
  try {
    return await get<IJobsToInviteUser[]>('job/invite/options', data)
  } catch (error) {
    throw error
  }
}

export const inviteUserToJob = async (
  data: IBodyInviteUserToJob,
): Promise<ISuccess> => {
  try {
    return await post<ISuccess>('job/invite', data)
  } catch (error) {
    throw error
  }
}

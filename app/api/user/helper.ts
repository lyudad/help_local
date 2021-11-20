/* eslint-disable */
import { del, get, patch, post, put } from 'app/services/api'
import {
  IBidInfo,
  IJobPostId,
  IShortCategoryWithAttachmentsIds,
  ISuccess,
} from 'interfaces'

export const updateHelperProfile = async (data): Promise<any> => {
  try {
    return await put('profile/helper', data)
  } catch (error) {
    throw error
  }
}

export interface ISetupHelperProfileApiData {
  milesRange: number
  description: string
  isActive: boolean
  avatarId: string
  jobsInfo: Array<IShortCategoryWithAttachmentsIds>
  //ssn: string | null
  dob: string | null
  address: string
}

export const setupHelperProfile = async (
  data: ISetupHelperProfileApiData,
): Promise<ISuccess> => {
  try {
    //console.log('api---->', JSON.stringify(data))
    return await post<ISuccess>('profile/helper', data)
  } catch (error) {
    throw error
  }
}

export const updateActiveOfJobInfo = async (data: {
  categoryId: number
  isActive: boolean
}): Promise<any> => {
  try {
    return await patch('profile/helper/job_info', data)
  } catch (error) {
    throw error
  }
}

export const getBidInfo = async (data: { id: number }): Promise<IBidInfo> => {
  try {
    return await get<IBidInfo>('bids/' + data.id)
  } catch (error) {
    throw error
  }
}

export const initJobTracker = async (
  data: IJobPostId,
): Promise<{ id: number }> => {
  try {
    return await post<{ id: number }>('job/bid/tracker', data)
  } catch (error) {
    throw error
  }
}

export const endJobTracker = async (
  data: IJobPostId & { id: number },
): Promise<ISuccess> => {
  try {
    return await patch<ISuccess>('job/bid/tracker', data)
  } catch (error) {
    throw error
  }
}

export const markJobAsComplete = async (
  data: IJobPostId,
): Promise<ISuccess> => {
  try {
    return await post<ISuccess>('job/bid/complete', data)
  } catch (error) {
    throw error
  }
}

export const cancelBidOnJob = async (data: IJobPostId): Promise<ISuccess> => {
  try {
    return await del<ISuccess>('job/bid', data)
  } catch (error) {
    throw error
  }
}

export const blockJob = async (data: IJobPostId): Promise<{ id: number }> => {
  try {
    return await post<{ id: number }>('feedback/report', data)
  } catch (error) {
    throw error
  }
}

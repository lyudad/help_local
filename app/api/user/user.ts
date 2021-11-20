/* eslint-disable */
import { Buffer } from 'buffer'

import { get, post, put } from 'app/services/api'
import { KLAVIYO_API_URL, KLAVIYO_PUBLIC_API_KEY } from 'constants/config'
import {
  IArchivedJob,
  IArchivedJobCategory,
  ICreateFeedbackThunkParams,
  IGetArchivedJobsCredentials,
  ILimitAndOffset,
  ITrackerInfo,
  IBodyForSendQuestionForSupport,
  IBadges,
  INotificationSetting,
  ISuccess,
  INotification,
  IGetFeedbacksThunkResponse,
  IGetFeedbacksThunkParams,
  IPromoCode,
  IJobPostId,
  ICheckoutPreview,
  IPromoCodeData,
  ILinkedSocialAccountInfo,
  IAvailableBonuses,
  INumberId,
} from 'interfaces'
import {
  ICreateUnblockAccountRequestThunkParams,
  IMarkUserAsInappropriateThunkData,
} from 'screens/both/thunk'

export const completeSignUp = async (data): Promise<any> => {
  try {
    return await post('sign_up/complete', data)
  } catch (error) {
    throw error
  }
}

export const updateProfile = async (data): Promise<any> => {
  try {
    return await put('profile', data)
  } catch (error) {
    throw error
  }
}

export const getProfile = async (): Promise<any> => {
  try {
    return await get('profile')
  } catch (error) {
    throw error
  }
}

export const getAllCategories = async (): Promise<any> => {
  try {
    return await get('categories')
  } catch (error) {
    throw error
  }
}

export const getArchivedJobCategories = async (
  data: ILimitAndOffset,
): Promise<Array<IArchivedJobCategory>> => {
  try {
    return await get<Array<IArchivedJobCategory>>(
      'job/dashboard/archived/categories',
      data,
    )
  } catch (error) {
    throw error
  }
}

export const getArchivedJobs = async (
  data: IGetArchivedJobsCredentials,
): Promise<Array<IArchivedJob>> => {
  try {
    return await get<Array<IArchivedJob>>('job/dashboard/archived', data)
  } catch (error) {
    throw error
  }
}

export const getTrackerInfo = async (data: {
  jobPostId: number
}): Promise<ITrackerInfo[]> => {
  try {
    return await get<ITrackerInfo[]>('job/bid/tracker', data)
  } catch (error) {
    throw error
  }
}

const CLIENT: string = 'client'

export const createFeedback = async (
  data: ICreateFeedbackThunkParams,
): Promise<{ id: number }> => {
  try {
    return await post<{ id: number }>(
      `feedback/${data.postingFbFor === CLIENT ? CLIENT : 'helper'}`,
      {
        jobPostId: data.jobPostId,
        targetId: data.targetId,
        score: data.score,
        description: data.description,
      },
    )
  } catch (error) {
    throw error
  }
}

export const getFeedbacks = async (
  data: IGetFeedbacksThunkParams,
): Promise<IGetFeedbacksThunkResponse> => {
  try {
    return await get<IGetFeedbacksThunkResponse>(
      `feedback/${data.targetId ? CLIENT : 'helper'}`,
      data,
    )
  } catch (error) {
    throw error
  }
}

export const sendQuestionForSupport = async (
  data: IBodyForSendQuestionForSupport,
): Promise<{ id: number }> => {
  try {
    return await post('contact_us/question', data)
  } catch (error) {
    throw error
  }
}

export const getBadgesCount = async (): Promise<IBadges> => {
  try {
    return await get('notifications/badges')
  } catch (error) {
    throw error
  }
}

export const markUserAsInappropriate = async (
  data: IMarkUserAsInappropriateThunkData,
): Promise<{ id: number }> =>
  await post<{ id: number }>('feedback/report', data)

export const addAccountToKlaviyo = async ({
  email,
}: {
  email: string
}): Promise<boolean> => {
  try {
    let encoded = Buffer.from(
      `{
        "token": "${KLAVIYO_PUBLIC_API_KEY}",
        "properties": {
        "$email": "${email}"
        }
      }`,
    ).toString('base64')
    let isNoError: boolean = false
    await fetch(`${KLAVIYO_API_URL}?data=${encoded}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.toString().indexOf('1') !== -1) isNoError = true
      })
    if (isNoError) return Promise.resolve(true)
    else return Promise.resolve(false)
  } catch (err) {
    return Promise.resolve(false)
  }
}

export const getNotificationSettings = async (): Promise<
  INotificationSetting[]
> => await get<INotificationSetting[]>('notifications/settings')

export const updateNotificationSettings = async (
  data: INotificationSetting[],
): Promise<ISuccess> =>
  await post<ISuccess>('notifications/settings', { settings: data })

export const getNotifications = async (
  data: ILimitAndOffset,
): Promise<INotification[]> => await get<INotification[]>('notifications', data)

export const sendAccountDeactivationRequest = async (data: {
  description: string
}): Promise<{ id: number }> =>
  await post<{ id: number }>('contact_us/account/deactivation', data)

export const usePromoCode = async (data: IPromoCode): Promise<ISuccess> =>
  await post<ISuccess>('promo_code/redempt', data)

export const getPromoCodeInfo = async (
  data: IPromoCode,
): Promise<IPromoCodeData> => await get<IPromoCodeData>('promo_code', data)

export const getJobCheckoutPreview = async (
  data: IJobPostId,
): Promise<ICheckoutPreview> =>
  await get<ICheckoutPreview>('job/complete/preview', data)

export const logout = async (): Promise<ISuccess> =>
  await post<ISuccess>('logout')

export const getLikedSocialAccountInfo = async (): Promise<ILinkedSocialAccountInfo | null> =>
  await get<ILinkedSocialAccountInfo | null>('social')

export const getPromoCodesBalance = async (): Promise<IAvailableBonuses> =>
  await get<IAvailableBonuses>('promo_code/balance')

export const createUnblockAccountRequest = async (
  data: ICreateUnblockAccountRequestThunkParams,
): Promise<INumberId> =>
  await post<INumberId>('contact_us/account/unblock', data)

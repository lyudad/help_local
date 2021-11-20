/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from 'app/api/'
import {
  CompleteSignUpCredentials,
  FullProfile,
  IResetPasswordQuery,
  INotificationSetting,
  ICategory,
  ITrackerInfo,
  ICommonCreateAsyncThunkThirdType,
  ICreateFeedbackThunkResponse,
  ICreateFeedbackThunkParams,
  IBodyForSendQuestionForSupport,
  IBadges,
  ISuccess,
  ICreditCardData,
  IPlaidPublicTokenAndAccountId,
  IBankAccountData,
  INotification,
  ILimitAndOffset,
  IGetFeedbacksThunkParams,
  IGetFeedbacksThunkResponse,
  IAddBraintreePaymentMethodThunkParams,
  IGetReceiptsThunkParams,
  IReceipt,
  IPromoCode,
  ICheckoutPreview,
  IJobPostId,
  EUserPaymentMethods,
  IPromoCodeData,
  ILinkedSocialAccountInfo,
  IAvailableBonuses,
  INumberId,
  ERequestStatus,
} from 'interfaces'
import {
  setLoading,
  setError,
  setErrorAndUnsetLoading,
  setSuccess,
} from 'app/store/commonSlice'
import {
  setActiveProfile,
  setProfile,
  setBusinessName,
  setCategories,
  setCurrentRole,
  setLoadingFinishBankAccountLink,
  setPluggedPaymentMethod,
  setDateOfBirth,
  setPrimaryPaymentMethod,
  setIsCriminal,
  setRequestsStatus,
} from 'screens/both/reducers'
import { translate } from 'i18n'
import { UpdateProfileDataType } from './account/items/profile'
import { Asset } from 'react-native-image-picker'

export const completeSignUp = createAsyncThunk(
  'completeSignUp',
  async (data: CompleteSignUpCredentials & { email: string }, thunkAPI) => {
    const activeProfile = data.activeProfile
    try {
      thunkAPI.dispatch(setLoading(true))
      const result: { verified: boolean } = await Api.completeSignUp({
        ...data,
      })
      if (result.verified) {
        if (data.notifyOnPromo) {
          const klaviyoResult: boolean = await Api.addAccountToKlaviyo({
            email: data.email,
          })
          if (!klaviyoResult)
            thunkAPI.dispatch(
              setError(translate('finalizeAccountScreen.cantAddToKlaviyo')),
            )
        }
        /* 
          after sending date of birth to the server 
          and sending empty request to setup helper profile 
          (backend algorithm mistake),
          profile.isCriminal will be updated
        */
        try {
          // @ts-ignore
          await Api.setupHelperProfile({})
        } catch (err) {}
        const updatedprofile: FullProfile = await Api.getProfile()
        thunkAPI.dispatch(setIsCriminal(updatedprofile.isCriminal))
        thunkAPI.dispatch(setCurrentRole(activeProfile))
        thunkAPI.dispatch(setActiveProfile(activeProfile))
        if (data.dob) {
          thunkAPI.dispatch(setDateOfBirth(data.dob))
        }
        if (data.businessName)
          thunkAPI.dispatch(setBusinessName(data.businessName))
      } else {
        thunkAPI.dispatch(setError(translate('finalizeAccountScreen.couldnt')))
      }
      thunkAPI.dispatch(setLoading(false))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)
export const changeCurrentRole = createAsyncThunk(
  'changeCurrentRole',
  (data: 'helper' | 'consumer', thunkAPI) => {
    thunkAPI.dispatch(setCurrentRole(data))
  },
)

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async (data: IResetPasswordQuery, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const res: ISuccess = await Api.resetPassword({
        old_password: data.oldPassword,
        new_password: data.password,
        access_token: data.acessToken,
      })
      thunkAPI.dispatch(setLoading(false))
      if (res.success) {
        thunkAPI.dispatch(setSuccess('password was updated'))
      }
      thunkAPI.dispatch(
        setRequestsStatus({
          logoutRequestStatus: ERequestStatus.NOT_SENT_YET,
          changeCredentialsRequestStatus: res.success
            ? ERequestStatus.SUCCESS
            : ERequestStatus.FAIL,
        }),
      )
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      setTimeout(() => thunkAPI.dispatch(setError(null)), 3000)
      return Promise.reject()
    }
  },
)

interface IUpdateProfileThunkData {
  changedKeys: UpdateProfileDataType & {
    avatar?: { file: Asset; id: string }
  }
  dontTurnOffLoading?: boolean
}
export const updateProfile = createAsyncThunk(
  'updateProfile',
  async (
    { changedKeys, dontTurnOffLoading }: IUpdateProfileThunkData,
    thunkAPI,
  ) => {
    console.log(changedKeys)
    try {
      thunkAPI.dispatch(setLoading(true))
      if (changedKeys.avatar) {
        const dataForUpload = new FormData()
        dataForUpload.append('file_attachment', changedKeys.avatar.file)
        const res = await Api.singleUploadFile(dataForUpload)
        changedKeys.avatarId = res.id
      }
      const profile: FullProfile = await Api.updateProfile({ ...changedKeys })
      if (!dontTurnOffLoading) thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setProfile(profile))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const getNotificationSettings = createAsyncThunk<
  INotificationSetting[],
  null,
  ICommonCreateAsyncThunkThirdType
>('getNotificationSettings', async (_, thunkAPI) => {
  try {
    return await Api.getNotificationSettings()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const updateNotificationSettings = createAsyncThunk<
  INotificationSetting[],
  INotificationSetting[],
  ICommonCreateAsyncThunkThirdType
>('updateNotificationSettings', async (data, thunkAPI) => {
  try {
    const res: ISuccess = await Api.updateNotificationSettings([...data])
    if (res.success) return data
    else
      return thunkAPI.rejectWithValue(
        translate('common.couldntMakeRequest') as string,
      )
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getNotifications = createAsyncThunk<
  {
    notifications: Array<INotification>
    isNewArr: boolean
  },
  ILimitAndOffset,
  ICommonCreateAsyncThunkThirdType
>('getNotifications', async (data, thunkAPI) => {
  try {
    const notifications: INotification[] = await Api.getNotifications({
      ...data,
    })
    return {
      notifications,
      isNewArr: data.offset === 0,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getAllCategories = createAsyncThunk(
  'getAllCategories',
  async (_, thunkAPI) => {
    try {
      const categories: ICategory[] = await Api.getAllCategories()
      thunkAPI.dispatch(setCategories(categories))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const getTrackerInfo = createAsyncThunk<
  ITrackerInfo[],
  { jobPostId: number },
  ICommonCreateAsyncThunkThirdType
>('getTrackerInfo', async (data, thunkAPI) => {
  try {
    return await Api.getTrackerInfo({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const createFeedback = createAsyncThunk<
  ICreateFeedbackThunkResponse,
  ICreateFeedbackThunkParams,
  ICommonCreateAsyncThunkThirdType
>('createFeedback', async (data, thunkAPI) => {
  try {
    const result: { id: number } = await Api.createFeedback({ ...data })
    return {
      newFbId: result.id,
      fbPostedFor: data.postingFbFor,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getFeedbacks = createAsyncThunk<
  IGetFeedbacksThunkResponse,
  IGetFeedbacksThunkParams,
  ICommonCreateAsyncThunkThirdType
>('getFeedbacks', async (data, thunkAPI) => {
  try {
    return await Api.getFeedbacks({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const sendQuestionForSupport = createAsyncThunk<
  { id: number },
  IBodyForSendQuestionForSupport,
  ICommonCreateAsyncThunkThirdType
>('sendQuestionForSupport', async (data, thunkAPI) => {
  try {
    await Api.sendQuestionForSupport({ ...data })
    return null
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const getBadgesCount = createAsyncThunk<
  IBadges,
  null,
  ICommonCreateAsyncThunkThirdType
>('sendQuestionForSupport', async (_, thunkAPI) => {
  try {
    return await Api.getBadgesCount()
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export interface IMarkUserAsInappropriateThunkData {
  targetId: string
  onlyBlock?: boolean
}

export const markUserAsInappropriate = createAsyncThunk<
  { id: number },
  IMarkUserAsInappropriateThunkData,
  ICommonCreateAsyncThunkThirdType
>('markUserAsInappropriate', async (data, thunkAPI) => {
  try {
    return await Api.markUserAsInappropriate({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getCreditCardData = createAsyncThunk<
  ICreditCardData | null,
  null,
  ICommonCreateAsyncThunkThirdType
>('getCreditCardData', async (_, thunkAPI) => {
  try {
    return await Api.getCreditCardData()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const removeCreditCard = createAsyncThunk<
  ISuccess,
  null,
  ICommonCreateAsyncThunkThirdType
>('removeCreditCard', async (_, thunkAPI) => {
  try {
    return await Api.removeCreditCard()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const removePaypal = createAsyncThunk<
  ISuccess,
  null,
  ICommonCreateAsyncThunkThirdType
>('removePaypal', async (_, thunkAPI) => {
  try {
    return await Api.removePaypal()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const finishBankAccountLink = createAsyncThunk(
  'finishBankAccountLink',
  async (data: IPlaidPublicTokenAndAccountId, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoadingFinishBankAccountLink(true))
      const res: ISuccess = await Api.finishBankAccountLink({ ...data })
      if (res.success) {
        const res2: IBankAccountData | null = await Api.getBankAccountData()
        if (res2) {
          thunkAPI.dispatch(setPluggedPaymentMethod(res2))
          thunkAPI.dispatch(
            setPrimaryPaymentMethod(EUserPaymentMethods.BANK_ACCOUNT),
          )
        } else thunkAPI.dispatch(setError(translate('common.systemError')))
      } else {
        thunkAPI.dispatch(setError(translate('common.systemError')))
      }
      thunkAPI.dispatch(setLoadingFinishBankAccountLink(false))
      return null
    } catch (error) {
      thunkAPI.dispatch(setLoadingFinishBankAccountLink(false))
      thunkAPI.dispatch(setError(error))
      return Promise.reject()
    }
  },
)

export const getBankAccountData = createAsyncThunk<
  IBankAccountData | null,
  null,
  ICommonCreateAsyncThunkThirdType
>('getBankAccountData', async (_, thunkAPI) => {
  try {
    return await Api.getBankAccountData()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const removeBankAccount = createAsyncThunk<
  ISuccess,
  null,
  ICommonCreateAsyncThunkThirdType
>('removeBankAccount', async (_, thunkAPI) => {
  try {
    return await Api.removeBankAccount()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const addBraintreePaymentMethod = createAsyncThunk<
  ISuccess,
  IAddBraintreePaymentMethodThunkParams,
  ICommonCreateAsyncThunkThirdType
>('addBraintreePaymentMethod', async (data, thunkAPI) => {
  try {
    return await Api.addBraintreePaymentMethod({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const sendAccountDeactivationRequest = createAsyncThunk<
  { id: number },
  { description: string },
  ICommonCreateAsyncThunkThirdType
>('sendAccountDeactivationRequest', async (data, thunkAPI) => {
  try {
    return await Api.sendAccountDeactivationRequest({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getReceipts = createAsyncThunk<
  {
    receipts: IReceipt[]
    isNewArr: boolean
  },
  IGetReceiptsThunkParams,
  ICommonCreateAsyncThunkThirdType
>('getReceipts', async (data, thunkAPI) => {
  try {
    const receipts: Array<IReceipt> = await Api.getReceipts({ ...data })
    return {
      receipts,
      isNewArr: data.offset === 0,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const usePromoCode = createAsyncThunk<
  ISuccess & IPromoCode,
  IPromoCode,
  ICommonCreateAsyncThunkThirdType
>('usePromoCode', async (data, thunkAPI) => {
  try {
    const res: ISuccess = await Api.usePromoCode({ ...data })
    return {
      ...res,
      promoCode: data.promoCode,
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getPromoCodeInfo = createAsyncThunk<
  IPromoCodeData,
  IPromoCode,
  ICommonCreateAsyncThunkThirdType
>('getPromoCodeInfo', async (data, thunkAPI) => {
  try {
    return await Api.getPromoCodeInfo({ ...data })
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const getJobCheckoutPreview = createAsyncThunk<
  ICheckoutPreview,
  IJobPostId,
  ICommonCreateAsyncThunkThirdType
>('getJobCheckoutPreview', async (data, thunkAPI) => {
  try {
    return await Api.getJobCheckoutPreview({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const logout = createAsyncThunk<
  ISuccess,
  null,
  ICommonCreateAsyncThunkThirdType
>('logout', async (_, thunkAPI) => {
  try {
    return await Api.logout()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getLikedSocialAccountInfo = createAsyncThunk<
  ILinkedSocialAccountInfo | null,
  null,
  ICommonCreateAsyncThunkThirdType
>('getLikedSocialAccountInfo', async (_, thunkAPI) => {
  try {
    return await Api.getLikedSocialAccountInfo()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const getPromoCodesBalance = createAsyncThunk<
  IAvailableBonuses,
  null,
  ICommonCreateAsyncThunkThirdType
>('getPromoCodesBalance', async (_, thunkAPI) => {
  try {
    return await Api.getPromoCodesBalance()
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export interface ICreateUnblockAccountRequestThunkParams {
  description: string
  conclusion: string
  preventionDescription: string
}

export const createUnblockAccountRequest = createAsyncThunk<
  INumberId,
  ICreateUnblockAccountRequestThunkParams,
  ICommonCreateAsyncThunkThirdType
>('createUnblockAccountRequest', async (data, thunkAPI) => {
  try {
    return await Api.createUnblockAccountRequest({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

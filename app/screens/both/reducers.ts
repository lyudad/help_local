/* eslint-disable no-param-reassign */
/* eslint-disable no-prototype-builtins */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAddedCategory, ICategory } from 'app/interfaces/common/category'
import { translate } from 'i18n'

import {
  FullProfile,
  HelperProfile,
  ISignInApiResponse,
  ITrackerInfo,
  ICreateFeedbackThunkResponse,
  IUserReducerState,
  IReducerWelcomeMessage,
  IReducerRestState,
  TPluggedPaymentMethodValueVariants,
  EUserPaymentMethods,
  INotification,
  IReceipt,
  ICheckoutPreview,
  ERequestStatus,
  IBothRequestsStatus,
  IBadges,
  IPromoCodeData,
} from 'interfaces'
import {
  createFeedback,
  getTrackerInfo,
  getBadgesCount,
  removeCreditCard,
  getCreditCardData,
  getBankAccountData,
  removeBankAccount,
  getNotificationSettings,
  updateNotificationSettings,
  getNotifications,
  getFeedbacks,
  addBraintreePaymentMethod,
  removePaypal,
  sendAccountDeactivationRequest,
  getReceipts,
  usePromoCode,
  getJobCheckoutPreview,
  logout,
  getPromoCodeInfo,
  getLikedSocialAccountInfo,
  getPromoCodesBalance,
  createUnblockAccountRequest,
} from './thunk'

const initialStateOfWellcomeMessage: IReducerWelcomeMessage = {
  clientsWhoClosedWelcomeMsg: [],
  helpersWhoClosedWelcomeMsg: [],
}

const initialStateOfRest: IReducerRestState = {
  pluggedPaymentMethod: null,
  profile: null,
  currentRole: null,
  accessToken: null,
  refreshToken: null,
  categories: [],
  trackerInfo: [],
  error: '',
  autoShowError: true,
  lastCreatedFeedbackId: 0,
  badges: null,
  loadings: {
    loadingTrackerInfo: false,
    loadingCreateFeedback: false,
    loadingBadges: false,
    loadingRemoveCreditCard: false,
    loadingGetCreditCardData: false,
    loadingFinishBankAccountLink: false,
    loadingGetBankAccountData: false,
    loadingRemoveBankAccount: false,
    loadingUpdateNotificationSettings: false,
    loadingNotifications: false,
    isGetFeedbacksLoading: false,
    isAddBraintreePaymentMethodLoading: false,
    isRemovePaypalLoading: false,
    isSendAccountDeactivationRequestLoading: false,
    isGetReceiptsLoading: false,
    isUsePromoCodeLoading: false,
    isGetPromoCodeInfoLoading: false,
    isGetJobCheckoutPreviewLoading: false,
    isLogoutLoading: false,
    isGetLikedSocialAccountInfoLoading: false,
    isGetPromoCodesBalanceLoading: false,
    isCreateUnblockAccountRequestLoading: false,
  },
  notificationSettings: [],
  notifications: [],
  isAllNotificationsGot: false,
  feedbacks: {
    totalCount: 0,
    rows: [],
  },
  lastDeactivateAccountRequestId: null,
  receipts: [],
  isAllReceiptsGot: false,
  lastUsedPromoCode: null,
  lastUsedPromoCodeData: null,
  checkoutPreview: null,
  requestsStatus: {
    logoutRequestStatus: ERequestStatus.NOT_SENT_YET,
    changeCredentialsRequestStatus: ERequestStatus.NOT_SENT_YET,
  },
  linkedSocialAccount: null,
  availableBonuses: 0,
  lastCreatedUnblockAccountRequestId: 0,
}

const initialState: IUserReducerState = {
  ...initialStateOfWellcomeMessage,
  ...initialStateOfRest,
}

const couldntMakeRequest: string = translate('common.couldntMakeRequest')

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<ISignInApiResponse>) {
      Object.assign(state, payload)
    },
    setNotifications(state, { payload }: PayloadAction<INotification[]>) {
      state.notifications = [...payload]
    },
    setAccessToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload
    },
    setIsAllNotificationsGot(state, { payload }: PayloadAction<boolean>) {
      state.isAllNotificationsGot = payload
    },
    setPrimaryPaymentMethod(
      state,
      { payload }: PayloadAction<EUserPaymentMethods | null>,
    ) {
      state.profile.primaryPaymentMethod = payload
    },
    setPluggedPaymentMethod(
      state,
      { payload }: PayloadAction<TPluggedPaymentMethodValueVariants>,
    ) {
      state.pluggedPaymentMethod = payload
    },
    setCurrentRole(
      state,
      { payload }: PayloadAction<'consumer' | 'helper' | null>,
    ) {
      state.currentRole = payload
    },
    setIsCriminal(state, { payload }: PayloadAction<boolean>) {
      state.profile.isCriminal = payload
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
    },
    setTrackerInfo(state, { payload }: PayloadAction<ITrackerInfo[]>) {
      state.trackerInfo = [...payload.sort((a, b) => a.id - b.id)]
    },
    setProfile(state, { payload }: PayloadAction<FullProfile>) {
      if (payload.helperProfile?.jobsInfo === null) {
        payload.helperProfile.jobsInfo = []
      }
      state.profile = { ...payload }
    },
    setJobsInfo(state, { payload }: PayloadAction<Array<IAddedCategory>>) {
      state.profile.helperProfile.jobsInfo = [...payload]
    },
    setActiveProfile(state, { payload }: PayloadAction<'helper' | 'consumer'>) {
      state.profile.activeProfile = payload
    },
    setBusinessName(state, { payload }: PayloadAction<string>) {
      state.profile.businessName = payload
    },
    setDateOfBirth(state, { payload }: PayloadAction<string>) {
      state.profile.dob = payload
    },
    setHelperProfile(state, { payload }: PayloadAction<HelperProfile>) {
      if (payload.jobsInfo === null) {
        payload.jobsInfo = []
      }
      state.profile.helperProfile = { ...payload }
    },
    setCategories(state, { payload }: PayloadAction<ICategory[]>) {
      state.categories = [...payload]
    },
    setReceipts(state, { payload }: PayloadAction<IReceipt[]>) {
      state.receipts = [...payload]
    },
    setIsAllReceiptsGot(state, { payload }: PayloadAction<boolean>) {
      state.isAllReceiptsGot = payload
    },
    setLastCreatedFeedbackId(state, { payload }: PayloadAction<number>) {
      state.lastCreatedFeedbackId = payload
    },
    setClientsWhoClosedWelcomeMsg(state, { payload }: PayloadAction<string[]>) {
      state.clientsWhoClosedWelcomeMsg = payload
    },
    setHelpersWhoClosedWelcomeMsg(state, { payload }: PayloadAction<string[]>) {
      state.helpersWhoClosedWelcomeMsg = payload
    },
    setLastUsedPromoCode(state, { payload }: PayloadAction<string>) {
      state.lastUsedPromoCode = payload
    },
    setLastUsedPromoCodeData(
      state,
      { payload }: PayloadAction<IPromoCodeData | null>,
    ) {
      state.lastUsedPromoCodeData = payload
    },
    setJobCheckoutPreview(state, { payload }: PayloadAction<ICheckoutPreview>) {
      state.checkoutPreview = payload
    },
    resetAll(state) {
      Object.assign(state, initialState)
    },
    resetAllExceptWelcomeMsg(state) {
      Object.assign(state, initialStateOfRest)
    },
    setLoadingFinishBankAccountLink(
      state,
      { payload }: PayloadAction<boolean>,
    ) {
      state.loadings.loadingFinishBankAccountLink = payload
    },
    setRequestsStatus(state, { payload }: PayloadAction<IBothRequestsStatus>) {
      state.requestsStatus = payload
    },
    setBadges(state, { payload }: PayloadAction<null | IBadges>) {
      state.badges = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTrackerInfo.pending, (state) => {
      state.loadings.loadingTrackerInfo = true
    })
    builder.addCase(getTrackerInfo.rejected, (state, action) => {
      state.loadings.loadingTrackerInfo = false
      state.error = action.payload
    })
    builder.addCase(
      getTrackerInfo.fulfilled,
      (state, { payload }: PayloadAction<ITrackerInfo[]>) => {
        state.loadings.loadingTrackerInfo = false
        state.trackerInfo = [...payload.sort((a, b) => a.id - b.id)]
      },
    )

    builder.addCase(createFeedback.pending, (state) => {
      state.loadings.loadingCreateFeedback = true
    })
    builder.addCase(createFeedback.rejected, (state, action) => {
      state.loadings.loadingCreateFeedback = false
      state.error = action.payload
    })
    builder.addCase(
      createFeedback.fulfilled,
      (state, { payload }: PayloadAction<ICreateFeedbackThunkResponse>) => {
        state.loadings.loadingCreateFeedback = false
        state.lastCreatedFeedbackId = payload.newFbId
      },
    )

    builder.addCase(createUnblockAccountRequest.pending, (state) => {
      state.loadings.isCreateUnblockAccountRequestLoading = true
    })
    builder.addCase(createUnblockAccountRequest.rejected, (state, action) => {
      state.loadings.isCreateUnblockAccountRequestLoading = false
      state.error = action.payload
    })
    builder.addCase(
      createUnblockAccountRequest.fulfilled,
      (state, { payload }) => {
        state.loadings.isCreateUnblockAccountRequestLoading = false
        state.lastCreatedUnblockAccountRequestId = payload.id
      },
    )

    builder.addCase(getBadgesCount.pending, (state) => {
      state.loadings.loadingBadges = true
    })
    builder.addCase(getBadgesCount.fulfilled, (state, { payload }) => {
      state.loadings.loadingBadges = false
      state.badges = payload
    })
    builder.addCase(getBadgesCount.rejected, (state, action) => {
      state.loadings.loadingBadges = false
      state.error = action.payload
    })

    builder.addCase(removeCreditCard.pending, (state) => {
      state.loadings.loadingRemoveCreditCard = true
    })
    builder.addCase(removeCreditCard.fulfilled, (state, { payload }) => {
      state.loadings.loadingRemoveCreditCard = false
      if (payload.success) {
        state.pluggedPaymentMethod = null
        state.profile.primaryPaymentMethod = null
      } else {
        state.error = couldntMakeRequest
      }
    })
    builder.addCase(removeCreditCard.rejected, (state, action) => {
      state.loadings.loadingRemoveCreditCard = false
      state.error = action.payload
    })

    builder.addCase(removePaypal.pending, (state) => {
      state.loadings.isRemovePaypalLoading = true
    })
    builder.addCase(removePaypal.fulfilled, (state, { payload }) => {
      state.loadings.isRemovePaypalLoading = false
      if (payload.success) {
        state.pluggedPaymentMethod = null
        state.profile.primaryPaymentMethod = null
      } else {
        state.error = couldntMakeRequest
      }
    })
    builder.addCase(removePaypal.rejected, (state, action) => {
      state.loadings.isRemovePaypalLoading = false
      state.error = action.payload
    })

    builder.addCase(getCreditCardData.pending, (state) => {
      state.loadings.loadingGetCreditCardData = true
    })
    builder.addCase(getCreditCardData.fulfilled, (state, { payload }) => {
      state.loadings.loadingGetCreditCardData = false
      if (payload) {
        state.pluggedPaymentMethod = { ...payload }
        state.profile.primaryPaymentMethod = EUserPaymentMethods.CREDIT_CARD
      } else if (state.pluggedPaymentMethod?.hasOwnProperty('brand')) {
        state.pluggedPaymentMethod = null
      }
    })
    builder.addCase(getCreditCardData.rejected, (state, action) => {
      state.loadings.loadingGetCreditCardData = false
      state.error = action.payload
    })

    builder.addCase(getBankAccountData.pending, (state) => {
      state.loadings.loadingGetBankAccountData = true
    })
    builder.addCase(getBankAccountData.fulfilled, (state, { payload }) => {
      state.loadings.loadingGetBankAccountData = false
      if (payload) {
        state.pluggedPaymentMethod = { ...payload }
        state.profile.primaryPaymentMethod = EUserPaymentMethods.BANK_ACCOUNT
      } else if (state.pluggedPaymentMethod?.hasOwnProperty('bankName')) {
        state.pluggedPaymentMethod = null
      }
    })
    builder.addCase(getBankAccountData.rejected, (state, action) => {
      state.loadings.loadingGetBankAccountData = false
      state.error = action.payload
    })

    builder.addCase(addBraintreePaymentMethod.pending, (state) => {
      state.loadings.isAddBraintreePaymentMethodLoading = true
    })
    builder.addCase(
      addBraintreePaymentMethod.fulfilled,
      (state, { payload }) => {
        state.loadings.isAddBraintreePaymentMethodLoading = false
        if (payload.success) {
          state.pluggedPaymentMethod = { isPaypal: true }
          state.profile.primaryPaymentMethod = EUserPaymentMethods.PAYPAL
        } else {
          state.error = couldntMakeRequest
        }
      },
    )
    builder.addCase(addBraintreePaymentMethod.rejected, (state, action) => {
      state.loadings.isAddBraintreePaymentMethodLoading = false
      state.error = action.payload
    })

    builder.addCase(removeBankAccount.pending, (state) => {
      state.loadings.loadingRemoveBankAccount = true
    })
    builder.addCase(removeBankAccount.fulfilled, (state, { payload }) => {
      state.loadings.loadingRemoveBankAccount = false
      if (payload.success) {
        state.pluggedPaymentMethod = null
        state.profile.primaryPaymentMethod = null
      } else {
        state.error = couldntMakeRequest
      }
    })
    builder.addCase(removeBankAccount.rejected, (state, action) => {
      state.loadings.loadingRemoveBankAccount = false
      state.error = action.payload
    })

    builder.addCase(getNotificationSettings.pending, () => {
      // state.loadings. = true
    })
    builder.addCase(getNotificationSettings.fulfilled, (state, { payload }) => {
      // state.loadings. = false
      state.notificationSettings = [...payload]
    })
    builder.addCase(getNotificationSettings.rejected, (state, action) => {
      // state.loadings. = false
      state.error = action.payload
    })

    builder.addCase(updateNotificationSettings.pending, (state) => {
      state.loadings.loadingUpdateNotificationSettings = true
    })
    builder.addCase(
      updateNotificationSettings.fulfilled,
      (state, { payload }) => {
        state.loadings.loadingUpdateNotificationSettings = false
        state.notificationSettings = [...payload]
      },
    )
    builder.addCase(updateNotificationSettings.rejected, (state, action) => {
      state.loadings.loadingUpdateNotificationSettings = false
      state.error = action.payload
    })

    builder.addCase(getNotifications.pending, (state) => {
      state.loadings.loadingNotifications = true
    })
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.loadings.loadingNotifications = false
      let newArr: INotification[] = []
      if (payload.isNewArr) {
        newArr = payload.notifications
      } else {
        newArr = [...state.notifications, ...payload.notifications]
      }
      state.notifications = newArr
      state.isAllNotificationsGot = payload.notifications.length === 0
    })
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.loadings.loadingNotifications = false
      state.error = action.payload
    })

    builder.addCase(getFeedbacks.pending, (state) => {
      state.loadings.isGetFeedbacksLoading = true
    })
    builder.addCase(getFeedbacks.fulfilled, (state, { payload }) => {
      state.loadings.isGetFeedbacksLoading = false
      state.feedbacks = payload
    })
    builder.addCase(getFeedbacks.rejected, (state, action) => {
      state.loadings.isGetFeedbacksLoading = false
      state.error = action.payload
    })

    builder.addCase(sendAccountDeactivationRequest.pending, (state) => {
      state.loadings.isSendAccountDeactivationRequestLoading = true
    })
    builder.addCase(
      sendAccountDeactivationRequest.fulfilled,
      (state, { payload }) => {
        state.loadings.isSendAccountDeactivationRequestLoading = false
        state.lastDeactivateAccountRequestId = payload.id
      },
    )
    builder.addCase(
      sendAccountDeactivationRequest.rejected,
      (state, action) => {
        state.loadings.isSendAccountDeactivationRequestLoading = false
        state.error = action.payload
      },
    )

    builder.addCase(getReceipts.pending, (state) => {
      state.loadings.isGetReceiptsLoading = true
    })
    builder.addCase(getReceipts.fulfilled, (state, { payload }) => {
      state.loadings.isGetReceiptsLoading = false
      state.receipts = [
        ...(payload.isNewArr ? [] : state.receipts),
        ...payload.receipts,
      ]
      state.isAllReceiptsGot = payload.receipts.length === 0
    })
    builder.addCase(getReceipts.rejected, (state, action) => {
      state.loadings.isGetReceiptsLoading = false
      state.error = action.payload
    })

    builder.addCase(usePromoCode.pending, (state) => {
      state.loadings.isUsePromoCodeLoading = true
    })
    builder.addCase(usePromoCode.fulfilled, (state, { payload }) => {
      state.loadings.isUsePromoCodeLoading = false
      if (payload.success) {
        state.lastUsedPromoCode = payload.promoCode
      } else {
        state.error = couldntMakeRequest
      }
    })
    builder.addCase(usePromoCode.rejected, (state, action) => {
      state.loadings.isUsePromoCodeLoading = false
      state.error = action.payload
    })

    builder.addCase(getPromoCodeInfo.pending, (state) => {
      state.loadings.isGetPromoCodeInfoLoading = true
    })
    builder.addCase(getPromoCodeInfo.fulfilled, (state, { payload }) => {
      state.loadings.isGetPromoCodeInfoLoading = false
      state.lastUsedPromoCodeData = { ...payload }
    })
    builder.addCase(getPromoCodeInfo.rejected, (state, action) => {
      state.loadings.isGetPromoCodeInfoLoading = false
      state.error = action.payload
    })

    builder.addCase(getJobCheckoutPreview.pending, (state) => {
      state.loadings.isGetJobCheckoutPreviewLoading = true
    })
    builder.addCase(getJobCheckoutPreview.fulfilled, (state, { payload }) => {
      state.loadings.isGetJobCheckoutPreviewLoading = false
      state.checkoutPreview = payload
    })
    builder.addCase(getJobCheckoutPreview.rejected, (state, action) => {
      state.loadings.isGetJobCheckoutPreviewLoading = false
      state.error = action.payload
    })

    builder.addCase(logout.pending, (state) => {
      state.loadings.isLogoutLoading = true
    })
    builder.addCase(logout.fulfilled, (state, { payload }) => {
      state.loadings.isLogoutLoading = false
      if (payload.success) {
        state.requestsStatus = {
          ...state.requestsStatus,
          logoutRequestStatus: ERequestStatus.SUCCESS,
        }
      } else {
        state.requestsStatus = {
          ...state.requestsStatus,
          logoutRequestStatus: ERequestStatus.FAIL,
        }
      }
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.loadings.isLogoutLoading = false
      state.error = action.payload
    })

    builder.addCase(getLikedSocialAccountInfo.pending, (state) => {
      state.loadings.isGetLikedSocialAccountInfoLoading = true
    })
    builder.addCase(
      getLikedSocialAccountInfo.fulfilled,
      (state, { payload }) => {
        state.loadings.isGetLikedSocialAccountInfoLoading = false
        if (payload) {
          state.linkedSocialAccount = { ...payload }
        } else {
          state.linkedSocialAccount = null
        }
      },
    )
    builder.addCase(getLikedSocialAccountInfo.rejected, (state, action) => {
      state.loadings.isGetLikedSocialAccountInfoLoading = false
      state.error = action.payload
    })

    builder.addCase(getPromoCodesBalance.pending, (state) => {
      state.loadings.isGetPromoCodesBalanceLoading = true
    })
    builder.addCase(getPromoCodesBalance.fulfilled, (state, { payload }) => {
      state.loadings.isGetPromoCodesBalanceLoading = false
      state.availableBonuses = payload.availableBonuses
    })
    builder.addCase(getPromoCodesBalance.rejected, (state, action) => {
      state.loadings.isGetPromoCodesBalanceLoading = false
      state.error = action.payload
    })
  },
})

export const {
  setUser,
  setActiveProfile,
  setProfile,
  setHelperProfile,
  setBusinessName,
  setJobsInfo,
  setCategories,
  resetAll,
  setError,
  setTrackerInfo,
  setLastCreatedFeedbackId,
  setCurrentRole,
  resetAllExceptWelcomeMsg,
  setClientsWhoClosedWelcomeMsg,
  setHelpersWhoClosedWelcomeMsg,
  setPluggedPaymentMethod,
  setLoadingFinishBankAccountLink,
  setNotifications,
  setIsAllNotificationsGot,
  setDateOfBirth,
  setReceipts,
  setIsAllReceiptsGot,
  setLastUsedPromoCode,
  setJobCheckoutPreview,
  setRequestsStatus,
  setBadges,
  setPrimaryPaymentMethod,
  setLastUsedPromoCodeData,
  setAccessToken,
  setIsCriminal,
} = userSlice.actions
export default userSlice.reducer

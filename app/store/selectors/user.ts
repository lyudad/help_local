import { createSelector } from '@reduxjs/toolkit'
import { INotificationSetting } from 'interfaces'
import { RootState } from '../rootReducer'

export const user = {
  activeProfile: createSelector(
    (state: RootState) => state.user.profile.activeProfile,
    (value) => value,
  ),
  currentRole: createSelector(
    (state: RootState) => state.user.currentRole,
    (value) => value,
  ),
  accessToken: createSelector(
    (state: RootState) => state.user.accessToken,
    (value) => value,
  ),
  refreshToken: createSelector(
    (state: RootState) => state.user.refreshToken,
    (value) => value,
  ),
  badges: createSelector(
    (state: RootState) => state.user.badges,
    (value) => value,
  ),
  profile: createSelector(
    (state: RootState) => state.user.profile,
    (value) => value,
  ),
  categories: createSelector(
    (state: RootState) => state.user.categories,
    (value) => value,
  ),
  clientsWhoClosedWelcomeMsg: createSelector(
    (state: RootState) => state.user.clientsWhoClosedWelcomeMsg,
    (value) => value,
  ),
  helpersWhoClosedWelcomeMsg: createSelector(
    (state: RootState) => state.user.helpersWhoClosedWelcomeMsg,
    (value) => value,
  ),
  pluggedPaymentMethod: createSelector(
    (state: RootState) => state.user.pluggedPaymentMethod,
    (value) => value,
  ),
  feedbacks: createSelector(
    (state: RootState) => state.user.feedbacks,
    (value) => value,
  ),
  lastDeactivateAccountRequestId: createSelector(
    (state: RootState) => state.user.lastDeactivateAccountRequestId,
    (value) => value,
  ),
  receipts: createSelector(
    (state: RootState) => state.user.receipts,
    (value) => value,
  ),
  isAllReceiptsGot: createSelector(
    (state: RootState) => state.user.isAllReceiptsGot,
    (value) => value,
  ),
  lastUsedPromoCode: createSelector(
    (state: RootState) => state.user.lastUsedPromoCode,
    (value) => value,
  ),
  lastUsedPromoCodeData: createSelector(
    (state: RootState) => state.user.lastUsedPromoCodeData,
    (value) => value,
  ),
  checkoutPreview: createSelector(
    (state: RootState) => state.user.checkoutPreview,
    (value) => value,
  ),
  requestsStatus: createSelector(
    (state: RootState) => state.user.requestsStatus,
    (value) => value,
  ),
  linkedSocialAccount: createSelector(
    (state: RootState) => state.user.linkedSocialAccount,
    (value) => value,
  ),
  availableBonuses: createSelector(
    (state: RootState) => state.user.availableBonuses,
    (value) => value,
  ),
  lastCreatedUnblockAccountRequestId: createSelector(
    (state: RootState) => state.user.lastCreatedUnblockAccountRequestId,
    (value) => value,
  ),

  // state.user.profile items
  id: createSelector(
    (state: RootState) => state.user.profile.id,
    (value) => value,
  ),
  firstName: createSelector(
    (state: RootState) => state.user.profile.firstName,
    (value) => value,
  ),
  lastName: createSelector(
    (state: RootState) => state.user.profile.lastName,
    (value) => value,
  ),
  email: createSelector(
    (state: RootState) => state.user.profile.email,
    (value) => value,
  ),
  telephone: createSelector(
    (state: RootState) => state.user.profile.telephone,
    (value) => value,
  ),
  businessName: createSelector(
    (state: RootState) => state.user.profile.businessName,
    (value) => value,
  ),
  address: createSelector(
    (state: RootState) => state.user.profile.address,
    (value) => value,
  ),
  addressText: createSelector(
    (state: RootState) => state.user.profile,
    (value) => {
      let result = ''
      if (value && value.address) {
        result = value.address.formatted
      }
      return result
    },
  ),
  helperProfile: createSelector(
    (state: RootState) => state.user.profile.helperProfile,
    (value) => value,
  ),
  ssnAttached: createSelector(
    (state: RootState) => state.user.profile.ssnAttached,
    (value) => value,
  ),
  isCriminal: createSelector(
    (state: RootState) => state.user.profile.isCriminal,
    (value) => value,
  ),
  primaryPaymentMethod: createSelector(
    (state: RootState) => state.user.profile.primaryPaymentMethod,
    (value) => value,
  ),

  // state.user.profile.helperProfile items
  jobsInfo: createSelector(
    (state: RootState) => state.user.profile.helperProfile.jobsInfo,
    (value) => value,
  ),
  attachments: createSelector(
    (state: RootState) => state.user.profile.helperProfile.attachments,
    (value) => value,
  ),
  avatarId: createSelector(
    (state: RootState) => state.user.profile.helperProfile.avatarId,
    (value) => value,
  ),

  notificationSettings: createSelector(
    (state: RootState) => state.user.notificationSettings,
    (value: INotificationSetting[]) => {
      // the selector makes sure that client settings go first in the array
      const clientSettings: INotificationSetting[] = []
      const helperSettings: INotificationSetting[] = []
      const HELPER = 'helper'
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < value.length; i++) {
        if (value[i].type === HELPER) {
          helperSettings.push(value[i])
        } else {
          clientSettings.push(value[i])
        }
      }
      return [...clientSettings, ...helperSettings]
    },
  ),
  notifications: createSelector(
    (state: RootState) => state.user.notifications,
    (value) => value,
  ),
  isAllNotificationsGot: createSelector(
    (state: RootState) => state.user.isAllNotificationsGot,
    (value) => value,
  ),
  trackerInfo: createSelector(
    (state: RootState) => state.user.trackerInfo,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.user.error,
    (value) => value,
  ),
  autoShowError: createSelector(
    (state: RootState) => state.user.autoShowError,
    (value) => value,
  ),
  lastCreatedFeedbackId: createSelector(
    (state: RootState) => state.user.lastCreatedFeedbackId,
    (value) => value,
  ),

  loadingTrackerInfo: createSelector(
    (state: RootState) => state.user.loadings.loadingTrackerInfo,
    (value) => value,
  ),
  loadingCreateFeedback: createSelector(
    (state: RootState) => state.user.loadings.loadingCreateFeedback,
    (value) => value,
  ),
  loadingRemoveCreditCard: createSelector(
    (state: RootState) => state.user.loadings.loadingRemoveCreditCard,
    (value) => value,
  ),
  loadingGetCreditCardData: createSelector(
    (state: RootState) => state.user.loadings.loadingGetCreditCardData,
    (value) => value,
  ),
  loadingGetBankAccountData: createSelector(
    (state: RootState) => state.user.loadings.loadingGetBankAccountData,
    (value) => value,
  ),
  loadingFinishBankAccountLink: createSelector(
    (state: RootState) => state.user.loadings.loadingFinishBankAccountLink,
    (value) => value,
  ),
  loadingRemoveBankAccount: createSelector(
    (state: RootState) => state.user.loadings.loadingRemoveBankAccount,
    (value) => value,
  ),
  loadingUpdateNotificationSettings: createSelector(
    (state: RootState) => state.user.loadings.loadingUpdateNotificationSettings,
    (value) => value,
  ),
  loadingNotifications: createSelector(
    (state: RootState) => state.user.loadings.loadingNotifications,
    (value) => value,
  ),
  isGetFeedbacksLoading: createSelector(
    (state: RootState) => state.user.loadings.isGetFeedbacksLoading,
    (value) => value,
  ),
  isAddBraintreePaymentMethodLoading: createSelector(
    (state: RootState) =>
      state.user.loadings.isAddBraintreePaymentMethodLoading,
    (value) => value,
  ),
  isRemovePaypalLoading: createSelector(
    (state: RootState) => state.user.loadings.isRemovePaypalLoading,
    (value) => value,
  ),
  isSendAccountDeactivationRequestLoading: createSelector(
    (state: RootState) =>
      state.user.loadings.isSendAccountDeactivationRequestLoading,
    (value) => value,
  ),
  isGetReceiptsLoading: createSelector(
    (state: RootState) => state.user.loadings.isGetReceiptsLoading,
    (value) => value,
  ),
  isUsePromoCodeLoading: createSelector(
    (state: RootState) => state.user.loadings.isUsePromoCodeLoading,
    (value) => value,
  ),
  isGetPromoCodeInfoLoading: createSelector(
    (state: RootState) => state.user.loadings.isGetPromoCodeInfoLoading,
    (value) => value,
  ),
  isGetJobCheckoutPreviewLoading: createSelector(
    (state: RootState) => state.user.loadings.isGetJobCheckoutPreviewLoading,
    (value) => value,
  ),
  isLogoutLoading: createSelector(
    (state: RootState) => state.user.loadings.isLogoutLoading,
    (value) => value,
  ),
  isGetLikedSocialAccountInfoLoading: createSelector(
    (state: RootState) =>
      state.user.loadings.isGetLikedSocialAccountInfoLoading,
    (value) => value,
  ),
  isGetPromoCodesBalanceLoading: createSelector(
    (state: RootState) => state.user.loadings.isGetPromoCodesBalanceLoading,
    (value) => value,
  ),
  isCreateUnblockAccountRequestLoading: createSelector(
    (state: RootState) =>
      state.user.loadings.isCreateUnblockAccountRequestLoading,
    (value) => value,
  ),
}

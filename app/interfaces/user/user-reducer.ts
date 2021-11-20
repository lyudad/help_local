import { INotificationSetting } from 'interfaces'
import {
  ERequestStatus,
  ICategory,
  ICheckoutPreview,
  ILinkedSocialAccountInfo,
  IPluggedPaymentMethod,
  IPromoCodeData,
  IReceipt,
  ITrackerInfo,
  OrNull,
} from '../common'
import { INotification } from '../common/notifications'
import { IFeedback } from './feedback'
import { FullProfile, IProfileAnd2Tokens } from './profile'

export interface IBothRequestsStatus {
  logoutRequestStatus: ERequestStatus
  changeCredentialsRequestStatus: ERequestStatus
}

export type UserReducerProfileState = OrNull<FullProfile>
export interface IReducerWelcomeMessage {
  clientsWhoClosedWelcomeMsg: string[]
  helpersWhoClosedWelcomeMsg: string[]
}
export interface IReducerRestState
  extends OrNull<IProfileAnd2Tokens>,
    IPluggedPaymentMethod {
  currentRole: 'consumer' | 'helper' | null
  badges: null | IBadges
  categories: Array<ICategory>
  trackerInfo: ITrackerInfo[]
  autoShowError: boolean
  error: string
  lastCreatedFeedbackId: number
  loadings: {
    loadingTrackerInfo: boolean
    loadingCreateFeedback: boolean
    loadingBadges: boolean
    loadingRemoveCreditCard: boolean
    loadingGetCreditCardData: boolean
    loadingFinishBankAccountLink: boolean
    loadingGetBankAccountData: boolean
    loadingRemoveBankAccount: boolean
    isRemovePaypalLoading: boolean
    loadingUpdateNotificationSettings: boolean
    loadingNotifications: boolean
    isGetFeedbacksLoading: boolean
    isAddBraintreePaymentMethodLoading: boolean
    isSendAccountDeactivationRequestLoading: boolean
    isGetReceiptsLoading: boolean
    isUsePromoCodeLoading: boolean
    isGetPromoCodeInfoLoading: boolean
    isGetJobCheckoutPreviewLoading: boolean
    isLogoutLoading: boolean
    isGetLikedSocialAccountInfoLoading: boolean
    isGetPromoCodesBalanceLoading: boolean
    isCreateUnblockAccountRequestLoading: boolean
  }
  notificationSettings: INotificationSetting[]
  notifications: INotification[]
  isAllNotificationsGot: boolean
  feedbacks: {
    totalCount: number
    rows: IFeedback[]
  }
  lastDeactivateAccountRequestId: number | null
  receipts: IReceipt[]
  isAllReceiptsGot: boolean
  lastUsedPromoCode: string | null
  lastUsedPromoCodeData: IPromoCodeData | null
  checkoutPreview: null | ICheckoutPreview
  requestsStatus: IBothRequestsStatus
  linkedSocialAccount: ILinkedSocialAccountInfo | null
  availableBonuses: number
  lastCreatedUnblockAccountRequestId: number
}

export interface IUserReducerState
  extends IReducerWelcomeMessage,
    IReducerRestState {}

export interface IBadges {
  notificationsBadges: number
  messagingBadges: number
}

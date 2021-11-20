/* eslint-disable */
import { Asset } from 'react-native-image-picker'
import { INames } from '../user'

export interface INameAndId {
  name: string
  id: string
}

export interface IPickedFileAndId {
  file: Asset
  id: string
}

export interface IAttachment {
  id: string
  createdAt: Date
  ownerId: null | number
  sourceUrl: string
  storageKey: string
  subtype: string
  type: string
  filename: string
}

export interface IScreeningQuestion {
  id: number
  jobPostId: number
  title: string
}

export interface ITitle {
  title: string
}

export interface ICommonCreateAsyncThunkThirdType {
  rejectValue: string
}

export enum HourlyOrFixed {
  HOURLY = 'hourly',
  FIXED = 'fixed',
}

export interface ILimitAndOffset {
  limit?: number
  offset?: number
}

export interface IIdAndTitle {
  id: number
  title: string
}

export interface IFirstLastNamesAndAvatar extends INames {
  avatar: IAttachment
}

export interface ISuccess {
  success: boolean
}

export interface ITotalTimeTracked {
  days?: number
  hours?: number
  minutes?: number
  seconds?: number
}

export interface IBodyForSendQuestionForSupport {
  description: string
  type: 'general' | 'account_question'
}

export enum EHelperOrClient {
  HELPER = 'helper',
  CLIENT = 'client',
}

export type IConsumerOrHelper = 'consumer' | 'helper'

export enum ERequestStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  NOT_SENT_YET = 'not_sent_yet',
}

export interface IPromoCode {
  promoCode: string
}

export interface IPromoCodeData {
  bonusesValue: number
  description: string
  expiredAt: string
  exceededNumbersOfUsage: boolean
}

export interface ILinkedSocialAccountInfo {
  type: string
  firstName: string
  lastName: string
  email: string
}
export interface IAvailableBonuses {
  availableBonuses: number
}

export interface INumberId {
  id: number
}

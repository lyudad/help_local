import { ILimitAndOffset } from './other'

export interface IClientSecret {
  clientSecret: string
}
export interface ICreditCardData {
  last4: string
  brand: string
}
export interface IBankAccountData {
  last4: string
  bankName: string
}

export interface IBillingDetails {
  email?: string
  phone?: string
  name?: string
  address?: IBillingDetailsAddress
}

export interface IBillingDetailsAddress {
  city: string
  county: string
  line1: string
  line2: string
  postalCode: string
  state: string
}

// later add paypal through | (or)
export type TPluggedPaymentMethodValueVariants =
  | ICreditCardData
  | IBankAccountData
  | { isPaypal: boolean }
  | null
export interface IPluggedPaymentMethod {
  pluggedPaymentMethod: TPluggedPaymentMethodValueVariants
}

export enum EUserPaymentMethods {
  CREDIT_CARD = 'credit_card',
  BANK_ACCOUNT = 'bank_account',
  PAYPAL = 'paypal',
}

export interface IInitedLinkToken {
  expiration: string
  linkToken: string
}

export interface IPlaidPublicTokenAndAccountId {
  plaidPublicToken: string
  selectedAccountId: string
}

export interface IClientToken {
  clientToken: string
}

export interface IAddBraintreePaymentMethodThunkParams {
  paymentMethodNonce: string
  deviceData: string
}

export interface IReceipt {
  id: number
  amount: number
  rate: string
  tax: number
  serviceFee: string
  hours: number
  createdAt: string
  jobPost: {
    id: number
    title: string
  }
  hourRate: number
}

export interface IGetReceiptsThunkParams extends ILimitAndOffset {
  categoryId: number
}

export interface ICheckoutPreview {
  total: number
  tax: number
  serviceFee: number
  availableBonuses: number
  rate: number
  hoursToCharge?: number
  hourRate?: number
}

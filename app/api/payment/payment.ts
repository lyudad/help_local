import { del, get, post } from 'app/services/api/common'
import {
  IAddBraintreePaymentMethodThunkParams,
  IBankAccountData,
  IClientSecret,
  IClientToken,
  ICreditCardData,
  IGetReceiptsThunkParams,
  IInitedLinkToken,
  IPlaidPublicTokenAndAccountId,
  IReceipt,
  ISuccess,
} from 'interfaces'

const CREDIT_CARD_URL = 'payment/stripe/credit_card'
const BANK_ACCOUNT_URL_WITH_INIT = 'payment/stripe/bank_account/init'
const BANK_ACCOUNT_URL = 'payment/stripe/bank_account'

export const setupCreditCardViaStripe = async (): Promise<IClientSecret> =>
  post<IClientSecret>(CREDIT_CARD_URL)

export const getCreditCardData = async (): Promise<ICreditCardData | null> =>
  get<ICreditCardData | null>(CREDIT_CARD_URL)

export const removeCreditCard = async (): Promise<ISuccess> =>
  del<ISuccess>(CREDIT_CARD_URL)

export const getLinkTokenToAddBankAccount = async (
  osType,
): Promise<IInitedLinkToken> =>
  post<IInitedLinkToken>(BANK_ACCOUNT_URL_WITH_INIT, { osType })

export const finishBankAccountLink = async (
  data: IPlaidPublicTokenAndAccountId,
): Promise<ISuccess> => post<ISuccess>(BANK_ACCOUNT_URL, data)

export const getBankAccountData = async (): Promise<IBankAccountData | null> =>
  get<IBankAccountData | null>(BANK_ACCOUNT_URL)

export const removeBankAccount = async (): Promise<ISuccess> =>
  del<ISuccess>(BANK_ACCOUNT_URL)

export const getBraintreeToken = async (): Promise<IClientToken> =>
  post<IClientToken>('payment/braintree/token')

export const addBraintreePaymentMethod = async (
  data: IAddBraintreePaymentMethodThunkParams,
): Promise<ISuccess> => post<ISuccess>('payment/braintree/payment_method', data)

export const removePaypal = async (): Promise<ISuccess> =>
  del<ISuccess>('payment/braintree/payment_method')

export const getReceipts = async (
  data: IGetReceiptsThunkParams,
): Promise<IReceipt[]> => get<IReceipt[]>('payment/charges', data)

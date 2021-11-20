/* eslint-disable */
import {
  EUserPaymentMethods,
  IAddress,
  IAttachment,
} from 'app/interfaces/common'
import { HelperProfile } from 'interfaces'

export interface INames {
  firstName: string
  lastName: string
}

export interface BaseProfile extends INames {
  telephone: string
  email: string
}

export interface Profile extends BaseProfile {
  signUpCompleted: boolean
  activeProfile: 'helper' | 'consumer' | null
}

export interface IResetPassword {
  oldPassword: string
  password: string
  confirmPassword?: string
}

export interface IResetPasswordQuery {
  oldPassword: string
  password: string
  acessToken: string
}

export interface FullProfile extends Profile {
  id: string
  dob: string | null
  isCriminal: boolean
  isDeactivate: boolean
  isSuspended: boolean
  businessName: string | null
  ssnAttached: boolean
  address: IAddress | null
  helperProfile: HelperProfile | null
  avatar: IAttachment | null
  primaryPaymentMethod: EUserPaymentMethods | null
}
export interface IProfileAnd2Tokens {
  profile: FullProfile
  accessToken: string
  refreshToken: string
}

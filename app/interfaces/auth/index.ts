import { BaseProfile, UserReducerProfileState } from 'interfaces'
import { EmailPassword } from '../common'

export * from './auth-reducer'
export * from './thunk'

export interface SignUpCredentials extends BaseProfile, EmailPassword {}

export interface VerifySignUpCredentials {
  sId: string
  code: number
  deviceId: string
}

export interface SignInCredentials {
  login: string
  password: string
  deviceId: string
}

export interface ISignInApiResponse {
  profile: UserReducerProfileState | null
  accessToken: string | null
  refreshToken: string | null
}

export interface CompleteSignUpCredentials {
  activeProfile: 'helper' | 'consumer' | null
  // ssn?: string
  dob?: string
  businessName?: string
  notifyOnPromo: boolean
}
export interface ISocialBody {
  social_type: 'facebook' | 'google'
  social_token: string
  device_id: string
}

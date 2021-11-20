/* eslint-disable */
import {
  IInitSignUpSessionThunkResponse,
  ISignInApiResponse,
  ISmsResendThunkResponse,
  SignInCredentials,
  SignUpCredentials,
  ISocialBody,
  VerifySignUpCredentials,
  IProfileAnd2Tokens,
  INumberId,
  ISuccess,
} from 'interfaces'
import {
  IChangePasswordViaForgotPasswordSessionThunkParams,
  IVerifyForgotPasswordCodeThunkParams,
} from 'screens/auth/thunk'
import { post, put, patch } from '../../services/api'

export const initSignUpSession = async (
  data: SignUpCredentials,
): Promise<IInitSignUpSessionThunkResponse> => {
  try {
    return await post<IInitSignUpSessionThunkResponse>('sign_up/init', data)
  } catch (error) {
    throw error
  }
}

export const smsResend = async (data: {
  sId: string
}): Promise<ISmsResendThunkResponse> => {
  try {
    return await post<ISmsResendThunkResponse>('sign_up/resend', data)
  } catch (error) {
    throw error
  }
}

export const verifySignUp = async (
  data: VerifySignUpCredentials,
): Promise<IProfileAnd2Tokens> => await post('sign_up/verify', data)

export const signIn = async (
  data: SignInCredentials,
): Promise<ISignInApiResponse> => {
  try {
    return await post<ISignInApiResponse>('sign_in', data)
  } catch (error) {
    throw error
  }
}

export const signUpSocial = async (
  data: ISocialBody,
): Promise<ISignInApiResponse> => {
  try {
    return await post('sign_up/social', data)
  } catch (error) {
    throw error
  }
}

export const signInSocial = async (
  data: ISocialBody,
): Promise<ISignInApiResponse> => {
  try {
    return await post('sign_in/social', data)
  } catch (error) {
    throw error
  }
}

export const resetPassword = async (data): Promise<ISuccess> => {
  try {
    return await put<ISuccess>('credentials', data)
  } catch (error) {
    throw error
  }
}

export const sendTocken = async (data): Promise<any> => {
  try {
    return await patch('devices', data)
  } catch (error) {
    throw error
  }
}

export const initForgotPasswordSession = async (data: {
  login: string
}): Promise<INumberId> => await post<INumberId>('sign_in/forgot', data)

export const verifyForgotPasswordCode = async (
  data: IVerifyForgotPasswordCodeThunkParams,
): Promise<ISuccess> => await patch<ISuccess>('sign_in/forgot', data)

export const changePasswordViaForgotPasswordSession = async (
  data: IChangePasswordViaForgotPasswordSessionThunkParams,
): Promise<ISuccess> => await post<ISuccess>('sign_in/forgot/change', data)

/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit'
import { LoginManager, AccessToken } from 'react-native-fbsdk-next'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import * as Api from 'app/api/'
import {
  ISignInApiResponse,
  SignInCredentials,
  SignUpCredentials,
  VerifySignUpCredentials,
  IInitSignUpSessionThunkResponse,
  ISmsResendThunkResponse,
  ICommonCreateAsyncThunkThirdType,
  IProfileAnd2Tokens,
  INumberId,
  ISuccess,
} from 'interfaces'
import { setLoading, setErrorAndUnsetLoading } from 'app/store/commonSlice'
import { setCurrentRole, setUser } from 'screens/both/reducers'
import { resetAuth } from './reducers'
import { Platform } from 'react-native'

export const initSignUpSession = createAsyncThunk<
  IInitSignUpSessionThunkResponse,
  SignUpCredentials,
  ICommonCreateAsyncThunkThirdType
>('initSignUpSession', async (data: SignUpCredentials, thunkAPI) => {
  try {
    thunkAPI.dispatch(setLoading(true))
    const result: IInitSignUpSessionThunkResponse = await Api.initSignUpSession(
      data,
    )
    thunkAPI.dispatch(setLoading(false))
    return result
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const smsResend = createAsyncThunk<
  ISmsResendThunkResponse,
  { sId: string },
  ICommonCreateAsyncThunkThirdType
>('smsResend', async (data: { sId: string }, thunkAPI) => {
  try {
    return await Api.smsResend({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export const verifySignUp = createAsyncThunk(
  'verifySignUp',
  async (data: VerifySignUpCredentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const user: IProfileAnd2Tokens = await Api.verifySignUp({ ...data })
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(resetAuth())
      thunkAPI.dispatch(setCurrentRole(user.profile.activeProfile))
      thunkAPI.dispatch(setUser(user))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const signIn = createAsyncThunk(
  'signIn',
  async (data: SignInCredentials, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const user: ISignInApiResponse = await Api.signIn(data)
      thunkAPI.dispatch(setLoading(false))
      thunkAPI.dispatch(setCurrentRole(user.profile.activeProfile))
      thunkAPI.dispatch(setUser(user))
      return null
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const signUpWithFacebook = createAsyncThunk(
  'signUpWithFacebook',
  async ({ deviceId }: { deviceId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        return thunkAPI.dispatch(setErrorAndUnsetLoading('Login cancelled'))
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken()
        const user: ISignInApiResponse = await Api.signUpSocial({
          social_type: 'facebook',
          social_token: accessToken.accessToken,
          device_id: deviceId,
        })
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCurrentRole(user.profile.activeProfile))
        thunkAPI.dispatch(setUser(user))
        return null
      }
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const signUpWithGoogle = createAsyncThunk(
  'signUpWithGoogle',
  async ({ deviceId }: { deviceId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      await GoogleSignin.hasPlayServices()
      const result = await GoogleSignin.signIn()
      if (result) {
        const user: ISignInApiResponse = await Api.signUpSocial({
          social_type: 'google',
          social_token: decodeURIComponent(result.serverAuthCode),
          device_id: deviceId,
        })
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCurrentRole(user.profile.activeProfile))
        thunkAPI.dispatch(setUser(user))
        return null
      } else {
        throw new Error()
      }
    } catch (error) {
      let newError: string = error.message || error
      if (Platform.OS === 'ios' && newError.includes('canceled the sign-in')) {
        newError = 'Canceled'
      }
      thunkAPI.dispatch(setErrorAndUnsetLoading(newError))
      return Promise.reject()
    }
  },
)

export const signInWithFacebook = createAsyncThunk(
  'signInWithFacebook',
  async ({ deviceId }: { deviceId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ])
      if (result.isCancelled) {
        return thunkAPI.dispatch(setErrorAndUnsetLoading('Login cancelled'))
      } else {
        const accessToken = await AccessToken.getCurrentAccessToken()
        const user: ISignInApiResponse = await Api.signInSocial({
          social_type: 'facebook',
          social_token: accessToken.accessToken,
          device_id: deviceId,
        })
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCurrentRole(user.profile.activeProfile))
        thunkAPI.dispatch(setUser(user))
        return null
      }
    } catch (error) {
      thunkAPI.dispatch(setErrorAndUnsetLoading(error))
      return Promise.reject()
    }
  },
)

export const signInWithGoogle = createAsyncThunk(
  'signInWithGoogle',
  async ({ deviceId }: { deviceId: string }, thunkAPI) => {
    try {
      thunkAPI.dispatch(setLoading(true))
      await GoogleSignin.hasPlayServices()
      const result = await GoogleSignin.signIn()
      if (result) {
        const user: ISignInApiResponse = await Api.signInSocial({
          social_type: 'google',
          social_token: decodeURIComponent(result.serverAuthCode),
          device_id: deviceId,
        })
        thunkAPI.dispatch(setLoading(false))
        thunkAPI.dispatch(setCurrentRole(user.profile.activeProfile))
        thunkAPI.dispatch(setUser(user))
        return null
      } else {
        throw new Error()
      }
    } catch (error) {
      let newError: string = error.message || error
      if (Platform.OS === 'ios' && newError.includes('canceled the sign-in')) {
        newError = 'Canceled'
      }
      thunkAPI.dispatch(setErrorAndUnsetLoading(newError))
      return Promise.reject()
    }
  },
)

export const initForgotPasswordSession = createAsyncThunk<
  INumberId,
  { login: string },
  ICommonCreateAsyncThunkThirdType
>('initForgotPasswordSession', async (data, thunkAPI) => {
  try {
    return await Api.initForgotPasswordSession({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export interface IVerifyForgotPasswordCodeThunkParams {
  id: number
  verificationCode: number
}

export const verifyForgotPasswordCode = createAsyncThunk<
  ISuccess,
  IVerifyForgotPasswordCodeThunkParams,
  ICommonCreateAsyncThunkThirdType
>('verifyForgotPasswordCode', async (data, thunkAPI) => {
  try {
    return await Api.verifyForgotPasswordCode({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

export interface IChangePasswordViaForgotPasswordSessionThunkParams {
  id: number
  newPassword: string
}

export const changePasswordViaForgotPasswordSession = createAsyncThunk<
  ISuccess,
  IChangePasswordViaForgotPasswordSessionThunkParams,
  ICommonCreateAsyncThunkThirdType
>('changePasswordViaForgotPasswordSession', async (data, thunkAPI) => {
  try {
    return await Api.changePasswordViaForgotPasswordSession({ ...data })
  } catch (error) {
    return thunkAPI.rejectWithValue(error as string)
  }
})

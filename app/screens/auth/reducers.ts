/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import {
  AuthReducerState,
  ERequestStatus,
  IAuthRequestsStatus,
  IInitSignUpSessionThunkResponse,
  ISmsResendThunkResponse,
} from 'interfaces'
import {
  changePasswordViaForgotPasswordSession,
  initForgotPasswordSession,
  initSignUpSession,
  smsResend,
  verifyForgotPasswordCode,
} from './thunk'

const initialState: AuthReducerState = {
  sId: null,
  smsResendLeft: null,
  lastSmsSentAt: null,
  additionalLodings: {
    isSmsResendLoading: false,
  },
  error: '',
  forgotPasswordSessionId: null,
  loadings: {
    isInitForgotPasswordSessionLoading: false,
    isVerifyForgotPasswordCodeLoading: false,
    isChangePasswordViaForgotPasswordSessionLoading: false,
  },
  requestsStatus: {
    verifyForgotPasswordCodeRequestStatus: ERequestStatus.NOT_SENT_YET,
    changePasswordViaForgotPasswordSessionRequestStatus:
      ERequestStatus.NOT_SENT_YET,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLastSmsSentAt(state, { payload }: PayloadAction<number>) {
      state.lastSmsSentAt = payload
    },
    setRequestsStatus(state, { payload }: PayloadAction<IAuthRequestsStatus>) {
      state.requestsStatus = payload
    },
    setForgotPasswordSessionId(state, { payload }: PayloadAction<number>) {
      state.forgotPasswordSessionId = payload
    },
    setError(state, { payload }: PayloadAction<string>) {
      state.error = payload
    },
    resetAuth(state) {
      state.sId = null
      state.smsResendLeft = null
      state.lastSmsSentAt = null
    },
    resetAll(state) {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      initSignUpSession.fulfilled,
      (
        state: AuthReducerState,
        { payload }: PayloadAction<IInitSignUpSessionThunkResponse>,
      ) => {
        state.sId = payload.sId
        state.smsResendLeft = payload.smsResendLeft
        state.lastSmsSentAt = Date.now()
      },
    )
    builder.addCase(smsResend.pending, (state) => {
      state.additionalLodings.isSmsResendLoading = true
    })
    builder.addCase(
      smsResend.fulfilled,
      (
        state: AuthReducerState,
        { payload }: PayloadAction<ISmsResendThunkResponse>,
      ) => {
        state.sId = payload.sId
        state.smsResendLeft = payload.smsResendLeft
        state.additionalLodings.isSmsResendLoading = false
      },
    )
    builder.addCase(
      smsResend.rejected,
      (state, { payload }: PayloadAction<string>) => {
        state.additionalLodings.isSmsResendLoading = false
        state.error = payload
      },
    )

    builder.addCase(initForgotPasswordSession.pending, (state) => {
      state.loadings.isInitForgotPasswordSessionLoading = true
    })
    builder.addCase(
      initForgotPasswordSession.fulfilled,
      (state, { payload }) => {
        state.loadings.isInitForgotPasswordSessionLoading = false
        state.forgotPasswordSessionId = payload.id
        state.lastSmsSentAt = Date.now()
      },
    )
    builder.addCase(initForgotPasswordSession.rejected, (state, action) => {
      state.loadings.isInitForgotPasswordSessionLoading = false
      state.error = action.payload
    })

    builder.addCase(verifyForgotPasswordCode.pending, (state) => {
      state.loadings.isVerifyForgotPasswordCodeLoading = true
    })
    builder.addCase(
      verifyForgotPasswordCode.fulfilled,
      (state, { payload }) => {
        state.loadings.isVerifyForgotPasswordCodeLoading = false
        if (payload.success) {
          state.requestsStatus = {
            ...state.requestsStatus,
            verifyForgotPasswordCodeRequestStatus: ERequestStatus.SUCCESS,
          }
        } else {
          state.requestsStatus = {
            ...state.requestsStatus,
            verifyForgotPasswordCodeRequestStatus: ERequestStatus.FAIL,
          }
        }
      },
    )
    builder.addCase(verifyForgotPasswordCode.rejected, (state, action) => {
      state.loadings.isVerifyForgotPasswordCodeLoading = false
      state.error = action.payload
    })

    builder.addCase(changePasswordViaForgotPasswordSession.pending, (state) => {
      state.loadings.isChangePasswordViaForgotPasswordSessionLoading = true
    })
    builder.addCase(
      changePasswordViaForgotPasswordSession.fulfilled,
      (state, { payload }) => {
        state.loadings.isChangePasswordViaForgotPasswordSessionLoading = false
        if (payload.success) {
          state.requestsStatus = {
            ...state.requestsStatus,
            changePasswordViaForgotPasswordSessionRequestStatus:
              ERequestStatus.SUCCESS,
          }
        } else {
          state.requestsStatus = {
            ...state.requestsStatus,
            changePasswordViaForgotPasswordSessionRequestStatus:
              ERequestStatus.FAIL,
          }
        }
      },
    )
    builder.addCase(
      changePasswordViaForgotPasswordSession.rejected,
      (state, action) => {
        state.loadings.isChangePasswordViaForgotPasswordSessionLoading = false
        state.error = action.payload
      },
    )
  },
})

export const {
  resetAuth,
  resetAll,
  setLastSmsSentAt,
  setForgotPasswordSessionId,
  setRequestsStatus,
  setError,
} = authSlice.actions
export default authSlice.reducer

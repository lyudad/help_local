import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export const auth = {
  sId: createSelector(
    (state: RootState) => state.auth.sId,
    (value) => value,
  ),
  smsResendLeft: createSelector(
    (state: RootState) => state.auth.smsResendLeft,
    (value) => value,
  ),
  lastSmsSentAt: createSelector(
    (state: RootState) => state.auth.lastSmsSentAt,
    (value) => value,
  ),
  isSmsResendLoading: createSelector(
    (state: RootState) => state.auth.additionalLodings.isSmsResendLoading,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.auth.error,
    (value) => value,
  ),
  forgotPasswordSessionId: createSelector(
    (state: RootState) => state.auth.forgotPasswordSessionId,
    (value) => value,
  ),
  requestsStatus: createSelector(
    (state: RootState) => state.auth.requestsStatus,
    (value) => value,
  ),

  // loadings
  isInitForgotPasswordSessionLoading: createSelector(
    (state: RootState) =>
      state.auth.loadings.isInitForgotPasswordSessionLoading,
    (value) => value,
  ),
  isVerifyForgotPasswordCodeLoading: createSelector(
    (state: RootState) => state.auth.loadings.isVerifyForgotPasswordCodeLoading,
    (value) => value,
  ),
  isChangePasswordViaForgotPasswordSessionLoading: createSelector(
    (state: RootState) =>
      state.auth.loadings.isChangePasswordViaForgotPasswordSessionLoading,
    (value) => value,
  ),
}

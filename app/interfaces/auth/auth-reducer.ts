import { ERequestStatus, IInitSignUpSessionThunkResponse } from 'interfaces'

export interface IAuthRequestsStatus {
  verifyForgotPasswordCodeRequestStatus: ERequestStatus
  changePasswordViaForgotPasswordSessionRequestStatus: ERequestStatus
}
export interface AuthReducerState extends IInitSignUpSessionThunkResponse {
  lastSmsSentAt: number | null
  additionalLodings: {
    isSmsResendLoading: boolean
  }
  error: string
  forgotPasswordSessionId: number | null

  loadings: {
    isInitForgotPasswordSessionLoading: boolean
    isVerifyForgotPasswordCodeLoading: boolean
    isChangePasswordViaForgotPasswordSessionLoading: boolean
  }
  requestsStatus: IAuthRequestsStatus
}

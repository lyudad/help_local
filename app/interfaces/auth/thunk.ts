export interface ISmsResendThunkResponse {
  sId: string | null
  smsResendLeft: number | null
}

export type IInitSignUpSessionThunkResponse = ISmsResendThunkResponse

/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CommonReducerState } from 'interfaces'

const initialState: CommonReducerState = {
  loading: false,
  autoShowMessage: true,
  error: null,
  success: null,
  warning: null,
  headerHeight: 0,
  onScrollEventForGradient: null,
  detectScrolling: 0,
}

const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setLoading(state, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    },
    setAutoShowMessage(state, { payload }: PayloadAction<boolean>) {
      state.autoShowMessage = payload
    },
    setError(state, { payload }: PayloadAction<string | null>) {
      state.error = payload
    },
    setSuccess(state, { payload }: PayloadAction<string | null>) {
      state.success = payload
    },
    setWarning(state, { payload }: PayloadAction<string | null>) {
      state.warning = payload
    },
    setErrorAndUnsetLoading(state, { payload }: PayloadAction<string | null>) {
      state.error = payload
      state.loading = false
    },
    setOnScrollEventForGradient(state, { payload }: PayloadAction<any>) {
      state.onScrollEventForGradient = payload
    },
    setHeaderHeight(state, { payload }: PayloadAction<number>) {
      state.headerHeight = payload
    },
    setDetectScrolling(state, { payload }: PayloadAction<number>) {
      state.detectScrolling = payload
    },
    resetAll(state) {
      Object.assign(state, initialState)
    },
  },
})

export const {
  setLoading,
  setAutoShowMessage,
  setError,
  setSuccess,
  setWarning,
  setErrorAndUnsetLoading,
  resetAll,
  setOnScrollEventForGradient,
  setHeaderHeight,
  setDetectScrolling,
} = commonSlice.actions
export default commonSlice.reducer

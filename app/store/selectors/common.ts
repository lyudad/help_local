import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export const common = {
  loading: createSelector(
    (state: RootState) => state.common.loading,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.common.error,
    (value) => value,
  ),
  warning: createSelector(
    (state: RootState) => state.common.warning,
    (value) => value,
  ),
  success: createSelector(
    (state: RootState) => state.common.success,
    (value) => value,
  ),
  autoShowMessage: createSelector(
    (state: RootState) => state.common.autoShowMessage,
    (value) => value,
  ),
  headerHeight: createSelector(
    (state: RootState) => state.common.headerHeight,
    (value) => value,
  ),
  onScrollEventForGradient: createSelector(
    (state: RootState) => state.common.onScrollEventForGradient,
    (value) => value,
  ),
  detectScrolling: createSelector(
    (state: RootState) => state.common.detectScrolling,
    (value) => value,
  ),
}

import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export const root = {
  consumer: createSelector(
    (state: RootState) => state.consumer,
    (value) => value,
  ),
}

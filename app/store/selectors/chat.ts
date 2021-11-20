import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../rootReducer'

export const chat = {
  roomList: createSelector(
    (state: RootState) => state.chat.roomList,
    (value) => value,
  ),
  messagesList: createSelector(
    (state: RootState) => state.chat.messagesList,
    (value) => value,
  ),
  room: createSelector(
    (state: RootState) => state.chat.room,
    (value) => value,
  ),
  isAllRoomListGet: createSelector(
    (state: RootState) => state.chat.isAllRoomListGet,
    (value) => value,
  ),
  isAllMessagesGet: createSelector(
    (state: RootState) => state.chat.isAllMessagesGet,
    (value) => value,
  ),
  loading: createSelector(
    (state: RootState) => state.chat.loading,
    (value) => value,
  ),
  error: createSelector(
    (state: RootState) => state.chat.error,
    (value) => value,
  ),
  showWarning: createSelector(
    (state: RootState) => state.chat.showWarning,
    (value) => value,
  ),
  isCreateChatRoomLoading: createSelector(
    (state: RootState) => state.chat.loadings.isCreateChatRoomLoading,
    (value) => value,
  ),
}

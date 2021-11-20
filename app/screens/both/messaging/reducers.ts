/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IChatReducerState, IRoom, IMessage } from 'interfaces'
import {
  getRoomList,
  modifyArchiveStatus,
  getRoomMessagesList,
  addNewMessageToChat,
  cleanRoomList,
  createChatRoom,
} from './thunk'

const initialState: IChatReducerState = {
  room: null,
  roomList: [],
  messagesList: [],
  isAllRoomListGet: false,
  isAllMessagesGet: false,
  loading: false,
  error: '',
  showWarning: true,

  loadings: {
    isCreateChatRoomLoading: false,
  },
}

const chatSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setShowWarning(state, { payload }: PayloadAction<boolean>) {
      state.showWarning = payload
    },
    setMessagesList(state, { payload }: PayloadAction<IMessage[]>) {
      state.messagesList = payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRoomList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRoomList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.roomList = payload.isNewArr
        ? payload.rooms
        : [...state.roomList, ...payload.rooms]
      state.isAllRoomListGet = payload.rooms.length === 0
    })
    builder.addCase(getRoomList.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(createChatRoom.pending, (state) => {
      state.loading = true
      state.loadings.isCreateChatRoomLoading = true
    })
    builder.addCase(createChatRoom.fulfilled, (state, { payload }) => {
      state.loading = false
      state.loadings.isCreateChatRoomLoading = false
      state.room = payload
    })
    builder.addCase(createChatRoom.rejected, (state, action) => {
      state.loadings.isCreateChatRoomLoading = false
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(modifyArchiveStatus.pending, (state) => {
      state.loading = true
    })
    builder.addCase(modifyArchiveStatus.fulfilled, (state, { payload }) => {
      state.loading = false
      state.roomList = state.roomList.map((room: IRoom) => {
        if (room.id === payload.chatRoomId) {
          return { ...room, archived: payload.archived }
        }
        return room
      })
    })
    builder.addCase(modifyArchiveStatus.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(getRoomMessagesList.pending, (state) => {
      state.loading = true
    })
    builder.addCase(getRoomMessagesList.fulfilled, (state, { payload }) => {
      state.loading = false
      state.messagesList = payload.isNewArr
        ? payload.messages
        : [...state.messagesList, ...payload.messages]
      state.isAllMessagesGet = payload.messages.length === 0
    })
    builder.addCase(getRoomMessagesList.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload
    })

    builder.addCase(addNewMessageToChat.fulfilled, (state, { payload }) => {
      const unshiftToArray = (arr, obj) => {
        const index = arr.findIndex((e) => e.id === obj.id)
        if (index === -1) {
          arr.unshift(obj)
        } else {
          arr[index] = obj
        }
      }

      const createUniqArray = (message: IMessage): IMessage[] => {
        const newMessagesList = state.messagesList.slice()
        unshiftToArray(newMessagesList, message)
        return newMessagesList
      }

      state.messagesList = createUniqArray(payload)
    })

    builder.addCase(cleanRoomList.fulfilled, (state, { payload }) => {
      state.roomList = payload
    })
  },
})

export const { setShowWarning, setMessagesList } = chatSlice.actions
export default chatSlice.reducer

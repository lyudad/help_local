/* eslint-disable */
import { createAsyncThunk } from '@reduxjs/toolkit'

import * as Api from 'app/api/'
import {
  ICommonCreateAsyncThunkThirdType,
  IQueryGetRoomList,
  IQueryGetRoomMessagesList,
  IBodyCreateChatRoom,
  IBodySendChatMessage,
  IBodyReadChatMessage,
  IBodyModifyArchiveStatus,
  IRoom,
  IMessage,
  ISuccess,
} from 'interfaces'
import { setErrorAndUnsetLoading } from 'app/store/commonSlice'

export const getRoomList = createAsyncThunk<
  { rooms: IRoom[]; isNewArr: boolean },
  IQueryGetRoomList,
  ICommonCreateAsyncThunkThirdType
>('getRoomList', async (data, thunkAPI) => {
  try {
    const rooms: IRoom[] = await Api.getRoomList({ ...data })
    return {
      rooms,
      isNewArr: data.offset === 0,
    }
  } catch (error) {
    console.log('Error', error)
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const cleanRoomList = createAsyncThunk<
  IRoom[],
  null,
  ICommonCreateAsyncThunkThirdType
>('cleanRoomList', async () => {
  return []
})

export const getRoomMessagesList = createAsyncThunk<
  { isNewArr: boolean; messages: IMessage[] },
  IQueryGetRoomMessagesList,
  ICommonCreateAsyncThunkThirdType
>('getRoomMessagesList', async (data, thunkAPI) => {
  try {
    const messages: IMessage[] = await Api.getRoomMessagesList({ ...data })
    return {
      messages,
      isNewArr: data.offset === 0,
    }
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const createChatRoom = createAsyncThunk<
  IRoom,
  IBodyCreateChatRoom,
  ICommonCreateAsyncThunkThirdType
>('createChatRoom', async (data, thunkAPI) => {
  try {
    return await Api.createChatRoom({ ...data })
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const setRoom = createAsyncThunk<
  IRoom,
  IRoom,
  ICommonCreateAsyncThunkThirdType
>('createChatRoom', async (data, thunkAPI) => {
  return data
})

export const modifyArchiveStatus = createAsyncThunk<
  IBodyModifyArchiveStatus,
  IBodyModifyArchiveStatus,
  ICommonCreateAsyncThunkThirdType
>('modifyArchiveStatus', async (data, thunkAPI) => {
  try {
    await Api.modifyArchiveStatus({ ...data })
    return data
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const sendChatMessage = createAsyncThunk<
  { id: number },
  IBodySendChatMessage,
  ICommonCreateAsyncThunkThirdType
>('sendChatMessage', async (data, thunkAPI) => {
  try {
    await Api.sendChatMessage({ ...data })
    return null
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

export const addNewMessageToChat = createAsyncThunk<IMessage, IMessage>(
  'addNewMessageToChat',
  (data) => {
    return data
  },
)

export const readChatMessage = createAsyncThunk<
  ISuccess,
  IBodyReadChatMessage,
  ICommonCreateAsyncThunkThirdType
>('readChatMessage', async (data, thunkAPI) => {
  try {
    return await Api.readChatMessage({ ...data })
  } catch (error) {
    thunkAPI.dispatch(setErrorAndUnsetLoading(error))
    return Promise.reject()
  }
})

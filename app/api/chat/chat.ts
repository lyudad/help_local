/* eslint-disable */
import { get, post, patch } from 'app/services/api'
import {
  IQueryGetRoomList,
  IQueryGetRoomMessagesList,
  IBodyCreateChatRoom,
  IBodyModifyArchiveStatus,
  IBodySendChatMessage,
  IBodyReadChatMessage,
  ISuccess,
  IRoom,
  IMessage,
} from 'interfaces'

export const getRoomList = async (
  data: IQueryGetRoomList,
): Promise<IRoom[]> => {
  try {
    return await get<IRoom[]>('chat/room', data)
  } catch (error) {
    throw error
  }
}

export const getRoomMessagesList = async (
  data: IQueryGetRoomMessagesList,
): Promise<IMessage[]> => {
  try {
    return await get<IMessage[]>('chat/message', data)
  } catch (error) {
    throw error
  }
}

export const createChatRoom = async (
  data: IBodyCreateChatRoom,
): Promise<IRoom> => {
  try {
    return await post<IRoom>('chat/room', data)
  } catch (error) {
    throw error
  }
}

export const modifyArchiveStatus = async (
  data: IBodyModifyArchiveStatus,
): Promise<ISuccess> => {
  try {
    return await patch<ISuccess>('chat/room', data)
  } catch (error) {
    throw error
  }
}

export const sendChatMessage = async (
  data: IBodySendChatMessage,
): Promise<ISuccess> => {
  try {
    return await post<ISuccess>('chat/message', data)
  } catch (error) {
    throw error
  }
}

export const readChatMessage = async (
  data: IBodyReadChatMessage,
): Promise<ISuccess> => {
  try {
    return await post<ISuccess>('chat/message/read', data)
  } catch (error) {
    throw error
  }
}

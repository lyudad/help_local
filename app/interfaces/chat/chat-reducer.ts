import { IRoom, IMessage } from './chat'

export interface IChatReducerState {
  roomList: IRoom[]
  messagesList: IMessage[]
  room: IRoom | null
  isAllRoomListGet: boolean
  isAllMessagesGet: boolean
  loading: boolean
  error: string
  showWarning: boolean

  loadings: {
    isCreateChatRoomLoading: boolean
  }
}

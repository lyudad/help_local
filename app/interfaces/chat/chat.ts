import { IAttachment, IJobPost } from '../common'

export interface IRoom {
  id: number
  userId: number
  archived: boolean
  interlocutor: IInterlocutor
  lastReadMessageId?: number
  jobPost?: IJobPost
  lastMessage?: ILastMessage
}
export interface IInterlocutor {
  id: number
  firstName: string
  lastName: string
  helperProfileId: number
  isOnline: boolean
  avatar: IAttachment
}
export interface ILastMessage {
  id: number
  createdBy: string
  body: string
  updatedAt: string
  deletedAt: string
}

export interface IMessage {
  id: number
  body: string
  chatRoomId: number
  createdAt: string
  updatedAt: string
  deletedAt: string
  createdBy: string
}

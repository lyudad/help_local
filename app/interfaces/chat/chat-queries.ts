export interface IQueryGetRoomList {
  archived?: boolean
  limit?: number
  offset?: number
}
export interface IQueryGetRoomMessagesList {
  chatRoomId: number
  limit?: number
  offset?: number
}
export interface IBodyCreateChatRoom {
  interlocutorId: string
  jobPostId?: number
}
export interface IBodyModifyArchiveStatus {
  archived: boolean
  chatRoomId: number
}
export interface IBodySendChatMessage {
  body: string
  chatRoomId: number
}
export interface IBodyReadChatMessage {
  chatMessageId: number
}

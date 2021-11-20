export interface Messenger {
  userID: string
  name: string
  avatar: string
  isOnline?: boolean
  jobID: string
  isJobActive?: boolean
  jobTitle: string
  lastMessageTime: string
  isSeen?: boolean
  isArchived?: boolean
}

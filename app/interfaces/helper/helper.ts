/* eslint-disable */
import { IAddress, ICategory, IFixedOrHourly } from 'interfaces'
import {
  IAddedCategory,
  IShortCategoryWithIsActive,
} from 'app/interfaces/common/category'
import { IAttachment } from '../common'
export interface IHelperInfo {
  id: number
  userInfo: {
    id: string
    firstName: string
    lastName: string
    reliabilityScore?: number
    jobsHeld?: number
    avgRating?: number
    feedbackCount?: number
    directMessaging?: boolean
  }
  price: number
  type: IFixedOrHourly
  description: string
  category: ICategory
  avatar: IAttachment | null
  address: IAddress
  attachments: IAttachment[] | null
  jobPhotos?: string[]

  isHelptBest: boolean
  previouslyUsed?: boolean
}
export interface HelperProfile<T = IAddedCategory> {
  milesRange: number
  description: string
  isActive: boolean
  attachments: Array<any>
  avatarId: string
  jobsInfo: Array<T>
}

/*export interface ISetupHelperProfileDataType {
  milesRange: number
  description: string
  isActive: boolean
  avatarId: string
  jobsInfo: Array<IShortCategory>
  //ssn: string | null
  dob: string | null
  address: string
  attachmentIds: Array<any>
  localeImages?: IDocumentPickerFileAndId[]
  localAvatar?: IDocumentPickerFileAndId
}*/
export interface IMiniHelperProfile<T = IShortCategoryWithIsActive> {
  milesRange: number
  description: string
  jobsInfo: Array<T>
  isActive: boolean
}

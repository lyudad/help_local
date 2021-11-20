import { IFixedOrHourly } from '.'
import { IAttachment, IPickedFileAndId } from './other'

export interface ICategory {
  id: number
  title: string
}

export interface IChosenCategory extends ICategory {
  isChecked?: boolean
  type: IFixedOrHourly
  price: string
  isAddImagesMode: boolean
  images: Array<IAttachment | IPickedFileAndId>
}

export interface IAddedCategory {
  category: {
    id: number
    title: string
  }
  price: number
  type: IFixedOrHourly
  isActive: boolean
  attachments: IAttachment[]
}

export interface IShortCategoryWithAttachments {
  categoryId: number
  type: IFixedOrHourly
  price: number
  attachments: IPickedFileAndId[]
}
export interface IShortCategoryWithAttachmentsIds {
  categoryId: number
  type: IFixedOrHourly
  price: number
  attachmentIds?: string[]
}
export interface IShortCategoryWithIsActive {
  categoryId: number
  type: IFixedOrHourly
  price: number
  isActive: boolean
  images: Array<IAttachment | IPickedFileAndId>
}
export interface IShortCategoryWithIsActiveAndAttachmentIds {
  categoryId: number
  type: IFixedOrHourly
  price: number
  isActive: boolean
  attachmentIds: string[]
}
export interface IArchivedJobCategory {
  category: ICategory
  jobsNum: number
}

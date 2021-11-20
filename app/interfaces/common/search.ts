import { ICategory } from './category'

export interface IMatchingCategory extends ICategory {
  previousPostCount?: number
}

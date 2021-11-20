import { ICategory } from 'app/interfaces/common/category'

export const searchCategoriesByName = (
  name: string,
  allCategories: Array<ICategory>,
): Array<ICategory> =>
  allCategories
    .filter(
      (category) =>
        category.title.toUpperCase().indexOf(name.toUpperCase()) !== -1,
    )
    .map((category) => ({
      ...category,
      indexForSort: category.title.toUpperCase().indexOf(name.toUpperCase()),
    }))
    .sort((a, b) => a.indexForSort - b.indexForSort)
    .map((category) => ({ id: category.id, title: category.title }))

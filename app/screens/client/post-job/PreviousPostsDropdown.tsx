/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'

import { Text, Dropdown, Modal, Loader } from 'components'
import { color, spacing } from 'theme'
import { translate } from 'i18n'
import { useDispatch, useSelector } from 'react-redux'
import { consumer } from 'app/store/selectors/consumer'
import { IArchivedJobCategory, ICategory, IJobInfo } from 'interfaces'
import { getArchivedJobCategories } from 'screens/client/thunk'
import { CategoryPreviousJobs } from 'app/components/category-previous-jobs/category-previous-jobs'

const DROPDOWN_ITEM: ViewStyle = {
  flexDirection: 'row',
  marginTop: spacing[2],
}
const CIRCLE_COUNTER: ViewStyle = {
  width: 24,
  height: 24,
  borderRadius: 12,
  marginLeft: spacing[3],
  alignItems: 'center',
  backgroundColor: color.primary,
}

const DROPDOWN_ITEMS_CONTAINER: ViewStyle = {
  marginHorizontal: 1,
}

export const PreviousPostsDropdown = (): JSX.Element => {
  const dispatch = useDispatch()
  const archivedJobCategories: IArchivedJobCategory[] = useSelector(
    consumer.archivedJobCategories,
  )
  const jobInfoForReuse: IJobInfo | null = useSelector(consumer.jobInfo)
  const isArchivedJobCategoriesLoading: boolean = useSelector(
    consumer.isArchivedJobCategoriesLoading,
  )

  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [
    chosenArchivedCategory,
    setChosenArchivedCategory,
  ] = useState<ICategory | null>(null)

  useEffect(() => {
    dispatch(getArchivedJobCategories({}))
  }, [])
  useEffect(() => {
    if (jobInfoForReuse) toggleModal(false)
  }, [jobInfoForReuse])

  const renderSearchList = (
    _archivedJobCategories: IArchivedJobCategory[],
  ): JSX.Element[] =>
    _archivedJobCategories.map(
      (item: IArchivedJobCategory): JSX.Element => (
        <View
          style={DROPDOWN_ITEM}
          key={item.category.id.toString()}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={item.category.id.toString()}
          action={() => {
            setChosenArchivedCategory(item.category)
            toggleModal(true)
          }}
        >
          <Text text={item.category.title} />
          {item.jobsNum && (
            <View style={CIRCLE_COUNTER}>
              <Text
                text={item.jobsNum.toString()}
                color={color.palette.white}
              />
            </View>
          )}
        </View>
      ),
    )
  return (
    <View>
      <Modal
        animationType='fade'
        transparent
        visible={isModalOpen}
        toggleModal={() => toggleModal(!isModalOpen)}
      >
        {chosenArchivedCategory && (
          <CategoryPreviousJobs category={chosenArchivedCategory} />
        )}
      </Modal>
      <View>
        {archivedJobCategories.length ? (
          <Dropdown
            isItemsContainerRelative
            styleDropdown={DROPDOWN_ITEMS_CONTAINER}
            placeholder={
              jobInfoForReuse
                ? jobInfoForReuse.title
                : translate('postJob.selectPreviousJob')
            }
          >
            {renderSearchList(archivedJobCategories)}
          </Dropdown>
        ) : (
          <>
            {!isArchivedJobCategoriesLoading && (
              <Text tx='postJob.noPreviousPosts' preset='subtitle' />
            )}
            {isArchivedJobCategoriesLoading && (
              <Loader preset='primayWithVerticalMarginSp3' />
            )}
          </>
        )}
      </View>
    </View>
  )
}

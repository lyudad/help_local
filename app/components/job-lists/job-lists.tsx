import React, { useCallback, useEffect, useState } from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core'

import { Text, JobList, Modal, CategoryPreviousJobs } from 'components'
import { color, spacing } from 'theme'
import { translate } from 'i18n'
import {
  getArchivedJobCategories,
  getMyActiveJobs,
  getMyPendingJobs,
  getMyRecurringJobs,
} from 'screens/client/thunk'
import { consumer } from 'app/store/selectors/consumer'
import {
  IArchivedJobCategory,
  ICategory,
  IIdAndTitle,
  IRecurringJobsListItem,
  IJobInfo,
} from 'interfaces'
import { jobDetail } from 'constants/routes'
import { useFocusEffect } from '@react-navigation/native'
import {
  ALIGIN_ITEMS_END,
  ALIGIN_ITEMS_START,
  FLEX_2,
  FLEX_3,
  FLEX_5,
} from 'constants/common-styles'
import { JobListsProps } from './job-lists.props'

const WRAPPER: ViewStyle = {
  flex: 1,
}

const ITEM: ViewStyle = {
  marginVertical: spacing[3] - 2,
}

const JOB: ViewStyle = {
  marginVertical: spacing[2] - 2,
}

const VIEW_2_ROW: ViewStyle = {
  flexDirection: 'row',
}

const ADD_SPACE_BETWEEN: ViewStyle = {
  justifyContent: 'space-between',
}

const CIRCLE: ViewStyle = {
  width: 23,
  height: 23,
  backgroundColor: color.primary,
  borderRadius: 15,
  justifyContent: 'center',
  marginRight: spacing[3] - 2,
}

const active = 'active'
const pending = 'pending'
const recurring = 'recurring'
const previous = 'previous'

const ActiveOrPending = ({ item }: { item: IIdAndTitle }): JSX.Element => {
  const navigation = useNavigation()
  return (
    <View style={{ ...JOB, ...VIEW_2_ROW, ...ADD_SPACE_BETWEEN }}>
      <Text
        text={
          item.title.substring(0, 23) + (item.title.length > 23 ? '...' : '')
        }
        preset='subtitle'
      />
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(jobDetail, { id: item.id })
          }}
        >
          <Text tx='jobLists.viewJob' preset='linkBoldBlack' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const Reccuring = ({ item }: { item: IRecurringJobsListItem }): JSX.Element => {
  const navigation = useNavigation()
  return (
    <View style={{ ...JOB, ...VIEW_2_ROW }}>
      <View style={[FLEX_3, ALIGIN_ITEMS_START]}>
        <Text
          text={
            item.title.substring(0, 8) + (item.title.length > 8 ? '...' : '')
          }
          preset='subtitle'
        />
      </View>
      <View style={FLEX_2}>
        <Text>
          <Text text='1x' preset='subtitle' />
          <Text text='/' preset='subtitle' />
          <Text
            text={translate(
              `jobLists.${
                item.recurringInterval.days && item.recurringInterval.days === 1
                  ? 'day'
                  : ''
              }${item.recurringInterval.months ? 'mo' : ''}${
                item.recurringInterval.days && item.recurringInterval.days === 7
                  ? 'we'
                  : ''
              }`,
            )}
            preset='subtitle'
          />
        </Text>
      </View>
      <View style={[FLEX_5, ALIGIN_ITEMS_END]}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(jobDetail, { id: item.id })
          }}
        >
          <Text>
            <Text tx='jobLists.nextApt' preset='linkBoldBlack' />
            <Text
              text={dayjs(item.startAt).format('MM/DD/YY')}
              preset='linkBoldBlack'
            />
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ArchivedJobCategory = ({
  item,
  onItemPress,
}: {
  item: IArchivedJobCategory
  onItemPress: (category: ICategory) => void
}): JSX.Element => {
  return (
    <View style={{ ...JOB, ...VIEW_2_ROW, ...ADD_SPACE_BETWEEN }}>
      <Text text={item.category.title} preset='subtitle' />
      <View style={VIEW_2_ROW}>
        {item.jobsNum > 1 && (
          <View style={CIRCLE}>
            <Text
              preset='subtitleBold'
              text={item.jobsNum.toString()}
              color={color.palette.white}
            />
          </View>
        )}
        <TouchableOpacity onPress={() => onItemPress(item.category)}>
          <Text tx='jobLists.view' preset='linkBoldBlack' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface IListsType {
  icon: string
  name: string
  active?: IIdAndTitle[]
  pending?: IIdAndTitle[]
  recurring?: IRecurringJobsListItem[]
  archivedJobCategories?: IArchivedJobCategory[]
  itemsCount: number
}

export const JobLists = (props: JobListsProps): JSX.Element => {
  const { style, showPreviousJobs, hideEmptyBlocks, ...rest } = props

  const dispatch = useDispatch()
  const jobInfoForReuse: IJobInfo | null = useSelector(consumer.jobInfo)
  useFocusEffect(
    useCallback(() => {
      dispatch(getMyActiveJobs({}))
      dispatch(getMyPendingJobs({}))
      dispatch(getMyRecurringJobs({}))
      if (showPreviousJobs) {
        dispatch(getArchivedJobCategories({}))
      }
    }, []),
  )

  const [isModalOpen, toggleModal] = useState<boolean>(false)
  useEffect(() => {
    if (jobInfoForReuse) {
      toggleModal(false)
    }
  }, [jobInfoForReuse])
  const [
    chosenArchivedCategory,
    setChosenArchivedCategory,
  ] = useState<ICategory | null>(null)

  const activeJobs: IIdAndTitle[] = useSelector(consumer.activeJobs)
  const pendingJobs: IIdAndTitle[] = useSelector(consumer.pendingJobs)
  const recurringJobs: IRecurringJobsListItem[] = useSelector(
    consumer.recurringJobs,
  )
  const archivedJobCategories: IArchivedJobCategory[] = useSelector(
    consumer.archivedJobCategories,
  )

  const jobsTypesWithJobs: Array<IListsType> = [
    {
      icon: 'done',
      name: active,
      active: activeJobs,
      itemsCount: activeJobs.length,
    },
    {
      icon: 'userDouble',
      name: pending,
      pending: pendingJobs,
      itemsCount: pendingJobs.length,
    },
    {
      icon: 'loop',
      name: recurring,
      recurring: recurringJobs,
      itemsCount: recurringJobs.length,
    },
    {
      icon: 'valise',
      name: previous,
      archivedJobCategories,
      itemsCount: archivedJobCategories.length,
    },
  ]

  return (
    <View style={{ ...WRAPPER, ...style }}>
      <Modal
        animationType='fade'
        transparent
        visible={isModalOpen}
        toggleModal={() => toggleModal(!isModalOpen)}
      >
        {chosenArchivedCategory && (
          <CategoryPreviousJobs
            category={chosenArchivedCategory}
            shouldNavigateToPostJob
          />
        )}
      </Modal>
      {jobsTypesWithJobs.map(
        (jobType) =>
          !(jobType.name === previous && !showPreviousJobs) &&
          (!hideEmptyBlocks || jobType.itemsCount > 0) && (
            <JobList
              style={ITEM}
              key={jobType.name + jobType.itemsCount.toString()}
              preset='default'
              title={translate(`jobLists.${jobType.name}`)}
              icon={jobType.icon}
              {...rest}
            >
              {jobType.active &&
                (jobType.active.length ? (
                  jobType.active.map((item: IIdAndTitle) => (
                    <ActiveOrPending key={item.id.toString()} {...{ item }} />
                  ))
                ) : (
                  <Text tx='jobLists.noActive' color={color.palette.grey} />
                ))}
              {jobType.pending &&
                (jobType.pending.length ? (
                  jobType.pending.map((item: IIdAndTitle) => (
                    <ActiveOrPending key={item.id.toString()} {...{ item }} />
                  ))
                ) : (
                  <Text tx='jobLists.noPending' color={color.palette.grey} />
                ))}
              {jobType.recurring &&
                (jobType.recurring.length ? (
                  jobType.recurring.map((item: IRecurringJobsListItem) => (
                    <Reccuring key={item.id} {...{ item }} />
                  ))
                ) : (
                  <Text tx='jobLists.noRecurring' color={color.palette.grey} />
                ))}
              {jobType.archivedJobCategories &&
                (jobType.archivedJobCategories.length ? (
                  jobType.archivedJobCategories.map(
                    (item: IArchivedJobCategory) => (
                      <ArchivedJobCategory
                        key={item.category.id.toString()}
                        {...{ item }}
                        onItemPress={(category: ICategory) => {
                          setChosenArchivedCategory(category)
                          toggleModal(true)
                        }}
                      />
                    ),
                  )
                ) : (
                  <Text tx='jobLists.noPrevious' color={color.palette.grey} />
                ))}
            </JobList>
          ),
      )}
    </View>
  )
}

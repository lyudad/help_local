import React, { useCallback, useEffect } from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'

import { Text, JobList } from 'components'
import { color, spacing } from 'theme'
import { translate } from 'i18n'
import {
  getAcceptedBids,
  getPendingBids,
  getArchivedBids,
} from 'screens/helper/thunk'
import { helper } from 'app/store/selectors/helper'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { IBid, AdditionalHeaderTypes } from 'interfaces'
import { activeBid, jobBid } from 'constants/routes'
import { setWhichBidHasActiveTimer } from 'screens/helper/reducers'
import { JobListsProps } from './bid-list.props'

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

const RIGTH_BLOCK: ViewStyle = {
  ...VIEW_2_ROW,
}

const DATE_CONTAINER: ViewStyle = {
  marginRight: spacing[4],
  marginTop: 2,
}

const ADD_SPACE_BETWEEN: ViewStyle = {
  justifyContent: 'space-between',
}

const accepted = 'accepted'
const pending = 'pending'
const archived = 'archived'

const ActiveOrPending = ({
  item,
  onViewPress,
}: {
  item: IBid
  onViewPress: () => void
}): JSX.Element => {
  return (
    <View style={{ ...JOB, ...VIEW_2_ROW, ...ADD_SPACE_BETWEEN }}>
      <Text
        text={
          item.jobPost.title.substring(0, 23) +
          (item.jobPost.title.length > 23 ? '...' : '')
        }
        preset='subtitle'
      />
      <View>
        <TouchableOpacity onPress={onViewPress}>
          <Text tx='jobLists.view' preset='linkBoldBlack' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ArchivedBidCategory = ({
  item,
  onViewPress,
}: {
  item: IBid
  onViewPress: () => void
}): JSX.Element => {
  return (
    <View style={{ ...JOB, ...VIEW_2_ROW, ...ADD_SPACE_BETWEEN }}>
      <Text
        text={
          item.jobPost.title.substring(0, 13) +
          (item.jobPost.title.length > 13 ? '...' : '')
        }
        preset='subtitle'
      />
      <View style={RIGTH_BLOCK}>
        <View style={DATE_CONTAINER}>
          <Text
            preset='subtitle'
            color={color.primary}
            text={dayjs(item.createdAt).format('MM/DD/YY')}
          />
        </View>
        <TouchableOpacity onPress={onViewPress}>
          <Text tx='jobLists.view' preset='linkBoldBlack' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

interface IListsType {
  icon: string
  name: string
  itemsCount: number
  active?: IBid[]
  pending?: IBid[]
  archived?: IBid[]
}

export const BidLists = ({
  style,
  isPlacedOnHelperDashboard,
  ...rest
}: JobListsProps): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      dispatch(getAcceptedBids({}))
      dispatch(getPendingBids({}))
      dispatch(getArchivedBids({}))
    }, [dispatch]),
  )

  const acceptedBids: IBid[] = useSelector(helper.acceptedBids)
  const pendingBids: IBid[] = useSelector(helper.pendingBids)
  const archivedBids: IBid[] = useSelector(helper.archivedBids)
  const whichBidHasActiveTimer: number = useSelector(
    helper.whichBidHasActiveTimer,
  )

  useEffect(() => {
    let isFound = false
    for (let i = 0; i < acceptedBids.length; i += 1) {
      if (acceptedBids[i].id === whichBidHasActiveTimer) {
        isFound = true
        break
      }
    }
    if (!isFound) {
      dispatch(setWhichBidHasActiveTimer(null))
    }
  }, [acceptedBids])

  const jobsTypesWithJobs: Array<IListsType> = [
    {
      icon: 'done',
      name: accepted,
      active: acceptedBids,
      itemsCount: acceptedBids.length,
    },
    {
      icon: 'userDouble',
      name: pending,
      pending: pendingBids,
      itemsCount: pendingBids.length,
    },
    {
      icon: 'valise',
      name: archived,
      archived: archivedBids,
      itemsCount: archivedBids.length,
    },
  ]

  return (
    <View style={{ ...WRAPPER, ...style }}>
      {jobsTypesWithJobs.map(
        (jobType) =>
          !(jobType.name === archived && isPlacedOnHelperDashboard) &&
          !(isPlacedOnHelperDashboard && !jobType.itemsCount) && (
            <JobList
              style={ITEM}
              key={jobType.name + jobType.itemsCount.toString()}
              preset='default'
              title={translate(`bidLists.${jobType.name}`)}
              icon={jobType.icon}
              {...rest}
            >
              {jobType.active &&
                (jobType.active.length ? (
                  jobType.active.map((item: IBid, index: number) => (
                    <ActiveOrPending
                      key={index.toString()}
                      {...{ item }}
                      onViewPress={() =>
                        navigation.navigate(activeBid, { bidId: item.id })
                      }
                    />
                  ))
                ) : (
                  <Text tx='bidLists.noAccepted' color={color.palette.grey} />
                ))}
              {jobType.pending &&
                (jobType.pending.length ? (
                  jobType.pending.map((item: IBid, index: number) => (
                    <ActiveOrPending
                      key={index.toString()}
                      {...{ item }}
                      onViewPress={() =>
                        navigation.navigate(jobBid, {
                          id: item.id,
                          isUpdate: true,
                        })
                      }
                    />
                  ))
                ) : (
                  <Text tx='bidLists.noPending' color={color.palette.grey} />
                ))}
              {jobType.archived &&
                (jobType.archived.length ? (
                  jobType.archived.map((item: IBid, index: number) => (
                    <ArchivedBidCategory
                      key={index.toString()}
                      {...{ item }}
                      onViewPress={() =>
                        navigation.navigate(jobBid, {
                          id: item.id,
                          isUpdate: true,
                          bidType: AdditionalHeaderTypes.PREVIOUS_BID,
                        })
                      }
                    />
                  ))
                ) : (
                  <Text tx='bidLists.noArchived' color={color.palette.grey} />
                ))}
            </JobList>
          ),
      )}
    </View>
  )
}

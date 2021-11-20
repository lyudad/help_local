/* eslint-disable */
import React, { useCallback } from 'react'
import { ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'

import { HelperHeaderCard, ViewWithShadow, JobTimer, Button } from 'components'
import { spacing } from 'theme'
import { IJobInfo, ITrackerInfo } from 'interfaces'
import { createChatRoom } from 'screens/both/messaging/thunk'
import { messagesList } from 'constants/routes'
import { PADDING_VERTICAL_SP3 } from 'constants/common-styles'
import { helperProfile } from 'constants/routes'

const VIEW_WITH_SHADOW: ViewStyle = {
  marginBottom: spacing[7] - 8,
}

const SPACING: ViewStyle = {
  paddingVertical: spacing[5] - 4,
  paddingHorizontal: spacing[5] - 4,
}

interface IProps {
  jobInfo: IJobInfo
  trackerInfo: ITrackerInfo[]
  loadingTrackerInfo: boolean
  toggleModal: () => void
  helperProfileeId: number
}

export const ShowActiveJobInfo = ({
  jobInfo,
  trackerInfo,
  loadingTrackerInfo,
  toggleModal,
  helperProfileeId,
}: IProps): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  //const isHourly: boolean = !jobInfo.fixPrice

  const createChat = useCallback(() => {
    dispatch(
      createChatRoom({
        interlocutorId: jobInfo.hiredBidInfo.createdByInfo.id,
        jobPostId: jobInfo.id,
      }),
    )
    navigation.navigate(messagesList, { textBack: 'common.goBack' })
  }, [dispatch, navigation, jobInfo])

  return (
    <>
      {jobInfo && jobInfo.hiredBidInfo && (
        <ViewWithShadow style={VIEW_WITH_SHADOW}>
          <HelperHeaderCard
            id={jobInfo.createdBy.id}
            style={SPACING}
            sendAction={createChat}
            avatar={jobInfo.hiredBidInfo.createdByInfo.avatar}
            firstName={jobInfo.hiredBidInfo.createdByInfo.firstName}
            lastName={jobInfo.hiredBidInfo.createdByInfo.lastName}
            {...(!jobInfo.fixPrice && {
              rate: jobInfo.hiredBidInfo.requestedAmount,
            })}
            stars={jobInfo.hiredBidInfo.createdByInfo.avgRating}
            reviews={jobInfo.hiredBidInfo.createdByInfo.feedbackCount}
            withSendMsgBtn
            onHelperPress={() => {
              if (helperProfileeId)
                navigation.navigate(helperProfile, {
                  id: helperProfileeId,
                  textBack: 'common.goBack',
                })
            }}
          />
          {(trackerInfo.length || jobInfo.hiredBidInfo.isCompleted) && (
            <JobTimer
              isClient
              {...{ trackerInfo, loadingTrackerInfo }}
              requestedAmount={jobInfo.hiredBidInfo.requestedAmount}
              isComplete={jobInfo.hiredBidInfo.isCompleted}
              content={
                <>
                  {jobInfo.hiredBidInfo.isCompleted && (
                    <Button
                      tx='jobDetailScreen.completeAndPay'
                      style={PADDING_VERTICAL_SP3}
                      onPress={() => toggleModal()}
                    />
                  )}
                </>
              }
              isHourly={!jobInfo.fixPrice}
            />
          )}
        </ViewWithShadow>
      )}
    </>
  )
}

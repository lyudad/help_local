/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
//import notifee from '@notifee/react-native'
//import PushNotificationIOS from '@react-native-community/push-notification-ios'

import {
  Button,
  ButtonPresetNames,
  CommonInfoModal,
  JobTimer,
  Loader,
  SVGIcon,
} from 'components'
import { IBidInfo, ITotalTimeTracked, ITrackerInfo } from 'interfaces'
import { helper, user } from 'app/store/selectors'
import {
  FLEX_1,
  FLEX_9,
  PADDING_VERTICAL_SP2,
  ROW,
} from 'constants/common-styles'
import { getTrackerInfo } from 'screens/both/thunk'
import { setTrackerInfo } from 'screens/both/reducers'
import { View } from 'react-native'
import { color } from 'theme'
import {
  endJobTracker,
  initJobTracker,
  markJobAsComplete,
} from 'screens/helper/thunk'
import { getTTTFromTrackerInfoArr } from 'utils/logged-time'
import { setWarning } from 'app/store/commonSlice'
import { translate } from 'i18n'
import PushNotification from 'react-native-push-notification'
import { setWhichBidHasActiveTimer } from 'screens/helper/reducers'

interface IProps {
  bidInfo: IBidInfo
  sendTrackerActivityToParent: (isTrackerActive: boolean) => void
}

export const Timer = ({
  bidInfo,
  sendTrackerActivityToParent,
}: IProps): JSX.Element => {
  const dispatch = useDispatch()
  const whichBidHasActiveTimer: number | null = useSelector(
    helper.whichBidHasActiveTimer,
  )
  const trackerInfo: ITrackerInfo[] = useSelector(user.trackerInfo)
  let loadingTrackerInfo: boolean = useSelector(user.loadingTrackerInfo)
  const initedJobTrackerId: number = useSelector(helper.initedJobTrackerId)
  const loadingEndJobTracker: boolean = useSelector(helper.loadingEndJobTracker)
  const loadingMarkJobAsComplete: boolean = useSelector(
    helper.loadingMarkJobAsComplete,
  )
  const loadingInitJobTracker: boolean = useSelector(
    helper.loadingInitJobTracker,
  )

  const [
    isCompleteJobConfirmModalOpen,
    setIsCompleteJobConfirmModalOpen,
  ] = useState<boolean>(false)

  const isHourly: boolean = !bidInfo.jobPostInfo.fixPrice
  const isTrackerActive: boolean =
    trackerInfo.length && !trackerInfo[trackerInfo.length - 1].endAt
  sendTrackerActivityToParent(isTrackerActive)

  const showTimerNotification = async () => {
    /*if (Platform.OS === 'ios') {
      PushNotification.localNotification({
        //id: bidInfo.id.toString(),
        title: translate('common.timerIsOn'),
        message: translate('common.timerIsOnDesc'),
        vibration: 300,
        autoCancel: false,
        userInfo: { bidId: bidInfo.id },
        //ignoreInForeground: true,
      })
    } else {*/
    PushNotification.localNotification({
      ongoing: true,
      //id: bidInfo.id.toString(),
      title: translate('common.timerIsOn'),
      message: translate('common.timerIsOnDesc'),
      channelId: 'channelID',
      vibration: 300,
      autoCancel: false,
      userInfo: { bidId: bidInfo.id },
      //ignoreInForeground: true,
    })
    //}
  }

  useEffect(() => {
    if (isTrackerActive) {
      if (!whichBidHasActiveTimer) {
        dispatch(setWhichBidHasActiveTimer(bidInfo.id))
        showTimerNotification()
      }
    } else {
      if (whichBidHasActiveTimer === bidInfo.id) {
        dispatch(setWhichBidHasActiveTimer(null))
        //if (Platform.OS === 'ios') {
        //} else {
        PushNotification.cancelAllLocalNotifications()
        //}
      }
    }
  }, [trackerInfo])

  useFocusEffect(
    useCallback(() => {
      if (isHourly) {
        loadingTrackerInfo = true
        dispatch(setTrackerInfo([]))
        dispatch(getTrackerInfo({ jobPostId: bidInfo.jobPostInfo.id }))
      }
      return () => bidInfo.jobPostInfo.fixPrice && dispatch(setTrackerInfo([]))
    }, [bidInfo]),
  )

  const isCurrentTimeBigerOrExactlyToJobStartTime = (): boolean =>
    Date.now() >= new Date(bidInfo.jobPostInfo.startAt).getTime()

  const isOneBtn: boolean =
    bidInfo.isCompleted ||
    !isHourly ||
    (!loadingTrackerInfo && !trackerInfo.length)

  let isFirstBtnDisabled: boolean = false
  let firstBtnPreset: ButtonPresetNames = 'primary'
  let firstBtnTx = 'activeBidScreen.'
  if (!bidInfo.isCompleted && isHourly) {
    // 1st btn might be  START-JOB-TIMER, START-TIMER, PAUSE-TIMER
    if (isTrackerActive) {
      firstBtnTx += `pauseTimer`
      firstBtnPreset = 'nineth'
      isFirstBtnDisabled = loadingTrackerInfo || loadingEndJobTracker
      if (isFirstBtnDisabled) firstBtnPreset = 'ninethLoading'
    } else {
      firstBtnTx += `start${trackerInfo.length ? '' : 'Job'}Timer`
      isFirstBtnDisabled = loadingTrackerInfo || loadingInitJobTracker
      if (isFirstBtnDisabled) firstBtnPreset = 'primaryLoading'
    }
  } else {
    // 1st btn might be  COMPLETE-JOB and WAITING-APPROVAL
    if (bidInfo.isCompleted) {
      firstBtnPreset = 'secondaryDisabled'
      isFirstBtnDisabled = true
      firstBtnTx += 'waitingClientApproval'
    } else {
      if (isCurrentTimeBigerOrExactlyToJobStartTime()) {
        firstBtnPreset = loadingMarkJobAsComplete
          ? 'secondaryLoading'
          : 'secondary'
        isFirstBtnDisabled = loadingMarkJobAsComplete
      } else {
        firstBtnPreset = 'secondaryDisabled'
        isFirstBtnDisabled = true
      }
      firstBtnTx += 'completeJob'
    }
  }

  const isSumOneDollarOrBiger = () => {
    let trackedTimeInMinutes: number = 0
    let newTTT: ITotalTimeTracked = getTTTFromTrackerInfoArr(trackerInfo)
    trackedTimeInMinutes += newTTT.days * 24 * 60
    trackedTimeInMinutes += newTTT.hours * 60
    trackedTimeInMinutes += newTTT.minutes
    return (
      Math.round((bidInfo.requestedAmount / 60) * trackedTimeInMinutes) >= 1
    )
  }

  useEffect(() => {
    if (initedJobTrackerId || loadingEndJobTracker) {
      dispatch(getTrackerInfo({ jobPostId: bidInfo.jobPostInfo.id }))
    }
  }, [initedJobTrackerId, loadingEndJobTracker])
  const onFirstBtnPress = () => {
    if (isHourly) {
      if (isTrackerActive) {
        dispatch(
          endJobTracker({
            jobPostId: bidInfo.jobPostInfo.id,
            id: trackerInfo[trackerInfo.length - 1].id,
          }),
        )
      } else {
        if (whichBidHasActiveTimer)
          dispatch(setWarning(translate('common.cantStartTimersSameTime')))
        else dispatch(initJobTracker({ jobPostId: bidInfo.jobPostInfo.id }))
      }
    } else {
      setIsCompleteJobConfirmModalOpen(true)
    }
  }
  const onSecondBtnPress = () => {
    if (isSumOneDollarOrBiger()) {
      setIsCompleteJobConfirmModalOpen(true)
    } else
      dispatch(setWarning(translate('activeBidScreen.sumMustBeOneOrBiger')))
  }

  return loadingTrackerInfo ? (
    <Loader preset='primayWithVerticalMarginSp3' />
  ) : (
    <>
      <CommonInfoModal
        visible={isCompleteJobConfirmModalOpen}
        toggleModal={() =>
          setIsCompleteJobConfirmModalOpen(!isCompleteJobConfirmModalOpen)
        }
        title={translate('common.confirm')}
        content={translate('activeBidScreen.areYouSureCompleteJob')}
        buttonText={translate('common.yes')}
        onButtonPress={() => {
          setIsCompleteJobConfirmModalOpen(false)
          dispatch(markJobAsComplete({ jobPostId: bidInfo.jobPostInfo.id }))
        }}
      />
      <JobTimer
        {...{ trackerInfo, loadingTrackerInfo, isHourly }}
        requestedAmount={bidInfo.requestedAmount}
        isComplete={bidInfo.isCompleted}
        content={
          <View style={ROW}>
            <Button
              tx={firstBtnTx}
              style={[PADDING_VERTICAL_SP2, FLEX_9]}
              componentBeforeText={
                !bidInfo.isCompleted && (
                  <SVGIcon
                    icon={isTrackerActive ? 'pause' : 'start'}
                    color={
                      isTrackerActive ? color.secondary : color.palette.white
                    }
                  />
                )
              }
              preset={firstBtnPreset}
              {...(!isFirstBtnDisabled && { onPress: onFirstBtnPress })}
              disabled={isFirstBtnDisabled}
            />
            {!isOneBtn && (
              <>
                <View style={FLEX_1} />
                <Button
                  tx='activeBidScreen.completeJob'
                  style={[PADDING_VERTICAL_SP2, FLEX_9]}
                  onPress={onSecondBtnPress}
                  preset={((): ButtonPresetNames => {
                    if (!isCurrentTimeBigerOrExactlyToJobStartTime()) {
                      return 'secondaryDisabled'
                    } else {
                      return loadingMarkJobAsComplete
                        ? 'secondaryLoading'
                        : 'secondary'
                    }
                  })()}
                  disabled={
                    !isCurrentTimeBigerOrExactlyToJobStartTime() ||
                    loadingMarkJobAsComplete
                  }
                />
              </>
            )}
          </View>
        }
      />
    </>
  )
}

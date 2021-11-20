/* eslint-disable */
import React, { useCallback, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { useFocusEffect } from '@react-navigation/core'

import { SVGIcon, Text, ViewTimeLogs } from 'components'
import { translate } from 'i18n'
import { IJobTimerProps } from './job-timer.props'
import { color, spacing } from 'theme'
import {
  MARGIN_BOTTOM_SP3,
  MARGIN_HORIZONTAL_SP2,
  MARGIN_TOP_SP3,
} from 'constants/common-styles'
import { ITotalTimeTracked } from 'interfaces'
import { getTTTFromMs, getTTTFromTrackerInfoArr } from 'utils/logged-time'

const SPACING: ViewStyle = {
  paddingVertical: spacing[5] - 4,
  paddingHorizontal: spacing[5] - 4,
}

const BTN_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.milky,
  borderBottomEndRadius: 4,
  borderBottomStartRadius: 4,
  alignItems: 'center',
}

const TIME: ViewStyle = {
  flexDirection: 'row',
  marginTop: spacing[2],
  marginBottom: spacing[5],
  justifyContent: 'center',
}

const TIME_LOGGED: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: spacing[4],
}

export const JobTimer = (props: IJobTimerProps): JSX.Element => {
  const {
    style,
    trackerInfo,
    requestedAmount,
    isComplete,
    content,
    isHourly,
    loadingTrackerInfo,
    isClient,
  } = props

  const [count, setCount] = useState<number>(0)
  let intervalId: null | ReturnType<typeof setInterval> = null
  let isTimerActive: boolean = false
  if (
    isHourly &&
    trackerInfo.length &&
    !trackerInfo[trackerInfo.length - 1].endAt
  ) {
    isTimerActive = true
    intervalId = setInterval(() => setCount(count + 1), 5000)
  } else if (intervalId) clearInterval(intervalId)

  useFocusEffect(
    useCallback(() => {
      return () => intervalId && clearInterval(intervalId)
    }, [intervalId]),
  )

  const getLastActiveSessionTime = (): ITotalTimeTracked => {
    const ms1: number = new Date(
      trackerInfo[trackerInfo.length - 1].startAt,
    ).getTime()
    const ms2: number = new Date().getTime()
    return getTTTFromMs(ms2 - ms1)
  }
  const getCurrentSessionTimeText = (): string => {
    let result: string = ''
    const jobTimer: string = 'jobTimer.'
    if (isComplete) result = translate(jobTimer + 'jobComplete')
    else if (!isTimerActive) result = translate(jobTimer + 'paused')
    else {
      const { days, hours, minutes } = getLastActiveSessionTime()
      if (days) result = days + ' ' + translate('common.d') + ' '
      if (hours) result += hours + ' ' + translate('common.hr') + ' '
      if (minutes) result += minutes + ' ' + translate('common.min')
      if (!result) result = '0 ' + translate('common.min')
    }
    return result
  }
  const getLoggedTimeText = (): string => {
    let loggedTimeText: string = ''
    let trackedTimeInMinutes: number = 0
    let newTTT: ITotalTimeTracked = getTTTFromTrackerInfoArr(trackerInfo)
    trackedTimeInMinutes += newTTT.days * 24 * 60
    trackedTimeInMinutes += newTTT.hours * 60
    trackedTimeInMinutes += newTTT.minutes
    newTTT = getTTTFromMs(trackedTimeInMinutes * 60 * 1000)
    if (newTTT.days || newTTT.hours || newTTT.minutes || isTimerActive) {
      if (newTTT.days) {
        loggedTimeText = ` ${newTTT.days}${translate('common.days')}`
      }
      if (newTTT.hours) {
        loggedTimeText = `${loggedTimeText} ${newTTT.hours}${translate(
          'common.hrs',
        )}`
      }
      if (newTTT.minutes) {
        loggedTimeText = `${loggedTimeText} ${newTTT.minutes} ${translate(
          'common.min',
        )}`
      }
    }
    if (!loggedTimeText) loggedTimeText = `0 ${translate('common.min')}`
    loggedTimeText +=
      ' | $' + Math.round((requestedAmount / 60) * trackedTimeInMinutes)

    return loggedTimeText
  }

  return (
    <View style={[SPACING, BTN_CONTAINER, style]}>
      {((isComplete && !isClient) ||
        (isHourly &&
          !isComplete &&
          (isTimerActive || trackerInfo.length > 0))) && (
        <View style={[TIME, !isComplete && MARGIN_BOTTOM_SP3]}>
          <View style={MARGIN_HORIZONTAL_SP2}>
            <SVGIcon icon={isComplete ? 'checkInCircle' : 'oclock'} />
          </View>
          <Text preset='header3' text={getCurrentSessionTimeText()} />
        </View>
      )}
      {content}
      {isHourly && trackerInfo.length > 0 && (
        <>
          <View style={[TIME_LOGGED, !isComplete && MARGIN_TOP_SP3]}>
            <Text tx='jobDetailScreen.totalTimelogged' preset='subtitle' />
            <Text text=': ' preset='subtitle' />
            <Text preset='subtitleBold' text={getLoggedTimeText()} />
          </View>
          {trackerInfo.length && (
            <ViewTimeLogs {...{ loadingTrackerInfo, trackerInfo }} />
          )}
        </>
      )}
    </View>
  )
}

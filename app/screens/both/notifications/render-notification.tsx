/* eslint-disable */
import { useNavigation } from '@react-navigation/native'
import { TextPresets } from 'app/components/text/text.presets'
import { user } from 'app/store/selectors'
// import { user } from 'app/store/selectors'
import {
  Button,
  ButtonPresetNames,
  CircleImage,
  Hr,
  IInlineTouchableTextProps,
  InlineTouchableText,
  Text,
} from 'components'
import {
  ALIGN_SELF_START,
  FLEX_1,
  FLEX_6,
  MARGIN_TOP_SP2,
  MARGIN_VERTICAL_SP3,
  PADDING_VERTICAL_SP2,
  ROW,
  TEXT_ALIGN_LEFT,
} from 'constants/common-styles'
import {
  account,
  activeBid,
  completedJobHelper,
  helperDashboard,
  jobDetail,
  jobListingFull,
  setUpHelperProfile,
} from 'constants/routes'
import dayjs from 'dayjs'
import { translate } from 'i18n'
import {
  EUserNotificationTypes,
  IConsumerOrHelper,
  INotification,
} from 'interfaces'
import React, { useEffect } from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import { Source } from 'react-native-fast-image'
import { useDispatch, useSelector } from 'react-redux'
import { createReliabilityFeedbackOnHelper } from 'screens/client/thunk'
// import { useDispatch, useSelector } from 'react-redux'
import { color, spacing } from 'theme'
import { setCurrentRole } from '../reducers'
// import { changeCurrentRole } from '../thunk'

const avatarForHelperNotification = require('assets/helper-notification-avatar.png')
const defaultAvatar = require('assets/default-avatar.png')
const warninigIcon = require('assets/green-warning-notification.png')
const okIcon = require('assets/ok-notification.png')
const dollarIcon = require('assets/dollar-notification.png')
const starIcon = require('assets/star-notification.png')

const ICON_SIZE: number = 50

interface IRenderNotificationProps {
  notification: INotification
  index: number
  notifications: INotification[]
}

const TITLE: ViewStyle = {
  alignItems: 'flex-start',
}
const HR: ViewStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[3],
}

const AVATAR_VIEW: ViewStyle = {
  flex: 7,
}
const TEXT_VIEW: ViewStyle = {
  flex: 24,
  paddingTop: 10,
}
const TIME_VIEW: ViewStyle = {
  flex: 5,
  paddingTop: 15,
}

const TIME_TEXT: TextStyle = {
  alignSelf: 'flex-end',
}

const ADD_MARGIN_TOP: ViewStyle = {
  marginTop: spacing[5],
}

const BUTTON_TEXT_STYLE: TextStyle = {
  fontSize: 13,
  fontWeight: '700',
}

// const HELPER: IConsumerOrHelper = 'helper'

const InlineGreenLink = ({
  text,
  onTextPress,
}: IInlineTouchableTextProps): JSX.Element => {
  const TEXT: TextStyle = {
    fontSize: 15,
    fontWeight: '700',
    textDecorationLine: 'underline',
    color: color.primary,
  }
  return <InlineTouchableText {...{ text, onTextPress }} textStyle={TEXT} />
}

interface IJobGreenInlineLinkProps {
  onJobPress: Function
}
const JobGreenInlineLink = ({
  onJobPress,
}: IJobGreenInlineLinkProps): JSX.Element => {
  return (
    <InlineGreenLink
      text={translate('notifications.job')}
      onTextPress={() => onJobPress()}
    />
  )
}

const isNotificationForHelperCheck = (
  notificationType: EUserNotificationTypes,
): boolean => {
  if (
    notificationType === EUserNotificationTypes.ON_USER_GET_HIRED ||
    notificationType === EUserNotificationTypes.ON_INVITE_TO_JOB_POST ||
    notificationType === EUserNotificationTypes.ON_JOB_POST_UPDATED ||
    notificationType === EUserNotificationTypes.ON_JOB_POST_DELETED ||
    notificationType === EUserNotificationTypes.ON_BACKGROUND_CHECK_SUCCESS ||
    notificationType === EUserNotificationTypes.ON_BACKGROUND_CHECK_FAILED ||
    notificationType === EUserNotificationTypes.ON_JOB_POST_COMPLETED ||
    notificationType === EUserNotificationTypes.ON_RELEVANT_JOB_POSTED ||
    notificationType === EUserNotificationTypes.ON_CLIENT_LEFT_REVIEW ||
    notificationType === EUserNotificationTypes.ON_HELPER_PROFILE_COMPLETED
  )
    return true
  else return false
}

export const RenderNotification = ({
  notification,
  notifications,
  index,
}: IRenderNotificationProps): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  let timer: ReturnType<typeof setTimeout> = null

  const isNotificationForHelper: boolean = isNotificationForHelperCheck(
    notification.type,
  )
  const isFirstFromNewNotifications: boolean =
    !notification.isRead && index === 0
  const isFirstFromOldNotifications: boolean =
    notification.isRead && (index === 0 || !notifications[index - 1].isRead)
  const currentRole: IConsumerOrHelper = useSelector(user.currentRole)

  useEffect(() => () => clearTimeout(timer), [])

  const setNeededRoleAndRedirect = (
    neededRole: IConsumerOrHelper,
    redirect: () => void,
  ) => {
    if (currentRole !== neededRole) {
      dispatch(setCurrentRole(neededRole))
      timer = setTimeout(() => {
        redirect()
      }, 300)
    } else {
      redirect()
    }
  }

  const calculateTime = (): string => {
    const resultInMinutes = dayjs().diff(notification.createdAt, 'minute')
    if (resultInMinutes > 60) {
      const resultInHours = dayjs().diff(notification.createdAt, 'hour')
      if (resultInHours > 24) {
        return `${dayjs().diff(notification.createdAt, 'd')} d`
      }
      return `${resultInHours} h`
    }
    return `${resultInMinutes} m`
  }

  let avatar: Source | number = null
  let isCommonContent: boolean = true
  let isInlineNotificationWithName: boolean = true
  let isInlineNotification: boolean = false
  let isShow: boolean = true
  let inlineNotificationText: string = ''
  let inlineNotificationTextAfterJobLink: string = ''
  let inlineNotificationTextAfterJobLinkPreset: TextPresets = 'default'
  let inlineNotificationTextBeforeName: string = ''
  let inlineNotificationTextBeforeNamePreset: TextPresets = 'default'
  let onJobPressFromInlineNotification: Function = null
  let isInlineNotificationWithJobLink: boolean = true
  let buttonTx: string = ''
  let buttonPreset: ButtonPresetNames = 'fifth'
  let isButtonDisabled: boolean = false
  let buttonsCount: number = 0
  let onButtonPress: Function = null
  interface ITwoButton {
    txOf1: string
    txOf2: string
    presetOf1: ButtonPresetNames
    presetOf2: ButtonPresetNames
    onPress: (isPressedFirst: boolean) => void
  }
  let twoButton: ITwoButton = null

  if (isNotificationForHelper) avatar = avatarForHelperNotification
  else {
    if (notification.createdBy.avatar)
      avatar = { uri: notification.createdBy.avatar.sourceUrl }
    else avatar = defaultAvatar
  }

  if (
    notification.type === EUserNotificationTypes.ON_BID_ON_JOB_POST ||
    notification.type === EUserNotificationTypes.ON_USER_GET_HIRED ||
    notification.type === EUserNotificationTypes.ON_INVITE_TO_JOB_POST ||
    notification.type === EUserNotificationTypes.ON_JOB_POST_UPDATED ||
    notification.type === EUserNotificationTypes.ON_JOB_POST_DELETED ||
    notification.type === EUserNotificationTypes.ON_JOB_BID_MARKED_COMPLETED ||
    notification.type === EUserNotificationTypes.ON_HELPER_STARTED_TRACKER ||
    notification.type === EUserNotificationTypes.ON_JOB_BID_DELETED ||
    notification.type === EUserNotificationTypes.ON_HELPER_ARRIVED ||
    notification.type === EUserNotificationTypes.ON_JOB_POST_OVERDUE ||
    notification.type === EUserNotificationTypes.ON_BACKGROUND_CHECK_SUCCESS ||
    notification.type === EUserNotificationTypes.ON_BACKGROUND_CHECK_FAILED ||
    notification.type === EUserNotificationTypes.ON_JOB_POST_COMPLETED ||
    notification.type === EUserNotificationTypes.ON_RELEVANT_JOB_POSTED ||
    notification.type === EUserNotificationTypes.ON_CLIENT_LEFT_REVIEW ||
    notification.type === EUserNotificationTypes.ON_HELPER_LEFT_REVIEW ||
    notification.type === EUserNotificationTypes.ON_HELPER_PROFILE_COMPLETED ||
    notification.type ===
      EUserNotificationTypes.ON_JOB_POST_CREATED_AND_HELPERS_INVITED ||
    notification.type === EUserNotificationTypes.ON_JOB_POST_CREATED ||
    notification.type ===
      EUserNotificationTypes.ON_JOB_POST_UPDATED_SUCCESSFULLY
  ) {
    isInlineNotification = true
    switch (notification.type) {
      case EUserNotificationTypes.ON_BID_ON_JOB_POST: {
        inlineNotificationText = 'bidOnYour'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        break
      }
      case EUserNotificationTypes.ON_USER_GET_HIRED: {
        inlineNotificationText = 'hasChosenYouForTheir'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('helper', () =>
            navigation.navigate(activeBid, { bidId: notification.jobBidId }),
          )
        break
      }
      case EUserNotificationTypes.ON_INVITE_TO_JOB_POST: {
        inlineNotificationText = 'hasInvitedYouTo'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('helper', () =>
            navigation.navigate(jobListingFull, { id: notification.jobPostId }),
          )
        break
      }
      case EUserNotificationTypes.ON_JOB_POST_UPDATED: {
        inlineNotificationText = 'hasUpdated'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('helper', () =>
            navigation.navigate(jobListingFull, { id: notification.jobPostId }),
          )
        break
      }
      case EUserNotificationTypes.ON_JOB_POST_DELETED: {
        inlineNotificationText = 'hasDeletedJob'
        inlineNotificationTextAfterJobLink = notification.jobPostInfo.title
        inlineNotificationTextAfterJobLinkPreset = 'bold'
        onJobPressFromInlineNotification = () => {}
        isInlineNotificationWithJobLink = false
        break
      }
      case EUserNotificationTypes.ON_JOB_BID_MARKED_COMPLETED: {
        inlineNotificationText = 'hasMarkedYour'
        inlineNotificationTextAfterJobLink = translate(
          'notifications.completePleaseGo',
        )
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        break
      }
      case EUserNotificationTypes.ON_HELPER_STARTED_TRACKER: {
        inlineNotificationText = 'hasStartedYour'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        break
      }
      case EUserNotificationTypes.ON_JOB_BID_DELETED: {
        inlineNotificationTextBeforeName =
          translate('notifications.your') + ' ' + notification.jobPostInfo.title
        inlineNotificationTextBeforeNamePreset = 'bold'
        inlineNotificationText = 'hasCancelledJob'
        isInlineNotificationWithJobLink = false
        onJobPressFromInlineNotification = () => {}
        avatar = warninigIcon
        break
      }
      case EUserNotificationTypes.ON_HELPER_ARRIVED: {
        inlineNotificationText = 'shouldHaveArrived'
        inlineNotificationTextAfterJobLink = translate(
          'notifications.isHelperThere',
        )
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        buttonsCount = 2
        twoButton = {
          txOf1: 'common.yes',
          txOf2: 'common.no',
          presetOf1: 'fifth',
          presetOf2: 'fifth',
          onPress: (isPressedFirst: boolean) => {
            dispatch(
              createReliabilityFeedbackOnHelper({
                notificationId: notification.id,
                reliable: isPressedFirst,
              }),
            )
          },
        }
        break
      }
      case EUserNotificationTypes.ON_JOB_POST_OVERDUE: {
        isInlineNotificationWithName = false
        avatar = warninigIcon
        inlineNotificationTextBeforeName =
          translate('notifications.your') + ' ' + notification.jobPostInfo.title
        inlineNotificationTextBeforeNamePreset = 'bold'
        inlineNotificationText = 'wasDeletedBecauseOfExpiredDate'
        onJobPressFromInlineNotification = () => {}
        isInlineNotificationWithJobLink = false
        break
      }
      case EUserNotificationTypes.ON_BACKGROUND_CHECK_SUCCESS: {
        avatar = okIcon
        isCommonContent = false
        break
      }
      case EUserNotificationTypes.ON_BACKGROUND_CHECK_FAILED: {
        avatar = warninigIcon
        isCommonContent = false
        break
      }
      /*
      case EUserNotificationTypes.ON_JOB_POST_COMPLETED: {
        avatar = dollarIcon
        inlineNotificationTextBeforeName =
          translate('notifications.your') +
          ' "' +
          notification.jobPostInfo.title +
          '"'
        inlineNotificationTextAfterJobLink = translate(
          'notifications.jobCompletedAndPiad',
        )
        isInlineNotificationWithJobLink = false
        buttonsCount = 1
        buttonTx = 'viewJobReceipt'
        onButtonPress = () =>
          setNeededRoleAndRedirect('helper', () =>
            navigation.navigate(account, {
              itemIndex: 3,
              paidJobMiniInfoToShowReceiptOnModal: {
                id: notification.jobPostInfo.id,
                title: notification.jobPostInfo.title,
                completedByConsumerAt: notification.createdAt,
              },
            }),
          )
        break
      }
      */
      case EUserNotificationTypes.ON_JOB_POST_COMPLETED: {
        if (currentRole === 'consumer') {
          isShow = false
        }

        avatar = dollarIcon
        inlineNotificationTextBeforeName =
          translate('notifications.your') + ' ' + notification.jobPostInfo.title
        inlineNotificationTextBeforeNamePreset = 'bold'
        inlineNotificationTextAfterJobLink = translate(
          'notifications.completedAndPiad',
        )
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('helper', () =>
            navigation.navigate(completedJobHelper, {
              bidId: notification.jobBidId,
            }),
          )
        buttonsCount = 1
        buttonTx = 'viewJobReceipt'
        onButtonPress = () => {
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(account, {
              itemIndex: 3,
              paidJobMiniInfoToShowReceiptOnModal: {
                id: notification.jobPostInfo.id,
                title: notification.jobPostInfo.title,
                completedByConsumerAt: notification.createdAt,
                charges: notification.charges,
              },
            }),
          )
        }
        break
      }
      case EUserNotificationTypes.ON_RELEVANT_JOB_POSTED: {
        isCommonContent = false
        break
      }
      case EUserNotificationTypes.ON_HELPER_LEFT_REVIEW: {
        avatar = starIcon
        isInlineNotificationWithJobLink = false
        inlineNotificationText = 'gaveYou'
        inlineNotificationTextAfterJobLink = `${
          notification.feedbackInfo.score
        } ${translate('notifications.stars')}`
        break
      }
      case EUserNotificationTypes.ON_CLIENT_LEFT_REVIEW: {
        avatar = starIcon
        isInlineNotificationWithJobLink = false
        inlineNotificationText = 'gaveYou'
        inlineNotificationTextAfterJobLink = `${
          notification.feedbackInfo.score
        } ${translate(
          `notifications.star${notification.feedbackInfo.score > 1 ? 's' : ''}`,
        )}`
        break
      }
      case EUserNotificationTypes.ON_HELPER_PROFILE_COMPLETED: {
        avatar = okIcon
        isInlineNotificationWithName = false
        isInlineNotificationWithJobLink = false
        inlineNotificationText = 'thanksforHelperProfile'
        buttonsCount = 1
        buttonTx = 'startEarning'
        onButtonPress = () =>
          setNeededRoleAndRedirect('helper', () =>
            navigation.navigate(helperDashboard),
          )
        break
      }
      case EUserNotificationTypes.ON_JOB_POST_CREATED_AND_HELPERS_INVITED: {
        avatar = avatarForHelperNotification
        isInlineNotificationWithName = false
        inlineNotificationText = 'your'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        inlineNotificationTextAfterJobLink = translate(
          'notifications.hasBeenPostedAndInvited',
        )
        break
      }
      case EUserNotificationTypes.ON_JOB_POST_CREATED: {
        avatar = avatarForHelperNotification
        isInlineNotificationWithName = false
        inlineNotificationText = 'your'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        inlineNotificationTextAfterJobLink = translate(
          'notifications.hasBeenPosted',
        )
        break
      }
      case EUserNotificationTypes.ON_JOB_POST_UPDATED_SUCCESSFULLY: {
        avatar = avatarForHelperNotification
        isInlineNotificationWithName = false
        inlineNotificationTextBeforeName = `${translate(
          'notifications.youEditedYour',
        )} ${notification.jobPostInfo.title}`
        inlineNotificationTextBeforeNamePreset = 'bold'
        onJobPressFromInlineNotification = () =>
          setNeededRoleAndRedirect('consumer', () =>
            navigation.navigate(jobDetail, { id: notification.jobPostId }),
          )
        inlineNotificationTextAfterJobLink = translate('notifications.posting')
        break
      }
    }
  }

  const RenderBackroundCheckNotificationContent = (): JSX.Element => {
    const isApproved: boolean =
      notification.type === EUserNotificationTypes.ON_BACKGROUND_CHECK_SUCCESS
    return (
      <>
        <Text>
          <Text
            tx={`notifications.${
              isApproved ? 'yourBackCheck' : 'sorryYourBack'
            }`}
          />
          <Text
            tx={`notifications.${isApproved ? 'approved' : 'isInProcess'}`}
            preset='bold'
            color={isApproved ? color.primary : color.secondary}
          />
          <Text
            tx={`notifications.${
              isApproved ? 'weAreGlad' : 'contactUsForMoreInfo'
            }`}
          />
        </Text>
        {isApproved && (
          <Button
            tx='notifications.setUpHelperProfile'
            preset='fifth'
            style={[MARGIN_TOP_SP2, PADDING_VERTICAL_SP2]}
            textStyle={BUTTON_TEXT_STYLE}
            onPress={() =>
              setNeededRoleAndRedirect('helper', () =>
                navigation.navigate(setUpHelperProfile),
              )
            }
          />
        )}
      </>
    )
  }

  const RenderNewJobNotificationContent = (): JSX.Element => {
    return (
      <>
        <Text style={ALIGN_SELF_START}>
          <Text tx={`notifications.newJob`} preset='bold' />
          <Text tx={`notifications.in`} />
          <Text text={`"${notification.jobPostInfo.category.title}"`} />
        </Text>
        <Button
          tx='notifications.viewPost'
          preset='fifth'
          style={[MARGIN_TOP_SP2, PADDING_VERTICAL_SP2]}
          textStyle={BUTTON_TEXT_STYLE}
          onPress={() =>
            setNeededRoleAndRedirect('helper', () =>
              navigation.navigate(jobListingFull, {
                id: notification.jobPostInfo.id,
              }),
            )
          }
        />
      </>
    )
  }

  return (
    <>
      {(isFirstFromNewNotifications || isFirstFromOldNotifications) && (
        <View
          style={{
            ...TITLE,
            ...(isFirstFromOldNotifications && ADD_MARGIN_TOP),
          }}
        >
          <Text
            preset='header3bold'
            tx={`notifications.subTitle${
              isFirstFromNewNotifications ? '1' : '2'
            }`}
          />
          <Hr style={HR} />
        </View>
      )}
      {isShow && (
        <View style={[ROW, MARGIN_VERTICAL_SP3]}>
          <View style={AVATAR_VIEW}>
            <CircleImage source={avatar} size={ICON_SIZE} />
          </View>
          <View style={TEXT_VIEW}>
            {isCommonContent && (
              <>
                <Text style={TEXT_ALIGN_LEFT}>
                  {inlineNotificationTextBeforeName !== '' && (
                    <>
                      <Text
                        text={inlineNotificationTextBeforeName}
                        preset={inlineNotificationTextBeforeNamePreset}
                      />
                      <Text text={' '} />
                    </>
                  )}
                  {isInlineNotificationWithName &&
                    notification.createdBy?.firstName && (
                      <>
                        <Text
                          text={notification.createdBy.firstName}
                          preset='bold'
                        />
                        <Text text={' '} />
                        <Text
                          text={notification.createdBy.lastName.charAt(0) + '.'}
                          preset='bold'
                        />
                        <Text text={' '} />
                      </>
                    )}
                  {isInlineNotification && (
                    <>
                      {inlineNotificationText && (
                        <>
                          <Text
                            tx={`notifications.${inlineNotificationText}`}
                          />
                          <Text text={' '} />
                        </>
                      )}
                      {isInlineNotificationWithJobLink && (
                        <JobGreenInlineLink
                          onJobPress={onJobPressFromInlineNotification}
                        />
                      )}
                      {!(
                        inlineNotificationText &&
                        !isInlineNotificationWithJobLink
                      ) && <Text text={' '} />}
                      <Text
                        text={inlineNotificationTextAfterJobLink}
                        preset={inlineNotificationTextAfterJobLinkPreset}
                      />
                    </>
                  )}
                </Text>
                {buttonsCount === 1 && (
                  <Button
                    tx={`notifications.${buttonTx}`}
                    preset={buttonPreset}
                    disabled={isButtonDisabled}
                    textStyle={BUTTON_TEXT_STYLE}
                    style={[PADDING_VERTICAL_SP2, MARGIN_TOP_SP2]}
                    onPress={() => onButtonPress()}
                  />
                )}
                {buttonsCount === 2 && (
                  <View style={[ROW, MARGIN_TOP_SP2]}>
                    <Button
                      tx={twoButton.txOf1}
                      preset={twoButton.presetOf1}
                      textStyle={BUTTON_TEXT_STYLE}
                      style={[FLEX_6, PADDING_VERTICAL_SP2]}
                      onPress={() => twoButton.onPress(true)}
                    />
                    <View style={FLEX_1} />
                    <Button
                      tx={twoButton.txOf2}
                      preset={twoButton.presetOf2}
                      textStyle={BUTTON_TEXT_STYLE}
                      style={[FLEX_6, PADDING_VERTICAL_SP2]}
                      onPress={() => twoButton.onPress(false)}
                    />
                  </View>
                )}
              </>
            )}
            {(notification.type ===
              EUserNotificationTypes.ON_BACKGROUND_CHECK_SUCCESS ||
              notification.type ===
                EUserNotificationTypes.ON_BACKGROUND_CHECK_FAILED) && (
              <RenderBackroundCheckNotificationContent />
            )}
            {notification.type ===
              EUserNotificationTypes.ON_RELEVANT_JOB_POSTED && (
              <RenderNewJobNotificationContent />
            )}
          </View>
          <View style={TIME_VIEW}>
            <Text
              style={TIME_TEXT}
              text={calculateTime()}
              color={color.palette.lighterGrey}
            />
          </View>
        </View>
      )}
    </>
  )
}

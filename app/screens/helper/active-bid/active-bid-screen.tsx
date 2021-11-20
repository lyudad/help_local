/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import {
  Image,
  ImageStyle,
  ImageURISource,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { UserStackRouteProps } from 'navigation'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import {
  BaseScreen,
  Button,
  DetailsWithIcon,
  IDetailsWithIconItem,
  JobCompletedCard,
  JobPostCard,
  Loader,
  Modal,
  Photos,
  SVGIcon,
  Text,
} from 'components'
import { color, spacing } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { IBidInfo, ITrackerInfo } from 'interfaces'
import { helper, user } from 'app/store/selectors'
import { translate } from 'i18n'
import {
  ALIGIN_ITEMS_CENTER,
  FLEX_1,
  JUSTIFY_CONTENT_CENTER,
  MARGIN_VERTICAL_SP3,
  MARGIN_VERTICAL_SP5,
  MARGIN_VERTICAL_SP6,
  PADDING_HORIZONTAL_SP2,
  PADDING_RIGHT_SP5,
  PADDING_TOP_SP7,
  ROW,
  TEXT_ALIGIN_LEFT,
  WINDOW_WIDTH,
} from 'constants/common-styles'
import { jobBids } from 'constants/routes'
import { cancelBidOnJob, getBidInfo } from '../thunk'
import { Timer } from './sub-components'
import {
  setBidInfo,
  setIsBidCanceled,
  setWhichBidHasActiveTimer,
} from '../reducers'
import { createChatRoom } from 'screens/both/messaging/thunk'
import { messagesList } from 'constants/routes'
import PushNotification from 'react-native-push-notification'

const bg = require('assets/active-bid-bg.png')
const bg2 = require('assets/active-bid-bg2.png')

const BASE_VIEW: ViewStyle = {
  paddingTop: spacing[7] - 8,
}

const BG_WRAPPER: ViewStyle = {
  position: 'relative',
  left: '-5.5%',
  marginTop: spacing[4],
}

const FULL_WIDTH: ViewStyle = {
  width: WINDOW_WIDTH,
}

const POSITION_ABSOLUTE: ViewStyle = {
  position: 'absolute',
}

const WARNING_TITLE: TextStyle = {
  fontSize: 20,
  fontWeight: '600',
  textAlign: 'center',
  marginBottom: spacing[4],
}

const FOOTER: ViewStyle = {
  height: 160,
  paddingHorizontal: '5%',
}

const WHITE_CIRCLE: ViewStyle = {
  justifyContent: 'center',
  width: 35,
  height: 35,
  backgroundColor: color.palette.white,
  borderRadius: 20,
}

const ADDITIONAL_RIGHT_PADDING: ViewStyle = {
  paddingRight: 10,
}

export const ActiveBidScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const route = useRoute<UserStackRouteProps<'activeBid'>>()

  const [isModal, setIsModal] = useState<boolean>(false)
  const [isTrackerActive, setIsTrackerActive] = useState<boolean>(false)
  const isScreenFocused: boolean = useIsFocused()
  let bidInfo: IBidInfo | null = useSelector(helper.bidInfo)
  const loadingCancelBidOnJob: boolean = useSelector(
    helper.loadingCancelBidOnJob,
  )
  const whichBidHasActiveTimer: number | null = useSelector(
    helper.whichBidHasActiveTimer,
  )
  const isBidCanceled: boolean = useSelector(helper.isBidCanceled)
  const trackerInfo: ITrackerInfo[] = useSelector(user.trackerInfo)
  const loadingTrackerInfo: boolean = useSelector(user.loadingTrackerInfo)
  const { bidId } = route.params
  if (bidInfo && bidInfo.id !== bidId) {
    bidInfo = null
  }

  useEffect(() => {
    if (isScreenFocused) {
      if (!bidInfo) {
        dispatch(getBidInfo({ id: bidId }))
      }
    } else {
      dispatch(setBidInfo(null))
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (
      !bidInfo?.jobPostInfo.fixPrice &&
      bidInfo?.isCompleted &&
      bidInfo?.id === whichBidHasActiveTimer &&
      isScreenFocused
    ) {
      dispatch(setWhichBidHasActiveTimer(null))
      PushNotification.cancelAllLocalNotifications()
    }
  }, [bidInfo])

  useEffect(() => {
    if (navigation.isFocused && isBidCanceled) {
      dispatch(setIsBidCanceled(false))
      navigation.navigate(jobBids)
    }
  }, [isBidCanceled])

  const createChat = useCallback(() => {
    if (bidInfo) {
      dispatch(
        createChatRoom({
          interlocutorId: bidInfo?.jobPostInfo?.createdBy.id,
          jobPostId: bidInfo?.jobPostInfo?.id,
        }),
      )
      navigation.navigate(messagesList, { textBack: 'common.goBack' })
    }
  }, [dispatch, navigation, bidInfo])

  const getJobDetailItemsArray = (): IDetailsWithIconItem[] => {
    const jobDetailItems: IDetailsWithIconItem[] = [
      {
        icon: 'calendar',
        name: translate('showJobDateAndAddressWithIcons.date'),
        value: dayjs(bidInfo.jobPostInfo.startAt).format('MMMM D, YYYY'),
      },
      {
        icon: 'time',
        name: translate('showJobDateAndAddressWithIcons.time'),
        value: `${dayjs(bidInfo.jobPostInfo.startAt).format(
          'h:mm A',
        )} - ${dayjs(bidInfo.jobPostInfo.endAt).format('h:mm A')}`,
      },
    ]
    if (bidInfo.jobPostInfo.address) {
      jobDetailItems.push({
        icon: 'mapMark',
        name: translate('showJobDateAndAddressWithIcons.address'),
        value: bidInfo.jobPostInfo.address.formatted,
      })
    }
    return jobDetailItems
  }

  return (
    <BaseScreen
      withHeader
      textBack='activeBidScreen.headerTextBack'
      headerAnimate={headerStyle}
      onScroll={scrollHandler}
      horizontalPaddingViewStyle={BASE_VIEW}
    >
      {bidInfo ? (
        <>
          {bidInfo.jobPostInfo.completed ? (
            <JobCompletedCard
              {...{ trackerInfo, bidInfo, loadingTrackerInfo }}
            />
          ) : (
            <>
              <Modal visible={isModal} toggleModal={() => setIsModal(!isModal)}>
                <SVGIcon
                  icon='crossInPentagon'
                  color={color.primary}
                  size={40}
                />
                <View style={MARGIN_VERTICAL_SP3}>
                  <Text
                    preset='header3bold'
                    tx='jobDetailScreen.modalCancelTitle'
                  />
                </View>
                <Text tx='activeBidScreen.cancelModalBodyText' />
                <Button
                  disabled={loadingCancelBidOnJob}
                  preset={loadingCancelBidOnJob ? 'primaryLoading' : 'primary'}
                  tx='activeBidScreen.yesCancelJob'
                  style={MARGIN_VERTICAL_SP5}
                  onPress={() => {
                    dispatch(
                      cancelBidOnJob({
                        jobPostId: bidInfo.jobPostInfo.id,
                        removeFrom: 'active',
                        bidId: bidInfo.id,
                      }),
                    )
                  }}
                />
              </Modal>
              <JobPostCard
                isReadMoreForDescription
                title={bidInfo.jobPostInfo.title}
                fixPrice={bidInfo.requestedAmount}
                helperId2SendMsg={bidInfo.jobPostInfo.createdBy.id}
                description={bidInfo.jobPostInfo.description}
                withoutDots
                stars={bidInfo.jobPostInfo.createdBy.avgRating}
                reviewsNumber={bidInfo.jobPostInfo.createdBy.feedbackCount}
                firstName={bidInfo.jobPostInfo.createdBy.firstName}
                lastName={bidInfo.jobPostInfo.createdBy.lastName}
                isHourly={!bidInfo.jobPostInfo.fixPrice}
                sendAction={() => createChat()}
                customFooter={
                  <Timer
                    {...{ bidInfo }}
                    sendTrackerActivityToParent={(activity: boolean) => {
                      if (activity !== isTrackerActive) {
                        setIsTrackerActive(activity)
                      }
                    }}
                  />
                }
                isCompleted={bidInfo.jobPostInfo.completed}
              />
              <DetailsWithIcon
                style={PADDING_TOP_SP7}
                title={translate('activeBidScreen.jobDetails')}
                items={getJobDetailItemsArray()}
              />
              {bidInfo.jobPostInfo.attachments && (
                <Photos
                  showDefaultTitle
                  photos={bidInfo.jobPostInfo.attachments.map(
                    (attachment): ImageURISource => ({
                      uri: attachment.sourceUrl,
                    }),
                  )}
                />
              )}
              {!bidInfo.isCompleted && !isTrackerActive && (
                <Button
                  style={MARGIN_VERTICAL_SP6}
                  tx='activeBidScreen.cancelJob'
                  preset='secondary'
                  onPress={() => setIsModal(true)}
                />
              )}
              <View style={BG_WRAPPER}>
                <Image style={FULL_WIDTH as ImageStyle} source={bg} />
                <Image
                  style={[
                    FULL_WIDTH as ImageStyle,
                    POSITION_ABSOLUTE as ImageStyle,
                  ]}
                  source={bg2}
                />
                <View
                  style={[
                    POSITION_ABSOLUTE,
                    FULL_WIDTH,
                    JUSTIFY_CONTENT_CENTER,
                    FOOTER,
                  ]}
                >
                  <Text
                    tx='activeBidScreen.dontForget'
                    style={WARNING_TITLE}
                    color={color.palette.white}
                  />
                  <View style={ROW}>
                    <View
                      style={[
                        FLEX_1,
                        ROW,
                        ALIGIN_ITEMS_CENTER,
                        ADDITIONAL_RIGHT_PADDING,
                      ]}
                    >
                      <View style={WHITE_CIRCLE}>
                        <Text text='1' preset='header2plusBold' />
                      </View>
                      <Text
                        tx='activeBidScreen.wearMask'
                        preset='header4'
                        style={[
                          PADDING_HORIZONTAL_SP2,
                          TEXT_ALIGIN_LEFT,
                          PADDING_RIGHT_SP5,
                        ]}
                        color={color.palette.white}
                      />
                    </View>
                    <View style={[FLEX_1, ROW, ALIGIN_ITEMS_CENTER]}>
                      <View style={WHITE_CIRCLE}>
                        <Text text='2' preset='header2plusBold' />
                      </View>
                      <Text
                        tx='activeBidScreen.practiceDistance'
                        preset='header4'
                        style={[PADDING_HORIZONTAL_SP2, TEXT_ALIGIN_LEFT]}
                        color={color.palette.white}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </BaseScreen>
  )
}

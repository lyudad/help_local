/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  View,
  ViewStyle,
  TouchableOpacity,
  ImageStyle,
  TextStyle,
} from 'react-native'
import { UserStackRouteProps } from 'navigation'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import {
  Screen,
  JobDetails,
  JobMiniCard,
  ViewWithShadow,
  SVGIcon,
  Text,
  Header,
  CircleImage,
  Loader,
  ShowJobDateAndAddressWithIcons,
  BottomNavigation,
  JobCompletedCard,
  PADDING_TOP_POSITIVE,
} from 'components'
import { color, spacing } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { EJobStatus, IJobInfo, ITrackerInfo } from 'interfaces'
import { consumer } from 'app/store/selectors/consumer'
import {
  ALIGIN_ITEMS_CENTER,
  FLEX_1,
  FULL,
  JUSTIFY_CONTENT_CENTER,
  MARGIN_VERTICAL_SP5,
  PADDING_HORIZONTAL_SP3,
  PADDING_SP4,
  ROW,
  UNDERLINE,
  WRAPPER,
} from 'constants/common-styles'
import { completeJob, getJobInfo } from '../thunk'
import { common, user } from 'app/store/selectors'
import { postJob, viewBids } from 'constants/routes'
import { ShowActiveJobInfo, ShowModal } from './sub-components'
import { setError as setCommonError } from 'app/store/commonSlice'
import { setError } from 'screens/client/reducers'
import { getJobCheckoutPreview, getTrackerInfo } from 'screens/both/thunk'
import { setJobCheckoutPreview } from 'screens/both/reducers'

const defaultAvatar = require('assets/default-avatar.png')

const JOB_MINI_CARD: ViewStyle = {
  marginTop: spacing[6],
  marginBottom: spacing[2],
}

const PLUS_TEXT: TextStyle = { right: 30 }

export type IShowModal = 'cancel' | 'remove' | null

export const JobDetailScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute<UserStackRouteProps<'jobDetail'>>()

  const jobID = route.params.id
  const jobInfo: IJobInfo | null = useSelector(consumer.jobInfo)
  const loading: boolean = useSelector(common.loading)
  const error = useSelector(consumer.error)
  const trackerInfo: ITrackerInfo[] = useSelector(user.trackerInfo)
  const loadingTrackerInfo: boolean = useSelector(user.loadingTrackerInfo)
  const loadingCompleteJob: boolean = useSelector(consumer.loadingCompleteJob)
  const [jobStatus, setJobStatus] = useState<EJobStatus | null>(null)
  const [isModal, setIsModal] = useState<boolean>(false)
  const isScreenFocused: boolean = useIsFocused()

  useEffect(() => {
    if (isScreenFocused) {
      //if (!jobInfo || (jobInfo && jobInfo.id !== jobID)) {
      dispatch(getJobInfo({ id: jobID }))
      //}
    } else {
      dispatch(setJobCheckoutPreview(null))
    }
  }, [isScreenFocused])
  useEffect(() => {
    if (!loading && !jobInfo) {
      dispatch(getJobInfo({ id: jobID }))
    }
    if (jobInfo) {
      setJobStatus(
        jobInfo.hiredBidInfo ? EJobStatus.active : EJobStatus.pending,
      )
      dispatch(getTrackerInfo({ jobPostId: jobInfo.id }))
      if (jobInfo.hiredBidInfo?.isCompleted && !jobInfo.completed) {
        dispatch(getJobCheckoutPreview({ jobPostId: jobInfo.id }))
      }
    } else {
      setJobStatus(null)
    }
  }, [jobInfo])

  useEffect(() => {
    if (error && navigation.isFocused) {
      dispatch(setCommonError(error))
      dispatch(setError(''))
    }
  }, [error])

  const onPayHelperModalBtnPress = () => {
    dispatch(completeJob({ jobPostId: jobInfo.id }))
  }

  let percent: number = 5
  if (jobInfo && jobInfo.bidPreviews) {
    if (jobInfo.bidPreviews.bidCount === 2) percent = 20
    else if (jobInfo.bidPreviews.bidCount === 1) percent = 35
    else if (jobInfo.bidPreviews.bidCount > 3) percent = 0
  }

  const THREE_AVATAR_WRAPPER: ViewStyle = {
    right: `${percent}%`,
  }

  return (
    <View style={FULL}>
      <Header
        clientBtn
        textBack='jobDetailScreen.headerTextBack'
        headerAnimate={headerStyle}
      />
      <Screen
        preset='scroll'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <View style={[WRAPPER, PADDING_TOP_POSITIVE]}>
          {!loading && jobStatus && jobInfo && jobInfo.id === jobID ? (
            <>
              {!jobInfo.completed ? (
                <>
                  <JobMiniCard
                    jobId={jobInfo.id}
                    style={JOB_MINI_CARD}
                    title={jobInfo.title}
                    status={jobStatus}
                    date={jobInfo.createdAt}
                  />
                  {jobStatus === EJobStatus.pending &&
                    jobInfo.startAt <= new Date() && (
                      <TouchableOpacity
                        style={{
                          ...ROW,
                          ...JUSTIFY_CONTENT_CENTER,
                          ...ALIGIN_ITEMS_CENTER,
                        }}
                        onPress={() => {
                          navigation.navigate(postJob, { isEditJobMode: true })
                        }}
                      >
                        <SVGIcon
                          style={{ ...PADDING_HORIZONTAL_SP3 } as ImageStyle}
                          icon='pen'
                          color={color.primary}
                        />
                        <Text
                          tx='jobDetailScreen.editJobPost'
                          preset='subtitleBolderLink'
                          color={color.primary}
                        />
                      </TouchableOpacity>
                    )}
                  <View style={MARGIN_VERTICAL_SP5}>
                    {jobInfo.hiredBidInfo ? (
                      <>
                        <ShowModal
                          isModal={isModal}
                          toggleModal={() => setIsModal(!isModal)}
                          onApprove={onPayHelperModalBtnPress}
                          {...{
                            loadingTrackerInfo,
                            trackerInfo,
                            jobInfo,
                            loadingCompleteJob,
                          }}
                        />
                        <ShowActiveJobInfo
                          {...{ jobInfo, trackerInfo, loadingTrackerInfo }}
                          toggleModal={() => setIsModal(!isModal)}
                          helperProfileeId={
                            jobInfo.hiredBidInfo.createdByInfo.profileId
                          }
                        />
                        <ShowJobDateAndAddressWithIcons {...{ jobInfo }} />
                      </>
                    ) : (
                      <ViewWithShadow
                        style={{
                          ...ROW,
                          ...PADDING_SP4,
                          ...JUSTIFY_CONTENT_CENTER,
                        }}
                      >
                        {jobInfo.bidPreviews?.bidCount ? (
                          <>
                            <View
                              style={{
                                ...FLEX_1,
                                ...ROW,
                                ...ALIGIN_ITEMS_CENTER,
                                ...JUSTIFY_CONTENT_CENTER,
                              }}
                            >
                              <View style={[ROW, THREE_AVATAR_WRAPPER]}>
                                {jobInfo.bidPreviews.bidCount > 0 && (
                                  <CircleImage
                                    size={50}
                                    source={
                                      jobInfo.bidPreviews.avatarPreviews?.length
                                        ? {
                                            uri: jobInfo.bidPreviews
                                              .avatarPreviews[0].sourceUrl,
                                          }
                                        : defaultAvatar
                                    }
                                  />
                                )}
                                {jobInfo.bidPreviews.bidCount > 1 && (
                                  <CircleImage
                                    preset='overlapPrevious1'
                                    size={50}
                                    source={
                                      jobInfo.bidPreviews.avatarPreviews
                                        ?.length > 1
                                        ? {
                                            uri: jobInfo.bidPreviews
                                              .avatarPreviews[1].sourceUrl,
                                          }
                                        : defaultAvatar
                                    }
                                  />
                                )}
                                {jobInfo.bidPreviews.bidCount > 2 && (
                                  <CircleImage
                                    preset='overlapPrevious2'
                                    size={50}
                                    source={
                                      jobInfo.bidPreviews.avatarPreviews
                                        ?.length > 2
                                        ? {
                                            uri: jobInfo.bidPreviews
                                              .avatarPreviews[2].sourceUrl,
                                          }
                                        : defaultAvatar
                                    }
                                  />
                                )}
                              </View>
                              {jobInfo.bidPreviews.bidCount > 3 && (
                                <Text
                                  style={PLUS_TEXT}
                                  text='+'
                                  preset='header2'
                                />
                              )}
                            </View>
                            <TouchableOpacity
                              style={{
                                ...FLEX_1,
                                ...ROW,
                                ...ALIGIN_ITEMS_CENTER,
                                ...JUSTIFY_CONTENT_CENTER,
                              }}
                              onPress={() => {
                                navigation.navigate(viewBids)
                              }}
                            >
                              <Text style={UNDERLINE}>
                                <Text
                                  tx='jobDetailScreen.view'
                                  preset='header3'
                                  color={color.primary}
                                />
                                <Text
                                  text={jobInfo.bidPreviews.bidCount.toString()}
                                  preset='header3bold'
                                  color={color.primary}
                                />
                                <Text
                                  tx={`jobDetailScreen.${
                                    jobInfo.bidPreviews.bidCount > 1
                                      ? 'bids'
                                      : 'bid'
                                  }`}
                                  preset='header3'
                                  color={color.primary}
                                />
                              </Text>
                            </TouchableOpacity>
                          </>
                        ) : (
                          <Text
                            tx='jobDetailScreen.noBidsYet'
                            color={color.palette.grey}
                          />
                        )}
                      </ViewWithShadow>
                    )}
                  </View>
                </>
              ) : (
                <JobCompletedCard
                  isClient
                  {...{ trackerInfo, jobInfo, loadingTrackerInfo }}
                />
              )}
              <JobDetails
                category={jobInfo.category.title}
                meetingType={jobInfo.address ? 'person' : 'virtual'}
                {...(jobInfo.address &&
                  jobStatus === EJobStatus.pending && {
                    address: jobInfo.address.formatted,
                  })}
                {...(jobStatus === EJobStatus.pending && {
                  startAt: jobInfo.startAt,
                  endAt: jobInfo.endAt,
                })}
                payType={jobInfo.fixPrice ? 'fixed' : 'hourly'}
                fixedPrice={jobInfo.fixPrice}
                minPrice={jobInfo.minPrice}
                maxPrice={jobInfo.maxPrice}
                description={jobInfo.description}
              />
            </>
          ) : (
            <Loader preset='primayWithVerticalMarginSp3' />
          )}
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

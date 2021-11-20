/* eslint-disable */
import React, { useCallback } from 'react'
import { ImageURISource, View, ViewStyle } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'

import { UserStackRouteProps } from 'navigation'
import {
  Screen,
  WithHorizontalPaddings,
  JobPostCard,
  Text,
  SVGIcon,
  Header,
  BottomNavigation,
  Loader,
  ViewReviews,
  Photos,
} from 'components'
import { color, spacing } from 'theme'
import { common, helper } from 'app/store/selectors'
import {
  getJobById,
  cleanJobAndBidInfo,
  getPendingBids,
} from 'screens/helper/thunk'
import { IJob, IBid } from 'interfaces'
import { useHeaderAnimation } from 'hooks'
import { translate } from 'i18n'
import { MARGIN_BOTTOM_SP2, TEXT_ALIGIN_LEFT } from 'constants/common-styles'

const FULL: ViewStyle = {
  flex: 1,
}
const CARD_CONTAINER: ViewStyle = {
  marginTop: spacing[7],
}
const FULL_DESCRIPTION_CONTAINER: ViewStyle = {
  marginTop: spacing[7],
}
const TITLE_CONTAINER: ViewStyle = {
  marginBottom: spacing[6],
}
const DESCRIPTION_LIST: ViewStyle = {}
const DESCRIPTION_ROW: ViewStyle = {
  flexDirection: 'row',
  marginTop: spacing[2],
  alignItems: 'center',
}
const DESCRIPTION_TEXT_CONTAINER: ViewStyle = {
  flex: 1,
  marginLeft: spacing[5],
  alignItems: 'flex-start',
}
const SECTION: ViewStyle = {
  marginVertical: spacing[5],
}

export const JobListingFullScreen = (): JSX.Element => {
  const dispatch = useDispatch()

  const { headerStyle, scrollHandler } = useHeaderAnimation(80)

  const route = useRoute<UserStackRouteProps<'jobListingFull'>>()
  const jobID = route.params.id

  const loading: boolean = useSelector(common.loading)
  const isMyBidsLoading: boolean = useSelector(helper.loading)
  const job: IJob = useSelector(helper.job)
  console.log(job)
  const pendingBids: IBid[] = useSelector(helper.pendingBids)

  const getAlreadySentBidId = () => {
    const tmpBids: IBid[] = pendingBids.filter(
      (pBid) => pBid.jobPost.id === jobID,
    )
    return tmpBids.length ? tmpBids[0].id : null
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(getJobById(jobID))
      dispatch(getPendingBids({}))
      return () => dispatch(cleanJobAndBidInfo())
    }, [jobID]),
  )

  let jobFrequencyText: string = translate('jobListingFull.oneTimeJobOnly')
  if (job) {
    if (job.recurringInterval) {
      if (job.recurringInterval.months) {
        jobFrequencyText = translate('common.monthly')
      } else {
        if (job.recurringInterval.days === 1)
          jobFrequencyText = translate('common.daily')
        else jobFrequencyText = translate('common.weekly')
      }
    }
  }

  return (
    <View style={FULL}>
      <Header
        placeholder='header.helperPlaceholder'
        //textBack='jobListingFull.headerTextBack'
        headerAnimate={headerStyle}
      />
      <Screen
        preset='scroll'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <WithHorizontalPaddings>
          {!loading && !isMyBidsLoading && job ? (
            <>
              <JobPostCard
                style={CARD_CONTAINER}
                id={jobID}
                header={job.category.title}
                title={job.title}
                date={job.createdAt}
                address={job.address?.formatted}
                fixPrice={job.fixPrice}
                minPrice={job.minPrice}
                maxPrice={job.maxPrice}
                description={job.description}
                firstName={job.createdBy.firstName}
                lastName={job.createdBy.lastName}
                stars={job.createdBy.avgRating}
                reviewsNumber={job.createdBy.feedbackCount}
                isFull={true}
                isReadMoreForDescription
                alreadySentBidId={getAlreadySentBidId()}
                isCompleted={job.completed}
                //isRemoved={job.isRemoved}
              />

              <View style={FULL_DESCRIPTION_CONTAINER}>
                <Text
                  style={TITLE_CONTAINER}
                  preset='header3bold'
                  tx='jobListingFull.title'
                />

                <View style={DESCRIPTION_LIST}>
                  <View style={DESCRIPTION_ROW}>
                    <SVGIcon icon='file' size={24} color={color.primary} />
                    <View style={DESCRIPTION_TEXT_CONTAINER}>
                      <Text>
                        <Text preset='subtitleBold' text='Resume ' />
                        <Text preset='subtitle' text='or cover letter ' />
                        <Text
                          preset='subtitleBold'
                          text={
                            job.coverLetterNeeded ? 'required' : 'not required'
                          }
                        />
                      </Text>
                    </View>
                  </View>
                  <View style={DESCRIPTION_ROW}>
                    <SVGIcon icon='mapMark' size={24} color={color.primary} />
                    <View style={DESCRIPTION_TEXT_CONTAINER}>
                      <Text preset='subtitle' text='Job location' />
                      <Text
                        preset='subtitleBold'
                        style={TEXT_ALIGIN_LEFT}
                        text={
                          job.address
                            ? job.address.formatted
                            : translate('jobListingFull.thisIsVirtualJob')
                        }
                      />
                    </View>
                  </View>
                  <View style={DESCRIPTION_ROW}>
                    <SVGIcon icon='calendar' size={24} color={color.primary} />
                    <View style={DESCRIPTION_TEXT_CONTAINER}>
                      <Text preset='subtitle' text='Date' />
                      <Text
                        preset='subtitleBold'
                        text={dayjs(job.startAt).format('MMMM DD, YYYY')}
                      />
                    </View>
                  </View>
                  <View style={DESCRIPTION_ROW}>
                    <SVGIcon icon='time' size={24} color={color.primary} />
                    <View style={DESCRIPTION_TEXT_CONTAINER}>
                      <Text preset='subtitle' text='Time' />
                      <Text
                        preset='subtitleBold'
                        text={`${dayjs(job.startAt).format('h:mm A')}-${dayjs(
                          job.endAt,
                        ).format('h:mm A')}`}
                      />
                    </View>
                  </View>
                  <View style={DESCRIPTION_ROW}>
                    <SVGIcon icon='loop' size={24} color={color.primary} />
                    <View style={DESCRIPTION_TEXT_CONTAINER}>
                      <Text preset='subtitle' text='Frequency of this job' />
                      <Text preset='subtitleBold' text={jobFrequencyText} />
                    </View>
                  </View>
                  {/*
                  <View style={DESCRIPTION_ROW}>
                    <SVGIcon
                      icon='messageCircle'
                      size={24}
                      color={color.primary}
                    />
                  
                    <View style={DESCRIPTION_TEXT_CONTAINER}>
                      <Text preset='subtitle' text='Preferred Language' />
                      <Text
                        preset='subtitleBold'
                        text='American Sign Language'
                      />
                    </View>
                  </View>
                     */}
                </View>
                <Photos
                  style={{ ...SECTION, ...MARGIN_BOTTOM_SP2 }}
                  showDefaultTitle
                  photos={job.attachments?.map(
                    (attachment): ImageURISource => ({
                      uri: attachment.sourceUrl,
                    }),
                  )}
                />
                <ViewReviews clientId={job.createdBy.id} />
              </View>
            </>
          ) : (
            <Loader preset='primayWithVerticalMarginSp3' />
          )}
        </WithHorizontalPaddings>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

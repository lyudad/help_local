import React, { useCallback } from 'react'
import { View, ViewStyle } from 'react-native'

import {
  Screen,
  JobMiniCard,
  Header,
  HelperCard,
  HelperCardButtonsBlockVersion,
  Loader,
  BottomNavigation,
} from 'components'
import { color, spacing } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { IHelperInfo, IJobBidsListItem, IJobInfo } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { consumer } from 'app/store/selectors/consumer'
import { FULL, MARGIN_VERTICAL_SP3, WRAPPER } from 'constants/common-styles'
import { bidChosen, helperProfile } from 'constants/routes'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { getJobBids } from '../thunk'

const JOB_MINI_CARD: ViewStyle = {
  marginTop: spacing[6],
  marginBottom: spacing[6],
}

interface IHelperInfoWithBidIdAndProfileId extends IHelperInfo {
  bidId: number
  profileId: number
}

export const ViewBidsScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const jobInfo: IJobInfo | null = useSelector(consumer.jobInfo)
  const jobBids: IJobBidsListItem[] = useSelector(consumer.jobBids)
  let bidedHelpers: IHelperInfoWithBidIdAndProfileId[] = []
  if (jobBids.length && jobInfo) {
    bidedHelpers = jobBids.map(
      (jobBid: IJobBidsListItem): IHelperInfoWithBidIdAndProfileId => {
        return {
          id: jobBid.createdBy.profileId,
          bidId: jobBid.id,
          profileId: jobBid.createdBy.profileId,
          userInfo: {
            id: jobBid.createdBy.id,
            firstName: jobBid.createdBy.firstName,
            lastName: jobBid.createdBy.lastName,
            avgRating: jobBid.createdBy.avgRating,
            feedbackCount: jobBid.createdBy.feedbackCount,
            reliabilityScore: jobBid.createdBy.reliability,
            jobsHeld: jobBid.createdBy.jobsHeld,
            directMessaging: true,
          },
          price: jobBid.requestedAmount,
          type: 'fixed',
          description: jobBid.description,
          category: jobInfo.category,
          avatar: jobBid.createdBy.avatar,
          // address: jobInfo.address,
          address: null,
          attachments: null,

          isHelptBest: false,
        }
      },
    )
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(getJobBids({ jobId: jobInfo.id }))
    }, [jobInfo]),
  )

  const onSelectHelperPress = (bidId: number) => {
    navigation.navigate(bidChosen, {
      bidInfo: jobBids.filter(
        (jobBid: IJobBidsListItem) => jobBid.id === bidId,
      )[0],
    })
  }

  const onViewProfilePress = (profileId: number) => {
    navigation.navigate(helperProfile, {
      id: profileId,
      textBack: 'common.goBack',
    })
  }

  return (
    <>
      {jobInfo && (
        <View style={FULL}>
          <Header
            clientBtn
            textBack='viewBidsScreen.headerTextBack'
            headerAnimate={headerStyle}
          />
          <Screen
            preset='scroll'
            backgroundColor={color.transparent}
            onScroll={scrollHandler}
          >
            <View style={WRAPPER}>
              <JobMiniCard
                jobId={jobInfo.id}
                style={JOB_MINI_CARD}
                title={jobInfo.title}
                status='pending'
                date={jobInfo.createdAt}
              />
              {bidedHelpers.length ? (
                bidedHelpers.map((helper: IHelperInfoWithBidIdAndProfileId) => (
                  <View style={MARGIN_VERTICAL_SP3}>
                    <HelperCard
                      jobIdForMsg={jobInfo.id}
                      onAvatarPress={() => onViewProfilePress(helper.profileId)}
                      onHelperPress={() => onViewProfilePress(helper.profileId)}
                      withoutMenu
                      withSendMsgBtn={helper.userInfo.directMessaging}
                      withoutHr={jobInfo.fixPrice > 0}
                      onFirstBtnPress={() => onSelectHelperPress(helper.bidId)}
                      onSecondBtnPress={() =>
                        onViewProfilePress(helper.profileId)
                      }
                      {...{ helper, withBid: true }}
                      buttonsBlockVersion={
                        HelperCardButtonsBlockVersion.SelectHelperAndView
                      }
                    />
                  </View>
                ))
              ) : (
                <Loader preset='primayWithVerticalMarginSp3' />
              )}
            </View>
          </Screen>
          <BottomNavigation />
        </View>
      )}
    </>
  )
}

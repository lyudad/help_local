import React, { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'

import {
  BaseScreen,
  SVGIcon,
  Text,
  HelperHeaderCard,
  ViewWithShadow,
  Button,
  ShowJobDateAndAddressWithIcons,
  // SwipeButton,
} from 'components'
import { color } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { IJobInfo } from 'interfaces'
import { useDispatch, useSelector } from 'react-redux'
import { consumer, common } from 'app/store/selectors'
import {
  ALIGIN_ITEMS_CENTER,
  MARGIN_HORIZONTAL_SP3,
  MARGIN_VERTICAL_SP1,
  PADDING_BOTTOM_SP6,
  PADDING_TOP_SP5,
  PADDING_VERTICAL_SP2,
  PADDING_VERTICAL_SP6,
  PADDING_VERTICAL_SP7,
  // ROW,
} from 'constants/common-styles'
import { useNavigation, useRoute } from '@react-navigation/native'
import { UserStackRouteProps } from 'navigation'
import { helperProfile, jobDetail } from 'constants/routes'
import { markBidAsHired } from '../thunk'

const VIEW_WITH_SHADOW: ViewStyle = {
  padding: '5%',
}

export const BidChosenScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const route = useRoute<UserStackRouteProps<'bidChosen'>>()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const loading: boolean = useSelector(common.loading)
  const jobInfo: IJobInfo | null = useSelector(consumer.jobInfo)
  const { bidInfo } = route.params
  const [jobId, setJobId] = useState<number>(jobInfo ? jobInfo.id : 0)

  const onSend = (): void => {
    dispatch(
      markBidAsHired({
        jobPostId: jobInfo.id,
        bidId: bidInfo.id,
      }),
    )
  }

  useEffect(() => {
    if (!jobInfo) {
      navigation.navigate(jobDetail, { id: jobId })
    } else {
      setJobId(jobInfo ? jobInfo.id : 0)
    }
  }, [jobInfo])

  const goToHelperProfileScreen = () => {
    navigation.navigate(helperProfile, {
      id: bidInfo.createdBy.profileId,
      textBack: 'common.goBack',
    })
  }

  const SwipeButton2 = (): JSX.Element => {
    const LEFT_SWIPE: ViewStyle = {
      backgroundColor: color.primary,
      width: '40%',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
    }

    const BTN: ViewStyle = {
      backgroundColor: color.secondary,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 4,
      height: 52,
      flexDirection: 'row',
    }

    const leftSwipe = (): JSX.Element => {
      return (
        <View style={LEFT_SWIPE}>
          <SVGIcon icon='like' color={color.palette.white} />
        </View>
      )
    }

    return (
      <>
        <Swipeable
          enabled={!loading}
          overshootLeft={false}
          renderLeftActions={leftSwipe}
          onSwipeableLeftOpen={() => {
            onSend()
          }}
          leftThreshold={130}
        >
          <View style={BTN}>
            <Text
              preset='subtitleBold'
              text='SLIDE TO HIRE'
              color={color.palette.white}
              style={MARGIN_HORIZONTAL_SP3}
            />
            <SVGIcon icon='arrowRight' color={color.palette.white} size={14} />
          </View>
        </Swipeable>
      </>
    )
  }

  return (
    <>
      {jobId && jobInfo && (
        <BaseScreen
          withHeader
          clientBtn
          textBack='bidChosenScreen.headerTextBack'
          headerAnimate={headerStyle}
          onScroll={scrollHandler}
          horizontalPaddingViewStyle={PADDING_VERTICAL_SP7}
        >
          <View style={ALIGIN_ITEMS_CENTER}>
            <SVGIcon icon='checkInCircle' size={45} color={color.primary} />
          </View>
          <View style={[PADDING_BOTTOM_SP6, PADDING_TOP_SP5]}>
            <Text tx='bidChosenScreen.title' preset='header1' />
          </View>
          <ViewWithShadow style={VIEW_WITH_SHADOW}>
            <HelperHeaderCard
              id={bidInfo.createdBy.id}
              avatar={bidInfo.createdBy.avatar}
              firstName={bidInfo.createdBy.firstName}
              lastName={bidInfo.createdBy.lastName}
              stars={bidInfo.createdBy.avgRating}
              reviews={bidInfo.createdBy.feedbackCount}
              rate={
                bidInfo.requestedAmount
                  ? bidInfo.requestedAmount
                  : jobInfo.fixPrice
              }
              withSendMsgBtn
              jobIdForMsg={jobInfo.id}
              withBid
              withoutHr={jobInfo.fixPrice > 0}
              onHelperPress={() => goToHelperProfileScreen()}
            />
            <Button
              style={[PADDING_VERTICAL_SP2, MARGIN_VERTICAL_SP1]}
              tx='bidChosenScreen.viewProfile'
              preset='fifth'
              onPress={() => goToHelperProfileScreen()}
            />
          </ViewWithShadow>

          <ShowJobDateAndAddressWithIcons
            style={PADDING_VERTICAL_SP6}
            {...{ jobInfo }}
          />
          {/* <SwipeButton onAction={onSend} disabled={loading} /> */}
          <SwipeButton2 />
        </BaseScreen>
      )}
    </>
  )
}

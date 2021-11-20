import React, { memo, useCallback } from 'react'
import { TextStyle, View } from 'react-native'

import {
  Button,
  HelperHeaderCard,
  Hr,
  JobTotalPriceInfo,
  SVGIcon,
  Text,
  ViewWithShadow,
} from 'components'
import { color } from 'theme'
import {
  ALIGIN_ITEMS_CENTER,
  MARGIN_TOP_SP2,
  MARGIN_TOP_SP6,
  MARGIN_VERTICAL_SP6,
  PADDING_BOTTOM_SP3,
  PADDING_BOTTOM_SP5,
  PADDING_HORIZONTAL_SP4,
  PADDING_TOP_SP4,
  PADDING_VERTICAL_SP2,
  PADDING_VERTICAL_SP4,
  PADDING_VERTICAL_SP5,
} from 'constants/common-styles'
import { useNavigation } from '@react-navigation/core'
import {
  account,
  helperProfile,
  messagesList,
  postReview,
} from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { user } from 'app/store/selectors'
import { ICheckoutPreview } from 'interfaces'
import { translate } from 'i18n'
import { createChatRoom } from 'screens/both/messaging/thunk'
import dayjs from 'dayjs'
import { InlineTouchableText } from '../inline-touchable-text'
import { NameRatingFeedbackCountCard } from '../name-rating-feedback-count-card'
import { IJobCompletedCardProps } from './job-completed-card.props'

const SUB_TEXT: TextStyle = {
  fontSize: 18,
  fontWeight: '700',
}

const BTN_TEXT: TextStyle = {
  fontWeight: '700',
}

const PAYMENTS_LINK: TextStyle = {
  fontWeight: '700',
  fontSize: 13,
  textDecorationLine: 'underline',
}

export const JobCompletedCard = memo(
  (props: IJobCompletedCardProps): JSX.Element => {
    const {
      style,
      isClient,
      jobInfo,
      bidInfo,
      trackerInfo,
      loadingTrackerInfo,
    } = props

    const navigation = useNavigation()
    const dispatch = useDispatch()

    let isHourly = false
    let title = ''
    let completedAt: Date = new Date()
    if (isClient) {
      isHourly = !jobInfo.fixPrice
      title = jobInfo.title
      completedAt = new Date(jobInfo.hiredBidInfo.completedAt)
    } else {
      isHourly = !bidInfo.jobPostInfo.fixPrice
      title = bidInfo.jobPostInfo.title
      completedAt = new Date(bidInfo.completedAt)
    }

    const checkoutPreview: ICheckoutPreview = useSelector(user.checkoutPreview)

    const goToHelperProfileScreen = () => {
      navigation.navigate(helperProfile, {
        id: jobInfo.hiredBidInfo.createdByInfo.profileId,
        textBack: 'common.goBack',
      })
    }

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
      <View style={[PADDING_VERTICAL_SP4, style]}>
        <View style={ALIGIN_ITEMS_CENTER}>
          <SVGIcon icon='checkInCircle' size={45} color={color.primary} />
        </View>
        <View style={[PADDING_BOTTOM_SP3, PADDING_TOP_SP4]}>
          <Text tx='jobDetailScreen.JobComplete' preset='header1' />
        </View>
        <Text tx='jobDetailScreen.paymentBeingProcessed' style={SUB_TEXT} />
        <ViewWithShadow
          style={{
            ...MARGIN_VERTICAL_SP6,
            ...PADDING_VERTICAL_SP5,
            ...PADDING_HORIZONTAL_SP4,
          }}
        >
          {isClient ? (
            <HelperHeaderCard
              id={jobInfo.createdBy.id}
              avatar={jobInfo.hiredBidInfo.createdByInfo.avatar}
              firstName={jobInfo.hiredBidInfo.createdByInfo.firstName}
              lastName={jobInfo.hiredBidInfo.createdByInfo.lastName}
              rate={jobInfo.hiredBidInfo.requestedAmount}
              stars={jobInfo.hiredBidInfo.createdByInfo.avgRating}
              reviews={jobInfo.hiredBidInfo.createdByInfo.feedbackCount}
              {...(jobInfo.fixPrice && { withoutHr: true })}
              onHelperPress={() => goToHelperProfileScreen()}
              onAvatarPress={() => goToHelperProfileScreen()}
              withSendMsgBtn
              sendAction={createChat}
            />
          ) : (
            <NameRatingFeedbackCountCard
              firstName={bidInfo.jobPostInfo.createdBy.firstName}
              lastName={bidInfo.jobPostInfo.createdBy.lastName}
              avgRating={bidInfo.jobPostInfo.createdBy.avgRating}
              feedbackCount={bidInfo.jobPostInfo.createdBy.feedbackCount}
            />
          )}
          {((!isClient && bidInfo && !bidInfo.jobPostInfo.feedbackSent) ||
            isClient) && (
            <Button
              onPress={() =>
                navigation.navigate(postReview, {
                  ...(isClient ? { jobInfo } : { bidInfo }),
                })
              }
              tx={`jobDetailScreen.${
                isClient ? 'giveHelperReview' : 'giveEmployerReview'
              }`}
              preset={isClient ? 'fifth' : 'sixth'}
              textStyle={BTN_TEXT}
              style={[PADDING_VERTICAL_SP2, MARGIN_TOP_SP2]}
            />
          )}
        </ViewWithShadow>
        {checkoutPreview && isClient && (
          <>
            <Text tx='jobComplete.jobReceipt' style={SUB_TEXT} />
            <View style={[PADDING_TOP_SP4, PADDING_BOTTOM_SP5]}>
              <Text>
                <Text tx='jobComplete.desc1' preset='subtitle' />
                <InlineTouchableText
                  onTextPress={() => {
                    navigation.navigate(account, { itemIndex: 3 })
                  }}
                  text={translate('jobComplete.payments')}
                  textStyle={PAYMENTS_LINK}
                />
                <Text tx='jobComplete.desc2' preset='subtitle' />
              </Text>
            </View>
            <JobTotalPriceInfo
              {...{
                trackerInfo,
                loadingTrackerInfo,
                isHourly,
                title,
                completedAt,
              }}
              isTotalGreen
              calculatedRate={checkoutPreview.rate}
              calculatedHoursLogged={checkoutPreview.hoursToCharge}
              calculatedTotal={checkoutPreview.total}
              calculatedTaxIncluded={checkoutPreview.tax}
              calculatedFee={checkoutPreview.serviceFee}
              hourRate={jobInfo.hiredBidInfo.requestedAmount}
            />
          </>
        )}
        {!isClient && (
          <View>
            <Text
              text={bidInfo.jobPostInfo.title}
              preset='header4bold'
              style={PADDING_VERTICAL_SP2}
            />
            <Text>
              <Text tx='jobTotalPriceInfo.completedOn' />
              <Text text=' ' />
              <Text
                text={dayjs(bidInfo.jobPostInfo.deletedAt).format('MM/DD/YY')}
                preset='header4'
              />
            </Text>
          </View>
        )}
        {isClient && (
          <Hr
            style={{ ...MARGIN_TOP_SP6, ...(!isClient && PADDING_BOTTOM_SP3) }}
          />
        )}
      </View>
    )
  },
)

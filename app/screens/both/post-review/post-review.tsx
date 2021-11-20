/* eslint-disable */
import React, { memo, useCallback, useState } from 'react'
import {
  View,
  ViewStyle,
  Image,
  TextStyle,
  TouchableOpacity,
  ImageStyle,
  BackHandler,
  NativeEventSubscription,
} from 'react-native'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'

import {
  Text,
  SVGIcon,
  BaseScreen,
  HelperHeaderCard,
  NameRatingFeedbackCountCard,
  ViewWithShadow,
  Input,
  Button,
} from 'components'
import { color, spacing } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { UserStackRouteProps } from 'navigation'
import {
  MARGIN_VERTICAL_SP6,
  PADDING_BOTTOM_SP3,
  PADDING_BOTTOM_SP6,
  PADDING_BOTTOM_SP7,
  PADDING_HORIZONTAL_SP4,
  PADDING_VERTICAL_SP5,
  ROW_SPACE_BETWEEN,
} from 'constants/common-styles'
import { useDispatch, useSelector } from 'react-redux'
import { setWarning } from 'app/store/commonSlice'
import { translate } from 'i18n'
import { createFeedback } from '../thunk'
import { user } from 'app/store/selectors'
import { setJobCheckoutPreview, setLastCreatedFeedbackId } from '../reducers'
import {
  clientDashboard,
  helperDashboard,
  helperProfile,
  messagesList,
} from 'constants/routes'
import { useEffect } from 'react'
import { createChatRoom } from '../messaging/thunk'
import { setBidInfo } from 'screens/helper/reducers'

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[5],
}

export const PostReviewScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const route = useRoute<UserStackRouteProps<'postReview'>>()
  const { jobInfo, bidInfo } = route.params
  const isClient: boolean = !bidInfo
  const [score, setScore] = useState<number>(0)
  const [backHandlerLink, setBackHandlerLink] =
    useState<NativeEventSubscription>(null)
  const [description, setDescription] = useState<string>('')
  const toRenderStarts: number[] = [1, 2, 3, 4, 5]
  const dispatch = useDispatch()
  const lastCreatedFeedbackId: number = useSelector(user.lastCreatedFeedbackId)
  const loadingCreateFeedback: boolean = useSelector(user.loadingCreateFeedback)

  const goToHelperProfileScreen = () => {
    navigation.navigate(helperProfile, {
      id: jobInfo.hiredBidInfo.createdByInfo.profileId,
      textBack: 'common.goBack',
    })
  }

  const onSend = () => {
    if (score) {
      dispatch(
        createFeedback({
          jobPostId: isClient ? jobInfo.id : bidInfo.jobPostInfo.id,
          targetId: isClient
            ? jobInfo.hiredBidInfo.createdByInfo.id
            : bidInfo.jobPostInfo.createdBy.id,
          postingFbFor: isClient ? 'helper' : 'client',
          ...{ score, description },
        }),
      )
    } else dispatch(setWarning(translate('postReview.chooseRate')))
  }

  useFocusEffect(
    useCallback(
      () => () => {
        backHandlerLink?.remove()
        dispatch(setLastCreatedFeedbackId(0))
      },
      [],
    ),
  )

  useEffect(() => {
    if (!isClient) {
      bidInfo.jobPostInfo.feedbackSent = true
      dispatch(setBidInfo(bidInfo))
    }
    if (lastCreatedFeedbackId) {
      if (!backHandlerLink)
        setBackHandlerLink(
          BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate(isClient ? clientDashboard : helperDashboard)
            return true
          }),
        )
      dispatch(setJobCheckoutPreview(null))
    }
  }, [lastCreatedFeedbackId])

  const createChat = useCallback(() => {
    dispatch(
      createChatRoom({
        interlocutorId: jobInfo.hiredBidInfo.createdByInfo.id,
        jobPostId: jobInfo.id,
      }),
    )
    navigation.navigate(messagesList, { textBack: 'common.goBack' })
  }, [dispatch, navigation, jobInfo])

  const Thanks = memo((): JSX.Element => {
    const TITLE: TextStyle = {
      fontSize: 30,
      fontWeight: '700',
      marginVertical: spacing[4],
      marginBottom: spacing[2],
      paddingTop: spacing[5],
    }
    const DESC: TextStyle = {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: spacing[7],
    }
    const ICON: ImageStyle = {
      alignSelf: 'center',
    }
    const img = require('assets/review-posted.png')

    const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
      justifyContent: 'center',
      alignItems: 'center',
    }
    const CIRCLE_IMG: ImageStyle = {
      width: '100%',
      height: 333,
    }
    return (
      <>
        <SVGIcon style={ICON} icon='borderStar' color={color.primary} />
        <View>
          <Text tx='postReview.thanks' style={TITLE} />
        </View>
        <Text tx='postReview.thanksDesc' style={DESC} />
        <View style={CIRCLE_IMAGE_CONTAINER}>
          <Image source={img} style={CIRCLE_IMG} />
        </View>
      </>
    )
  })

  return (
    <BaseScreen
      withHeader
      {...{
        ...(isClient && { clientBtn: true }),
        ...(!setLastCreatedFeedbackId && {
          textBack:
            (isClient ? 'jobDetail' : 'activeBid') + 'Screen.headerTextBack',
        }),
      }}
      headerAnimate={headerStyle}
      onScroll={scrollHandler}
      horizontalPaddingViewStyle={BASE_VIEW}
    >
      {lastCreatedFeedbackId ? (
        <Thanks />
      ) : (
        <>
          <ViewWithShadow
            style={{
              ...MARGIN_VERTICAL_SP6,
              ...PADDING_VERTICAL_SP5,
              ...PADDING_HORIZONTAL_SP4,
            }}
          >
            {isClient ? (
              <HelperHeaderCard
                // avatar={jobInfo.hiredBidInfo.createdByInfo.avatar}
                withSendMsgBtn
                id={jobInfo.createdBy.id}
                avatar={jobInfo.hiredBidInfo.createdByInfo.avatar}
                firstName={jobInfo.hiredBidInfo.createdByInfo.firstName}
                lastName={jobInfo.hiredBidInfo.createdByInfo.lastName}
                rate={jobInfo.hiredBidInfo.requestedAmount}
                stars={jobInfo.hiredBidInfo.createdByInfo.avgRating}
                reviews={jobInfo.hiredBidInfo.createdByInfo.feedbackCount}
                {...(jobInfo.fixPrice && { withoutHr: true })}
                onHelperPress={() => goToHelperProfileScreen()}
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
          </ViewWithShadow>
          <View>
            <Text
              style={PADDING_BOTTOM_SP3}
              tx={`postReview.questionFor${isClient ? 'Client' : 'Helper'}`}
            />
            <View style={[ROW_SPACE_BETWEEN, PADDING_BOTTOM_SP6]}>
              {toRenderStarts.map((number) => (
                <TouchableOpacity onPress={() => setScore(number)}>
                  <SVGIcon
                    icon='softStar'
                    color={
                      score >= number
                        ? color.palette.gold
                        : color.palette.greyStrong
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <View style={PADDING_BOTTOM_SP7}>
            <Text style={PADDING_BOTTOM_SP3} tx={`postReview.descLabel`} />
            <Input
              textAlignVertical='top'
              multiline
              numberOfLines={6}
              value={description}
              onChangeText={(newText: string) => {
                setDescription(newText)
              }}
              placeholder='postReview.descPlaceholder'
            />
          </View>
          <Button
            disabled={loadingCreateFeedback}
            tx='postReview.submit'
            onPress={() => onSend()}
            preset={loadingCreateFeedback ? 'primaryLoading' : 'primary'}
          />
        </>
      )}
    </BaseScreen>
  )
}

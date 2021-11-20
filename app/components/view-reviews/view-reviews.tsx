/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Text, Comment, Loader, SVGIcon } from 'components'
import { color, spacing } from 'theme'
import { IFeedback } from 'interfaces'
import { getFeedbacks } from 'screens/both/thunk'
import { user } from 'app/store/selectors'
import {
  ALIGIN_ITEMS_CENTER,
  JUSTIFY_CONTENT_CENTER,
  JUSTIFY_CONTENT_START,
  MARGIN_BOTTOM_SP3,
  MARGIN_HORIZONTAL_SP2,
  ROW,
} from 'constants/common-styles'

const SECTION: ViewStyle = {
  marginTop: spacing[7],
}

const TITLE_CONTAINER: ViewStyle = {
  marginBottom: spacing[5],
}

const FEEDBACK_LIMIT = 4

export const ViewReviews = ({
  helperProfileId,
  clientId,
}: IViewReviewsProps): JSX.Element => {
  const dispatch = useDispatch()
  const [FBpage, setFBPage] = useState<number>(1)
  const isGetFeedbacksLoading: boolean = useSelector(user.isGetFeedbacksLoading)
  const feedbacks: { totalCount: number; rows: IFeedback[] } = useSelector(
    user.feedbacks,
  )

  useEffect(() => {
    dispatch(
      getFeedbacks({
        ...(helperProfileId
          ? { userJobId: helperProfileId }
          : { targetId: clientId }),
        limit: FEEDBACK_LIMIT,
        offset: (FBpage - 1) * FEEDBACK_LIMIT,
      }),
    )
  }, [FBpage])

  const renderComments = (): JSX.Element[] => {
    return feedbacks.rows.map(
      (comment: IFeedback): JSX.Element => (
        <Comment
          key={comment.id}
          stars={Math.round(comment.score)}
          firstName={comment.createdBy.firstName}
          lastName={comment.createdBy.lastName}
          date={new Date(comment.createdAt)}
          text={comment.description}
        />
      ),
    )
  }

  const RenderPagination = (): JSX.Element => {
    const CONTAINER: ViewStyle = {
      marginBottom: spacing[5],
    }
    let pages: number = 1
    if (feedbacks.totalCount >= FEEDBACK_LIMIT) {
      const rest: number = feedbacks.totalCount % FEEDBACK_LIMIT
      if (rest) {
        pages = (feedbacks.totalCount - rest) / FEEDBACK_LIMIT + 1
      } else {
        pages = feedbacks.totalCount / FEEDBACK_LIMIT
      }
    }
    let pagesGroupNumbers: number[] = []
    if (FBpage <= 5) {
      pagesGroupNumbers = [1, 2, 3, 4, 5]
    } else {
      if (FBpage % 5) {
        pagesGroupNumbers = [
          FBpage - 4,
          FBpage - 3,
          FBpage - 2,
          FBpage - 1,
          FBpage,
        ]
      } else {
        for (let i: number = 1; i <= 4; i++) {
          if ((FBpage + i) % 5 === 0) {
            const groupLastItem: number = FBpage + i
            pagesGroupNumbers = [
              groupLastItem - 4,
              groupLastItem - 3,
              groupLastItem - 2,
              groupLastItem - 1,
              groupLastItem,
            ]
            break
          }
        }
      }
    }

    return (
      <View
        style={[ROW, JUSTIFY_CONTENT_CENTER, CONTAINER, ALIGIN_ITEMS_CENTER]}
      >
        <TouchableOpacity
          onPress={() => setFBPage(FBpage - 1)}
          style={MARGIN_HORIZONTAL_SP2}
          disabled={FBpage === 1}
        >
          <SVGIcon
            icon='chevronLeft'
            width={8}
            height={14}
            color={FBpage === 1 ? color.palette.grey : color.secondary}
          />
        </TouchableOpacity>
        {pagesGroupNumbers.map(
          (number) =>
            pages >= number && (
              <TouchableOpacity
                style={MARGIN_HORIZONTAL_SP2}
                onPress={() => setFBPage(number)}
                disabled={number === FBpage}
              >
                <Text
                  //text={FBpage.toString()}
                  text={number.toString()}
                  preset='bold'
                  color={FBpage === number ? color.primary : color.palette.grey}
                />
              </TouchableOpacity>
            ),
        )}
        <TouchableOpacity
          onPress={() => setFBPage(FBpage + 1)}
          style={MARGIN_HORIZONTAL_SP2}
          disabled={FBpage === pages}
        >
          <SVGIcon
            icon='chevronRight'
            width={8}
            height={14}
            color={FBpage === pages ? color.palette.grey : color.secondary}
          />
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={SECTION}>
      <Text
        style={TITLE_CONTAINER}
        preset='header3bold'
        tx={
          helperProfileId
            ? 'helperProfile.reviews'
            : 'jobListingFull.reviewTitle'
        }
      />
      {isGetFeedbacksLoading ? (
        <Loader preset='primayWithVerticalMarginSp3' />
      ) : (
        renderComments()
      )}
      {!isGetFeedbacksLoading &&
        feedbacks.rows.length > 0 &&
        RenderPagination()}
      {!isGetFeedbacksLoading && feedbacks.rows.length === 0 && (
        <View style={[ROW, JUSTIFY_CONTENT_START, MARGIN_BOTTOM_SP3]}>
          <Text
            tx='helperProfile.noReviews'
            preset='subtitle'
            color={color.palette.greySlow}
          />
        </View>
      )}
    </View>
  )
}

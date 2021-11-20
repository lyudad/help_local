import React, { memo } from 'react'
import { TextStyle, View } from 'react-native'

import { SVGIcon, Text } from 'components'
import { color } from 'theme'
import {
  ALIGIN_ITEMS_CENTER,
  PADDING_BOTTOM_SP2,
} from 'constants/common-styles'
import { INameRatingFeedbackCountCardProps } from './name-rating-feedback-count-card.props'

const NAMES: TextStyle = {
  fontSize: 27.5,
  fontWeight: '700',
  lineHeight: 30,
}

export const NameRatingFeedbackCountCard = memo(
  (props: INameRatingFeedbackCountCardProps): JSX.Element => {
    const { style, firstName, lastName, avgRating, feedbackCount } = props

    return (
      <View style={[ALIGIN_ITEMS_CENTER, style]}>
        <View>
          <Text style={PADDING_BOTTOM_SP2}>
            <Text text={firstName} preset='header4bold' style={NAMES} />
            <Text text=' ' />
            <Text text={`${lastName.charAt(0)}.`} style={NAMES} />
          </Text>
        </View>
        <Text>
          {[1, 2, 3, 4, 5].map((star) => (
            <SVGIcon
              icon='star'
              key={star}
              color={
                star <= avgRating ? color.palette.gold : color.palette.lightGrey
              }
            />
          ))}
          <Text text=' ' />
          <Text text={feedbackCount.toString()} preset='smallest' />
          <Text text=' ' />
          <Text tx='helperHeaderCard.reviews' preset='smallest' />
        </Text>
      </View>
    )
  },
)

/* eslint-disable */
import React, { useCallback } from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import dayjs from 'dayjs'

import { color, spacing } from 'theme'
import { Text, SVGIcon } from 'components'
import { CommentProps } from './comment.props'

const CONTAINER: ViewStyle = {
  justifyContent: 'flex-start',
  marginBottom: spacing[6],
}
const ROW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
}
const TEXT_LEFT: TextStyle = {
  textAlign: 'left',
}
const TEXT: TextStyle = {
  ...TEXT_LEFT,
  marginTop: spacing[1],
}
export const Comment = ({
  stars,
  lastName,
  firstName,
  date,
  text,
}: CommentProps): JSX.Element => {
  const newStars = stars || 0

  const formatAuthorName = (): string => {
    return `${
      firstName.charAt(0).toUpperCase() + firstName.slice(1)
    } ${lastName[0].toUpperCase()}.`
  }
  const author = firstName ? formatAuthorName() : ''
  const newText = text ? text : ''
  const newDate = dayjs(date).format('MMMM, YYYY')

  const renderStars = useCallback(
    () =>
      [1, 2, 3, 4, 5].map((star) => (
        <SVGIcon
          icon='star'
          key={star}
          color={
            star <= newStars ? color.palette.gold : color.palette.lightGrey
          }
        />
      )),
    [],
  )

  return (
    <View style={CONTAINER}>
      <View style={ROW_CONTAINER}>{renderStars()}</View>
      <Text style={TEXT}>
        <Text style={TEXT_LEFT} preset='subtitle' text={`${author} / `} />
        <Text style={TEXT_LEFT} preset='subtitle' text={newDate.toString()} />
      </Text>
      <Text style={TEXT} preset='bold' text={newText} />
    </View>
  )
}

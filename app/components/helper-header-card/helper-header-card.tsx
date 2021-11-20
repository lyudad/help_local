/* eslint-disable */
import React, { useCallback } from 'react'
import { View, TouchableOpacity, Platform } from 'react-native'

import { color } from 'theme'
import { SVGIcon, Text, CircleImage } from 'components'
import { mergeAll, flatten } from 'ramda'
import { HelperHeaderCardProps } from './helper-header-card.props'
import {
  mainRowPresets,
  mainInfoViewPresets,
  nameViewPresets,
} from './helper-header-card.presets'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { createChatRoom } from 'screens/both/messaging/thunk'
import { messagesList } from 'constants/routes'

export const HelperHeaderCard = ({
  id,
  style,
  preset,
  avatar,
  firstName,
  lastName,
  withSendMsgBtn,
  jobIdForMsg,
  reviews,
  withBid,
  stars,
  rate,
  isPreviouslyUsed,
  withoutHr,
  sendAction,
  onHelperPress,
  onAvatarPress,
  nameAndReviewNotPressable,
  avatarNotPressable,
}: HelperHeaderCardProps): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const mainRowStyle = mergeAll(
    flatten([mainRowPresets[preset] || mainRowPresets.primary, style]),
  )
  const mainInfoViewStyle = mergeAll(
    flatten([mainInfoViewPresets[preset] || mainInfoViewPresets.primary]),
  )
  const naemViewStyle = mergeAll(
    flatten([nameViewPresets[preset] || nameViewPresets.primary]),
  )

  const DEFAULT_AVATAR = require('assets/default-avatar.png')

  let newAvatar = DEFAULT_AVATAR
  if (avatar) {
    newAvatar = { uri: avatar.sourceUrl }
  }

  let newRate = ''
  if (rate) {
    newRate =
      rate.toString().indexOf('.') === -1 ? `${rate}.00` : rate.toString()
  }

  const createChat = (interlocutorId: string) => {
    dispatch(
      createChatRoom({
        interlocutorId,
        ...(jobIdForMsg && { jobPostId: jobIdForMsg }),
      }),
    )
    navigation.navigate(messagesList, { textBack: 'common.goBack' })
  }

  const renderStars = useCallback(
    () =>
      [1, 2, 3, 4, 5].map((currentStar) => (
        <SVGIcon
          icon='star'
          key={currentStar}
          color={
            currentStar <= stars ? color.palette.gold : color.palette.lightGrey
          }
        />
      )),
    [],
  )

  return (
    <View style={mainRowStyle}>
      <TouchableOpacity
        disabled={avatarNotPressable}
        onPress={() => {
          if (onAvatarPress) onAvatarPress()
          else onHelperPress()
        }}
      >
        <CircleImage
          source={newAvatar}
          size={90}
          cornerItem={
            withSendMsgBtn && (
              <TouchableOpacity
                onPress={() => {
                  if (sendAction) sendAction()
                  else createChat(id)
                }}
              >
                <SVGIcon icon='sendMessage' color={color.palette.white} />
              </TouchableOpacity>
            )
          }
        />
      </TouchableOpacity>
      <View style={mainInfoViewStyle}>
        <TouchableOpacity
          style={naemViewStyle}
          onPress={onHelperPress}
          disabled={nameAndReviewNotPressable}
        >
          <Text
            text={`${firstName} ${lastName?.charAt(0)}.`}
            preset={Platform.OS === 'ios' ? 'header3' : 'header3bold'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onHelperPress}
          disabled={nameAndReviewNotPressable}
        >
          <Text>
            {renderStars()}
            <Text text=' ' />
            <Text text={reviews?.toString()} preset='smallest' />
            <Text text=' ' />
            <Text tx='helperHeaderCard.reviews' preset='smallest' />
          </Text>
        </TouchableOpacity>
        {rate && (
          <>
            <Text>
              {withBid && (
                <>
                  <Text tx='helperHeaderCard.bid' preset='header4slim' />
                  <Text text=' ' />
                </>
              )}
              {isPreviouslyUsed && (
                <Text>
                  <Text tx='helperHeaderCard.priceWas' preset='header4slim' />
                  <Text text=': ' />
                </Text>
              )}
              <Text tx='helperHeaderCard.currency' preset='header4slim' />
              <Text text={newRate} preset='header4slim' />
              {!withoutHr && (
                <>
                  <Text text='/' preset='header4slim' />
                  <Text tx='helperHeaderCard.hour' preset='header4slim' />
                </>
              )}
            </Text>
          </>
        )}
      </View>
    </View>
  )
}

import React from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  ImageStyle,
  TouchableOpacity,
} from 'react-native'

import { IBid, IConsumerOrHelper, IRoom } from 'interfaces'
import { Avatar, SVGIcon, Text } from 'components'
import { color, spacing } from 'theme'
import { useNavigation } from '@react-navigation/native'
import {
  activeBid as activeBid_route,
  helperProfile,
  jobDetail,
  jobListingFull,
} from 'constants/routes'
import { useSelector } from 'react-redux'
import { user } from 'app/store/selectors'

interface MessengerUserTitleProps {
  messenger: IRoom
  style?: ViewStyle
  avatarSize?: number
  activeBids?: IBid[]
}

const VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const AVATAR_VIEW: ViewStyle = {
  width: 50,
  height: 50,
  marginRight: spacing[3] + 2,
}

const ONLINE: ImageStyle = {
  position: 'absolute',
  right: 0,
  bottom: 0,
}

const NEW_ONLINE_SIZE: ImageStyle = {
  position: 'absolute',
  right: -4,
  bottom: -4,
}

const NAME: TextStyle = {
  lineHeight: 15,
}

const INFO: ViewStyle = {
  alignItems: 'flex-start',
}

const JOB_TITLE: TextStyle = {
  fontSize: 13,
  fontWeight: 'normal',
  color: color.palette.lighterGrey,
  textDecorationLine: 'underline',
  textAlign: 'left',
}

const GREEN_TEXT: TextStyle = {
  color: color.primary,
}

export const MessengerUserTitle = ({
  messenger,
  style,
  avatarSize,
  activeBids,
}: MessengerUserTitleProps): JSX.Element => {
  const navigation = useNavigation()
  const currentRole: IConsumerOrHelper = useSelector(user.currentRole)
  const HELPER = 'helper'

  const NEW_AVATAR_SIZE: ViewStyle = {
    width: avatarSize,
    height: avatarSize,
  }
  return (
    <View style={{ ...VIEW, ...style }}>
      <View style={[AVATAR_VIEW, avatarSize && NEW_AVATAR_SIZE]}>
        <TouchableOpacity
          onPress={() => {
            if (currentRole !== HELPER) {
              navigation.navigate(helperProfile, {
                id: messenger.interlocutor.helperProfileId,
                textBack: 'common.goBack',
              })
            }
          }}
          disabled={!messenger.interlocutor.helperProfileId}
        >
          <Avatar
            {...(messenger.interlocutor.avatar
              ? { source: { uri: messenger.interlocutor.avatar.sourceUrl } }
              : { letter: messenger.interlocutor.firstName })}
            size={avatarSize}
          />
        </TouchableOpacity>
        {messenger.interlocutor.isOnline && (
          <SVGIcon
            icon='online'
            color={color.primary}
            style={avatarSize ? NEW_ONLINE_SIZE : ONLINE}
          />
        )}
      </View>
      <View style={INFO}>
        <View>
          <Text
            text={messenger.interlocutor.firstName}
            preset='header4bold'
            style={NAME}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (currentRole === HELPER) {
              const filteredActiveBids: IBid[] = activeBids.filter(
                (activeBid) => activeBid.jobPost.id === messenger.jobPost.id,
              )
              if (filteredActiveBids.length) {
                navigation.navigate(activeBid_route, {
                  bidId: filteredActiveBids[0].id,
                })
              } else {
                navigation.navigate(jobListingFull, {
                  id: messenger.jobPost.id,
                })
              }
            } else {
              navigation.navigate(jobDetail, { id: messenger.jobPost.id })
            }
          }}
          disabled={!messenger.jobPost}
        >
          <Text
            text={messenger.jobPost?.title}
            style={[JOB_TITLE, messenger.jobPost && GREEN_TEXT]}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

MessengerUserTitle.defaultProps = {
  style: {},
  avatarSize: 50,
  activeBids: [],
}

/* import React from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ImageStyle,
} from 'react-native'
import { CircleImage, SVGIcon, Text } from 'components'
import { color, spacing } from 'theme'

const avatar = require('assets/avatar/messenger-avatar.png')

interface MessagesListItemProps {
  text: string
  user?: {
    avatar: string
    isOnline?: boolean
  }
}

const VIEW: ViewStyle = {
  marginVertical: spacing[2],
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

const TEXT_VIEW: ViewStyle = {
  width: '100%',
  borderRadius: 4,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.lighterGreyPlus,
}

const TEXT: TextStyle = {
  textAlign: 'left',
}

const GREEN_BG: ViewStyle = {
  backgroundColor: color.primaryLight,
}

export const MessagesListItem = (props: MessagesListItemProps): JSX.Element => {
  const { text, user } = props
  return (
    <View style={VIEW}>
      <View style={AVATAR_VIEW}>
        {user && (
          <TouchableOpacity>
            <CircleImage source={avatar} />
            {user.isOnline && (
              <SVGIcon icon='online' color={color.primary} style={ONLINE} />
            )}
          </TouchableOpacity>
        )}
      </View>
      <View style={{ ...TEXT_VIEW, ...(!user && GREEN_BG) }}>
        <Text text={text} style={TEXT} />
      </View>
    </View>
  )
}

MessagesListItem.defaultProps = {
  user: undefined,
}
*/

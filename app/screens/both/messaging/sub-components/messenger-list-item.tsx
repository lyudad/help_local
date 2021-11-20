import React from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import dayjs from 'dayjs'

import { IBid, IRoom } from 'interfaces'
import { RowSpaceBetween, Text, SVGIcon } from 'components'
import { color, spacing } from 'theme'
import { MARGIN_HORIZONTAL_5PERCENT } from 'constants/common-styles'
import { MessengerUserTitle } from './messenger-user-title'

interface MessengerListItemProps {
  messenger: IRoom
  archiveAction: () => void
  clickAction: () => void
  activeBids?: IBid[]
}

const VIEW: ViewStyle = {
  marginVertical: spacing[3],
  width: '100%',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'space-between',
}

const SWIPEABLE: ViewStyle = {
  width: '90%',
  height: 82,
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'center',
  justifyContent: 'space-between',
  borderRadius: 4,
  backgroundColor: color.palette.white,
}

const BORDER_BOTTOM: ViewStyle = {
  borderBottomColor: color.palette.greySlow,
  borderBottomWidth: 1,
}

const END_ITEM1: ViewStyle = {
  flex: 1,
  marginRight: '5%',
}
const END_ITEM2: ViewStyle = {
  ...END_ITEM1,
  justifyContent: 'center',
  alignItems: 'flex-end',
}

const LAST_MESSAGE_TIME: TextStyle = {
  color: color.palette.lighterGrey,
}

const IF_NOT_SEEN: TextStyle = {
  color: color.palette.gold,
  fontWeight: 'bold',
}

const ICON_WRAP: ViewStyle = {
  backgroundColor: color.primary,
  width: '20%',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 0,
}

export const MessengersListItem = ({
  messenger,
  archiveAction = () => {},
  clickAction = () => {},
  ...rest
}: MessengerListItemProps): JSX.Element => {
  const calculateTime = (): string => {
    const resultInMinutes = dayjs().diff(
      messenger?.lastMessage.updatedAt,
      'minute',
    )
    if (resultInMinutes > 60) {
      const resultInHours = dayjs().diff(
        messenger?.lastMessage.updatedAt,
        'hour',
      )
      if (resultInHours > 24) {
        return `${dayjs().diff(messenger?.lastMessage.updatedAt, 'd')} d`
      }
      return `${resultInHours} h`
    }
    return `${resultInMinutes} m`
  }

  const rightSwipe = (): JSX.Element => {
    return (
      <View style={ICON_WRAP}>
        <SVGIcon icon='archive' size={24} color={color.palette.white} />
      </View>
    )
  }

  return !messenger.archived ? (
    <>
      <Swipeable
        renderRightActions={rightSwipe}
        onSwipeableRightOpen={() => {
          archiveAction()
        }}
        rightThreshold={60}
      >
        <View style={SWIPEABLE}>
          <TouchableOpacity onPress={clickAction}>
            <RowSpaceBetween
              style={VIEW}
              StartItem={<MessengerUserTitle messenger={messenger} {...rest} />}
              EndItem={
                <View style={END_ITEM1}>
                  <Text
                    text={
                      messenger?.lastMessage?.updatedAt ? calculateTime() : null
                    }
                    preset='subtitle'
                    style={{
                      ...LAST_MESSAGE_TIME,
                      ...(messenger?.lastReadMessageId <
                        messenger?.lastMessage?.id && IF_NOT_SEEN),
                    }}
                  />
                </View>
              }
            />
          </TouchableOpacity>
        </View>
      </Swipeable>
      <View style={[BORDER_BOTTOM, MARGIN_HORIZONTAL_5PERCENT]} />
    </>
  ) : (
    <TouchableOpacity style={[SWIPEABLE, BORDER_BOTTOM]} onPress={clickAction}>
      <RowSpaceBetween
        style={VIEW}
        StartItem={<MessengerUserTitle messenger={messenger} {...rest} />}
        EndItem={
          <View style={END_ITEM2}>
            <TouchableOpacity onPress={archiveAction}>
              <Text tx='messageScreen.unarchive' preset='linkBoldBlack' />
            </TouchableOpacity>
          </View>
        }
      />
    </TouchableOpacity>
  )
}

MessengersListItem.defaultProps = {
  activeBids: [],
}

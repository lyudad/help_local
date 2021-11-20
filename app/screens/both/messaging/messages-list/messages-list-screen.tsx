/* eslint-disable */
import React, { useEffect, useState, useCallback, useRef } from 'react'
import {
  View,
  ViewStyle,
  TouchableOpacity,
  Platform,
  TextStyle,
} from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import {
  useRoute,
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native'
import {
  GiftedChat,
  Send,
  InputToolbarProps,
  Bubble,
  Message,
  InputToolbar,
  Day,
} from 'react-native-gifted-chat'
import LinearGradient from 'react-native-linear-gradient'

import {
  Screen,
  Header,
  SVGIcon,
  Text,
  Loader,
  Avatar as MyAvatar,
  WithCornerItem,
  Modal,
  Button,
} from 'components'
import { MessengerUserTitle } from '../sub-components'
import { color, spacing } from 'theme'
import { IBid, IConsumerOrHelper, IMessage, IRoom } from 'interfaces'
import {
  getRoomMessagesList,
  sendChatMessage,
  addNewMessageToChat,
  readChatMessage,
  modifyArchiveStatus,
  setRoom,
} from 'screens/both/messaging/thunk'
import { UserStackRouteProps } from 'navigation'
import { chat, helper, user } from 'app/store/selectors'
import { wsURL } from 'config'
import { helperProfile, message } from 'constants/routes'
import {
  FLEX_1,
  FLEX_8,
  FULL_WIDTH,
  MARGIN_TOP_SP5,
  MARGIN_VERTICAL_SP3,
  MARGIN_VERTICAL_SP4,
  ROW,
  UNDERLINE,
} from 'constants/common-styles'
import { setMessagesList, setShowWarning } from '../reducers'
import { getAcceptedBids } from 'screens/helper/thunk'

const MESSEGES_LIMIT = 20

const FULL: ViewStyle = { flex: 1 }

const HEADER: ViewStyle = {
  width: '90%',
  height: 78,
  flexDirection: 'row',
  alignSelf: 'center',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomColor: color.palette.black05,
  borderBottomWidth: 1,
}

const LOADER_CONT: ViewStyle = {
  position: 'absolute',
  left: '50%',
  top: spacing[5],
  zIndex: 10,
}

const INPUT_CONT: ViewStyle = {
  height: 52,
  width: '78%',
  marginLeft: '5%',
  marginVertical: spacing[3],
  paddingTop: Platform.select({
    ios: 15,
    android: 8,
  }),
  borderWidth: 1,
  borderColor: color.secondary,
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  paddingHorizontal: spacing[4],
}

const GRADIENT: ViewStyle = {
  height: 52,
  width: 52,
  marginVertical: spacing[3],
  justifyContent: 'center',
  alignItems: 'center',
  borderTopRightRadius: 4,
  borderBottomRightRadius: 4,
}

const MESSAGES_LIST: ViewStyle = {
  marginBottom: spacing[5],
}

const MESSAGES_LIST_ARCHIVED: ViewStyle = {
  marginBottom: -spacing[5],
}

const WARNING_MODAL_BTNS_TEXT: TextStyle = {
  lineHeight: 14,
  fontSize: 13,
}
const MAX_HEIGHT: ViewStyle = {
  maxHeight: 100,
}

const MESSAGE = {
  left: {
    marginBottom: 15,
    paddingLeft: 7,
  },
  right: {},
}

const BUBBLE = {
  left: {
    width: '100%',
    borderRadius: 4,
  },
  right: {
    backgroundColor: color.palette.lightGreen,
    width: '100%',
    alignSelf: 'flex-start',
    borderRadius: 4,
    marginBottom: 13,
    paddingRight: '15%',
  },
}

const BUBBLE_TEXT = {
  right: {
    color: color.secondary,
  },
}

const TIME_TEXT = {
  left: {
    color: color.palette.black05,
  },
  right: {
    color: color.palette.black05,
  },
}

const DAY_CONTAINER: ViewStyle = {
  marginBottom: 18,
}

const PADDING_RIGHT: ViewStyle = {
  paddingRight: '5%',
}

export const MessagesListScreen = (): JSX.Element => {
  const route = useRoute<UserStackRouteProps<'messagesList'>>()
  const textBack: string = route.params?.textBack || ''
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isScreenFocused: boolean = useIsFocused()
  const insets = useSafeArea()
  const ws = useRef(null)
  const currentRole: IConsumerOrHelper = useSelector(user.currentRole)
  const HELPER = 'helper'

  const profile = useSelector(user.profile)

  const room: IRoom = useSelector(chat.room)
  const messagesList: IMessage[] = useSelector(chat.messagesList)
  const isAllMessagesGet: boolean = useSelector(chat.isAllMessagesGet)
  const loading: boolean = useSelector(chat.loading)
  const isCreateChatRoomLoading: boolean = useSelector(
    chat.isCreateChatRoomLoading,
  )
  const activeBids: IBid[] = useSelector(helper.acceptedBids)
  const accessToken = useSelector(user.accessToken)
  const showWarning: boolean = useSelector(chat.showWarning)
  //const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  const [page, setPage] = useState<number>(1)
  const [isWarningModalOpen, setIsWarningModalOpen] =
    useState<boolean>(showWarning)
  const [messages, setMessages] = useState([])

  // for back button
  const [lastShownRoom, setLastShownRoom] = useState<IRoom>(null)

  const GENERATE_AVATAR_LABEL: string = 'generate'

  useEffect(() => {
    if (room) {
      dispatch(
        getRoomMessagesList({
          chatRoomId: room?.id,
          limit: MESSEGES_LIMIT,
          offset: 0,
        }),
      )
      setPage(2)
      setLastShownRoom(room)
    }
  }, [dispatch, room])

  useEffect(() => {}, [messages])

  useEffect(() => {
    if (!isScreenFocused) {
      dispatch(setMessagesList([]))
      dispatch(setRoom(null))
      dispatch(getAcceptedBids({}))
    } else {
      if (!room && lastShownRoom) dispatch(setRoom(lastShownRoom))
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (messagesList.length > 0) {
      setMessages(
        messagesList.map((mes) => {
          return {
            _id: mes.id,
            createdAt: mes.createdAt,
            text: mes.body,
            user: {
              avatar: room.interlocutor?.avatar
                ? room.interlocutor.avatar.sourceUrl
                : GENERATE_AVATAR_LABEL,
              _id: mes.createdBy,
            },
          }
        }),
      )
      dispatch(readChatMessage({ chatMessageId: messagesList[0].id }))
    }
  }, [messagesList])

  const makeSocketConnection = () => {
    ws.current = new WebSocket(wsURL, null, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
    ws.current.onopen = () => {
      console.log('connect')
    }
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.data.body) {
        const {
          id,
          body,
          chat_room_id,
          created_at,
          updated_at,
          deleted_at,
          created_by,
        } = data.data
        dispatch(
          addNewMessageToChat({
            id: id,
            body: body,
            chatRoomId: chat_room_id,
            createdAt: created_at,
            updatedAt: updated_at,
            deletedAt: deleted_at,
            createdBy: created_by,
          }),
        )
      }
    }
    ws.current.onclose = () => {
      console.log('close connection')
      //if (isScreenFocused) makeSocketConnection()
    }
  }

  useEffect(() => {
    makeSocketConnection()
    return () => ws.current.onclose()
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (showWarning) setIsWarningModalOpen(true)
    }, [showWarning]),
  )

  const onSend = useCallback(
    (messages = []) => {
      dispatch(
        sendChatMessage({
          body: messages[0].text,
          chatRoomId: room?.id,
        }),
      )
    },
    [room],
  )

  const handleArchiveRoom = useCallback(
    (value: boolean, roomID: number) => {
      dispatch(modifyArchiveStatus({ archived: value, chatRoomId: roomID }))
      navigation.navigate(message, { showArchived: value })
    },
    [dispatch, navigation],
  )

  const isCloseToTop = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToTop = 80
    return (
      contentSize.height - layoutMeasurement.height - paddingToTop <=
      contentOffset.y
    )
  }

  const getMoreMessages = useCallback(() => {
    if (!isAllMessagesGet && room) {
      dispatch(
        getRoomMessagesList({
          chatRoomId: room?.id,
          limit: MESSEGES_LIMIT,
          offset: MESSEGES_LIMIT * (page - 1),
        }),
      )
      setPage(page + 1)
    }
  }, [dispatch, route, page, room])

  const renderSendBtn = (props: InputToolbarProps): JSX.Element => {
    return (
      <Send {...props} alwaysShowSend>
        <LinearGradient colors={[color.secondary, '#5c5a5a']} style={GRADIENT}>
          <SVGIcon icon='send' color={color.palette.white} size={22} />
        </LinearGradient>
      </Send>
    )
  }

  const renderAvatar = (props): JSX.Element => {
    return (
      <TouchableOpacity
        style={{}}
        onPress={() => {
          if (currentRole !== HELPER)
            navigation.navigate(helperProfile, {
              id: room.interlocutor.helperProfileId,
              textBack: 'common.goBack',
            })
        }}
      >
        <WithCornerItem
          CornerItem={
            room.interlocutor.isOnline && (
              <SVGIcon icon='online' color={color.primary} />
            )
          }
        >
          <MyAvatar
            size={37}
            {...(props.currentMessage.user.avatar !== GENERATE_AVATAR_LABEL
              ? {
                  source: { uri: props.currentMessage.user.avatar },
                }
              : {
                  letter: room.interlocutor.firstName.charAt(0),
                })}
          />
        </WithCornerItem>
      </TouchableOpacity>
    )
  }
  const renderBubble = (props): JSX.Element => {
    BUBBLE.right = {
      ...BUBBLE.right,
      marginBottom: profile.id === props.nextMessage?.user?._id ? 13 : 5,
    }

    return (
      <Bubble
        {...props}
        textStyle={BUBBLE_TEXT}
        wrapperStyle={BUBBLE}
        containerStyle={{
          left: {},
          right: {},
        }}
      />
    )
  }

  const renderMessage = (props): JSX.Element => {
    return <Message {...props} containerStyle={MESSAGE} />
  }

  const renderInputToolbar = (props): JSX.Element => {
    if (!room?.archived) {
      return <InputToolbar {...props} />
    } else {
      return null
    }
  }

  const renderDay = (props): JSX.Element => (
    <Day {...props} containerStyle={DAY_CONTAINER} />
  )

  return (
    <View style={FULL}>
      <Header
        onlyTextBack
        textBack={textBack || 'messageScreen.headerTextBack'}
      />
      <Screen
        style={PADDING_RIGHT}
        preset='fixed'
        backgroundColor={color.transparent}
        withoutGradient
      >
        {room && !isCreateChatRoomLoading ? (
          <>
            <View style={HEADER}>
              <View>
                <MessengerUserTitle
                  avatarSize={37}
                  messenger={room}
                  {...{ activeBids }}
                  //isActiveJob={route.params?.isActiveJob}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  if (room.archived) {
                    handleArchiveRoom(false, room.id)
                  } else {
                    dispatch(
                      modifyArchiveStatus({
                        archived: true,
                        chatRoomId: room.id,
                      }),
                    )
                    navigation.navigate(message, {
                      showArchived: false,
                      isChatArchivedModalOpen: true,
                    })
                  }
                }}
              >
                {room.archived ? (
                  <Text tx='messageScreen.unarchive' preset='linkBoldBlack' />
                ) : (
                  <SVGIcon icon='archive' />
                )}
              </TouchableOpacity>
            </View>
            <View style={FULL}>
              {loading && (
                <View style={LOADER_CONT}>
                  <Loader />
                </View>
              )}
              <GiftedChat
                messages={messages}
                placeholder='Type a message...'
                onSend={(messages) => {
                  messages.forEach((mes) => {
                    setMessages(
                      messagesList.map((mes) => {
                        return {
                          _id: mes.id,
                          createdAt: mes.createdAt,
                          text: mes.body,
                          user: {
                            avatar: room.interlocutor?.avatar
                              ? room.interlocutor.avatar.sourceUrl
                              : GENERATE_AVATAR_LABEL,
                            _id: mes.createdBy,
                          },
                        }
                      }),
                    )
                  })
                  onSend(messages)
                }}
                user={{ _id: profile.id }}
                textInputProps={{ style: INPUT_CONT }}
                listViewProps={{
                  style: [
                    MESSAGES_LIST,
                    room.archived && MESSAGES_LIST_ARCHIVED,
                  ],
                  scrollEventThrottle: 400,
                  onScroll: ({ nativeEvent }) => {
                    if (isCloseToTop(nativeEvent)) getMoreMessages()
                  },
                  showsVerticalScrollIndicator: false,
                }}
                renderSend={renderSendBtn}
                renderBubble={renderBubble}
                renderAvatar={renderAvatar}
                renderInputToolbar={renderInputToolbar}
                renderMessage={renderMessage}
                timeTextStyle={TIME_TEXT}
                bottomOffset={
                  Platform.OS === 'ios' ? insets.bottom + insets.top + 220 : 0
                }
                renderDay={renderDay}
              />
            </View>
            <Modal
              visible={isWarningModalOpen}
              toggleModal={() => setIsWarningModalOpen(!isWarningModalOpen)}
            >
              <SVGIcon icon='warningInPentagon' color={color.primary} />
              <Text
                tx='common.warning'
                preset='header3bold'
                style={MARGIN_VERTICAL_SP3}
              />
              <Text tx='messageScreen.warningDesc1' />
              <Text
                tx='messageScreen.warningDesc2'
                style={MARGIN_VERTICAL_SP4}
              />
              <Text tx='messageScreen.warningDesc3' />
              <Text
                tx='common.helptMail'
                preset='header4bold'
                color={color.primary}
                style={UNDERLINE}
              />
              <View style={[FULL_WIDTH, ROW, MARGIN_TOP_SP5]}>
                <Button
                  preset='fourth'
                  tx='common.ok2'
                  style={[FLEX_8, MAX_HEIGHT]}
                  textStyle={WARNING_MODAL_BTNS_TEXT}
                  onPress={() => {
                    setIsWarningModalOpen(false)
                  }}
                />
                <View style={FLEX_1} />
                <Button
                  preset='fourth'
                  tx='common.dontShowAgain'
                  style={[FLEX_8, MAX_HEIGHT]}
                  textStyle={WARNING_MODAL_BTNS_TEXT}
                  onPress={() => {
                    setIsWarningModalOpen(false)
                    dispatch(setShowWarning(false))
                  }}
                />
              </View>
            </Modal>
          </>
        ) : (
          <Loader preset='primayWithVerticalMarginSp3' />
        )}
      </Screen>
    </View>
  )
}

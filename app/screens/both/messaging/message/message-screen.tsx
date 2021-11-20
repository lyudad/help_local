/* eslint-disable */
import React, { useState, useCallback } from 'react'
import { View, ViewStyle, TouchableOpacity, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  useFocusEffect,
  useRoute,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native'
import Reanimated from 'react-native-reanimated'
//import MaskedView from '@react-native-masked-view/masked-view'

import {
  Text,
  SVGIcon,
  RowSpaceBetween,
  InfoWithUndoBtn,
  Header,
  BottomNavigation,
  //MaskedElement,
  Loader,
  Modal,
} from 'components'
import { UserStackRouteProps } from 'navigation'
import { color, spacing } from 'theme'
import { IRoom, IConsumerOrHelper, IBid } from 'interfaces'
import { translate } from 'i18n'
import { ALIGIN_ITEMS_CENTER } from 'constants/common-styles'
import {
  getRoomList,
  cleanRoomList,
  modifyArchiveStatus,
  setRoom,
} from 'screens/both/messaging/thunk'
import { getArchivedJobs } from 'screens/client/thunk'
import { chat, common, helper, user } from 'app/store/selectors'
import { useHeaderAnimation } from 'hooks'
import { MessengersListItem } from '../sub-components'
import { message, messagesList } from 'constants/routes'
import { useEffect } from 'react'
import { setOnScrollEventForGradient } from 'app/store/commonSlice'
import { getAcceptedBids } from 'screens/helper/thunk'

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList)

const MODAL_CONT: ViewStyle = {
  marginTop: '50%',
}

const MODAL_TITLE: ViewStyle = {
  marginVertical: spacing[2],
}

const ROOMS_LIMIT = 10

const FULL: ViewStyle = { flex: 1 }

const WRAPPER: ViewStyle = {
  flex: 1,
  width: '100%',
  alignSelf: 'center',
}

const ARCH_TITLE: ViewStyle = {
  alignItems: 'center',
}

const TITLE: ViewStyle = {
  width: '90%',
  alignSelf: 'center',
  justifyContent: 'space-between',
  marginTop: spacing[6] + 2,
  marginBottom: spacing[5],
}

const UNDO: ViewStyle = {
  width: '100%',
  position: 'absolute',
  bottom: 0,
  left: 0,
}

const LOADER_CONT: ViewStyle = {
  justifyContent: 'center',
  marginBottom: spacing[5],
}
const CONSUMER: string = 'consumer'

export const MessageScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isScreenFocused: boolean = useIsFocused()
  const route = useRoute<UserStackRouteProps<'message'>>()

  const isChatArchivedModalOpenFromRoute: boolean =
    route.params?.isChatArchivedModalOpen

  const { headerStyle, scrollHandler } = useHeaderAnimation(80, (e) =>
    dispatch(setOnScrollEventForGradient(e)),
  )

  const [page, setPage] = useState<number>(1)
  const [showArchived, setShowArchived] = useState<boolean>(false)
  const [lastArchivedRooms, setLastArchivedRooms] = useState<
    { roomID: number; jobName: string }[]
  >([])
  const [
    isChatArchivedModalOpen,
    setIsChatArchivedModalOpen,
  ] = useState<boolean>(isChatArchivedModalOpenFromRoute)

  const roomList: IRoom[] = useSelector(chat.roomList)
  const isAllRoomListGet: boolean = useSelector(chat.isAllRoomListGet)
  //const activeJobs: IIdAndTitle[] = useSelector(consumer.activeJobs)
  const activeBids: IBid[] = useSelector(helper.acceptedBids)
  const loading: boolean = useSelector(chat.loading)
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)
  const currentRole: IConsumerOrHelper = useSelector(user.currentRole)

  const filtreedRoomList = showArchived
    ? roomList.filter((room: IRoom) => room.archived)
    : roomList.filter((room: IRoom) => !room.archived)

  useFocusEffect(
    useCallback(() => {
      setShowArchived(route.params?.showArchived)
    }, [route.params?.showArchived]),
  )

  useEffect(() => {
    if (isScreenFocused) {
      if (isChatArchivedModalOpenFromRoute) {
        setIsChatArchivedModalOpen(isChatArchivedModalOpenFromRoute)
        navigation.setParams({
          isChatArchivedModalOpen: false,
        })
      }
      dispatch(getAcceptedBids({}))
    }
  }, [isScreenFocused])

  useFocusEffect(
    useCallback(() => {
      dispatch(getRoomList({ limit: ROOMS_LIMIT, offset: 0 }))
      dispatch(getArchivedJobs(null))
      setPage(2)
      return () => dispatch(cleanRoomList())
    }, [dispatch]),
  )

  const handleArchiveRoom = useCallback(
    (value: boolean, roomID: number, jobName: string) => {
      if (value) {
        setLastArchivedRooms([...lastArchivedRooms, { roomID, jobName }])
      }
      dispatch(modifyArchiveStatus({ archived: value, chatRoomId: roomID }))
    },
    [dispatch, lastArchivedRooms],
  )
  /*
  const isActiveJob = (jobId: number): boolean => {
    const isJob = activeJobs.find((job: IIdAndTitle) => job.id === jobId)
    return !!isJob
  }*/

  const handleGetRooms = useCallback(() => {
    if (!isAllRoomListGet) {
      dispatch(
        getRoomList({ limit: ROOMS_LIMIT, offset: ROOMS_LIMIT * (page - 1) }),
      )
      setPage(page + 1)
    }
  }, [dispatch, page, isAllRoomListGet])

  const goToChat = useCallback(
    (room: IRoom, isActiveJob?: boolean) => {
      dispatch(setRoom(room))
      navigation.navigate(messagesList)
    },
    [navigation],
  )

  const renderChatRoom = (room: IRoom, index: number): JSX.Element => {
    /* if (!isAllRoomListGet && +index === filtreedRoomList.length - 1) {
       return (
         <MaskedView maskElement={<MaskedElement />}>
           <MessengersListItem
             key={room.id}
             messenger={room}
             isActiveJob={isActiveJob(room.jobPost?.id)}
             clickAction={() => goToChat(room, isActiveJob(room.jobPost?.id))}
             archiveAction={() =>
               handleArchiveRoom(!room.archived, room.id, room.jobPost?.title)
             }
           />
         </MaskedView>
       )
     }*/
    return (
      <MessengersListItem
        key={room.id}
        messenger={room}
        {...{ activeBids }}
        //isActiveJob={isActiveJob(room.jobPost?.id)}
        clickAction={() => goToChat(room)}
        archiveAction={() =>
          handleArchiveRoom(!room.archived, room.id, room.jobPost?.title)
        }
      />
    )
  }

  const renderLoader = (): JSX.Element => {
    return loading ? (
      <View style={LOADER_CONT}>
        <Loader />
      </View>
    ) : null
  }

  const renderLastArchivedRooms = (): JSX.Element[] =>
    lastArchivedRooms.map(
      (room): JSX.Element => (
        <InfoWithUndoBtn
          key={room.roomID}
          visible={!room}
          text={`${room.jobName ? room.jobName : ''} ${translate(
            'messageScreen.archived',
          )}`}
          onUndo={() => {
            setLastArchivedRooms([
              ...lastArchivedRooms.filter(
                (roomFromList) => roomFromList.roomID !== room.roomID,
              ),
            ]),
              handleArchiveRoom(false, room.roomID, room.jobName)
          }}
          actionAfter={() =>
            setLastArchivedRooms([
              ...lastArchivedRooms.filter(
                (roomFromList) => roomFromList.roomID !== room.roomID,
              ),
            ])
          }
          hideAfter={5000}
        />
      ),
    )

  return (
    <View style={FULL}>
      <Header
        clientBtn={currentRole === CONSUMER}
        headerAnimate={headerStyle}
        actionForBackText={() => setShowArchived(false)}
        textBack={showArchived ? 'messageScreen.headerTextBack' : null}
      />
      <View style={WRAPPER}>
        <AnimatedFlatList
          ListHeaderComponent={
            <View style={TITLE}>
              {showArchived ? (
                <View style={ARCH_TITLE}>
                  <Text tx='messageScreen.titleArchive' preset='header1' />
                </View>
              ) : (
                <RowSpaceBetween
                  style={ALIGIN_ITEMS_CENTER}
                  StartItem={<Text tx='messageScreen.title' preset='header1' />}
                  EndItem={
                    <TouchableOpacity onPress={() => setShowArchived(true)}>
                      <SVGIcon icon='archive' />
                    </TouchableOpacity>
                  }
                />
              )}
            </View>
          }
          onContentSizeChange={(_, y) => {
            //console.log('xxx')
            dispatch(
              setOnScrollEventForGradient({
                ...onScrollEventForGradient,
                contentSize: {
                  height: y,
                },
              }),
            )
          }}
          bounces={false}
          data={filtreedRoomList}
          onScroll={scrollHandler}
          /* eslint-disable @typescript-eslint/no-explicit-any */
          renderItem={({ item, index }: any) => renderChatRoom(item, index)}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: IRoom) => item.id.toString()}
          ListFooterComponent={renderLoader}
          onEndReachedThreshold={0.1}
          onEndReached={() => {
            handleGetRooms()
          }}
          onScrollEndDrag={(e) => {}}
          scrollEventThrottle={1}
        />
        <View style={UNDO}>{renderLastArchivedRooms()}</View>
      </View>
      <Modal
        visible={isChatArchivedModalOpen}
        toggleModal={() => setIsChatArchivedModalOpen(false)}
        styleContainer={MODAL_CONT}
      >
        <SVGIcon icon='archive' size={44} color={color.primary} />
        <View style={MODAL_TITLE}>
          <Text tx='messageScreen.modalTitle' preset='header3bold' />
        </View>
        <Text>
          <Text tx='messageScreen.text' />
          <Text text=' ' />
          <Text
            tx='messageScreen.here'
            preset='underlineBold'
            color={color.primary}
            onPress={() => navigation.navigate(message, { showArchived: true })}
          />
          <Text text='.' />
        </Text>
      </Modal>

      <BottomNavigation />
    </View>
  )
}

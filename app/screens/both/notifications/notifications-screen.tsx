import React, { useCallback, useState, useEffect } from 'react'
import { View, ViewStyle, FlatList } from 'react-native'
import Reanimated from 'react-native-reanimated'
// import firebase from 'react-native-firebase/app'
import messaging from '@react-native-firebase/messaging'

import { Screen, Text, Header, BottomNavigation, Loader } from 'components'
import { color, spacing } from 'theme'
import { INotification } from 'interfaces'
import { useHeaderAnimation } from 'hooks'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { common, user } from 'app/store/selectors'
import {
  setDetectScrolling,
  setOnScrollEventForGradient,
} from 'app/store/commonSlice'
import { getNotifications } from '../thunk'

import {
  setBadges,
  setIsAllNotificationsGot,
  setNotifications,
} from '../reducers'
import { RenderNotification } from './render-notification'

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList)

const FULL: ViewStyle = { flex: 1 }

const WRAPPER: ViewStyle = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
}

const LOADER_CONT: ViewStyle = {
  justifyContent: 'center',
  marginBottom: spacing[5],
}

const HEADER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: spacing[6],
  paddingBottom: spacing[5],
}

export const NotificationsScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const isScreenFocused = useIsFocused()
  const LIMIT = 6
  const [page, setPage] = useState<number>(1)

  const notifications: INotification[] = useSelector(user.notifications)
  const loadingNotifications: boolean = useSelector(user.loadingNotifications)
  const isAllNotificationsGot: boolean = useSelector(user.isAllNotificationsGot)
  const currentRole: 'helper' | 'consumer' = useSelector(user.currentRole)
  const CONSUMER = 'consumer'
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  const onScollCallback = (e) => {
    dispatch(setOnScrollEventForGradient(e))
  }
  const { headerStyle, scrollHandler } = useHeaderAnimation(80, onScollCallback)

  const handleGetNotifications = useCallback(() => {
    if (!isAllNotificationsGot) {
      dispatch(
        getNotifications({
          limit: LIMIT,
          offset: LIMIT * (page - 1),
        }),
      )
      setPage(page + 1)
    }
  }, [isAllNotificationsGot, page])

  useEffect(() => {
    if (isScreenFocused) {
      handleGetNotifications()
    } else {
      dispatch(setNotifications([]))
      dispatch(setIsAllNotificationsGot(false))
      setPage(1)
      dispatch(
        setBadges({
          notificationsBadges: 0,
          messagingBadges: 0,
        }),
      )
    }
  }, [isScreenFocused])

  useEffect(() => {
    return messaging().onMessage(() => {
      if (isScreenFocused) {
        dispatch(
          getNotifications({
            limit: notifications.length + 5,
            offset: 0,
          }),
        )
      }
    })
  }, [])

  const renderFooter = (): JSX.Element => {
    return loadingNotifications ? (
      <View style={LOADER_CONT}>
        <Loader />
      </View>
    ) : null
  }

  return (
    <View style={FULL}>
      <Header
        headerAnimate={headerStyle}
        {...{
          ...(currentRole === CONSUMER && { clientBtn: true }),
        }}
      />
      <Screen preset='fixed' backgroundColor={color.transparent}>
        <View style={WRAPPER}>
          <AnimatedFlatList
            ListHeaderComponent={
              <>
                <View style={HEADER_CONTAINER}>
                  <Text preset='header1' tx='notifications.title' />
                </View>
              </>
            }
            onScrollBeginDrag={() =>
              dispatch(setDetectScrolling(Math.random()))
            }
            onScroll={scrollHandler}
            onContentSizeChange={(_, y) => {
              dispatch(
                setOnScrollEventForGradient({
                  ...onScrollEventForGradient,
                  contentSize: {
                    height: y,
                  },
                }),
              )
            }}
            data={notifications}
            /* eslint-disable @typescript-eslint/no-explicit-any */
            renderItem={({ item, index }: any) => (
              <RenderNotification
                notification={item}
                {...{ index, notifications }}
              />
            )}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: INotification) => item.id.toString()}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              handleGetNotifications()
            }}
            scrollEventThrottle={1}
            bounces={false}
          />
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

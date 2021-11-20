/* eslint-disable */
import React, { useCallback } from 'react'
import { View, ViewStyle, TouchableOpacity, Platform } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { useSelector } from 'react-redux'
import { useRoute } from '@react-navigation/native'

import {
  clientDashboard,
  helperDashboard,
  myJobs,
  jobBids,
} from 'constants/routes'
import { color } from 'theme'
import { user } from 'app/store/selectors'
import { BottomNavigationProps } from './bottom-navigation.props'
import { TabBarIcon } from '../tabBarIcon'
import { useBeforeRemove } from 'hooks'

// static styles

export const BOTTOM_NAVIGATION_HEIGHT: number = Platform.OS === 'ios' ? 70 : 50

const CONTAINER: ViewStyle = {
  width: '100%',
  height: BOTTOM_NAVIGATION_HEIGHT,
  backgroundColor: color.secondary,
  alignItems: 'center',
  flexDirection: 'row',
  paddingBottom: Platform.OS === 'ios' ? 20 : 0,
}

const TAB_CONTAINER: ViewStyle = {
  flex: 1,
  marginVertical: 8,
  borderRightWidth: 1,
  borderRightColor: color.palette.grey,
}
const TAB: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
const NO_BORDER_RIGHT: ViewStyle = {
  borderRightWidth: 0,
}

export const BottomNavigation = ({
  isInputShowed = false,
  isFormValidToNavigate = true,
}: BottomNavigationProps): JSX.Element => {
  const navigation = useNavigation()
  const currentRole = useSelector(user.currentRole)
  const route = useRoute()

  const navigateToClientDashboard = useCallback(
    (value: boolean) =>
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () =>
          navigation.navigate(clientDashboard, {
            isHeaderInput: isInputShowed ? false : value,
          }),
      }),
    [navigation, isInputShowed, isFormValidToNavigate],
  )
  const navigateToMyJobs = useCallback(
    () =>
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () => navigation.navigate(myJobs),
      }),
    [navigation, isFormValidToNavigate],
  )

  const navigateToHelperDashboard = useCallback(
    (value: boolean) =>
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () =>
          navigation.navigate(helperDashboard, {
            isHeaderInput: isInputShowed ? false : value,
          }),
      }),
    [navigation, isInputShowed, isFormValidToNavigate],
  )

  const navigateToJobBids = useCallback(
    () =>
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () => navigation.navigate(jobBids),
      }),
    [navigation],
  )

  return (
    <View style={CONTAINER}>
      {currentRole === 'consumer' && (
        <>
          <View style={TAB_CONTAINER}>
            <TouchableOpacity
              onPress={() => navigateToClientDashboard(false)}
              style={TAB}
            >
              <TabBarIcon
                name='home'
                focused={isInputShowed ? false : route.name === clientDashboard}
              />
            </TouchableOpacity>
          </View>
          {route.name === clientDashboard && (
            <View style={TAB_CONTAINER}>
              <TouchableOpacity
                style={TAB}
                onPress={() => navigateToClientDashboard(true)}
              >
                <TabBarIcon name='search' focused={isInputShowed} />
              </TouchableOpacity>
            </View>
          )}
          <View style={[TAB_CONTAINER, NO_BORDER_RIGHT]}>
            <TouchableOpacity onPress={() => navigateToMyJobs()} style={TAB}>
              <TabBarIcon
                name='tablet'
                focused={isInputShowed ? false : route.name === myJobs}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
      {currentRole === 'helper' && (
        <>
          <View style={TAB_CONTAINER}>
            <TouchableOpacity
              style={TAB}
              onPress={() => navigateToHelperDashboard(false)}
            >
              <TabBarIcon
                name='home'
                focused={isInputShowed ? false : route.name === helperDashboard}
              />
            </TouchableOpacity>
          </View>
          {route.name === helperDashboard && (
            <View style={TAB_CONTAINER}>
              <TouchableOpacity
                style={TAB}
                onPress={() => navigateToHelperDashboard(true)}
              >
                <TabBarIcon name='search' focused={isInputShowed} />
              </TouchableOpacity>
            </View>
          )}
          <View style={[TAB_CONTAINER, NO_BORDER_RIGHT]}>
            <TouchableOpacity style={TAB} onPress={() => navigateToJobBids()}>
              <TabBarIcon name='bag' focused={route.name === jobBids} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

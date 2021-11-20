import React from 'react'
import { ImageBackground, ImageStyle } from 'react-native'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import {
  PostJobScreen,
  ClientDashboardScreen,
  JobDetailScreen,
} from 'screens/client'
import {
  SplashScreen,
  LoginScreen,
  SignUpScreen,
  VerifyPhoneNumberScreen,
  PasswordResetScreen,
} from 'screens/auth'

import {
  MessageScreen,
  MessagesListScreen,
  FinalizeAccountScreen,
} from 'screens/both'
import {
  splash,
  login,
  signUp,
  verifyPhoneNumber,
  passwordReset,
  finalizeAccount,
  postJob,
  clientDashboard,
  notifications,
  message,
  messagesList,
  jobDetail,
} from 'constants/routes'
import { StackHeader } from 'components'

const BG: ImageStyle = {
  flex: 1,
}

export type TestStackParamList = {
  // auth stack params
  passwordReset: undefined
  splash: undefined
  signUp: undefined
  verifyPhoneNumber: undefined
  login: undefined
  finalizeAccount: undefined

  // post-job stack params
  postJob: undefined
  jobForm: { postTitle: string }

  // dashboard stack params
  clientDashboard: undefined
  notifications: undefined

  // both (client and helper) stack params
  message: undefined
  messagesList: undefined
  jobDetail: undefined
}

export type TestStackRouteProps<
  RouteName extends keyof TestStackParamList
> = RouteProp<TestStackParamList, RouteName>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<TestStackParamList>()

export const TestStack = (): JSX.Element => {
  const haederBg = require('assets/header-bg.png')
  const avatar = require('assets/avatar-small.png')

  const headerOptions = (options): StackNavigationOptions => {
    return {
      headerTitle: () => (
        <StackHeader
          avatarSrc={avatar}
          onPressAvatar={() => options.navigation.navigate(clientDashboard)}
          onPressBell={() => options.navigation.navigate(notifications)}
        />
      ),
      headerLeft: () => null,
      headerBackground: () => (
        <ImageBackground source={haederBg} style={BG} resizeMode='stretch' />
      ),
    }
  }
  const transparentHeader = (): StackNavigationOptions => {
    return {
      headerTitle: null,
      headerTransparent: true,
      headerLeft: () => null,
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 124,
        },
      }}
    >
      <Stack.Screen
        name={login}
        component={LoginScreen}
        options={transparentHeader}
      />
      <Stack.Screen
        name={signUp}
        component={SignUpScreen}
        options={transparentHeader}
      />
      {/* -----Auth stack---------*/}
      <Stack.Screen
        name={splash}
        component={SplashScreen}
        options={transparentHeader}
      />
      {/* }
      <Stack.Screen
        name={login}
        component={LoginScreen}
        options={transparentHeader}
      /> */}
      <Stack.Screen
        name={finalizeAccount}
        component={FinalizeAccountScreen}
        options={transparentHeader}
      />
      {/*
      <Stack.Screen
        name={signUp}
        component={SignUpScreen}
        options={transparentHeader}
      /> */}
      <Stack.Screen
        name={verifyPhoneNumber}
        component={VerifyPhoneNumberScreen}
        options={transparentHeader}
      />
      <Stack.Screen
        name={passwordReset}
        component={PasswordResetScreen}
        options={transparentHeader}
      />

      {/* -----Client stack---------*/}

      <Stack.Screen
        name={postJob}
        component={PostJobScreen}
        options={(options) => headerOptions(options)}
      />
      <Stack.Screen
        name={clientDashboard}
        component={ClientDashboardScreen}
        options={headerOptions}
      />

      <Stack.Screen
        name={jobDetail}
        component={JobDetailScreen}
        options={headerOptions}
      />

      {/* -----Helper stack---------*/}

      {/* -----Both (client and helper) stack---------*/}
      <Stack.Screen
        name={message}
        component={MessageScreen}
        options={headerOptions}
      />
      <Stack.Screen
        name={messagesList}
        component={MessagesListScreen}
        options={headerOptions}
      />
    </Stack.Navigator>
  )
}

const exitRoutes = [postJob]
export const canExit = (routeName: string): boolean =>
  exitRoutes.includes(routeName)

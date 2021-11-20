/**
 * Welcome to the main entry point of the app. In this file, we'll
 * be kicking off our app.
 *
 * Most of this file is boilerplate and you shouldn't need to modify
 * it very often. But take some time to look through and understand
 * what is going on here.
 *
 * The app navigation resides in ./app/navigation, so head over there
 * if you're interested in adding screens and navigators.
 */
import './i18n'
import './utils/ignore-warnings'
import React, { useRef } from 'react'
import { NavigationContainerRef } from '@react-navigation/native'
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context'
import { enableScreens } from 'react-native-screens'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import messaging from '@react-native-firebase/messaging'
import PushNotification, { Importance } from 'react-native-push-notification'
import { persistor, store } from './store'
import * as storage from './utils/storage'
import {
  canExit,
  RootNavigator,
  setRootNavigation,
  useBackButtonHandler,
  useNavigationPersistence,
} from './navigation'
import { ToggleStorybook } from '../storybook/toggle-storybook'
// import { LogBox } from 'react-native'

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator

enableScreens()

// LogBox.ignoreAllLogs();

export const NAVIGATION_PERSISTENCE_KEY = 'NAVIGATION_STATE'

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log('Message handled in the background!', remoteMessage);
})

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister(token) {
    // console.log("TOKEN:", token);
  },
  // (required) Called when a remote is received or opened, or local notification is opened
  /*
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    if (notification.userInteraction) {
      navigationServices.navigate(account)
    }
    // process the notification
    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  }, */
  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction(notification) {
    // console.log("ACTION:", notification.action);
    // console.log("NOTIFICATION:", notification);
    // process the action
  },
  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    // console.error(err.message, err);
  },
  // IOS ONLY (optional): default: all - Permissions to register.
  /*
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  }, */
  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,
  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
})

PushNotification.createChannel(
  {
    channelId: 'channelID', // (required)
    channelName: 'My channel', // (required)
    channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
    playSound: false, // (optional) default: true
    soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  // ellint-disable next-line
  (created) => {
    // console.log(`createChannel returned '${created}'`)
  }, // (optional) callback returns whether the channel was created, false means it already existed.
)

/**
 * This is the root component of our app.
 */
function App(): JSX.Element {
  const navigationRef = useRef<NavigationContainerRef>()

  setRootNavigation(navigationRef)
  useBackButtonHandler(navigationRef, canExit)
  const {
    initialNavigationState,
    onNavigationStateChange,
  } = useNavigationPersistence(storage, NAVIGATION_PERSISTENCE_KEY)

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.

  // otherwise, we're ready to render the app
  return (
    <ToggleStorybook>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <RootNavigator
              ref={navigationRef}
              initialState={initialNavigationState}
              onStateChange={onNavigationStateChange}
            />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </ToggleStorybook>
  )
}

export default App

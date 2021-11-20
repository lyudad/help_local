/* eslint-disable */
import React from 'react'
import {
  View,
  ViewStyle,
  ImageBackground,
  TextStyle,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Text, Screen, Button, SVGIcon } from 'components'
import { color, spacing } from 'theme'
import { login, privacyAndTerms, signUp } from 'constants/routes'
import TypingText from 'react-native-typical'

// const logoPath = require('assets/app-logo-bigger.png')
const screenBg = require('assets/splash-bg.png')

const FULL: ViewStyle = { flex: 1 }

const CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[5],
  justifyContent: 'center',
  alignItems: 'center',
}

const IMAGE_VIEW_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}

const DESC_CONTAINER: ViewStyle = {
  marginVertical: spacing[4],
}

const BUTTON: ViewStyle = {
  marginVertical: spacing[2],
}

const BUTTON_TEXT: TextStyle = {
  textTransform: 'uppercase',
}

const SUBTEXT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  paddingTop: spacing[7],
}

const PRIVACY: TextStyle = {
  color: color.palette.white,
}

const DESC_TEXT: TextStyle = {
  color: color.palette.white,
}

const CATEGORY: TextStyle = {
  fontSize: 21,
  fontWeight: 'bold',
  color: color.palette.white,
}

export const SplashScreen = (): JSX.Element => {
  const navigation = useNavigation()

  return (
    <View testID='splashScreen' style={FULL}>
      <Screen
        preset='fixed'
        backgroundColor={color.transparent}
        withoutGradient
        dontTopUpContent
      >
        <ImageBackground
          source={screenBg}
          style={IMAGE_VIEW_STYLE}
          resizeMode='stretch'
        >
          <View style={CONTAINER}>
            <SVGIcon
              icon='appLogo'
              color={color.primary}
              width={164}
              height={67}
            />
            <View style={DESC_CONTAINER}>
              <Text>
                <Text
                  preset='header2'
                  tx='splashScreen.with'
                  style={DESC_TEXT}
                />
                <TypingText
                  steps={[
                    'Cleaning',
                    3000,
                    'Landscaping',
                    3000,
                    'Babysitting',
                    3000,
                    'Tutoring',
                    3000,
                    'Pet Care',
                    3000,
                    'Personal Training',
                    3000,
                    'Handyman',
                    3000,
                    'Moving',
                    3000,
                    'Furniture Assembly',
                    3000,
                    'Painter',
                    3000,
                    'Electrical',
                    3000,
                    'Plumbing',
                    3000,
                    'TV Mounting',
                    3000,
                    'Heavy Lifting',
                    3000,
                    'Snow Removal',
                    3000,
                  ]}
                  loop={Infinity}
                  style={CATEGORY}
                  blinkCursor={false}
                />
              </Text>
            </View>
            <Button
              testID='next-screen-button'
              preset='primary'
              tx='splashScreen.signup'
              textStyle={BUTTON_TEXT}
              style={BUTTON}
              onPress={() => navigation.navigate(signUp)}
            />
            <Button
              testID='next-screen-button'
              preset='transparent'
              tx='splashScreen.login'
              textStyle={BUTTON_TEXT}
              style={BUTTON}
              onPress={() => navigation.navigate(login)}
            />
            <View style={SUBTEXT_CONTAINER}>
              <Text
                style={PRIVACY}
                preset='privacyPollicy'
                tx='privacyPolicy.text1'
              />
              <Text text=' ' />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(privacyAndTerms, {
                    whichTextShouldBeShown: 'terms',
                  })
                }
              >
                <Text
                  style={PRIVACY}
                  preset='privacyPollicyUnderline'
                  tx='privacyPolicy.termsOfUse'
                />
              </TouchableOpacity>
              <Text text=' ' />
              <Text style={PRIVACY} preset='privacyPollicy' tx='common.and' />
              <Text text=' ' />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(privacyAndTerms, {
                    whichTextShouldBeShown: 'privacy',
                  })
                }
              >
                <Text
                  style={PRIVACY}
                  preset='privacyPollicyUnderline'
                  tx='privacyPolicy.privacyPolicy'
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </Screen>
    </View>
  )
}

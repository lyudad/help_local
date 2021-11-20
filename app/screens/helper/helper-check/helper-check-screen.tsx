import React, { useEffect } from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  ImageBackground,
} from 'react-native'
import { DotIndicator } from 'react-native-indicators'
import { useNavigation } from '@react-navigation/core'

import { approved, rejection } from 'constants/routes'
import {
  Screen,
  Text,
  WithHorizontalPaddings,
  Loader,
  SVGIcon,
} from 'components'
import { color, spacing } from 'theme'
import { WINDOW_HEIGHT } from 'constants/common-styles'
import { useSelector } from 'react-redux'
import { user } from 'app/store/selectors'

// const logoPath = require('assets/app-logo.png')
const quotes = require('assets/helper_check_screen/quotes.png')
const bottomImg = require('assets/helper_check_screen/bottom_img.png')

const FULL: ViewStyle = { flex: 1 }

const HEADER_CONT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: spacing[6],
  marginBottom: spacing[4] + 1,
}
const BOTTOM_IMG: ViewStyle = {
  width: '100%',
  height: WINDOW_HEIGHT * 0.45,
  position: 'absolute',
  bottom: 0,
}
const TEXT_IMG_CONT: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingHorizontal: '5%',
  paddingBottom: spacing[6],
}

const TEXT_IMG: TextStyle = {
  lineHeight: 25.58,
  paddingBottom: spacing[3],
}

const TITLE_CONT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[6] - 2,
}

const TEXT_CONT: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[7],
}
const LOADER_CONT: ViewStyle = {
  justifyContent: 'center',
  marginBottom: spacing[5],
}

const LOADER_CONT2: ViewStyle = {
  flexDirection: 'row',
  alignSelf: 'center',
  marginBottom: spacing[5],
}

const DOTS_CONT: ViewStyle = {
  position: 'absolute',
  right: -40,
  bottom: 4,
}
const QUOTES_CONT: ViewStyle = {
  position: 'absolute',
  top: 0,
}

export const HelperCheckScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const isCriminal: boolean = useSelector(user.isCriminal)

  useEffect(() => {
    const id = setTimeout(() => {
      navigation.navigate(isCriminal ? rejection : approved)
    }, 5000)
    return () => {
      clearTimeout(id)
    }
  }, [])

  return (
    <View style={FULL}>
      <Screen preset='fixed' backgroundColor={color.transparent}>
        <WithHorizontalPaddings>
          <View style={HEADER_CONT}>
            <SVGIcon
              icon='appLogo'
              color={color.primary}
              width={118}
              height={50}
            />
          </View>
          <View style={TITLE_CONT}>
            <Text preset='header1' tx='helperCheckScreen.title' />
          </View>
          <View style={TEXT_CONT}>
            <Text tx='helperCheckScreen.text' />
          </View>
          <View style={LOADER_CONT}>
            <Loader />
          </View>
          <View style={LOADER_CONT2}>
            <Text
              preset='header2bold'
              tx='common.loading'
              color={color.primary}
            />
            <View style={DOTS_CONT}>
              <DotIndicator size={6} color={color.primary} count={3} />
            </View>
          </View>
        </WithHorizontalPaddings>
        <ImageBackground
          resizeMode='stretch'
          style={BOTTOM_IMG}
          source={bottomImg}
        >
          <View style={TEXT_IMG_CONT}>
            <View>
              <View style={QUOTES_CONT}>
                <Image source={quotes} />
              </View>
              <Text
                preset='header3'
                tx='helperCheckScreen.imgText1'
                color={color.palette.white}
                style={TEXT_IMG}
              />
            </View>
            <Text
              preset='header3bold'
              tx='helperCheckScreen.imgText2'
              color={color.palette.white}
              style={TEXT_IMG}
            />
          </View>
        </ImageBackground>
      </Screen>
    </View>
  )
}

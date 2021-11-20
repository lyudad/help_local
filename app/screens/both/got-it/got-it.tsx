import React from 'react'
import { View, ViewStyle, Image, TextStyle, ImageStyle } from 'react-native'

import { Text, Screen, SVGIcon, Header, BottomNavigation } from 'components'
import { color, spacing } from 'theme'
import { WINDOW_WIDTH } from 'constants/common-styles'

const circleImg = require('assets/got-it-circle.png')

const FULL: ViewStyle = { flex: 1 }

const IMAGE_VIEW_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const HORIZONTAL_PADDING: ViewStyle = {
  ...IMAGE_VIEW_STYLE,
  paddingHorizontal: '10%',
  marginTop: spacing[6],
}

const TEXT: TextStyle = {
  marginTop: spacing[3],
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  marginVertical: spacing[5],
}

const CIRCLE_IMAGE: ImageStyle = {
  width: WINDOW_WIDTH,
  height: 340,
}

export const GotItScreen = (): JSX.Element => {
  return (
    <View testID='PasswordResetScreen' style={FULL}>
      <Header clientBtn />
      <Screen preset='scroll' backgroundColor={color.transparent}>
        <View style={HORIZONTAL_PADDING}>
          <SVGIcon icon='like' size={52} color={color.primary} />
          <Text preset='superLarge' tx='gotItScreen.title' />
          <Text preset='header3bold' tx='gotItScreen.text' style={TEXT} />
        </View>
        <View style={CIRCLE_IMAGE_CONTAINER}>
          <Image source={circleImg} style={CIRCLE_IMAGE} />
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

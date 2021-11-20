import React, { useCallback } from 'react'
import { View, ViewStyle, ImageBackground, TextStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Text, Screen, Button, SVGIcon } from 'components'
import { color, spacing } from 'theme'
import { setUpHelperProfile } from 'constants/routes'

const screenBg = require('assets/approved-bg.png')

const FULL: ViewStyle = { flex: 1 }

const IMAGE_VIEW_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}
const HORIZONTAL_PADDING: ViewStyle = {
  ...IMAGE_VIEW_STYLE,
  paddingHorizontal: '10%',
}
const TEXT: TextStyle = {
  marginTop: spacing[3],
}
const BTN: ViewStyle = {
  marginTop: spacing[6],
}
const BTN_TEXT: TextStyle = {
  color: color.primary,
}

export const ApprovedScreen = (): JSX.Element => {
  const navigation = useNavigation()

  const navigateToSetUpHelperProfile = useCallback(
    () => navigation.navigate(setUpHelperProfile),
    [navigation],
  )

  return (
    <View testID='PasswordResetScreen' style={FULL}>
      <Screen preset='fixed' backgroundColor={color.transparent}>
        <ImageBackground
          source={screenBg}
          style={IMAGE_VIEW_STYLE}
          resizeMode='cover'
        >
          <View style={HORIZONTAL_PADDING}>
            <SVGIcon icon='checkInCircle' size={52} color={color.primary} />
            <Text
              preset='superLarge'
              tx='approvedScreen.title'
              color={color.primary}
            />
            <Text
              tx='approvedScreen.text'
              color={color.palette.white}
              style={TEXT}
            />
            <Button
              preset='fourth'
              tx='approvedScreen.btnText'
              style={BTN}
              textStyle={BTN_TEXT}
              onPress={navigateToSetUpHelperProfile}
            />
          </View>
        </ImageBackground>
      </Screen>
    </View>
  )
}

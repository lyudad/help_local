import React, { useCallback } from 'react'
import { View, ViewStyle, ImageBackground, TextStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Text, Screen, Button, SVGIcon } from 'components'
import { color, spacing } from 'theme'
import { contactUs } from 'constants/routes'
import { useDispatch } from 'react-redux'
import { setCurrentRole } from 'screens/both/reducers'

const screenBg = require('assets/rejection-bg.png')

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
const BTN2: ViewStyle = {
  marginTop: spacing[4],
}
const BTN_TEXT: TextStyle = {
  color: color.primary,
}

export const RejectionScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const navigateToClientDashboard = useCallback(
    () => dispatch(setCurrentRole('consumer')),
    [navigation],
  )

  const navigateToContactUs = useCallback(
    () => navigation.navigate(contactUs, { isAccountQuestion: true }),
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
            <SVGIcon icon='sadSmile' size={52} color={color.primary} />
            <Text
              preset='superLarge'
              tx='rejectionScreen.title'
              color={color.primary}
            />
            <Text
              tx='rejectionScreen.text'
              color={color.palette.white}
              style={TEXT}
            />
            <Button
              preset='fourth'
              tx='rejectionScreen.btn1'
              style={BTN}
              textStyle={BTN_TEXT}
              onPress={navigateToContactUs}
            />
            <Button
              preset='transparent'
              tx='rejectionScreen.btn2'
              style={BTN2}
              onPress={navigateToClientDashboard}
            />
          </View>
        </ImageBackground>
      </Screen>
    </View>
  )
}

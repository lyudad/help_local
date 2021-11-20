import React, { useState, useEffect, useCallback } from 'react'
import {
  TextStyle,
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
  ImageStyle,
} from 'react-native'
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import { Text, Input, Button, SVGIcon, BaseScreen } from 'components'
import { color, spacing } from 'theme'
import {
  privacyAndTerms,
  signUp,
  verifyPhoneNumberForReset,
  login as loginFromRoute,
} from 'constants/routes'

import { useDispatch, useSelector } from 'react-redux'
import { auth } from 'app/store/selectors'
import { setError as setErrorFromCommmonSlice } from 'app/store/commonSlice'
import { NUMBER_REGEX } from 'constants/regex'
import { translate } from 'i18n'
import { MARGIN_TOP_SP7 } from 'constants/common-styles'
import { setForgotPasswordSessionId, setError } from './reducers'
import { initForgotPasswordSession } from './thunk'

// const logoPath = require('assets/app-logo.png')
const circleImg = require('assets/password-reset-img.png')

const FULL: ViewStyle = { flex: 1 }

const HEADER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: spacing[6],
  paddingBottom: spacing[5],
}
const TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[7],
}

const BLOCK_CONTAINER: ViewStyle = {
  width: '90%',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[5],
}
const BUTTON_TEXT: TextStyle = {
  textTransform: 'uppercase',
}
const SUBTEXT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: spacing[5],
}

const BOTTOM: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  marginBottom: spacing[5],
}

const IMAGE: ImageStyle = { width: '100%', height: 380 }

export const PasswordResetScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [login, setLogin] = useState<string>('')
  const [loginError, setLoginError] = useState<string>('')
  const [isLoginFieldTouched, setIsLoginFieldTouched] = useState<boolean>(false)
  const isScreenFocused: boolean = useIsFocused()
  const forgotPasswordSessionId: number = useSelector(
    auth.forgotPasswordSessionId,
  )
  const error: string = useSelector(auth.error)
  const isInitForgotPasswordSessionLoading: boolean = useSelector(
    auth.isInitForgotPasswordSessionLoading,
  )

  useFocusEffect(
    useCallback(() => {
      return () => {
        setLogin('')
        setLoginError('')
        setIsLoginFieldTouched(false)
      }
    }, []),
  )

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(setForgotPasswordSessionId(null))
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (error) {
      dispatch(setErrorFromCommmonSlice(error))
      dispatch(setError(null))
    }
  }, [error])

  useEffect(() => {
    if (forgotPasswordSessionId) {
      navigation.navigate(verifyPhoneNumberForReset, {
        numberForResendCode: `+${login}`,
      })
    }
  }, [forgotPasswordSessionId])

  useEffect(() => {
    if (isLoginFieldTouched) {
      setLoginError(
        new RegExp(NUMBER_REGEX).test(login)
          ? ''
          : translate('signUpScreen.enterValidNumber'),
      )
    }
  }, [login])

  const onSend = () => {
    if (!loginError) {
      let newLogin: string = login
      if (newLogin.length <= 10) {
        newLogin = `1${newLogin}`
      }
      dispatch(initForgotPasswordSession({ login: `+${newLogin}` }))
    }
  }

  return (
    <View testID='PasswordResetScreen' style={FULL}>
      <BaseScreen
        backgroundColor={color.transparent}
        withoutHorizontalPaddings
        style={MARGIN_TOP_SP7}
      >
        <View style={HEADER_CONTAINER}>
          <SVGIcon
            icon='appLogo'
            color={color.primary}
            width={118}
            height={50}
          />
        </View>
        <View style={TITLE_CONTAINER}>
          <Text preset='header2bold' tx='passwordResetScreen.title' />
        </View>
        <View style={BLOCK_CONTAINER}>
          <Input
            placeholder='passwordResetScreen.placeholder'
            value={login}
            onChangeText={(text: string) => {
              setIsLoginFieldTouched(true)
              setLogin(text)
            }}
            keyboardType='number-pad'
            errorText={loginError}
          />
        </View>
        <View style={BLOCK_CONTAINER}>
          <Button
            onPress={onSend}
            testID='next-screen-button'
            preset={
              isInitForgotPasswordSessionLoading
                ? 'secondaryLoading'
                : 'secondary'
            }
            tx='passwordResetScreen.btnText'
            textStyle={BUTTON_TEXT}
            disabled={isInitForgotPasswordSessionLoading}
          />
        </View>
        <View style={SUBTEXT_CONTAINER}>
          <TouchableOpacity onPress={() => navigation.navigate(loginFromRoute)}>
            <Text preset='link' tx='passwordResetScreen.backToLogin' />
          </TouchableOpacity>
          <Text
            preset='subtitle'
            style={{ color: color.palette.black05 }}
            text=' | '
          />
          <Text preset='subtitle' tx='passwordResetScreen.subText' />
          <Text text=' ' />
          <TouchableOpacity onPress={() => navigation.navigate(signUp)}>
            <Text preset='link' tx='passwordResetScreen.createAccount' />
          </TouchableOpacity>
        </View>
        <View style={BOTTOM}>
          <View style={CIRCLE_IMAGE_CONTAINER}>
            <Image style={IMAGE} source={circleImg} />
          </View>
          <View style={SUBTEXT_CONTAINER}>
            <Text preset='privacyPollicy' tx='privacyPolicy.text1' />
            <Text text=' ' />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(privacyAndTerms, {
                  whichTextShouldBeShown: 'terms',
                })
              }
            >
              <Text
                preset='privacyPollicyUnderline'
                tx='privacyPolicy.termsOfUse'
              />
            </TouchableOpacity>
            <Text text=' ' />
            <Text preset='privacyPollicy' tx='common.and' />
            <Text text=' ' />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(privacyAndTerms, {
                  whichTextShouldBeShown: 'privacy',
                })
              }
            >
              <Text
                preset='privacyPollicyUnderline'
                tx='privacyPolicy.privacyPolicy'
              />
            </TouchableOpacity>
          </View>
        </View>
      </BaseScreen>
    </View>
  )
}

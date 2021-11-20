/* eslint-disable */
import React, { useState } from 'react'
import {
  TextStyle,
  View,
  ViewStyle,
  BackHandler,
  NativeEventSubscription,
} from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Text, Input, Button, SVGIcon, BaseScreen } from 'components'
import { color, spacing } from 'theme'
import { login, passwordReset } from 'constants/routes'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setForgotPasswordSessionId, setRequestsStatus } from './reducers'
import { changePasswordViaForgotPasswordSession } from './thunk'
import { auth } from 'app/store/selectors'
import {
  MARGIN_BOTTOM_SP2,
  MARGIN_VERTICAL_SP3,
  PADDING_TOP_SP7,
} from 'constants/common-styles'
import { setError } from 'app/store/commonSlice'
import { translate } from 'i18n'
import { ERequestStatus, IAuthRequestsStatus } from 'interfaces'
import { PASSWORD_REGEX } from 'constants/regex'

//const logoPath = require('assets/app-logo.png')

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
  marginBottom: spacing[5],
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
const DESC: TextStyle = {
  paddingHorizontal: '13%',
  fontSize: 14,
  fontWeight: '400',
  color: color.primary,
  marginBottom: spacing[3],
}

export const NewPasswordScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const [pass, setPass] = useState<string>('')
  const [pass2, setPass2] = useState<string>('')
  const [passError, setPassError] = useState<string>('')
  const [pass2Error, setPass2Error] = useState<string>('')
  const [
    backHandlerLink,
    setBackHandlerLink,
  ] = useState<NativeEventSubscription>(null)
  const isScreenFocused: boolean = useIsFocused()
  const forgotPasswordSessionId: number = useSelector(
    auth.forgotPasswordSessionId,
  )
  const requestsStatus: IAuthRequestsStatus = useSelector(auth.requestsStatus)
  const isChangePasswordViaForgotPasswordSessionLoading: boolean = useSelector(
    auth.isChangePasswordViaForgotPasswordSessionLoading,
  )

  useEffect(() => {
    if (
      requestsStatus.changePasswordViaForgotPasswordSessionRequestStatus !==
      ERequestStatus.NOT_SENT_YET
    ) {
      if (
        requestsStatus.changePasswordViaForgotPasswordSessionRequestStatus ===
        ERequestStatus.SUCCESS
      ) {
        dispatch(setForgotPasswordSessionId(null))
        navigation.navigate(login, {
          infoText: translate('passwordResetScreen.passwordHasBeenReset'),
        })
      } else {
        dispatch(setError('common.couldntMakeRequest'))
      }
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          changePasswordViaForgotPasswordSessionRequestStatus:
            ERequestStatus.NOT_SENT_YET,
        }),
      )
    }
  }, [requestsStatus])

  useEffect(() => {
    const passRegex = new RegExp(PASSWORD_REGEX)
    if (pass) {
      if (!passRegex.test(pass))
        setPassError(translate('signUpScreen.passRegexError'))
      else setPassError('')
    }
    if (pass2) {
      if (pass2 !== pass)
        setPass2Error(translate('passwordResetScreen.mustBeSame'))
      else setPass2Error('')
    }
  }, [pass, pass2])

  const isNoErrors = (): boolean => {
    let newPassError: string = ''
    let newPass2Error: string = ''
    if (!pass) newPassError = translate('common.errorRequiredField')
    if (!pass2) newPass2Error = translate('common.errorRequiredField')
    if (pass2 !== pass) {
      newPass2Error = translate('passwordResetScreen.mustBeSame')
    }
    setPassError(newPassError)
    setPass2Error(newPass2Error)
    return !newPassError && !newPass2Error
  }

  const onSend = () => {
    if (isNoErrors()) {
      dispatch(
        changePasswordViaForgotPasswordSession({
          id: forgotPasswordSessionId,
          newPassword: pass,
        }),
      )
    }
  }

  useEffect(() => {
    if (isScreenFocused) {
      if (!backHandlerLink) {
        setBackHandlerLink(
          BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate(passwordReset)
            return true
          }),
        )
      }
    } else {
      backHandlerLink?.remove()
    }
  }, [isScreenFocused])

  return (
    <View testID='PasswordResetScreen' style={FULL}>
      <BaseScreen
        backgroundColor={color.transparent}
        withoutHorizontalPaddings
        style={PADDING_TOP_SP7}
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
          <Text
            preset='header2bold'
            tx='passwordResetScreen.resetYourPassword'
          />
        </View>
        <Text tx='passwordResetScreen.resetCodeSuccess' style={DESC} />
        <Text tx='passwordResetScreen.enterNewPass' style={MARGIN_BOTTOM_SP2} />
        <View style={BLOCK_CONTAINER}>
          <Input
            placeholder='passwordResetScreen.newPass'
            value={pass}
            onChangeText={setPass}
            errorText={passError}
          />
          <Input
            styleContainer={MARGIN_VERTICAL_SP3}
            placeholder='passwordResetScreen.confirmPass'
            value={pass2}
            onChangeText={setPass2}
            errorText={pass2Error}
          />
        </View>
        <View style={BLOCK_CONTAINER}>
          <Button
            onPress={onSend}
            testID='next-screen-button'
            preset={
              isChangePasswordViaForgotPasswordSessionLoading
                ? 'secondaryLoading'
                : 'secondary'
            }
            tx='passwordResetScreen.resetMyPass'
            textStyle={BUTTON_TEXT}
            disabled={isChangePasswordViaForgotPasswordSessionLoading}
          />
        </View>
      </BaseScreen>
    </View>
  )
}

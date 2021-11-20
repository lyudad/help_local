/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  ViewStyle,
  TouchableOpacity,
  TextStyle,
  TextInput,
  Platform,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { getUniqueId } from 'react-native-device-info'
import { common, auth } from 'app/store/selectors'

import { Text, Button, SVGIcon, BaseScreen } from 'components'
import { color, spacing } from 'theme'
import { smsResend, verifySignUp } from './thunk'
import { useDispatch, useSelector } from 'react-redux'
import { setError, setSuccess, setWarning } from 'app/store/commonSlice'
import { translate } from 'i18n'
import { setLastSmsSentAt } from './reducers'
import { login, privacyAndTerms } from 'constants/routes'
import { PADDING_TOP_SP7 } from 'constants/common-styles'

//const logoPath = require('assets/app-logo.png')

const FULL: ViewStyle = { flex: 1 }

const WRAPPER: ViewStyle = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
}

const HEADER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: spacing[6],
  paddingBottom: spacing[5],
}
const TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[5] - 6,
}

const ROW_TEXT: TextStyle = {
  flexDirection: 'row',
}

const FORM_NUMBER: ViewStyle = {
  width: '100%',
  height: 50,
  flexDirection: 'row',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'space-between',
}

export const INPUT_CONTAINER: ViewStyle = {
  width: 55,
  height: '100%',
  paddingHorizontal: 0,
  borderWidth: 1,
  borderRadius: 4,
  borderColor: color.dim,
  alignItems: 'center',
  justifyContent: 'center',
}

export const INPUT: TextStyle = {
  top: 3,
  left: 3,
  fontSize: 25,
  fontWeight: 'bold',
}

export const EMPTY_INPUT: TextStyle = {
  ...INPUT,
  left: Platform.OS === 'ios' ? 3 : 10,
}

const BUTTON_CONTAINER: ViewStyle = {
  marginVertical: spacing[6],
}

const BUTTON_TEXT: TextStyle = {
  textTransform: 'uppercase',
}

const SUBTEXT_CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginVertical: spacing[6],
}

const PRIVACY_TEXT: ViewStyle = {
  flexDirection: 'row',
}

export const VerifyPhoneNumberScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const loading = useSelector(common.loading)
  const sId = useSelector(auth.sId)
  const smsResendLeft = useSelector(auth.smsResendLeft)
  const lastSmsSentAt = useSelector(auth.lastSmsSentAt)
  const error = useSelector(auth.error)

  const [values, setValues] = useState<string[]>(['', '', '', '', ''])
  const refs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ]

  useEffect(() => {
    if (error) dispatch(setError(error))
  }, [error])

  const onResendAsk = () => {
    if (Date.now() > lastSmsSentAt + smsResendLeft) {
      dispatch(smsResend({ sId }))
      dispatch(setSuccess(translate('verifyPhoneNumberScreen.weSentCodeAgain')))
      dispatch(setLastSmsSentAt(Date.now() + 3000))
    } else {
      const timeInMiliseconds = lastSmsSentAt + smsResendLeft - Date.now()
      let h, m, s
      h = Math.floor(timeInMiliseconds / 1000 / 60 / 60)
      m = Math.floor((timeInMiliseconds / 1000 / 60 / 60 - h) * 60)
      s = Math.floor(((timeInMiliseconds / 1000 / 60 / 60 - h) * 60 - m) * 60)

      s < 10 ? (s = `0${s}`) : (s = `${s}`)
      m < 10 ? (m = `0${m}`) : (m = `${m}`)
      h < 10 ? (h = `0${h}`) : (h = `${h}`)
      const time: string = `${h}:${m}:${s}`
      dispatch(setWarning(translate('verifyPhoneNumberScreen.tryAfter') + time))
    }
  }

  const onVerifyPress = () => {
    if (values[0] && values[1] && values[2] && values[3] && values[4]) {
      if (!loading)
        dispatch(
          verifySignUp({
            sId,
            code: parseInt(values.join('')),
            deviceId: getUniqueId(),
          }),
        )
    } else {
      dispatch(setError(translate('verifyPhoneNumberScreen.enterNumbers')))
    }
  }

  return (
    <View testID='PasswordResetScreen' style={FULL}>
      <BaseScreen backgroundColor={color.transparent} style={PADDING_TOP_SP7}>
        <View style={WRAPPER}>
          <View style={HEADER_CONTAINER}>
            <SVGIcon
              icon='appLogo'
              color={color.primary}
              width={118}
              height={50}
            />
          </View>
          <View style={TITLE_CONTAINER}>
            <Text preset='header2bold' tx='verifyPhoneNumberScreen.title' />
          </View>
          <View style={TITLE_CONTAINER}>
            <Text tx='verifyPhoneNumberScreen.paragraph1' />
            <View style={ROW_TEXT}>
              <Text tx='verifyPhoneNumberScreen.paragraph2' />
              <TouchableOpacity onPress={() => onResendAsk()}>
                <Text
                  color={color.primary}
                  preset='underlineBold'
                  tx='verifyPhoneNumberScreen.paragraph3'
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={FORM_NUMBER}>
            {[0, 1, 2, 3, 4].map((el) => {
              return (
                <View style={INPUT_CONTAINER} key={el}>
                  <TextInput
                    ref={refs[el]}
                    style={values[el] ? INPUT : EMPTY_INPUT}
                    keyboardType='number-pad'
                    value={values[el]}
                    maxLength={1}
                    onFocus={() => {
                      if (el !== 0) {
                        if (!values[el - 1]) {
                          refs[el - 1].current.focus()
                        }
                      }
                    }}
                    onKeyPress={({ nativeEvent }) => {
                      if (nativeEvent.key === 'Backspace') {
                        const newValues: string[] = values
                        if (!values[el] && el > 0) {
                          newValues[el - 1] = ''
                          setValues([...newValues])
                          refs[el - 1].current.focus()
                        }
                      }
                    }}
                    onChangeText={(newValue) => {
                      const newValues: string[] = values
                      newValues[el] = newValue
                      setValues([...newValues])
                      if (newValue && el < 4) refs[el + 1].current.focus()
                      //if (!newValue && el > 0) refs[el - 1].current.focus()
                      if (el === 4 && newValue) onVerifyPress()
                    }}
                    {...(el === 0 && !values[0] && { autoFocus: true })}
                  />
                </View>
              )
            })}
          </View>
          <Button
            testID='next-screen-button'
            preset={loading ? 'secondaryLoading' : 'secondary'}
            tx='verifyPhoneNumberScreen.btnText'
            textStyle={BUTTON_TEXT}
            style={BUTTON_CONTAINER}
            onPress={onVerifyPress}
            disabled={loading ? true : false}
          />
          <TouchableOpacity
            style={TITLE_CONTAINER}
            onPress={() => navigation.navigate(login)}
          >
            <Text
              color={color.primary}
              preset='underlineBold'
              tx='verifyPhoneNumberScreen.returnLink'
            />
          </TouchableOpacity>

          <View style={SUBTEXT_CONTAINER}>
            <View style={PRIVACY_TEXT}>
              <Text preset='privacyPollicy' tx='privacyPolicy.text2' />
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
            </View>
            <View style={PRIVACY_TEXT}>
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
        </View>
      </BaseScreen>
    </View>
  )
}

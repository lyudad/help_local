/* eslint-disable */
import React, { useRef, useEffect, useCallback } from 'react'
import {
  TextStyle,
  View,
  ViewStyle,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import { Text, Input, Button, Hr, SVGIcon, BaseScreen } from 'components'
import FlashMessage from 'react-native-flash-message'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { getUniqueId } from 'react-native-device-info'
import { common } from 'app/store/selectors'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { color, spacing } from 'theme'
import { passwordReset, privacyAndTerms, signUp } from 'constants/routes'
import { SignInCredentials } from 'interfaces'
import { signIn, signInWithFacebook, signInWithGoogle } from './thunk'
import { ROW_SPACE_BETWEEN } from 'constants/common-styles'
import { AuthStackRouteProps } from 'app/navigation/auth-stack'
import { translate } from 'i18n'
import { EMAIL_REGEX, NUMBER_REGEX } from 'constants/regex'

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
  marginBottom: spacing[5] - 6,
}

const BLOCK_CONTAINER: ViewStyle = {
  width: '90%',
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[5],
}

const LOGIN_BUTTON_TEXT: TextStyle = {
  textTransform: 'uppercase',
  paddingLeft: 12,
}
const SUBTEXT_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: spacing[6],
}

const BOTTOM_WRAPPER: ViewStyle = {
  flex: 1,
  marginBottom: spacing[5],
  paddingHorizontal: '5%',
  paddingTop: spacing[6],
}

const SOCIAL_BTN: ViewStyle = {
  height: 52,
  alignSelf: 'center',
  flexDirection: 'row',
  marginVertical: spacing[2],
  width: '47%',
}
const BTN_TEXT1: TextStyle = {
  textTransform: 'uppercase',
  letterSpacing: 0.5,
}
const BTN_TEXT2: TextStyle = {
  ...BTN_TEXT1,
  marginLeft: spacing[3],
}

const OR_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: spacing[2],
}

const OR: TextStyle = {
  color: color.palette.black,
  fontSize: 14,
  fontWeight: '300',
  textTransform: 'uppercase',
  flexGrow: 1,
  textAlign: 'center',
}

const HR_BOX: ViewStyle = {
  flexGrow: 4,
}

const DESC: TextStyle = {
  paddingHorizontal: '5%',
  fontSize: 14,
  fontWeight: '400',
  color: color.primary,
  marginBottom: spacing[3],
}

export const LoginScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const loading = useSelector(common.loading)
  const toastRef = useRef()
  const route = useRoute<AuthStackRouteProps<'login'>>()

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '738026773059-5snmk9js0o7egfoclidjqfrmi0349oqg.apps.googleusercontent.com',
      offlineAccess: true,
      webClientId:
        '738026773059-ucdk437ahecl429ukojg89i57ssea7gp.apps.googleusercontent.com',
    })
  }, [])

  const signInFacebook = async () => {
    dispatch(signInWithFacebook({ deviceId: getUniqueId() }))
  }

  const signInGoogle = async () => {
    dispatch(signInWithGoogle({ deviceId: getUniqueId() }))
  }

  useFocusEffect(
    useCallback(() => {
      return () => navigation.setParams({ infoText: '' })
    }, []),
  )

  const onSignInPress = (data: SignInCredentials) => {
    if (!loading) {
      if (!data.login.includes('@')) {
        if (data.login.length <= 10) data.login = '1' + data.login
        data.login = '+' + data.login
      } else {
        data.login = data.login.toLowerCase()
      }
      dispatch(
        signIn({
          login: data.login,
          password: data.password,
          deviceId: getUniqueId(),
        }),
      )
    }
  }

  const schema = yup.object().shape({
    login: yup
      .string()
      .required(translate('common.errorRequiredField'))
      .test(
        'test-name',
        translate('loginScreen.enterValidNumberOrEmail'),
        function (value) {
          let isValidEmail = false
          if (value.includes('@')) {
            if (
              value.includes('+') &&
              value.indexOf('+') < value.indexOf('@')
            ) {
              const newValue = value.replace('+', '')
              isValidEmail = EMAIL_REGEX.test(newValue)
            } else isValidEmail = EMAIL_REGEX.test(value)
          }
          let isValidPhone = NUMBER_REGEX.test(value)
          if (!isValidEmail && !isValidPhone) {
            return false
          }
          return true
        },
      ),
    password: yup.string().required(translate('signUpScreen.passwordRequired')),
    /*.matches(PASSWORD_REGEX, {
      message: translate('signUpScreen.passRegexError'),
    }),*/
  })

  const { control, handleSubmit, errors } = useForm<SignInCredentials>({
    resolver: yupResolver(schema),
  })

  return (
    <>
      <SafeAreaView />
      <View testID='LoginScreen' style={FULL}>
        <BaseScreen
          backgroundColor={color.transparent}
          withoutHorizontalPaddings
        >
          <FlashMessage position='bottom' ref={toastRef} />
          <View style={HEADER_CONTAINER}>
            <SVGIcon
              icon='appLogo'
              color={color.primary}
              width={118}
              height={50}
            />
          </View>
          <View style={TITLE_CONTAINER}>
            <Text preset='header2bold' tx='loginScreen.title' />
          </View>
          {!!route.params?.infoText && (
            <Text text={route.params.infoText} style={DESC} />
          )}
          <View style={BLOCK_CONTAINER}>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='loginScreen.emailOrPhone'
                  value={value}
                  onChangeText={(newValue) => onChange(newValue)}
                  errorText={errors.login?.message}
                  keyboardType='email-address'
                  autoCapitalize='none'
                />
              )}
              name='login'
              rules={{ required: true }}
              defaultValue=''
            />
          </View>
          <View style={BLOCK_CONTAINER}>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='loginScreen.password'
                  value={value}
                  secureTextEntry
                  onChangeText={(newValue) => onChange(newValue)}
                  errorText={errors.password?.message}
                />
              )}
              name='password'
              rules={{ required: true }}
              defaultValue=''
            />
          </View>
          <View style={BLOCK_CONTAINER}>
            <Button
              testID='next-screen-button'
              preset={loading ? 'secondaryLoading' : 'secondary'}
              tx='loginScreen.btnText'
              textStyle={LOGIN_BUTTON_TEXT}
              onPress={handleSubmit(onSignInPress)}
              disabled={loading}
            />
          </View>
          <View style={SUBTEXT_CONTAINER}>
            <TouchableOpacity
              onPress={() => navigation.navigate(passwordReset)}
            >
              <Text preset='link' tx='loginScreen.resetPass' />
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
          <View style={BOTTOM_WRAPPER}>
            <View style={OR_CONTAINER}>
              <View style={HR_BOX}>
                <Hr />
              </View>
              <Text style={OR} tx='loginScreen.or' />
              <View style={HR_BOX}>
                <Hr />
              </View>
            </View>
            <View style={{ ...ROW_SPACE_BETWEEN }}>
              <Button
                testID='next-screen-button'
                preset='fourth'
                style={SOCIAL_BTN}
                onPress={signInGoogle}
              >
                <SVGIcon icon='google' width={21} height={24} />
                <Text preset='smallestBold' style={BTN_TEXT2} text='google ' />
                <Text
                  preset='smallestBold'
                  style={BTN_TEXT1}
                  tx='loginScreen.signIn'
                />
              </Button>
              <Button
                testID='next-screen-button'
                preset='fourth'
                style={SOCIAL_BTN}
                onPress={signInFacebook}
              >
                <SVGIcon icon='fb' width={10} height={23} />
                <Text
                  preset='smallestBold'
                  style={BTN_TEXT2}
                  text='facebook '
                />
                <Text
                  preset='smallestBold'
                  style={BTN_TEXT1}
                  tx='loginScreen.signIn'
                />
              </Button>
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
    </>
  )
}

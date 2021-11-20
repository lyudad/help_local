/* eslint-disable */
import React, { useEffect, useRef } from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import FlashMessage from 'react-native-flash-message'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { common, auth } from 'app/store/selectors'
import { getUniqueId } from 'react-native-device-info'
import { GoogleSignin } from '@react-native-google-signin/google-signin'

import { Text, Input, Button, SVGIcon, BaseScreen } from 'components'
import { privacyAndTerms, verifyPhoneNumber } from 'constants/routes'
import { color, spacing } from 'theme'
import { SignUpCredentials } from 'interfaces'
import {
  initSignUpSession,
  signUpWithFacebook,
  signUpWithGoogle,
} from './thunk'
import { translate } from 'i18n'
import { NUMBER_REGEX, PASSWORD_REGEX } from 'constants/regex'

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

const CONNECT_TYPES_WRAPPER: ViewStyle = {
  width: '90%',
  flexDirection: 'row',
  alignSelf: 'center',
  justifyContent: 'space-between',
  marginBottom: spacing[7],
}

const CONNECT_TYPE_CONTAINER: ViewStyle = {
  width: '48%',
  height: 52,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.palette.white,

  shadowColor: color.secondary,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.23,
  shadowRadius: 2.62,

  elevation: 4,
}

const FORM: ViewStyle = {
  width: '90%',
  alignSelf: 'center',
  alignItems: 'center',
}

const INPUT_WRAPPER: ViewStyle = {
  marginBottom: spacing[5],
}
const NAME_CONTAINER: ViewStyle = {
  width: '100%',
  alignSelf: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: spacing[5],
}

const INPUT_NAME: ViewStyle = {
  width: '48%',
}

const BUTTON_TEXT: TextStyle = {
  textTransform: 'uppercase',
}

const SUBTEXT_CONTAINER: ViewStyle = {
  alignItems: 'center',
  marginVertical: spacing[6],
}

const PRIVACY_TEXT: ViewStyle = {
  flexDirection: 'row',
}

export const SignUpScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const loading = useSelector(common.loading)
  const sId = useSelector(auth.sId)
  const toastRef = useRef()

  useEffect(() => {
    GoogleSignin.configure({
      iosClientId:
        '738026773059-5snmk9js0o7egfoclidjqfrmi0349oqg.apps.googleusercontent.com',
      offlineAccess: true,
      webClientId:
        '738026773059-ucdk437ahecl429ukojg89i57ssea7gp.apps.googleusercontent.com',
    })
  }, [])

  const onSignUpPress = (data: SignUpCredentials) => {
    if (!loading) {
      if (data.telephone.length <= 10) data.telephone = '1' + data.telephone
      data.telephone = '+' + data.telephone
      data.email = data.email.toLowerCase()
      dispatch(initSignUpSession(data))
    }
  }

  const signUpGoogle = async () => {
    dispatch(signUpWithGoogle({ deviceId: getUniqueId() }))
  }

  const signUpFacebook = async () => {
    dispatch(signUpWithFacebook({ deviceId: getUniqueId() }))
  }

  useEffect(() => {
    if (sId) navigation.navigate(verifyPhoneNumber)
  }, [sId])

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(translate('signUpScreen.enterValidEmail'))
      .required(translate('signUpScreen.emailRequired'))
      .max(100),
    telephone: yup
      .string()
      .matches(NUMBER_REGEX, {
        message: translate('signUpScreen.enterValidNumber'),
      })
      .required(translate('signUpScreen.phoneRequired')),
    firstName: yup
      .string()
      .required(translate('signUpScreen.firstNameRequired'))
      .max(20),
    lastName: yup
      .string()
      .required(translate('signUpScreen.lastNameRequired'))
      .max(20),
    password: yup
      .string()
      .required(translate('signUpScreen.passwordRequired'))
      .matches(PASSWORD_REGEX, {
        message: translate('signUpScreen.passRegexError'),
      }),
    password2: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        translate('signUpScreen.passNotMatch'),
      )
      .required(translate('signUpScreen.password2Required')),
    zipcode: yup.string().required(translate('signUpScreen.zipcodeRequired')),
  })

  interface SignUpHookForm extends SignUpCredentials {
    zipcode: string
    password2: string
  }

  const { control, handleSubmit, errors } = useForm<SignUpHookForm>({
    resolver: yupResolver(schema),
  })

  return (
    <>
      <SafeAreaView />
      <View style={FULL}>
        <BaseScreen
          backgroundColor={color.transparent}
          withoutHorizontalPaddings
        >
          <FlashMessage position='center' ref={toastRef} />
          <View style={HEADER_CONTAINER}>
            <SVGIcon
              icon='appLogo'
              color={color.primary}
              width={118}
              height={50}
            />
          </View>
          <View style={TITLE_CONTAINER}>
            <Text preset='header2bold' tx='signUpScreen.title' />
          </View>
          <View style={TITLE_CONTAINER}>
            <Text tx='signUpScreen.connect1' />
          </View>
          <View style={CONNECT_TYPES_WRAPPER}>
            <TouchableOpacity
              style={CONNECT_TYPE_CONTAINER}
              onPress={() => signUpGoogle()}
            >
              <SVGIcon icon='google' width={21} height={24} />
            </TouchableOpacity>
            <TouchableOpacity
              style={CONNECT_TYPE_CONTAINER}
              onPress={() => signUpFacebook()}
            >
              <SVGIcon icon='fb' width={10} height={23} />
            </TouchableOpacity>
          </View>
          <View style={TITLE_CONTAINER}>
            <Text tx='signUpScreen.connect2' />
          </View>
          <View style={FORM}>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='signUpScreen.email'
                  wrapperStyle={INPUT_WRAPPER}
                  keyboardType='email-address'
                  value={value}
                  autoCapitalize='none'
                  onChangeText={(newValue) => onChange(newValue)}
                  errorText={errors.email?.message}
                />
              )}
              name='email'
              rules={{ required: true }}
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='signUpScreen.phoneNumber'
                  wrapperStyle={INPUT_WRAPPER}
                  keyboardType='number-pad'
                  value={value}
                  onChangeText={(newValue) => onChange(newValue)}
                  maxLength={16}
                  errorText={errors.telephone?.message}
                />
              )}
              name='telephone'
              rules={{ required: true }}
              defaultValue=''
            />
            <View style={NAME_CONTAINER}>
              <View style={INPUT_NAME}>
                <Controller
                  control={control}
                  render={({ onChange, value }) => (
                    <Input
                      placeholder='signUpScreen.firstName'
                      value={value}
                      onChangeText={(newValue) => onChange(newValue)}
                      errorText={errors.firstName?.message}
                    />
                  )}
                  name='firstName'
                  rules={{ required: true }}
                  defaultValue=''
                />
              </View>
              <View style={INPUT_NAME}>
                <Controller
                  control={control}
                  render={({ onChange, value }) => (
                    <Input
                      placeholder='signUpScreen.lastName'
                      value={value}
                      onChangeText={(newValue) => onChange(newValue)}
                      errorText={errors.lastName?.message}
                    />
                  )}
                  name='lastName'
                  rules={{ required: true }}
                  defaultValue=''
                />
              </View>
            </View>
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='signUpScreen.password1'
                  secureTextEntry
                  value={value}
                  onChangeText={(newValue) => onChange(newValue)}
                  wrapperStyle={INPUT_WRAPPER}
                  errorText={errors.password?.message}
                />
              )}
              name='password'
              rules={{ required: true }}
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='signUpScreen.password2'
                  secureTextEntry
                  value={value}
                  onChangeText={(newValue) => onChange(newValue)}
                  wrapperStyle={INPUT_WRAPPER}
                  errorText={errors.password2?.message}
                />
              )}
              name='password2'
              rules={{ required: true }}
              defaultValue=''
            />
            <Controller
              control={control}
              render={({ onChange, value }) => (
                <Input
                  placeholder='signUpScreen.zipcode'
                  value={value}
                  onChangeText={(newValue) => onChange(newValue)}
                  wrapperStyle={INPUT_WRAPPER}
                  errorText={errors.zipcode?.message}
                  keyboardType='number-pad'
                />
              )}
              name='zipcode'
              rules={{ required: true }}
              defaultValue=''
            />
            <Button
              testID='next-screen-button'
              preset={loading ? 'secondaryLoading' : 'secondary'}
              tx='signUpScreen.btnText'
              textStyle={BUTTON_TEXT}
              onPress={handleSubmit(onSignUpPress)}
              disabled={loading}
            />
          </View>
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
        </BaseScreen>
      </View>
    </>
  )
}

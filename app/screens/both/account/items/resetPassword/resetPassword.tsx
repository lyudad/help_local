/* eslint-disable */
import React, { useEffect } from 'react'
import { View, ViewStyle, KeyboardAvoidingView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Text,
  Button,
  Input,
  Toast,
  ScrollViewWithGradientStateUpdater,
} from 'components'
import { spacing } from 'theme'
import { ERequestStatus, IResetPassword } from 'interfaces'
import { common, user } from 'app/store/selectors'
import { resetPassword } from 'screens/both/thunk'
import { translate } from 'i18n'
import { PASSWORD_REGEX } from 'constants/regex'
import { HZ_PADDING_5_PERCENT } from 'constants/common-styles'
import { setRequestsStatus } from 'screens/both/reducers'

const TITLE_CONTAINER: ViewStyle = {
  alignItems: 'flex-start',
  marginBottom: spacing[6],
}
const INPUTS_CONTAINER: ViewStyle = {
  width: '100%',
}
const INPUT: ViewStyle = {
  marginTop: spacing[2],
  marginVertical: spacing[1],
}
const BUTTON: ViewStyle = {
  marginTop: spacing[8] - 6,
}

export const ResetPassword = (): JSX.Element => {
  const dispatch = useDispatch()
  const loading = useSelector(common.loading)
  const acessToken = useSelector(user.accessToken)
  const textError = useSelector(common.error)
  const textSuccess = useSelector(common.success)

  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required(translate('resetPassword.passwordRequired')),
    password: yup
      .string()
      .required(translate('resetPassword.newPasswordRequired'))
      .matches(PASSWORD_REGEX, {
        message: translate('signUpScreen.passRegexError'),
      }),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        translate('signUpScreen.passNotMatch'),
      )
      .required(translate('common.errorRequiredField')),
  })

  const { control, handleSubmit, errors, reset } = useForm<IResetPassword>({
    resolver: yupResolver(schema),
  })

  const onResetPassword = (data: IResetPassword) => {
    if (!loading) {
      dispatch(
        resetPassword({
          oldPassword: data.oldPassword,
          password: data.password,
          acessToken,
        }),
      )
    }
  }

  const requestsStatus = useSelector(user.requestsStatus)

  useEffect(() => {
    if (
      requestsStatus.changeCredentialsRequestStatus !==
      ERequestStatus.NOT_SENT_YET
    ) {
      if (
        requestsStatus.changeCredentialsRequestStatus === ERequestStatus.SUCCESS
      ) {
        reset()
      }
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          changeCredentialsRequestStatus: ERequestStatus.NOT_SENT_YET,
        }),
      )
    }
  }, [requestsStatus])

  return (
    // @ts-ignore
    <ScrollViewWithGradientStateUpdater contentContainerStyle={{ flexGrow: 1 }}>
      <KeyboardAvoidingView behavior='padding'>
        <View style={HZ_PADDING_5_PERCENT}>
          <View style={TITLE_CONTAINER}>
            <Text preset='header3bold' tx='resetPassword.title' />
          </View>
          <Toast
            text={textError || textSuccess}
            preset={textError ? 'dangerous' : 'success'}
          />
          <View>
            <View style={INPUTS_CONTAINER}>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <Input
                    styleContainer={INPUT}
                    placeholder='resetPassword.oldPassword'
                    value={value}
                    secureTextEntry
                    onChangeText={(newValue) => onChange(newValue)}
                    errorText={errors.oldPassword?.message}
                  />
                )}
                name='oldPassword'
                rules={{ required: true }}
                defaultValue=''
              />
              <View></View>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <Input
                    placeholder='resetPassword.newPassword'
                    secureTextEntry
                    value={value}
                    onChangeText={(newValue) => onChange(newValue)}
                    styleContainer={INPUT}
                    errorText={errors.password?.message}
                  />
                )}
                name='password'
                rules={{ required: true }}
                defaultValue=''
              />
              <View></View>
              <Controller
                control={control}
                render={({ onChange, value }) => (
                  <Input
                    placeholder='resetPassword.confirmPassword'
                    secureTextEntry
                    value={value}
                    onChangeText={(newValue) => onChange(newValue)}
                    styleContainer={INPUT}
                    errorText={errors.confirmPassword?.message}
                  />
                )}
                name='confirmPassword'
                rules={{ required: true }}
                defaultValue=''
              />
            </View>
            <View></View>
            <Button
              style={BUTTON}
              preset={loading ? 'secondaryLoading' : 'primary'}
              tx='common.save'
              onPress={handleSubmit(onResetPassword)}
              disabled={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollViewWithGradientStateUpdater>
  )
}

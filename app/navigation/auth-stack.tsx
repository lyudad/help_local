import React from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import {
  SplashScreen,
  LoginScreen,
  SignUpScreen,
  VerifyPhoneNumberScreen,
  PasswordResetScreen,
  VerifyPhoneNumberForResetScreen,
  NewPasswordScreen,
} from 'screens/auth'
import {
  splash,
  login,
  signUp,
  verifyPhoneNumber,
  passwordReset,
  privacyAndTerms,
  verifyPhoneNumberForReset,
  newPassword,
} from 'constants/routes'
import { PrivacyAndTermsScreen } from 'screens/all'
import { AllStackParamList } from 'navigation'
import { useSelector } from 'react-redux'
import { auth } from 'app/store/selectors'
import { RouteProp } from '@react-navigation/native'

// import { PrivacyAndTermsScreen } from 'screens/all'

export type AuthStackParamList = AllStackParamList & {
  postJob: undefined
  passwordReset: undefined
  splash: undefined
  signUp: undefined
  verifyPhoneNumber: undefined
  verifyPhoneNumberForReset: { numberForResendCode: string }
  newPassword: undefined
  login: { infoText: string }
  setUpHelperProfile: undefined
  createJob: undefined
}

export type AuthStackRouteProps<
  RouteName extends keyof AuthStackParamList
> = RouteProp<AuthStackParamList, RouteName>

const Stack = createStackNavigator<AuthStackParamList>()

export const AuthStack = (): JSX.Element => {
  const transparentHeader = (): StackNavigationOptions => {
    return {
      headerTitle: null,
      headerTransparent: true,
      headerLeft: () => null,
    }
  }

  const forgotPasswordSessionId: number = useSelector(
    auth.forgotPasswordSessionId,
  )

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name={splash}
        component={SplashScreen}
        options={transparentHeader}
      />
      <Stack.Screen
        name={login}
        component={LoginScreen}
        options={transparentHeader}
      />
      <Stack.Screen
        name={signUp}
        component={SignUpScreen}
        options={transparentHeader}
      />
      <Stack.Screen
        name={verifyPhoneNumber}
        component={VerifyPhoneNumberScreen}
        options={transparentHeader}
      />
      {forgotPasswordSessionId && (
        <>
          <Stack.Screen
            name={verifyPhoneNumberForReset}
            component={VerifyPhoneNumberForResetScreen}
            options={transparentHeader}
          />
          <Stack.Screen
            name={newPassword}
            component={NewPasswordScreen}
            options={transparentHeader}
          />
        </>
      )}
      <Stack.Screen
        name={passwordReset}
        component={PasswordResetScreen}
        options={transparentHeader}
      />
      <Stack.Screen
        name={privacyAndTerms}
        component={PrivacyAndTermsScreen}
        options={transparentHeader}
      />
    </Stack.Navigator>
  )
}

import { RouteProp } from '@react-navigation/native'

export type AllStackParamList = {
  privacyAndTerms: { whichTextShouldBeShown: 'privacy' | 'terms' }
}

export type AllStackRouteProps<
  RouteName extends keyof AllStackParamList
> = RouteProp<AllStackParamList, RouteName>

/*
const Stack = createStackNavigator<AllStackParamList>()

export const AllStack = (): JSX.Element => {
  const transparentHeader = (): StackNavigationOptions => {
    return {
      headerTitle: null,
      headerTransparent: true,
      headerLeft: () => null,
    }
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen
        name={privacyAndTerms}
        component={PrivacyAndTermsScreen}
        options={transparentHeader}
      />
    </Stack.Navigator>
  )
} */

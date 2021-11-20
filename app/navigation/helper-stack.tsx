import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import {
  SetUpHelperProfileScreen,
  JobListingFullScreen,
  JobBidScreen,
  JobBidsScreen,
  BidSubmittedScreen,
  // ApprovedScreen,
  HelperDashboardScreen,
  ActiveBidScreen,
  // HelperCheckScreen,
} from 'screens/helper'
import {
  bidSubmitted,
  helperDashboard,
  jobListingFull,
  jobBid,
  jobBids,
  setUpHelperProfile,
  // approved,
  activeBid,
  // helperCheck,
} from 'constants/routes'
import { useSelector } from 'react-redux'
import { user } from 'app/store/selectors'
import { HelperProfile, AdditionalHeaderTypes } from 'interfaces'

export type HelperStackParamList = {
  helperDashboard: { isHeaderInput: boolean }
  jobListingFull: { id: number }
  jobBid: { id: number; isUpdate?: boolean; bidType?: AdditionalHeaderTypes }
  jobBids: undefined
  setUpHelperProfile: undefined
  bidSubmitted: { isUpdate?: boolean }
  approved: undefined
  activeBid: { bidId: number }
  helperCheck: undefined
}

export type HelperStackRouteProps<
  RouteName extends keyof HelperStackParamList
> = RouteProp<HelperStackParamList, RouteName>

const Stack = createStackNavigator<HelperStackParamList>()

export const HelperStack = (): JSX.Element => {
  const helperProfile: HelperProfile | null = useSelector(user.helperProfile)
  // const activeProfile = useSelector(user.activeProfile)
  // const helper = 'helper'

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {!helperProfile && (
        <>
          {/* activeProfile === helper && (
            <>
              <Stack.Screen name={helperCheck} component={HelperCheckScreen} />
              <Stack.Screen name={approved} component={ApprovedScreen} />
            </>
          ) */}
          <Stack.Screen
            name={setUpHelperProfile}
            component={SetUpHelperProfileScreen}
          />
        </>
      )}
      <Stack.Screen name={helperDashboard} component={HelperDashboardScreen} />
      <Stack.Screen name={jobListingFull} component={JobListingFullScreen} />
      <Stack.Screen name={jobBid} component={JobBidScreen} />
      <Stack.Screen name={jobBids} component={JobBidsScreen} />
      <Stack.Screen name={bidSubmitted} component={BidSubmittedScreen} />
      <Stack.Screen name={activeBid} component={ActiveBidScreen} />
    </Stack.Navigator>
  )
}

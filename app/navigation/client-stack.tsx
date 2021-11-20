import React from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'

import {
  JobDetailScreen,
  HelperProfileScreen,
  PostJobScreen,
  ViewBidsScreen,
  ClientDashboardScreen,
  MyJobsScreen,
  BidChosenScreen,
} from 'screens/client'

import {
  postJob,
  clientDashboard,
  jobDetail,
  helperProfile,
  viewBids,
  myJobs,
  bidChosen,
} from 'constants/routes'
import { ICategory, IJobBidsListItem } from 'interfaces'

export type ClientStackParamList = {
  clientDashboard: { isHeaderInput: boolean }
  jobDetail: { id: number }
  postJob: {
    isEditJobMode: boolean
    isCameFromOtherScreenWithJobInfoForReuse?: boolean
    inviteIds?: string[]
    category?: ICategory
  }
  rejection: undefined
  helperProfile: { id: number }
  viewBids: undefined
  myJobs: undefined
  bidChosen: { bidInfo: IJobBidsListItem }
}

export type ClientStackRouteProps<
  RouteName extends keyof ClientStackParamList
> = RouteProp<ClientStackParamList, RouteName>

const Stack = createStackNavigator<ClientStackParamList>()

export const ClientStack = (): JSX.Element => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name={clientDashboard} component={ClientDashboardScreen} />
      <Stack.Screen name={myJobs} component={MyJobsScreen} />
      <Stack.Screen name={helperProfile} component={HelperProfileScreen} />
      <Stack.Screen name={jobDetail} component={JobDetailScreen} />
      <Stack.Screen name={bidChosen} component={BidChosenScreen} />
      <Stack.Screen
        name={postJob}
        component={PostJobScreen}
        initialParams={{
          isEditJobMode: false,
          isCameFromOtherScreenWithJobInfoForReuse: false,
        }}
      />
      <Stack.Screen name={viewBids} component={ViewBidsScreen} />
    </Stack.Navigator>
  )
}

import React, { useEffect } from 'react'
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { useSelector } from 'react-redux'

import { user } from 'app/store/selectors'
import {
  FinalizeAccountScreen,
  MessageScreen,
  MessagesListScreen,
  AccountScreen,
  ContactUsScreen,
  GotItScreen,
  PostReviewScreen,
  NotificationsScreen,
  DeactivationScreen,
  AccountBlockedScreen,
} from 'screens/both'
import {
  JobDetailScreen,
  HelperProfileScreen,
  PostJobScreen,
  ViewBidsScreen,
  ClientDashboardScreen,
  MyJobsScreen,
  BidChosenScreen,
  JobPostedScreen,
} from 'screens/client'
import {
  SetUpHelperProfileScreen,
  JobListingFullScreen,
  JobBidScreen,
  JobBidsScreen,
  BidSubmittedScreen,
  HelperDashboardScreen,
  ActiveBidScreen,
  CompletedJobHelper,
  HelperCheckScreen,
  ApprovedScreen,
  RejectionScreen,
} from 'screens/helper'
import { PrivacyAndTermsScreen } from 'screens/all'
import {
  // both
  finalizeAccount,
  message,
  messagesList,
  account,
  contactUs,
  gotIt,
  postReview,
  privacyAndTerms,
  notifications,
  deactivation,
  // consumer
  postJob,
  clientDashboard,
  jobDetail,
  helperProfile,
  viewBids,
  myJobs,
  bidChosen,
  // helper
  bidSubmitted,
  helperDashboard,
  jobListingFull,
  jobBid,
  jobBids,
  setUpHelperProfile,
  activeBid,
  jobPosted,
  completedJobHelper,
  accountBlocked,
  helperCheck,
  approved,
  rejection,
} from 'constants/routes'
import * as Api from 'app/api/'
import {
  AdditionalHeaderTypes,
  FullProfile,
  HelperProfile,
  IBidInfo,
  ICategory,
  ICheckoutPreview,
  IJobBidsListItem,
  IJobInfo,
} from 'interfaces'
import messaging from '@react-native-firebase/messaging'
import { AllStackParamList } from './all-stack'

type ClientStackParamList = {
  clientDashboard: {
    isHeaderInput: boolean
    showSetupPaymentModal: boolean
  }
  jobDetail: { id: number }
  postJob: {
    isEditJobMode: boolean
    isCameFromOtherScreenWithJobInfoForReuse?: boolean
    inviteIds?: string[]
    category?: ICategory
  }
  rejection: undefined
  helperProfile: {
    id: number
    textBack?: string
  }
  viewBids: undefined
  myJobs: undefined
  bidChosen: { bidInfo: IJobBidsListItem }
  jobPosted: undefined
}

type HelperStackParamList = {
  helperDashboard: { isHeaderInput: boolean }
  jobListingFull: { id: number }
  jobBid: { id: number; isUpdate?: boolean; bidType?: AdditionalHeaderTypes }
  jobBids: undefined
  setUpHelperProfile: undefined
  bidSubmitted: { isUpdate?: boolean }
  approved: undefined
  activeBid: { bidId: number }
  helperCheck: undefined
  completedJobHelper: { bidId: number }
}

export type UserStackParamList = AllStackParamList &
  ClientStackParamList &
  HelperStackParamList & {
    finalizeAccount: undefined
    message: {
      showArchived?: boolean
      isChatArchivedModalOpen?: boolean
    }
    messagesList: {
      // isActiveJob: boolean
      textBack?: string
    }
    account: {
      itemIndex?: number
      paidJobMiniInfoToShowReceiptOnModal?: {
        id: number
        title: string
        completedByConsumerAt: string
        charges?: ICheckoutPreview
      }
    }
    contactUs: { isAccountQuestion?: true }
    gotIt: undefined
    privacyPolicy: undefined
    notifications: undefined

    postReview: {
      jobInfo?: IJobInfo
      bidInfo?: IBidInfo
    }
    deactivation: undefined
    accountBlocked: undefined
  }

export type UserStackRouteProps<RouteName extends keyof UserStackParamList> =
  RouteProp<UserStackParamList, RouteName>

const Stack = createStackNavigator<UserStackParamList>()

export const UserStack = (): JSX.Element => {
  const profile: FullProfile = useSelector(user.profile)
  const activeProfile = useSelector(user.activeProfile)
  const currentRole = useSelector(user.currentRole)
  const helperProfileFromState: HelperProfile | null = useSelector(
    user.helperProfile,
  )

  const helper = 'helper'

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken()
    if (fcmToken) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      Api.sendTocken({ fcm_token: fcmToken })
      // eslint-disable-next-line no-console
      console.log('Your Firebase Token is:', fcmToken)
    } else {
      // eslint-disable-next-line no-console
      console.log('Failed', 'No token received')
    }
  }

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    if (enabled) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getFcmToken()
    }
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    requestUserPermission()
  }, [])

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      {profile.isSuspended ? (
        <>
          <Stack.Screen
            name={accountBlocked}
            component={AccountBlockedScreen}
          />
          <Stack.Screen name={account} component={AccountScreen} />
        </>
      ) : (
        <>
          {!activeProfile && (
            <Stack.Screen
              name={finalizeAccount}
              component={FinalizeAccountScreen}
            />
          )}
          {currentRole === 'consumer' && (
            <>
              <Stack.Screen
                name={clientDashboard}
                component={ClientDashboardScreen}
              />
              <Stack.Screen name={myJobs} component={MyJobsScreen} />
              <Stack.Screen
                name={helperProfile}
                component={HelperProfileScreen}
              />
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
              <Stack.Screen name={jobPosted} component={JobPostedScreen} />
            </>
          )}
          {currentRole === helper && (
            <>
              {!helperProfileFromState && (
                <>
                  {activeProfile === helper && (
                    <>
                      <Stack.Screen
                        name={helperCheck}
                        component={HelperCheckScreen}
                      />
                      <Stack.Screen
                        name={approved}
                        component={ApprovedScreen}
                      />
                      <Stack.Screen
                        name={rejection}
                        component={RejectionScreen}
                      />
                    </>
                  )}
                  <Stack.Screen
                    name={setUpHelperProfile}
                    component={SetUpHelperProfileScreen}
                  />
                </>
              )}
              <Stack.Screen
                name={helperDashboard}
                component={HelperDashboardScreen}
              />
              <Stack.Screen
                name={jobListingFull}
                component={JobListingFullScreen}
              />
              <Stack.Screen name={jobBid} component={JobBidScreen} />
              <Stack.Screen name={jobBids} component={JobBidsScreen} />
              <Stack.Screen
                name={bidSubmitted}
                component={BidSubmittedScreen}
              />
              <Stack.Screen name={activeBid} component={ActiveBidScreen} />
              <Stack.Screen
                name={completedJobHelper}
                component={CompletedJobHelper}
              />
            </>
          )}
          <Stack.Screen name={account} component={AccountScreen} />
          <Stack.Screen name={gotIt} component={GotItScreen} />
          <Stack.Screen name={messagesList} component={MessagesListScreen} />
          <Stack.Screen name={postReview} component={PostReviewScreen} />
          <Stack.Screen name={notifications} component={NotificationsScreen} />
          <Stack.Screen name={deactivation} component={DeactivationScreen} />
          <Stack.Screen
            name={message}
            component={MessageScreen}
            initialParams={{
              isChatArchivedModalOpen: false,
            }}
          />
        </>
      )}
      <Stack.Screen name={contactUs} component={ContactUsScreen} />
      <Stack.Screen name={privacyAndTerms} component={PrivacyAndTermsScreen} />
    </Stack.Navigator>
  )
}

const exitRoutes = []

export const canExit = (routeName: string): boolean =>
  exitRoutes.includes(routeName)

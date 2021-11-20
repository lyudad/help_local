/* eslint-disable no-console */
import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { api } from 'app/services/api'
import { user } from 'app/store/selectors'
import { Text } from 'components'
import {
  account,
  approved,
  bidSubmitted,
  clientDashboard,
  contactUs,
  finalizeAccount,
  helperDashboard,
  jobBid,
  jobDetail,
  jobListingFull,
  message,
  messagesList,
  myJobs,
  notifications,
  postJob,
  rejection,
  setUpHelperProfile,
  gotIt,
  viewBids,
  bidChosen,
  helperProfile,
  activeBid,
  jobBids,
  helperCheck,
} from 'constants/routes'
import { color, spacing } from 'theme'
import { resetAllExceptWelcomeMsg } from 'screens/both/reducers'
import { resetAll as resetAllClient } from 'screens/client/reducers'
import { resetAll as resetAllHelper } from 'screens/helper/reducers'
import { resetAll as resetAllAuth } from 'screens/auth/reducers'
import { resetAll as resetAllCommon } from 'app/store/commonSlice'
import { FLEX_1 } from 'constants/common-styles'

const ITEM: ViewStyle = {
  marginVertical: spacing[2],
}

const WRAPPER: ViewStyle = {
  height: '95%',
  width: '100%',
}

const BOX: ViewStyle = {
  height: '100%',
}

const BOX_ROW: ViewStyle = {
  flexDirection: 'row',
}

const ONE_OF_4: ViewStyle = {
  paddingVertical: spacing[3],
}

export const DeveloperMenu = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const navigateToClientDashboard = useCallback(
    () => navigation.navigate(clientDashboard),
    [navigation],
  )
  const navigateToFinalizeAccount = useCallback(
    () => navigation.navigate(finalizeAccount),
    [navigation],
  )
  const navigateToAccount = useCallback(() => navigation.navigate(account), [
    navigation,
  ])
  const navigateToMessage = useCallback(() => navigation.navigate(message), [
    navigation,
  ])
  const navigateToMessagesList = useCallback(
    () => navigation.navigate(messagesList),
    [navigation],
  )
  const navigateToJobDetail = useCallback(
    () => navigation.navigate(jobDetail, { id: 2 }),
    [navigation],
  )
  const navigateToNotifications = useCallback(
    () => navigation.navigate(notifications),
    [navigation],
  )
  const navigateToSetUpHelperProfile = useCallback(
    () => navigation.navigate(setUpHelperProfile),
    [navigation],
  )
  const navigateToPostJob = useCallback(() => navigation.navigate(postJob), [
    navigation,
  ])
  const navigateToHelperDashboard = useCallback(
    () => navigation.navigate(helperDashboard),
    [navigation],
  )
  const navigateToJobListingFull = useCallback(
    () => navigation.navigate(jobListingFull, { id: 1 }),
    [navigation],
  )
  const navigateToMyJobs = useCallback(() => navigation.navigate(myJobs), [
    navigation,
  ])
  const navigateToContactUs = useCallback(
    () => navigation.navigate(contactUs),
    [navigation],
  )
  const navigateToRejection = useCallback(
    () => navigation.navigate(rejection),
    [navigation],
  )
  const navigateToApproved = useCallback(() => navigation.navigate(approved), [
    navigation,
  ])
  const navigateToBidSubmited = useCallback(
    () => navigation.navigate(bidSubmitted),
    [navigation],
  )
  const navigateToJobBid = useCallback(
    () => navigation.navigate(jobBid, { id: 21 }),
    [navigation],
  )
  const navigateToGotIt = useCallback(() => navigation.navigate(gotIt), [
    navigation,
  ])
  const navigateToViewBids = useCallback(() => navigation.navigate(viewBids), [
    navigation,
  ])
  const navigateToBidChosen = useCallback(
    () => navigation.navigate(bidChosen),
    [navigation],
  )
  const navigateToHelperProfile = useCallback(
    () => navigation.navigate(helperProfile),
    [navigation],
  )
  const navigateToActiveBid = useCallback(
    () => navigation.navigate(activeBid),
    [navigation],
  )
  const navigateToJobBids = useCallback(() => navigation.navigate(jobBids), [
    navigation,
  ])
  const navigateToHelperCheck = useCallback(
    () => navigation.navigate(helperCheck),
    [navigation],
  )

  /*
    const setAccountTypeConsumer = useCallback(
      () => dispatch(changeActiveProfile('consumer')),
      [dispatch],
    )
    const setAccountTypeHelper = useCallback(
      () => dispatch(changeActiveProfile('helper')),
      [dispatch],
    )
    */
  // const activeProfile = useSelector(user.activeProfile)

  const accessToken = useSelector(user.accessToken)
  const printAccessToken = useCallback(() => console.log(accessToken), [
    accessToken,
  ])

  const logOut = useCallback(() => {
    dispatch(resetAllAuth())
    dispatch(resetAllCommon())
    dispatch(resetAllClient())
    dispatch(resetAllHelper())
    dispatch(resetAllExceptWelcomeMsg())
  }, [dispatch])

  return (
    <ScrollView style={WRAPPER}>
      <View style={ITEM}>
        <Text text='Developer menu' preset='header3' color={color.primary} />
      </View>
      <View style={BOX}>
        <View style={FLEX_1}>
          <View style={BOX_ROW}>
            <View style={FLEX_1}>
              <View style={ONE_OF_4}>
                <Text text='Client' preset='header2' color={color.primary} />
                <TouchableOpacity
                  onPress={navigateToClientDashboard}
                  style={ITEM}
                >
                  <Text preset='header4'>Client dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToJobDetail} style={ITEM}>
                  <Text preset='header4'>Job detail</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToPostJob} style={ITEM}>
                  <Text preset='header4'>Post job</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMyJobs} style={ITEM}>
                  <Text preset='header4'>My jobs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToRejection} style={ITEM}>
                  <Text preset='header4'>Rejection</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToViewBids} style={ITEM}>
                  <Text preset='header4'>View Bids</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToBidChosen} style={ITEM}>
                  <Text preset='header4'>Bid Chosen</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigateToHelperProfile}
                  style={ITEM}
                >
                  <Text preset='header4'>Helper Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={FLEX_1}>
              <View style={ONE_OF_4}>
                <Text text='Helper' preset='header2' color={color.primary} />
                <TouchableOpacity
                  onPress={navigateToSetUpHelperProfile}
                  style={ITEM}
                >
                  <Text preset='header4'>Setup helper profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigateToHelperDashboard}
                  style={ITEM}
                >
                  <Text preset='header4'>Helper Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigateToJobListingFull}
                  style={ITEM}
                >
                  <Text preset='header4'>Job listing full</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToApproved} style={ITEM}>
                  <Text preset='header4'>Approved</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToBidSubmited} style={ITEM}>
                  <Text preset='header4'>Bid submited</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToJobBid} style={ITEM}>
                  <Text preset='header4'>Job bid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToJobBids} style={ITEM}>
                  <Text preset='header4'>Job bidS</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToActiveBid} style={ITEM}>
                  <Text preset='header4'>Active Bid</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToHelperCheck} style={ITEM}>
                  <Text preset='header4'>Helper Check</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={FLEX_1}>
          <View style={BOX_ROW}>
            <View style={FLEX_1}>
              <View style={ONE_OF_4}>
                <Text text='For both' preset='header2' color={color.primary} />
                <TouchableOpacity
                  onPress={navigateToFinalizeAccount}
                  style={ITEM}
                >
                  <Text preset='header4'>Finalize account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToAccount} style={ITEM}>
                  <Text preset='header4'>Account</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToGotIt} style={ITEM}>
                  <Text preset='header4'>Got it</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMessage} style={ITEM}>
                  <Text preset='header4'>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToMessagesList} style={ITEM}>
                  <Text preset='header4'>Messages list</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={navigateToNotifications}
                  style={ITEM}
                >
                  <Text preset='header4'>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToContactUs} style={ITEM}>
                  <Text preset='header4'>Contact us</Text>
                </TouchableOpacity>
                {/*
                <TouchableOpacity onPress={logOut} style={ITEM}>
                  <Text preset='header4'>Log out</Text>
                </TouchableOpacity>
                */}
                <TouchableOpacity onPress={printAccessToken} style={ITEM}>
                  <Text preset='header4'>Print access token to console</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    await api.post('dev_delete_acc')
                    logOut()
                  }}
                  style={ITEM}
                >
                  <Text preset='header4'>Delete my account</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={FLEX_1}>
              <View style={ONE_OF_4}>
                <Text text='Auth' preset='header2' color={color.primary} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

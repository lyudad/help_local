import React, { useEffect } from 'react'
import {
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageStyle,
} from 'react-native'

import { SVGIcon, Text } from 'components'
import { color, spacing } from 'theme'
import {
  PADDING_BOTTOM_SP3,
  PADDING_BOTTOM_SP6,
  PADDING_TOP_SP3,
  PADDING_TOP_SP4,
  UNDERLINE,
} from 'constants/common-styles'
import { useDispatch, useSelector } from 'react-redux'
import { FullProfile } from 'interfaces'
import { helper } from 'app/store/selectors'
import { setProfile } from 'screens/both/reducers'
import { useIsFocused } from '@react-navigation/native'

const circleImg = require('assets/setup-completed.png')

const WRAPPER: ViewStyle = {
  paddingTop: spacing[7] - 7,
  paddingBottom: spacing[7],
  alignItems: 'center',
}

const INFO_VIEW: ViewStyle = {
  width: '80%',
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: spacing[4],
  width: '100%',
}

const CIRCLE_IMAGE: ImageStyle = {
  width: '100%',
  height: 355,
}

export const SetupCompleted = (): JSX.Element => {
  const dispatch = useDispatch()
  const profileAfterSetupHelperProfile: FullProfile | null = useSelector(
    helper.profileAfterSetupHelperProfile,
  )
  const isFocused: boolean = useIsFocused()

  const navigateToHelperDashboard = (): void => {
    dispatch(
      setProfile({
        ...profileAfterSetupHelperProfile,
        activeProfile: 'helper',
      }),
    )
  }

  useEffect(() => {
    if (!isFocused) {
      dispatch(
        setProfile({
          ...profileAfterSetupHelperProfile,
          activeProfile: 'helper',
        }),
      )
    }
  }, [isFocused])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={WRAPPER}>
        <SVGIcon icon='checkInCircle' size={45} color={color.primary} />
        <View style={{ ...PADDING_TOP_SP4, ...PADDING_BOTTOM_SP3 }}>
          <Text
            preset='header1'
            tx='setUpHelperProfileScreen.profileComplete'
          />
        </View>
        <View style={INFO_VIEW}>
          <Text tx='setUpHelperProfileScreen.completeDesc' />
        </View>
        <TouchableOpacity
          style={{
            ...PADDING_TOP_SP3,
            ...PADDING_BOTTOM_SP6,
          }}
          onPress={navigateToHelperDashboard}
        >
          <Text
            tx='setUpHelperProfileScreen.toHelperDashboard'
            preset='header4'
            color={color.primary}
            style={{ ...UNDERLINE }}
          />
        </TouchableOpacity>
        <View style={CIRCLE_IMAGE_CONTAINER}>
          <Image style={CIRCLE_IMAGE} source={circleImg} />
        </View>
      </View>
    </ScrollView>
  )
}

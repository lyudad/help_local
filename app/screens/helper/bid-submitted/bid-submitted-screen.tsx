/* eslint-disable */
import React from 'react'
import { View, ViewStyle, Image, ImageStyle } from 'react-native'
import { useRoute } from '@react-navigation/native'

import { Header, Screen, Text, SVGIcon, BottomNavigation } from 'components'
import { UserStackRouteProps } from 'navigation'
import { color, spacing } from 'theme'

const FULL: ViewStyle = {
  flex: 1,
}
const ICON_CONTAINER: ViewStyle = {
  marginTop: spacing[8],
  marginBottom: spacing[5],
  alignItems: 'center',
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: spacing[5],
}
const IMG: ImageStyle = {
  width: '100%',
  height: 360,
}

export const BidSubmittedScreen = (): JSX.Element => {
  const route = useRoute<UserStackRouteProps<'bidSubmitted'>>()

  const circleImg = require('assets/job-submitted.png')
  return (
    <View style={FULL}>
      <Header
        placeholder='header.helperPlaceholder'
        textBack='jobBid.headerTextBack'
      />
      <Screen preset='fixed'>
        <View style={ICON_CONTAINER}>
          <SVGIcon icon='like' size={40} color={color.primary} />
        </View>
        <Text
          preset='header1'
          tx={
            route.params?.isUpdate
              ? 'bidSubmitted.title2'
              : 'bidSubmitted.title1'
          }
        />
        <View style={CIRCLE_IMAGE_CONTAINER}>
          <Image source={circleImg} style={IMG} />
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

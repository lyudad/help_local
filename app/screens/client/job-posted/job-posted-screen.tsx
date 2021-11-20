import React from 'react'
import { View, ViewStyle } from 'react-native'

import { Screen, Header, BottomNavigation } from 'components'
import { color } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { useSelector } from 'react-redux'
import { consumer } from 'app/store/selectors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { clientDashboard } from 'constants/routes'
import { JobPosted } from '../post-job/sub-components'

const FULL: ViewStyle = { flex: 1 }

const WRAPPER: ViewStyle = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
}

export const JobPostedScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const lastPostedCachedJobId: number = useSelector(
    consumer.lastPostedCachedJobId,
  )
  const navigation = useNavigation()
  const isScrenFocused: boolean = useIsFocused()

  if (!lastPostedCachedJobId && isScrenFocused) {
    navigation.navigate(clientDashboard)
  }

  return (
    <View style={FULL}>
      <Header clientBtn headerAnimate={headerStyle} />
      <Screen
        preset='fixed'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <View style={WRAPPER}>
          {lastPostedCachedJobId && isScrenFocused && <JobPosted />}
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

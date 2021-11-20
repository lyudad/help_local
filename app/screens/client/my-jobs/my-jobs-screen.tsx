import React from 'react'
import { View, ViewStyle } from 'react-native'

import { Screen, Text, Header, JobLists, BottomNavigation } from 'components'
import { color } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { PADDING_VERTICAL_SP6 } from 'constants/common-styles'

const FULL: ViewStyle = { flex: 1 }

const WRAPPER: ViewStyle = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
}

export const MyJobsScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)

  return (
    <View style={FULL}>
      <Header clientBtn headerAnimate={headerStyle} />
      <Screen
        preset='scroll'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <View style={PADDING_VERTICAL_SP6}>
          <Text tx='myJobs.title' preset='header1' />
        </View>
        <View style={WRAPPER}>
          <JobLists showPreviousJobs />
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

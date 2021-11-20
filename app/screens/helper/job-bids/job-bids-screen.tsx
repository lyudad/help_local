/* eslint-disable */
import React, { useCallback, useState } from 'react'
import { View, ViewStyle } from 'react-native'

import { Header, Screen, BidLists, Text, BottomNavigation } from 'components'
import { color } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { PADDING_VERTICAL_SP6 } from 'constants/common-styles'
import { useFocusEffect } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { user } from 'app/store/selectors'
import { HelperProfile } from 'interfaces'

const FULL: ViewStyle = {
  flex: 1,
}
const WRAPPER: ViewStyle = {
  flex: 1,
  width: '90%',
  alignSelf: 'center',
}

export const JobBidsScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const [
    isFinishProfileModalOpen,
    setIsFinishProfileModalOpen,
  ] = useState<boolean>(false)
  const helperProfile: HelperProfile | null = useSelector(user.helperProfile)

  useFocusEffect(
    useCallback(() => {
      if (!helperProfile) setIsFinishProfileModalOpen(true)
    }, [helperProfile]),
  )

  return (
    <View style={FULL}>
      <Header
        headerAnimate={headerStyle}
        placeholder='header.helperPlaceholder'
        isFinishProfileModalOpen={isFinishProfileModalOpen}
        onCloseFinishProfileModal={() => {
          setIsFinishProfileModalOpen(false)
        }}
      />
      <Screen
        preset='scroll'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <View style={PADDING_VERTICAL_SP6}>
          <Text tx='jobBidsScreen.title' preset='header1' />
        </View>
        <View style={WRAPPER}>
          <BidLists />
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

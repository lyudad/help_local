/* eslint-disable */
import * as React from 'react'
import { ViewStyle } from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import { common } from 'app/store/selectors'
import { useEffect, useState } from 'react'

import { WINDOW_HEIGHT } from 'constants/common-styles'
import { BOTTOM_NAVIGATION_HEIGHT } from '../bottom-navigation/bottom-navigation'

export const Gradient = ({ style }: { style?: ViewStyle }): JSX.Element => {
  const GRADIENT: ViewStyle = {
    height: 70,
    width: '100%',
    position: 'absolute',
    zIndex: 2,
    bottom: 1,
    ...style,
  }

  const headerHeight: number = useSelector(common.headerHeight)
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  const [showGradient, setShowGradient] = useState<boolean>(false)

  useEffect(() => {
    if (onScrollEventForGradient) {
      const {
        layoutMeasurement,
        contentOffset,
        contentSize,
      } = onScrollEventForGradient

      /*console.log(
        'grdnt->',
        parseInt(contentSize.height, 10) >
          WINDOW_HEIGHT - (BOTTOM_NAVIGATION_HEIGHT + headerHeight) &&
          parseInt(layoutMeasurement?.height, 10) +
            parseInt(contentOffset?.y, 10) <
            parseInt(contentSize.height, 10) - 10,
      )*/

      setShowGradient(
        parseInt(contentSize.height, 10) >
          WINDOW_HEIGHT - (BOTTOM_NAVIGATION_HEIGHT + headerHeight) &&
          parseInt(layoutMeasurement?.height, 10) +
            parseInt(contentOffset?.y, 10) <
            parseInt(contentSize.height, 10) - 10,
      )
    }
  }, [headerHeight, onScrollEventForGradient])

  return (
    <>
      {showGradient && (
        <LinearGradient colors={['#FFFFFF00', '#FFFFFF']} style={GRADIENT} />
      )}
    </>
  )
}

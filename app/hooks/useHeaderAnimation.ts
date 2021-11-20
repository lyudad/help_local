import { Platform, ViewStyle } from 'react-native'
import {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated'

export const useHeaderAnimation = (
  heightTopMinus: number,
  onScrollCallback = null,
): {
  scrollY: { value: number }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  scrollHandler: (event: any) => void
  headerStyle: ViewStyle
} => {
  const scrollY = useSharedValue(0) // 0 - 500
  const prevContentOffsetY = useSharedValue(0)
  let newHeightTopMinus: number = heightTopMinus
  newHeightTopMinus = Platform.OS === 'ios' ? 95 : 70

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      let newScY = scrollY.value
      if (event.contentOffset.y < prevContentOffsetY.value) {
        newScY -= prevContentOffsetY.value - event.contentOffset.y
      } else {
        newScY += event.contentOffset.y - prevContentOffsetY.value
      }
      if (newScY < 0) {
        newScY = 0
      }
      if (newScY > 500) {
        newScY = 500
      }
      scrollY.value = newScY
      prevContentOffsetY.value = event.contentOffset.y
    },
    onEndDrag: (e) => {
      if (onScrollCallback) {
        runOnJS(onScrollCallback)(e)
      }
    },
  })

  const headerStyle = useAnimatedStyle(
    (): ViewStyle => {
      return {
        marginTop: -interpolate(
          scrollY.value,
          [0, 500],
          [0, newHeightTopMinus],
          Extrapolate.CLAMP,
        ),
      }
    },
  )

  return {
    scrollY,
    scrollHandler,
    headerStyle,
  }
}

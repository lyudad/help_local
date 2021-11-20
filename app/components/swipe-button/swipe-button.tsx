/* eslint-disable */
import React from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { PanGestureHandler } from 'react-native-gesture-handler'

import { Text } from '../text/text'
import { SVGIcon } from '../svg-icon/index'
import { color, spacing } from 'theme'
import { WINDOW_WIDTH } from 'constants/common-styles'
import { SwipeButtonProps } from './swipe-button.props'

const SWIPE_CONT: ViewStyle = {
  width: '100%',
  height: 52,
  backgroundColor: color.transparent,
  alignItems: 'flex-end',
  flexDirection: 'row',
}

const ICON_CONT: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

const ICON_WRAP: ViewStyle = {
  width: 0,
  maxWidth: WINDOW_WIDTH * 0.35,
  height: 52,
  backgroundColor: color.primary,
}

const SWIPEABLE: ViewStyle = {
  width: WINDOW_WIDTH * 0.9,
  minWidth: WINDOW_WIDTH * 0.55,
  height: 52,
  backgroundColor: color.secondary,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}

const TEXT: TextStyle = {
  textTransform: 'uppercase',
  marginRight: spacing[3],
}

export const SwipeButton = ({
  onAction,
  disabled = false,
}: SwipeButtonProps): JSX.Element => {
  const X = useSharedValue(0)
  const animatedGestureHandler = useAnimatedGestureHandler({
    onActive: (e) => {
      if (e.translationX > 0 && e.translationX < WINDOW_WIDTH * 0.65) {
        X.value = e.translationX
      }
    },
    onEnd: () => {
      if (X.value < WINDOW_WIDTH * 0.4) {
        X.value = 0
      } else {
        X.value = WINDOW_WIDTH * 0.4
      }
    },
  })

  const AnimatedStyles = {
    swipeable: useAnimatedStyle(() => {
      return {
        width: WINDOW_WIDTH * 0.9 - X.value,
      }
    }),
    likeBtn: useAnimatedStyle(() => {
      return {
        width: 0 + X.value,
      }
    }),
  }

  return (
    <View style={SWIPE_CONT}>
      <Animated.View style={[ICON_WRAP, AnimatedStyles.likeBtn]}>
        <TouchableOpacity
          style={ICON_CONT}
          onPress={onAction}
          disabled={disabled}
        >
          <SVGIcon icon='like' color={color.palette.white} />
        </TouchableOpacity>
      </Animated.View>
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View style={[SWIPEABLE, AnimatedStyles.swipeable]}>
          <Text
            preset='subtitleBold'
            text='SLIDE TO HIRE'
            color={color.palette.white}
            style={TEXT}
          />
          <SVGIcon icon='arrowRight' color={color.palette.white} size={14} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

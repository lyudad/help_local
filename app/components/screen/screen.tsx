import * as React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  View,
  ViewStyle,
} from 'react-native'
import Animated from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { Gradient } from 'components'
import { useDispatch, useSelector } from 'react-redux'
import {
  setDetectScrolling,
  setOnScrollEventForGradient,
} from 'app/store/commonSlice'
import { common } from 'app/store/selectors'
import { isNonScrolling, offsets, presets } from './screen.presets'
import { ScreenProps } from './screen.props'

const isIos = Platform.OS === 'ios'

// for rounded header
const TOP_UP_CONTENT_SIZE = 10
const PADDING_TOP_NEGATIVE: ViewStyle = {
  top: -TOP_UP_CONTENT_SIZE,
}
const ADDITIONAL_HEIGHT: ViewStyle = {
  height: '105%',
}
const ADDITIONAL_PADDING_BOTTOM: ViewStyle = {
  paddingBottom: '5%',
}
export const PADDING_TOP_POSITIVE: ViewStyle = {
  paddingTop: TOP_UP_CONTENT_SIZE,
}

function ScreenWithoutScrolling(props: ScreenProps): JSX.Element {
  const insets = useSafeAreaInsets()
  const preset = presets.fixed
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}

  const insetStyle = { paddingTop: props.unsafe || isIos ? 0 : insets.top }

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      {!props.withoutGradient && <Gradient style={props.gradientStyle} />}
      <View
        style={[
          preset.inner,
          style,
          insetStyle,
          !props.dontTopUpContent && {
            ...PADDING_TOP_NEGATIVE,
            ...ADDITIONAL_HEIGHT,
            ...ADDITIONAL_PADDING_BOTTOM,
          },
        ]}
      >
        {props.children}
      </View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps): JSX.Element {
  const insets = useSafeAreaInsets()
  const preset = presets.scroll
  const style = props.style || {}
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {}

  const insetStyle = { paddingTop: props.unsafe || isIos ? 0 : insets.top }
  const dispatch = useDispatch()
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : null}
      keyboardVerticalOffset={offsets[props.keyboardOffset || 'none']}
    >
      <StatusBar barStyle={props.statusBar || 'light-content'} />
      <View style={[preset.outer, backgroundStyle, insetStyle]}>
        {!props.withoutGradient && <Gradient style={props.gradientStyle} />}
        <Animated.ScrollView
          scrollEventThrottle={16}
          style={[
            preset.outer,
            backgroundStyle,
            !props.dontTopUpContent && {
              ...PADDING_TOP_NEGATIVE,
              ...ADDITIONAL_HEIGHT,
              ...ADDITIONAL_PADDING_BOTTOM,
            },
          ]}
          contentContainerStyle={[preset.inner, style]}
          {...props}
          onScroll={(e) => dispatch(setOnScrollEventForGradient(e.nativeEvent))}
          onScrollBeginDrag={() => dispatch(setDetectScrolling(Math.random()))}
          onContentSizeChange={(_, y) => {
            dispatch(
              setOnScrollEventForGradient({
                ...onScrollEventForGradient,
                contentSize: {
                  height: y,
                },
              }),
            )
          }}
        >
          {props.children}
        </Animated.ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps): JSX.Element {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  }
  return <ScreenWithScrolling {...props} />
}

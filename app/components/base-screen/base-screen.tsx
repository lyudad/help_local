import React from 'react'
import { mergeAll, flatten } from 'ramda'
import { View } from 'react-native'

import {
  BottomNavigation,
  Header,
  Screen,
  WithHorizontalPaddings,
} from 'components'
import { color } from 'theme'
import { FULL } from 'constants/common-styles'
import { containerPresets } from './base-screen.presets'
import { IBaseScreenProps } from './base-screen.props'

export const BaseScreen = (props: IBaseScreenProps): JSX.Element => {
  const {
    preset = 'primary',
    children,
    style: styleOverride,
    type = 'scroll',
    isFormValidToNavigate = true,
    backgroundColor = color.transparent,
    withoutHorizontalPaddings = false,
    withHeader,
    onScroll,
    horizontalPaddingViewStyle,
    withoutBottomNavigator,
    withoutGradient,
    gradientStyle,
    ...rest
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  const SCROLL = 'scroll'

  return (
    <View style={[style, FULL]}>
      {withHeader && (
        <Header {...rest} isFormValidToNavigate={isFormValidToNavigate} />
      )}
      <Screen
        dontTopUpContent={!withHeader}
        gradientStyle={gradientStyle}
        withoutGradient={withoutGradient}
        preset={type}
        {...{ backgroundColor }}
        {...(type === SCROLL && onScroll && { onScroll })}
      >
        {withoutHorizontalPaddings ? (
          children
        ) : (
          <WithHorizontalPaddings style={horizontalPaddingViewStyle}>
            {children}
          </WithHorizontalPaddings>
        )}
      </Screen>
      {!withoutBottomNavigator && (
        <BottomNavigation isFormValidToNavigate={isFormValidToNavigate} />
      )}
    </View>
  )
}

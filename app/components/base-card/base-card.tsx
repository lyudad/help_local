import React from 'react'
import { View, ViewStyle } from 'react-native'
import { color, spacing } from 'theme'
import { Text, ViewWithShadow } from 'components'
import { BaseCardProps } from './base-card.props'

const WRAPPER: ViewStyle = {
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}

const HEADER: ViewStyle = {
  paddingVertical: spacing[1],
  borderTopStartRadius: 4,
  borderTopLeftRadius: 4,
}

const LIGHT_GREEN_BG: ViewStyle = {
  backgroundColor: color.primaryLight,
}

const GOLD_BG: ViewStyle = {
  backgroundColor: color.palette.gold,
}

export const BaseCard = ({
  children,
  headerVariant,
  headerSlimText,
  headerBoldText,
  bottom,
  bottomStyle,
  wrapperStyle,
}: BaseCardProps): JSX.Element => {
  const FOOTER: ViewStyle = {
    backgroundColor: color.palette.milky,
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
    ...bottomStyle,
  }

  return (
    <ViewWithShadow borderRadius={4}>
      {headerVariant && (
        <View
          style={{
            ...HEADER,
            ...(headerVariant === 'first' && GOLD_BG),
            ...(headerVariant === 'second' && LIGHT_GREEN_BG),
          }}
        >
          <Text>
            <Text
              text={headerVariant === 'first' ? headerBoldText : headerSlimText}
              preset={headerVariant === 'first' ? 'smallestBold' : 'smallest'}
            />
            <Text text=' ' />
            <Text
              text={headerVariant === 'first' ? headerSlimText : headerBoldText}
              preset={headerVariant === 'first' ? 'smallest' : 'smallestBold'}
            />
          </Text>
        </View>
      )}
      <View style={[WRAPPER, wrapperStyle]}>{children}</View>
      <View style={FOOTER}>{bottom}</View>
    </ViewWithShadow>
  )
}

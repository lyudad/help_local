import { ICategory } from 'interfaces'
import React from 'react'
import { View, TouchableOpacity, TextStyle, ViewStyle } from 'react-native'
import { color, spacing } from 'theme'
import { SVGIcon } from '../svg-icon'
import { Text } from '../text/text'

interface PropsType {
  category: ICategory
  isChosen?: boolean
  style?: ViewStyle
  onPress?: (category: ICategory) => void
}

const VIEW: ViewStyle = {
  alignItems: 'center',
}

const ICON_BOX: ViewStyle = {
  marginBottom: spacing[2],
}

const NAME: TextStyle = {
  fontSize: 14,
  fontWeight: '500',
  lineHeight: 17,
}

export const JobCategory = ({
  category,
  style,
  onPress,
  isChosen,
}: PropsType): JSX.Element => {
  const PARENT_VIEW: ViewStyle = {
    flex: 1,
    borderWidth: isChosen ? 1 : 0,
    borderColor: color.primary,
    borderRadius: 4,
    paddingVertical: spacing[3],
    ...(isChosen && { backgroundColor: color.primary }),
  }

  const iconName: string =
    category.title.charAt(0).toLowerCase() +
    category.title.substring(1, category.title.length + 1).replace(/ /g, '')

  return (
    <View style={{ ...PARENT_VIEW, ...style }}>
      <TouchableOpacity {...(onPress && { onPress: () => onPress(category) })}>
        <View style={VIEW}>
          <View style={ICON_BOX}>
            <SVGIcon
              icon={iconName}
              color={isChosen ? color.palette.white : color.primary}
            />
          </View>
          <Text
            text={category.title}
            style={NAME}
            color={isChosen ? color.palette.white : color.secondary}
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

JobCategory.defaultProps = {
  style: {},
  isChosen: false,
  onPress: () => {},
}

import React from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'

import { color, spacing } from 'theme'
import { Text, Hr } from 'components'

const TITLE_AND_NUMBER_CONTAINER: ViewStyle = {
  alignItems: 'center',
  marginBottom: spacing[5] + 2,
}

const CONTENT_TITLE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[4] + 2,
}

const MINI_CIRCLE: ViewStyle = {
  width: 18,
  height: 18,
  backgroundColor: color.secondary,
  borderRadius: 15,
  justifyContent: 'center',
  marginLeft: spacing[3],
}

const FOOTER: ViewStyle = {
  marginVertical: spacing[6],
}

interface IRenderStepProps {
  stepNumber: string
  title: string
  children: React.ReactNode
  isLast: boolean
  contentTitle: string
  showQestionMarkAfterContentTitle: boolean
  onQuestionMarkPress: () => void
}

export const RenderStep = (props: IRenderStepProps): JSX.Element => {
  const {
    stepNumber,
    title,
    children,
    isLast = false,
    contentTitle,
    showQestionMarkAfterContentTitle = false,
    onQuestionMarkPress = () => {},
  } = props
  return (
    <View>
      <View style={TITLE_AND_NUMBER_CONTAINER}>
        <Text>
          <Text tx='setUpHelperProfileScreen.step' preset='subtitleBold' />
          <Text text={stepNumber} preset='subtitleBold' />
        </Text>
        <Text text={title} preset='header3_500' color={color.primary} />
      </View>
      {contentTitle !== '' && (
        <View style={CONTENT_TITLE_CONTAINER}>
          <Text text={contentTitle} preset='header4slim' />
          {showQestionMarkAfterContentTitle && (
            <TouchableOpacity onPress={onQuestionMarkPress}>
              <View style={MINI_CIRCLE}>
                <Text text='?' color={color.palette.white} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
      {children}
      <View style={FOOTER}>{!isLast && <Hr />}</View>
    </View>
  )
}

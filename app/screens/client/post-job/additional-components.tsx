import React from 'react'
import { View, ViewStyle, Image, ImageStyle } from 'react-native'

import { ShowError, Text } from 'components'
import { spacing } from 'theme'
import { PADDING_BOTTOM_SP4 } from 'constants/common-styles'

const circleImg = require('assets/post-job-circle.png')

const TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: spacing[5],
}

const CIRCLE_IMAGE: ImageStyle = {
  width: '100%',
  height: 310,
}

const BOTTOM: ViewStyle = {
  marginTop: spacing[7] - 10,
  width: '83%',
  alignSelf: 'center',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: spacing[5],
}

export const HowItWorks = (): JSX.Element => {
  return (
    <>
      <View style={CIRCLE_IMAGE_CONTAINER}>
        <Image source={circleImg} style={CIRCLE_IMAGE} />
      </View>
      <View style={BOTTOM}>
        <View style={{ ...TITLE_CONTAINER, ...PADDING_BOTTOM_SP4 }}>
          <Text preset='header3bold' tx='postJob.title2' />
        </View>
        <Text tx='postJob.paragraph2' />
      </View>
    </>
  )
}

const BLOCK: ViewStyle = {
  paddingBottom: spacing[6],
}

interface IRenderMiniBlockProps {
  titleTx?: string
  title?: string
  subtitleText?: string
  children: React.ReactNode
  style?: ViewStyle
  error?: string
}

export const RenderMiniBlock = (props: IRenderMiniBlockProps): JSX.Element => {
  const {
    title,
    titleTx,
    children,
    subtitleText = '',
    style = {},
    error = '',
  } = props
  return (
    <View style={{ ...BLOCK, ...style }}>
      {title ||
        (titleTx && (
          <View style={TITLE_CONTAINER}>
            <Text>
              <Text {...{ ...(title ? { text: title } : { tx: titleTx }) }} />
              <Text text={subtitleText} preset='subtitle' />
            </Text>
          </View>
        ))}
      {children}
      <ShowError text={error} />
    </View>
  )
}
RenderMiniBlock.defaultProps = {
  title: null,
  titleTx: null,
  subtitleText: null,
  style: {},
  error: '',
}

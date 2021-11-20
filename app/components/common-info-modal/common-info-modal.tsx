import * as React from 'react'
import { View, ViewStyle } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Modal, Text } from 'components'
import { color } from 'theme'
import { SVGIcon } from '../svg-icon'
import {
  containerPresets,
  iconPresets,
  titleContainerPresets,
  contentContainerPresets,
} from './common-info-modal.presets'
import { CommonInfoModalProps } from './common-info-modal.props'
import { Button } from '../button/button'

export const CommonInfoModal = (props: CommonInfoModalProps): JSX.Element => {
  const {
    preset = 'primary',
    icon,
    iconSize,
    iconWidth,
    iconHeight,
    title,
    content,
    buttonText,
    onButtonPress,
    isButtonDisabled,
    buttonPreset,
    bottom,
    isButtonShorter = false,
    titleStyle,
    ...rest
  } = props

  const containerStyle = mergeAll(
    flatten([containerPresets[preset] || containerPresets.primary]),
  )
  const iconStyle = mergeAll(
    flatten([iconPresets[preset] || iconPresets.primary]),
  )
  const titleContainerStyle = mergeAll(
    flatten([titleContainerPresets[preset] || titleContainerPresets.primary]),
  )
  const contentContainerStyle = mergeAll(
    flatten([
      contentContainerPresets[preset] || contentContainerPresets.primary,
    ]),
  )

  const buttonStyle: ViewStyle = {
    ...(isButtonShorter && { marginHorizontal: 20 }),
  }

  return (
    <Modal {...rest}>
      <View style={containerStyle}>
        {icon && (
          <SVGIcon
            {...{
              icon,
              ...(iconSize && { size: iconSize }),
              ...(iconWidth && { width: iconWidth }),
              ...(iconHeight && { height: iconHeight }),
            }}
            color={color.primary}
            style={iconStyle}
          />
        )}
        {title && (
          <View style={titleContainerStyle}>
            <Text text={title} preset='header3bold' style={titleStyle} />
          </View>
        )}
        {content &&
          (typeof content === 'string' ? (
            <View style={contentContainerStyle}>
              <Text text={content} preset='header4slim' />
            </View>
          ) : (
            content
          ))}
        {buttonText && (
          <Button
            preset={buttonPreset}
            text={buttonText}
            style={buttonStyle}
            {...{
              ...(onButtonPress && { onPress: onButtonPress }),
              ...(isButtonDisabled && { disabled: isButtonDisabled }),
            }}
          />
        )}
        {bottom}
      </View>
    </Modal>
  )
}

import * as React from 'react'
import {
  View,
  Modal as RNModal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ModalProps as RNModalProps,
} from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { SVGIcon } from '../svg-icon'
import {
  containerPresets,
  overlayPresets,
  crossContainerPresets,
} from './modal.presets'
import { ModalProps } from './modal.props'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Modal(props: ModalProps & RNModalProps): JSX.Element {
  // grab the props
  const {
    preset = 'primary',
    children,
    toggleModal,
    visible,
    styleContainer,
    crossContainer,
    crossColor,
    crossSize,
    animationType = 'fade',
  } = props

  const containerStyle = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleContainer,
    ]),
  )
  const overlayStyle = mergeAll(
    flatten([overlayPresets[preset] || overlayPresets.primary]),
  )
  const crossContainerStyle = mergeAll(
    flatten([
      crossContainerPresets[preset] || crossContainerPresets.primary,
      crossContainer,
    ]),
  )

  return (
    <RNModal animationType={animationType} transparent visible={visible}>
      <TouchableWithoutFeedback onPress={() => toggleModal(false)}>
        <View style={overlayStyle} />
      </TouchableWithoutFeedback>
      <View style={containerStyle}>
        <TouchableOpacity
          style={crossContainerStyle}
          onPress={() => toggleModal(false)}
        >
          <SVGIcon icon='cross' color={crossColor} size={crossSize} />
        </TouchableOpacity>
        {children}
      </View>
    </RNModal>
  )
}

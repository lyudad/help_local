import { ViewStyle, ModalProps as RNModalProps } from 'react-native'
import { ModalPresetNames } from './modal.presets'

export interface ModalProps extends RNModalProps {
  /**
   * Children components.
   */
  children?: React.ReactNode
  /**
   * Type of animationType .
   */
  animationType?: 'none' | 'fade' | 'slide'

  /**
   * Function of toggle modal.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  toggleModal: any

  /**
   * Variable of showing modal
   */
  visible: boolean

  /**
   * An optional style of container of sign cross.
   */
  crossContainer?: ViewStyle | ViewStyle[]

  /**
   * An optional style of container of sign cross.
   */
  crossColor?: string
  /**
   * An optional size of sign cross.
   */
  crossSize?: number

  /**
   * An optional style of Modal Container which override useful for padding & margin.
   */
  styleContainer?: ViewStyle | ViewStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: ModalPresetNames
}

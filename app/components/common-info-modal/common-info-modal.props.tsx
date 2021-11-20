import { ModalProps } from 'components'
import { TextStyle } from 'react-native'
import { ButtonPresetNames } from '../button/button.presets'
import { CommonInfoModalPresetNames } from './common-info-modal.presets'

export interface CommonInfoModalProps extends ModalProps {
  icon?: string

  iconSize?: number

  iconWidth?: number

  iconHeight?: number

  title?: string

  titleStyle?: TextStyle

  content?: string | React.ReactNode

  buttonText?: string

  onButtonPress?: () => void

  buttonPreset?: ButtonPresetNames

  isButtonShorter?: boolean

  isButtonDisabled?: boolean

  bottom?: React.ReactNode

  /**
   * One of the different types of text presets.
   */
  preset?: CommonInfoModalPresetNames
}

import { ViewStyle } from 'react-native'

import { ISsnInputPresetNames } from './ssn-input.presets'

export interface ISsnInputProps {
  ssn: number
  onSsnChange: (ssn: number) => void

  errorText?: string

  style?: ViewStyle
  /**
   * One of the different types of text presets.
   */
  preset?: ISsnInputPresetNames
}

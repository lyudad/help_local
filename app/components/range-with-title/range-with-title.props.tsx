import { ViewStyle } from 'react-native'
import { IRangeWithTitlePresetNames } from './range-with-title.presets'

export interface IRangeWithTitleProps {
  style?: ViewStyle

  rangeStyle?: ViewStyle

  min?: number

  max?: number

  withoutTitle?: boolean

  onValueChanged: (low: number, high: number) => void

  value: number

  error?: string

  isShorter?: boolean

  /**
   * One of the different types of text presets.
   */
  preset?: IRangeWithTitlePresetNames
}

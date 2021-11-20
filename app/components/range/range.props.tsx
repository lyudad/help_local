import { ViewStyle } from 'react-native'
import { RangePresetNames } from './range.presets'

export interface RangeProps {
  preset?: RangePresetNames
  style?: ViewStyle
  disableRange?: boolean
  onValueChanged: (low: number, high: number) => void
  min?: number
  max?: number
  value: number
}

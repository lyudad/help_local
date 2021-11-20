import { ViewStyle } from 'react-native'
import { RangePresetNames } from './range2.presets'

export interface Range2Props {
  preset?: RangePresetNames
  style?: ViewStyle
  disableRange?: boolean
  onValueChanged: (low: number, high: number) => void
  min?: number
  max?: number
  value: number
  isShorter?: boolean
}

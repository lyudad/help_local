import { ViewStyle } from 'react-native'
import { IInputPricePresetNames } from './input-price.presets'

export interface IInputPriceProps {
  value?: number
  onPriceChange?: (newPrice: number) => void
  hideDollar?: boolean
  textBeforeDollar?: string
  showHr?: boolean
  maxLength?: number
  style?: ViewStyle
  inputStyle?: ViewStyle
  errorTx?: string
  errorText?: string

  /**
   * One of the different types of text presets.
   */
  preset?: IInputPricePresetNames
}

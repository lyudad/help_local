import { TextStyle, ViewStyle } from 'react-native'
import { IShowErrorPresetsNames } from './show-error.presets'

export interface IShowErrorProps {
  /**
   * Error tx
   */
  tx?: string

  /**
   * Error text
   */
  text?: string

  /**
   * An optional style override
   */
  style?: ViewStyle

  errorTextStyle?: TextStyle

  /**
   * One of the different types of line presets.
   */
  preset?: IShowErrorPresetsNames
}

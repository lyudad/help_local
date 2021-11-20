import { ViewStyle } from 'react-native'
import { ITogglePresetNames } from './toggle.presets'

export interface IToggleProps {
  style?: ViewStyle
  value: boolean
  onToggle: () => void
  /**
   * One of the different types of text presets.
   */
  preset?: ITogglePresetNames
}

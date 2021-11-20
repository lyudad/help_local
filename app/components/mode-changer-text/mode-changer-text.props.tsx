import { ViewStyle } from 'react-native'
import { IModeChangerTextPresetNames } from './mode-changer-text.presets'

export interface IModeChangerTextProps {
  text: string
  style?: ViewStyle
  isActive: boolean
  onToggle: () => void
  /**
   * One of the different types of text presets.
   */
  preset?: IModeChangerTextPresetNames
}

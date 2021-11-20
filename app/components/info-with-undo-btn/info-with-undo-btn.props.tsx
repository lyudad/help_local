import { ViewStyle, TextStyle } from 'react-native'
import { InfoWithUndoBtnPresetNames } from './info-with-undo-btn.presets'

export interface InfoWithUndoBtnProps {
  text: string
  textStyle?: TextStyle
  visible: boolean
  onUndo: () => void
  actionAfter: () => void
  preset?: InfoWithUndoBtnPresetNames
  style?: ViewStyle
  btnTextStyle?: TextStyle
  hideAfter?: number
}

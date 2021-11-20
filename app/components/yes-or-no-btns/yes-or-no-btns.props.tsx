import { ViewStyle } from 'react-native'
import { IYesOrNoBtnsPresetNames } from './yes-or-no-btns.presets'

export interface IYesOrNoBtnsProps {
  title?: string
  subTitle?: string
  showDefaultSubTitle?: boolean
  style?: ViewStyle
  activeOne: 1 | 2
  onButtonsPress: (pressedOne: 1 | 2) => void
  /**
   * One of the different types of text presets.
   */
  preset?: IYesOrNoBtnsPresetNames
}

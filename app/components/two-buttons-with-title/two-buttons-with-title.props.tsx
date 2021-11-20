import { TextStyle, ViewStyle } from 'react-native'
import { ITwoButtonsWithTitlePresetNames } from './two-buttons-with-title.presets'

export interface ITwoButtonsWithTitleProps {
  title: string

  subTitle?: string

  showQestionMarkAfterTitle?: boolean

  onQuestionMarkPress?: () => void

  firstBtnText: string

  secondBtnText: string

  activeOne?: 1 | 2

  onButtonsPress: (pressedOne: 1 | 2) => void

  style?: ViewStyle

  titleStyle?: TextStyle

  disabled?: boolean

  /**
   * One of the different types of text presets.
   */
  preset?: ITwoButtonsWithTitlePresetNames
}

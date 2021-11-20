import { ViewStyle } from 'react-native'
import { IQuestionMarkInBlackCirclePresetNames } from './question-mark-in-black-circle.presets'

export interface IQuestionMarkInBlackCircleProps {
  style?: ViewStyle
  onQuestionMarkPress: () => void
  /**
   * One of the different types of text presets.
   */
  preset?: IQuestionMarkInBlackCirclePresetNames
}

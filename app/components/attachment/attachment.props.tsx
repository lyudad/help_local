import { ViewStyle } from 'react-native'
import { IAttachmentPresetNames } from './attachment.presets'

export interface IAttachmentProps {
  text: string
  style?: ViewStyle
  uri?: string
  onDeletePress: () => void
  /**
   * One of the different types of text presets.
   */
  preset?: IAttachmentPresetNames
}

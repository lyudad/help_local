import { TouchableOpacityProps } from 'react-native'
import { StackHeaderPresetNames } from './stackHeader.presets'

export interface StackHeaderProps extends TouchableOpacityProps {
  /**
   *Placeholder text for bottom input which is looked up via i18n.
   */
  placeholder?: string

  /**
   * Avatar image source.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  avatarSrc?: any

  /**
   * Action for avatar image
   */
  onPressAvatar?: () => void

  /**
   * Action for avatar image
   */
  onLongPressAvatar?: () => void

  /**
   * Action when press bell
   */
  onPressBell?: () => void

  /**
   * Action when press send
   */
  onSendPress?: () => void

  /**
   * One of the different types of text presets.
   */
  preset?: StackHeaderPresetNames
}

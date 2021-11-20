import { Source } from 'react-native-fast-image'
import { IAvatarPresetNames } from './avatar.presets'

export interface IAvatarProps {
  source?: Source
  letter?: string
  size?: number

  /**
   * One of the different types of text presets.
   */
  preset?: IAvatarPresetNames
}

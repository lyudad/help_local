import { ViewStyle } from 'react-native'
import { HrPresetsNames } from './hr.presets'

export interface HrProps {
  /**
   * Line color
   */
  color?: string

  /**
   * flexGrow is used for line length
   */
  length?: number

  /**
   * line thickness
   */
  thickness?: number

  /**
   * An optional style override
   */
  style?: ViewStyle

  /**
   * One of the different types of line presets.
   */
  preset?: HrPresetsNames
}

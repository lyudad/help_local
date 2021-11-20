import { ImageStyle } from 'react-native'
import { IconTypes } from './icons'

export interface IconProps {
  /**
   * Icon size (width & height)
   */
  size?: number

  /**
   * Icon width
   */
  width?: number

  /**
   * Icon height
   */
  height?: number

  /**
   * Icon color
   */
  color?: string

  /**
   * The name of the icon
   */
  icon?: IconTypes | string

  /**
   * Style overrides for the icon
   */
  style?: ImageStyle
}

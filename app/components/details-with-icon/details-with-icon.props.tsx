import { ViewStyle, TextStyle } from 'react-native'
import { DetailsWithIconPresetNames } from './details-with-icon.presets'

export interface IDetailsWithIconItem {
  icon: string
  name: string
  value: string
}

export interface DetailsWithIconProps {
  title?: string

  items: Array<IDetailsWithIconItem>

  style?: ViewStyle
  titleStyle?: TextStyle
  contentStyle?: ViewStyle
  iconColor?: string
  iconSize?: number

  preset?: DetailsWithIconPresetNames
}

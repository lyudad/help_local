import { ViewStyle, ActivityIndicatorProps } from 'react-native'
import { LoaderPresetNames } from './loader.presets'

export interface LoaderProps extends ActivityIndicatorProps {
  /**
   * An optional style of Modal Container which override useful for padding & margin.
   */
  styleContainer?: ViewStyle | ViewStyle[]

  /**
   * One of the different types of text presets.
   */
  preset?: LoaderPresetNames
}

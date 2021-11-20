import { ViewStyle } from 'react-native'
import { HeaderProps } from '../header/header.props'
import { IBaseScreenPresetNames } from './base-screen.presets'

export interface IBaseScreenProps extends HeaderProps {
  children: React.ReactNode
  style?: ViewStyle
  type?: 'scroll' | 'fixed'
  backgroundColor?: string
  withoutHorizontalPaddings?: boolean
  horizontalPaddingViewStyle?: ViewStyle
  withHeader?: boolean
  isFormValidToNavigate?: boolean
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onScroll?: (event: any) => void
  withoutBottomNavigator?: boolean
  withoutGradient?: boolean
  gradientStyle?: ViewStyle
  /**
   * One of the different types of text presets.
   */
  preset?: IBaseScreenPresetNames
}

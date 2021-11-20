import { ViewStyle } from 'react-native'

export interface BaseCardProps {
  children: React.ReactNode

  headerVariant?: 'first' | 'second' | null

  headerSlimText?: string

  headerBoldText?: string

  bottom: React.ReactNode

  bottomStyle?: ViewStyle

  wrapperStyle?: ViewStyle
}

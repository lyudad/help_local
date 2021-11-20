import { TextStyle, ViewStyle } from 'react-native'
import { JobListPresetsNames } from './job-list.presets'

export interface JobListProps {
  /**
   * Children components.
   */
  children: React.ReactNode
  /**
   * title icon
   */
  icon: string

  /**
   * icon color
   */
  iconColor?: string

  /**
   * title
   */
  title: string

  /**
   * show list button text
   */
  buttonText?: string

  /**
   * An optional style override
   */
  style?: ViewStyle

  /**
   * additional style for button text
   */
  buttonTextStyle?: TextStyle

  /**
   * One of the different types of line presets.
   */
  preset?: JobListPresetsNames
}

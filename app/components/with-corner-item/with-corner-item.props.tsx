import React from 'react'
import { ViewStyle } from 'react-native'
import { WithCornerItemPresetNames } from './with-corner-item.presets'

export interface WithCornerItemProps {
  /**
   * children
   */
  children: React.ReactNode

  /**
   * Wrapper view style
   */
  style?: ViewStyle

  /**
   * Corner item like online status icon or send message icon
   */
  CornerItem?: React.ReactNode

  /**
   * One of the different types of text presets.
   */
  preset?: WithCornerItemPresetNames
}

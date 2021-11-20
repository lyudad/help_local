import React from 'react'
import { FastImageProps } from 'react-native-fast-image'
import { CircleImagePresetNames } from './circleImage.presets'

export interface ICircleImageProps extends FastImageProps {
  /**
   * Size for width and height
   */
  size?: number

  /**
   * Corner item like online status icon or send message icon
   */
  cornerItem?: React.ReactNode

  /**
   * One of the different types of text presets.
   */
  preset?: CircleImagePresetNames
}

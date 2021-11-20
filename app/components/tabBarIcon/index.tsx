import React from 'react'

import { color } from 'theme'
import { SVGIcon } from '../svg-icon'
import { IconTypes } from '../svg-icon/icons'

interface TabBarIconProps {
  name: IconTypes
  focused: boolean
}

// todo add TabBarIcon to storybook?
export function TabBarIcon({ name, focused }: TabBarIconProps): JSX.Element {
  const iconColor = focused ? color.primary : color.palette.grey
  return <SVGIcon icon={name} color={iconColor} size={20} />
}

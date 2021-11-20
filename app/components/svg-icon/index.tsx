import * as React from 'react'
import { color as colors } from 'theme'
import { IconProps } from './icon.props'
import { icons } from './icons'

export function SVGIcon({
  icon,
  size = 20,
  width,
  height,
  color = colors.secondary,
  ...props
}: IconProps): JSX.Element {
  const Icon = icons[icon] || icons.bell

  return (
    <Icon
      width={width || size}
      height={height || size}
      color={color}
      {...props}
    />
  )
}

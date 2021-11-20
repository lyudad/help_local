import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props

  return (
    <Svg width={18} height={4} viewBox='0 0 18 4' fill='none' {...props}>
      <Path
        d='M9 0a2 2 0 100 4 2 2 0 000-4zM2 0a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z'
        fill={color}
      />
    </Svg>
  )
}

export const Dots = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Circle } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={15} height={15} viewBox='0 0 15 15' fill='none'>
      <Circle
        cx={7.5}
        cy={7.5}
        r={6.5}
        fill={color}
        stroke='#fff'
        strokeWidth={2}
      />
    </Svg>
  )
}

export const Online = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Circle } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={10} height={10} viewBox='0 0 10 10' fill='none'>
      <Circle cx={5} cy={5} r={5} fill={color} />
    </Svg>
  )
}

export const Online2 = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color, width = 7, height = 12 } = props
  return (
    <Svg {...{ width, height }} viewBox='0 0 7 12' fill='none' {...props}>
      <Path
        d='M.616 1.325h0a.75.75 0 011.065 0l4.24 4.289h0l.001.002a.75.75 0 010 1.065h0l-4.24 4.24h0l-.001.001a.75.75 0 01-1.065 0h0a.75.75 0 010-1.057s0 0 0 0l3.539-3.54.176-.176-.175-.176-3.54-3.59v-.001a.75.75 0 010-1.058z'
        fill={color}
        stroke={color}
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export const ChevronRight = React.memo(SvgComponent)

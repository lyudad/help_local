import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color, width = 11, height = 7 } = props
  return (
    <Svg {...{ width, height }} viewBox='0 0 11 7' fill='none' {...props}>
      <Path
        d='M10.07.468h0a.75.75 0 010 1.065s0 0 0 0l-4.29 4.24h0l-.002.002a.75.75 0 01-1.065 0v-.001l-4.24-4.24h0-.001a.75.75 0 010-1.066h0a.75.75 0 011.057 0s0 0 0 0l3.54 3.54.176.175.176-.174 3.59-3.54h.001a.75.75 0 011.057 0z'
        fill={color}
        stroke={color}
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export const ChevronDown = React.memo(SvgComponent)

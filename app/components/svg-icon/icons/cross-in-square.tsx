import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 36 36' fill='none' {...props}>
      <Path
        d='M31.222 1H4.778A3.778 3.778 0 001 4.778v26.444A3.778 3.778 0 004.778 35h26.444A3.778 3.778 0 0035 31.222V4.778A3.778 3.778 0 0031.222 1zM12.333 12.333l11.333 11.334M23.666 12.333L12.333 23.667'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const CrossInSquare = React.memo(SvgComponent)

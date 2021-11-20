import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={14} height={14} viewBox='0 0 14 14' fill='none' {...props}>
      <Path
        d='M8.233 6.823L8.056 7l.177.177 4.3 4.29h0a.751.751 0 010 1.065v.002a.75.75 0 01-1.066 0h0l-4.29-4.3L7 8.055l-.177.177-4.29 4.3h0a.75.75 0 01-1.066 0h-.001a.75.75 0 010-1.066h0l4.3-4.29L5.945 7l-.177-.177-4.3-4.29s0 0 0 0a.754.754 0 011.066-1.066s0 0 0 0l4.29 4.3.177.177.177-.177 4.29-4.3a.754.754 0 111.066 1.066s0 0 0 0l-4.3 4.29z'
        fill={color}
        stroke='#fff'
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export const Cross = React.memo(SvgComponent)

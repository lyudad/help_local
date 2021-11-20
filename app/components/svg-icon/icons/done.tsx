import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={22} height={22} viewBox='0 0 22 22' fill='none'>
      <Path
        d='M21 10.086v.92a10 10 0 11-5.93-9.14'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M21 3.006l-10 10.01-3-3'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Done = React.memo(SvgComponent)

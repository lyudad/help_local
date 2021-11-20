import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={24} height={20} viewBox='0 0 24 20' fill='none'>
      <Path
        d='M1 17.998v-6h6M23 1.998v6h-6'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M3.51 6.998a9 9 0 0114.85-3.36L23 7.998m-22 4l4.64 4.36a9 9 0 0014.85-3.36'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Loop = React.memo(SvgComponent)

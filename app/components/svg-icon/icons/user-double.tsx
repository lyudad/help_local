import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={24} height={20} viewBox='0 0 24 20' fill='none'>
      <Path
        d='M23 19v-2a4 4 0 00-3-3.87M17 19v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M16 1.13a4 4 0 010 7.75M9 9a4 4 0 100-8 4 4 0 000 8z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const UserDouble = React.memo(SvgComponent)

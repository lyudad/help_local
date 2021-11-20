import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={22} height={22} viewBox='0 0 22 22' fill='none'>
      <Path
        d='M21 15.92v3a1.998 1.998 0 01-2.18 2 19.791 19.791 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 013.11 1h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L7.09 8.91a16.001 16.001 0 006 6l1.27-1.27a2 2 0 012.11-.45c.908.339 1.85.574 2.81.7A2 2 0 0121 15.92z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Phone = React.memo(SvgComponent)

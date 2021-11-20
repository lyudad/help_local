import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={22} height={22} viewBox='0 0 22 22' fill='none'>
      <Path
        d='M6.86 1h8.28L21 6.86v8.28L15.14 21H6.86L1 15.14V6.86L6.86 1zM14 8l-6 6M8 8l6 6'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Report = React.memo(SvgComponent)

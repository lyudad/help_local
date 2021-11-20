import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={19} height={19} viewBox='0 0 19 19' fill='none'>
      <Path
        d='M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M7.8 6.1l5.1 3.4-5.1 3.4V6.1z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Start = React.memo(SvgComponent)

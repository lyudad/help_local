import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={24} height={24} viewBox='0 0 24 24' fill='none'>
      <Path
        d='M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M21 15l-5-5L5 21M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Image = React.memo(SvgComponent)

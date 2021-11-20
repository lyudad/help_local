import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={33} height={33} viewBox='0 0 33 33' fill='none'>
      <Path
        d='M20.087 8.02a1.631 1.631 0 000 2.284l2.61 2.61a1.631 1.631 0 002.283 0l6.15-6.15a9.787 9.787 0 01-12.952 12.951L6.907 30.986a3.46 3.46 0 01-4.894-4.893l11.272-11.271A9.787 9.787 0 0126.236 1.87l-6.133 6.134-.016.016z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Key = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={76} height={76} viewBox='0 0 56 56' fill='none' {...props}>
      <Path
        d='M2.333 28S11.667 9.333 28 9.333C44.333 9.333 53.667 28 53.667 28S44.333 46.667 28 46.667C11.667 46.667 2.333 28 2.333 28z'
        stroke={color}
        strokeWidth={3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M28 35a7 7 0 100-14 7 7 0 000 14z'
        stroke={color}
        strokeWidth={3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const FiEye = React.memo(SvgComponent)

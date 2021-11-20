import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...props}>
      <Path
        d='M17.727 6.18v.175l.164.06a2.75 2.75 0 010 5.17l-.164.06V19a.75.75 0 11-1.5 0V11.645l-.165-.06a2.75 2.75 0 010-5.17l.165-.06V1a.75.75 0 111.5 0v5.18zm-7 6v.175l.164.06a2.75 2.75 0 010 5.17l-.165.06V19a.75.75 0 11-1.5 0v-1.355l-.164-.06a2.75 2.75 0 010-5.17l.164-.06V1a.75.75 0 111.5 0v11.18zm-7-8v.175l.164.06a2.75 2.75 0 010 5.17l-.165.06V19a.75.75 0 11-1.5 0V9.645l-.164-.06a2.75 2.75 0 010-5.17l.164-.06V1a.75.75 0 111.5 0v3.18zm12.555 5.86a1.25 1.25 0 101.389-2.079 1.25 1.25 0 00-1.389 2.078zm-7 6a1.25 1.25 0 101.389-2.079 1.25 1.25 0 00-1.389 2.078zm-7-8a1.25 1.25 0 101.389-2.08 1.25 1.25 0 00-1.389 2.08z'
        fill={color}
        stroke='#fff'
        strokeWidth={0.5}
      />
    </Svg>
  )
}

export const Sliders = React.memo(SvgComponent)

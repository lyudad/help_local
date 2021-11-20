import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={18} height={22} viewBox='0 0 18 22' fill='none' {...props}>
      <Path
        d='M11 1H3a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7l-6-6zM13 16H5M13 12H5M7 8H5'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M11 1v6h6'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const File = React.memo(SvgComponent)

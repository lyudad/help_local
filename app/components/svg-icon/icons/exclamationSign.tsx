import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={24} height={20} viewBox='0 0 24 20' fill='none' {...props}>
      <Path
        d='M10.29 1.86L1.82 16a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 1.86a2 2 0 00-3.42 0v0zM12 7v4M12 15h.01'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const ExclamationSign = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={8} height={14} viewBox='0 0 8 14' fill='none' {...props}>
      <Path
        d='M.322 7.71l5.66 5.65a1 1 0 101.42-1.41l-4.95-5L7.402 2a1 1 0 000-1.41 1 1 0 00-.71-.3 1 1 0 00-.71.3L.322 6.24a1 1 0 000 1.47z'
        fill={color}
      />
    </Svg>
  )
}

export const ChevronLeft = React.memo(SvgComponent)

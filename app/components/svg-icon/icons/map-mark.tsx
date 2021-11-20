import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={16} height={20} viewBox='0 0 16 20' fill='none' {...props}>
      <Path
        d='M8.575 19.66h0l-.006.005a.875.875 0 01-1.138 0h0c-.16-.14-1.985-1.72-3.771-3.936C1.862 13.499.125 10.654.125 8a7.875 7.875 0 0115.75 0c0 2.654-1.725 5.5-3.516 7.73-1.788 2.225-3.618 3.807-3.784 3.93zm-.66-1.919l.085.08.085-.08c1.07-.999 2.576-2.582 3.816-4.338 1.236-1.75 2.224-3.692 2.224-5.403a6.125 6.125 0 10-12.25 0c0 1.711.988 3.651 2.224 5.4 1.24 1.753 2.746 3.337 3.815 4.341zM5.846 4.778a3.875 3.875 0 114.306 6.444 3.875 3.875 0 01-4.306-6.444zm.972 4.989A2.125 2.125 0 109.18 6.234a2.125 2.125 0 00-2.36 3.533z'
        fill={color}
        stroke='#fff'
        strokeWidth={0.25}
      />
    </Svg>
  )
}

export const MapMark = React.memo(SvgComponent)

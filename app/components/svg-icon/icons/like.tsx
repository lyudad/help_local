import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 44 45' fill='none' {...props}>
      <Path
        d='M12.161 43H6.064a4.047 4.047 0 01-2.874-1.201 4.118 4.118 0 01-1.19-2.9V24.55c0-1.087.428-2.13 1.19-2.898a4.047 4.047 0 012.874-1.201h6.097m14.226-4.1v-8.2a6.178 6.178 0 00-1.786-4.349A6.07 6.07 0 0020.291 2l-8.13 18.45V43h22.924a4.043 4.043 0 002.678-.976 4.11 4.11 0 001.387-2.51l2.804-18.45a4.135 4.135 0 00-.951-3.305 4.068 4.068 0 00-1.403-1.05 4.035 4.035 0 00-1.71-.36H26.386z'
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Like = React.memo(SvgComponent)

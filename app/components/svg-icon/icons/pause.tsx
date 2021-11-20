import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={19} height={19} viewBox='0 0 19 19' fill='none'>
      <Path
        d='M9.5 18a8.5 8.5 0 100-17 8.5 8.5 0 000 17zM11.201 12.05v-5.1M7.799 12.05v-5.1'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Pause = React.memo(SvgComponent)

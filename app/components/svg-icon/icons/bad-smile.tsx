import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={44} height={44} viewBox='0 0 44 44' fill='none'>
      <Path
        d='M21.833 42.667c11.506 0 20.834-9.328 20.834-20.834S33.339 1 21.833 1 1 10.327 1 21.833c0 11.506 9.327 20.834 20.833 20.834z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M30.167 30.167S27.042 26 21.833 26c-5.208 0-8.333 4.167-8.333 4.167M28.084 15.584h.02M15.584 15.584h.02'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const BadSmile = React.memo(SvgComponent)

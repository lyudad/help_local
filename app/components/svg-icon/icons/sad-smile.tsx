import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 44 44' fill='none' {...props}>
      <Path
        d='M22 42.667c11.506 0 20.833-9.328 20.833-20.834S33.506 1 22 1C10.494 1 1.166 10.327 1.166 21.833c0 11.506 9.328 20.834 20.834 20.834z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M30.333 30.167S27.208 26 22 26c-5.209 0-8.334 4.167-8.334 4.167M28.25 15.583h.02M15.75 15.583h.02'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const SadSmile = React.memo(SvgComponent)

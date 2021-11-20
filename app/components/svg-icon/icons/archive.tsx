import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color, width = 21, height = 21 } = props
  return (
    <Svg {...{ width, height }} viewBox='0 0 21 21' fill='none'>
      <Path
        d='M18.375 7v11.375H2.625V7M8.75 10.5h3.5M20.125 2.625H.875V7h19.25V2.625z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Archive = React.memo(SvgComponent)

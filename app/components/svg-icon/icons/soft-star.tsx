import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={42} height={40} viewBox='0 0 42 40' fill='none'>
      <Path
        d='M21 0l6.489 13.165L42 15.29 31.5 25.531 33.978 40 21 33.165 8.022 40 10.5 25.531 0 15.289l14.511-2.124L21 0z'
        fill={color}
      />
    </Svg>
  )
}

export const SoftStar = React.memo(SvgComponent)

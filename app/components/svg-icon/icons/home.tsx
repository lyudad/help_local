import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 20 22' fill='none' {...props}>
      <Path
        d='M1 8l9-7 9 7v11a2 2 0 01-2 2H3a2 2 0 01-2-2V8z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M7 21V11h6v10'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Home = React.memo(SvgComponent)

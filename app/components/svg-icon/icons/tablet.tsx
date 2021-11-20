import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 18 22' fill='none' {...props}>
      <Path
        d='M13 3h2a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2h2'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M12 1H6a1 1 0 00-1 1v2a1 1 0 001 1h6a1 1 0 001-1V2a1 1 0 00-1-1z'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Tablet = React.memo(SvgComponent)

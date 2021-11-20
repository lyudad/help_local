import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={48} height={46} viewBox='0 0 48 46' fill='none'>
      <Path
        d='M24 2l6.798 13.823L46 18.053 35 28.809 37.596 44 24 36.823 10.404 44 13 28.808 2 18.054l15.202-2.23L24 2z'
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const BorderStar = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={12} height={12} viewBox='0 0 12 13' fill='none' {...props}>
      <Path
        d='M11.803 5.67h0l.001.002a.875.875 0 010 .665h0v.002a.876.876 0 01-.183.288l-5 4.999h0a.875.875 0 01-1.242 0h-.001a.874.874 0 010-1.243h0l3.3-3.29.214-.214H1a.875.875 0 010-1.75H8.892l-.214-.213-3.3-3.29A.88.88 0 116.622.382l4.999 5c.079.083.141.18.182.287z'
        fill={color}
        stroke='#4DB748'
        strokeWidth={0.25}
      />
    </Svg>
  )
}

export const ArrowRight2 = React.memo(SvgComponent)

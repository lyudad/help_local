import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={20} height={20} viewBox='0 0 20 20' fill='none'>
      <Path
        d='M17.875 18v.125H19a.875.875 0 110 1.75H1a.875.875 0 010-1.75h1.125V1A.875.875 0 013 .125h14a.875.875 0 01.875.875v17zM11 18.125h.125v-4.25h-2.25v4.25H11zm5 0h.125V1.875H3.875v16.25h3.25V13A.875.875 0 018 12.125h4a.875.875 0 01.875.875v5.125H16zm-3-12.25h-1a.875.875 0 110-1.75h1a.875.875 0 110 1.75zm0 4h-1a.875.875 0 110-1.75h1a.875.875 0 110 1.75zm-5-4H7a.875.875 0 010-1.75h1a.875.875 0 010 1.75zm0 4H7a.875.875 0 010-1.75h1a.875.875 0 010 1.75z'
        fill={color}
        stroke='#fff'
        strokeWidth={0.25}
      />
    </Svg>
  )
}

export const Bank = React.memo(SvgComponent)

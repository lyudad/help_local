import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={33} height={33} viewBox='0 0 33 33' fill='none'>
      <Path
        d='M16.5 32C25.06 32 32 25.06 32 16.5 32 7.94 25.06 1 16.5 1 7.94 1 1 7.94 1 16.5 1 25.06 7.94 32 16.5 32zM21.15 11.85l-9.3 9.3M11.85 11.85l9.3 9.3'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const CrossInCirlce = React.memo(SvgComponent)

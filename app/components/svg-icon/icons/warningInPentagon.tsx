import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={35} height={35} viewBox='0 0 35 35' fill='none'>
      <Path
        d='M10.669 1h13.662L34 10.669v13.662L24.331 34H10.669L1 24.331V10.669L10.669 1zM17.5 24.1h.017M17.5 10.9v6.6'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const WarningInPentagon = React.memo(SvgComponent)

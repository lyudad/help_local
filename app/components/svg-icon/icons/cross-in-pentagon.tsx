import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 36 36' fill='none' {...props}>
      <Path
        d='M10.962 1h14.076L35 10.962v14.076L25.038 35H10.962L1 25.038V10.962L10.962 1zM23.1 12.9L12.9 23.1M12.9 12.9l10.2 10.2'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const CrossInPentagon = React.memo(SvgComponent)

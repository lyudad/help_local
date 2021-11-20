import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={48} height={35} viewBox='0 0 48 35' fill='none'>
      <Path
        d='M42.25 1H5.125A4.125 4.125 0 001 5.125v24.75A4.125 4.125 0 005.125 34H42.25a4.125 4.125 0 004.125-4.125V5.125A4.125 4.125 0 0042.25 1zM1 13.375h45.375'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Wallet = React.memo(SvgComponent)

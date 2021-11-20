import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color } = props
  return (
    <Svg {...props} width={48} height={48} viewBox='0 0 48 48' fill='none'>
      <Circle cx={24} cy={24} r={24} fill='#000' />
      <Path
        d='M26.701 18.304a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.121 2.121 0 11-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76-.01.01z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const SettingsCircle = React.memo(SvgComponent)

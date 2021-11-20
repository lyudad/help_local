import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color } = props
  return (
    <Svg {...props} width={48} height={48} viewBox='0 0 48 48' fill='none'>
      <Circle cx={24} cy={24} r={24} fill='#000' />
      <Path
        d='M32 31v-2a4 4 0 00-4-4h-8a4 4 0 00-4 4v2M24 21a4 4 0 100-8 4 4 0 000 8z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const UserCircle = React.memo(SvgComponent)

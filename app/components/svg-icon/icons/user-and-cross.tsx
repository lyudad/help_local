import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={43} height={35} viewBox='0 0 43 35' fill='none'>
      <Path
        d='M28.5 34v-3.667A7.333 7.333 0 0021.167 23H8.333A7.333 7.333 0 001 30.333V34M32.167 10.167l9.166 9.166M41.333 10.167l-9.166 9.166M14.75 15.667A7.333 7.333 0 1014.75 1a7.333 7.333 0 000 14.667z'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const UserAndCross = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={19} height={21} viewBox='0 0 19 21' fill='none'>
      <Path
        d='M17.608 9.986l-7.852 7.852a5.13 5.13 0 11-7.254-7.254l7.852-7.852a3.42 3.42 0 014.836 4.836L7.33 15.42a1.71 1.71 0 11-2.418-2.418l7.254-7.245'
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Attachment = React.memo(SvgComponent)

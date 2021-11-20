/* eslint-disable */
import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  let { color, width, height } = props
  if (width === 20) width = 16
  return (
    <Svg {...{ ...props, width, height }} viewBox='0 0 16 20' fill='none'>
      <Path
        d='M14.212 6.001l-.079.078.069.088A7.875 7.875 0 11.125 11h0a7.795 7.795 0 011.663-4.823l.07-.087-.08-.079-.92-.91s0 0 0 0a.883.883 0 011.244-1.253s0 0 0 0l.91.92.077.079.088-.068a7.875 7.875 0 019.636 0l.088.068.078-.08.9-.909s0 0 0 0a.879.879 0 011.243 1.243s0 0 0 0l-.91.9zM7.083 9.983l.042-.037V8a.875.875 0 111.75 0v1.946l.042.037a1.375 1.375 0 11-1.834 0zm-2.486 6.11a6.125 6.125 0 106.806-10.186 6.125 6.125 0 00-6.806 10.186zM10 1.875H6a.875.875 0 110-1.75h4a.875.875 0 110 1.75z'
        fill={color}
        stroke='#F9F9F9'
        strokeWidth={0.25}
      />
    </Svg>
  )
}

export const Oclock = React.memo(SvgComponent)

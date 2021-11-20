import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={50} height={43} viewBox='0 0 50 43' fill='none'>
      <Path
        d='M21.152 3.166L2.094 34.981a4.5 4.5 0 003.848 6.75h38.115a4.5 4.5 0 003.847-6.75L28.847 3.166a4.5 4.5 0 00-7.695 0v0zM25 14.731v9M25 32.731h.023'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Warn = React.memo(SvgComponent)

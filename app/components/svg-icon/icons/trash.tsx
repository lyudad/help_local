import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={17} height={18} viewBox='0 0 17 18' fill='none' {...props}>
      <Path
        d='M1.375 4.167h14.25M5.333 4.167V2.583A1.583 1.583 0 016.917 1h3.166a1.583 1.583 0 011.584 1.583v1.584m2.375 0V15.25a1.583 1.583 0 01-1.584 1.583H4.542a1.583 1.583 0 01-1.584-1.583V4.167h11.084zM10.083 8.125v4.75M6.917 8.125v4.75'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Trash = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={11} height={9} viewBox='0 0 11 9' fill='none'>
      <Path
        d='M10.253 1.107a.708.708 0 00-1.006 0L3.97 6.391 1.753 4.167A.724.724 0 10.747 5.208l2.72 2.72a.708.708 0 001.006 0l5.78-5.78a.708.708 0 000-1.04z'
        fill={color}
      />
    </Svg>
  )
}

export const Checked = React.memo(SvgComponent)

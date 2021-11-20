import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={18} height={18} viewBox='0 0 18 18' fill='none' {...props}>
      <Path
        d='M8.25 14.25a6 6 0 100-12 6 6 0 000 12zM15.75 15.75l-3.263-3.262'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Search = React.memo(SvgComponent)

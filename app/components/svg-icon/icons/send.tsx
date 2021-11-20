import * as React from 'react'
import Svg, { SvgProps, G, Path, Defs, ClipPath } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={19} height={19} viewBox='0 0 19 19' fill='none' {...props}>
      <G clipPath='url(#prefix__clip0)' fill={color}>
        <Path d='M16.23 15.833a.607.607 0 01-.192-.031L.402 10.458A.596.596 0 01.318 9.37L18.131.066a.595.595 0 01.863.614l-2.177 14.647a.594.594 0 01-.588.505zM2.094 9.781l13.651 4.666L17.647 1.66 2.095 9.781z' />
        <Path d='M7.521 18.208a.59.59 0 01-.594-.593V12.27c0-.15.057-.295.16-.405L17.971.188A.594.594 0 1118.84 1L8.115 12.504v3.3l1.981-2.697a.595.595 0 01.957.704L8 17.967a.597.597 0 01-.479.241z' />
      </G>
      <Defs>
        <ClipPath id='prefix__clip0'>
          <Path fill={color} d='M0 0h19v19H0z' />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export const Send = React.memo(SvgComponent)

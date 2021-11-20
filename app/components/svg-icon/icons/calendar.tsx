import * as React from 'react'
import Svg, { SvgProps, Mask, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width={20} height={22} viewBox='0 0 20 22' fill='none' {...props}>
      <Mask id='prefix__a' fill='#fff'>
        <Path d='M10 18a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2zm-5 0a1 1 0 100-2 1 1 0 000 2zm7-12h-1V1a1 1 0 00-2 0v1H6V1a1 1 0 00-2 0v1H3a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H3a1 1 0 01-1-1v-9h16v9zm0-11H2V5a1 1 0 011-1h1v1a1 1 0 002 0V4h8v1a1 1 0 002 0V4h1a1 1 0 011 1v3zM5 14a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z' />
      </Mask>
      <Path
        d='M10 18a1 1 0 100-2 1 1 0 000 2zm5 0a1 1 0 100-2 1 1 0 000 2zm0-4a1 1 0 100-2 1 1 0 000 2zm-5 0a1 1 0 100-2 1 1 0 000 2zm7-12h-1V1a1 1 0 00-2 0v1H6V1a1 1 0 00-2 0v1H3a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H3a1 1 0 01-1-1v-9h16v9zm0-11H2V5a1 1 0 011-1h1v1a1 1 0 002 0V4h8v1a1 1 0 002 0V4h1a1 1 0 011 1v3zM5 14a1 1 0 100-2 1 1 0 000 2zm0 4a1 1 0 100-2 1 1 0 000 2z'
        fill={color}
        stroke='#fff'
        mask='url(#prefix__a)'
      />
    </Svg>
  )
}

export const Calendar = React.memo(SvgComponent)

import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg width='1em' height='1em' viewBox='0 0 45 45' fill='none' {...props}>
      <Path
        d='M22.5 45C10.093 45 0 34.906 0 22.5 0 10.093 10.093 0 22.5 0 34.906 0 45 10.093 45 22.5 45 34.906 34.906 45 22.5 45zm0-42.75c-11.165 0-20.25 9.085-20.25 20.25 0 11.166 9.085 20.25 20.25 20.25 11.166 0 20.25-9.083 20.25-20.25 0-11.165-9.084-20.25-20.25-20.25z'
        fill={color}
      />
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M30.375 16.875c.462.416.5 1.127.084 1.589l-8.58 9.532a2.25 2.25 0 01-3.263.086l-3.99-3.991a1.125 1.125 0 011.59-1.591l3.153 3.152c.456.456 1.2.436 1.632-.043l7.785-8.65a1.125 1.125 0 011.59-.084z'
        fill={color}
      />
    </Svg>
  )
}

export const CheckInCircle = React.memo(SvgComponent)

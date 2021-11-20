import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props

  return (
    <Svg {...props} width={16} height={14} viewBox='0 0 16 14' fill='none'>
      <Path
        d='M8 0l1.796 5.182h5.813l-4.703 3.203 1.796 5.183L8 10.365l-4.702 3.203 1.796-5.183L.392 5.182h5.812L8 0z'
        fill={color}
      />
    </Svg>
  )
}

export const Star = React.memo(SvgComponent)

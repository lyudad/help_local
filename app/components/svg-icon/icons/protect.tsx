import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={35} height={40} viewBox='0 0 374 374.106'>
      <Path
        d='M287.664 75.746L147.06.824a6.986 6.986 0 00-6.657.04L3.688 75.784a7 7 0 00-3.633 6.14v97.868c.082 80.45 47.746 153.23 121.457 185.46l18.976 8.27a6.992 6.992 0 005.57.008l21.383-9.234c75.079-31.531 123.922-105.016 123.93-186.445V81.926a7.003 7.003 0 00-3.707-6.18zm-10.293 102.106c-.016 75.816-45.504 144.226-115.41 173.566l-.047.023-18.621 8.04-16.18-7.06C58.5 322.422 14.13 254.68 14.051 179.794V86.07l129.762-71.117L277.37 86.121zm0 0'
        fill={color}
        data-original='#000000'
      />
      <Path
        d='M92.168 175.254a7 7 0 00-9.871-.777 6.995 6.995 0 00-.777 9.867l36.976 43.3a6.998 6.998 0 009.738.887l86.118-70.062a7 7 0 00-8.836-10.86l-80.813 65.743zm0 0'
        fill={color}
        data-original='#000000'
      />
    </Svg>
  )
}

export const Protect = React.memo(SvgComponent)

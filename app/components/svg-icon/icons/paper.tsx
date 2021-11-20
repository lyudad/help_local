import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={32} height={39} viewBox='0 0 32 39' fill='none'>
      <Path
        d='M19.381 1H4.676c-.975 0-1.91.39-2.6 1.084A3.712 3.712 0 001 4.7v29.6c0 .981.387 1.922 1.077 2.616A3.664 3.664 0 004.677 38h22.057c.975 0 1.91-.39 2.6-1.084A3.712 3.712 0 0030.41 34.3V12.1L19.381 1zM22.82 28.513H8.59M22.82 21.872H8.59M12.385 14.282H8.59'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <Path
        d='M19.025 1v11.385H30.41'
        stroke={color}
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </Svg>
  )
}

export const Paper = React.memo(SvgComponent)

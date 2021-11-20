import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { width = 10, height = 23 } = props
  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox='0 0 10 23'
      fill='none'
    >
      <Path
        d='M6.49 22.753V12.381h2.95l.44-4.042H6.49V5.76c0-1.17.276-1.968 1.697-1.968L10 3.79V.175c-.314-.05-1.39-.16-2.641-.16-2.614 0-4.403 1.884-4.403 5.343V8.34H0v4.043h2.956v10.371H6.49z'
        fill='#3C5A9A'
      />
    </Svg>
  )
}

export const Fb = React.memo(SvgComponent)

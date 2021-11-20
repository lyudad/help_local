import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={17} height={17} viewBox='0 0 17 17' fill='none'>
      <Path
        d='M15.146 5.25v.088l.082.03a2.424 2.424 0 010 4.556l-.082.03V16.14a.725.725 0 01-1.449 0V9.953l-.082-.03a2.423 2.423 0 010-4.556l.082-.03V.85a.724.724 0 111.449 0v4.4zm-5.947 5.097v.088l.083.03a2.423 2.423 0 010 4.556l-.082.03v1.089a.725.725 0 01-1.45 0v-1.09l-.082-.03a2.424 2.424 0 010-4.556l.082-.03V.85a.724.724 0 111.45 0v9.498zM3.254 3.55v.088l.082.03a2.423 2.423 0 010 4.556l-.082.03v7.885a.725.725 0 01-1.449 0V8.255l-.082-.03a2.423 2.423 0 010-4.556l.082-.03V.85a.724.724 0 111.449 0v2.702zM13.88 8.456a.974.974 0 101.083-1.62.974.974 0 00-1.083 1.62zm-5.946 5.097a.974.974 0 101.083-1.62.974.974 0 00-1.083 1.62zM1.987 6.757a.974.974 0 101.083-1.62.974.974 0 00-1.083 1.62z'
        fill={color}
        stroke='#fff'
        strokeWidth={0.25}
      />
    </Svg>
  )
}

export const Filter = React.memo(SvgComponent)

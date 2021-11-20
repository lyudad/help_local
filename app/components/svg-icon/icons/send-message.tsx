import * as React from 'react'
import Svg, { SvgProps, Circle, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps) {
  const { color } = props
  return (
    <Svg {...props} width={29} height={29} viewBox='0 0 29 29' fill='none'>
      <Circle cx={14.5} cy={14.5} r={14.5} fill='#4DB748' />
      <Path
        d='M19.133 19.87a.513.513 0 01-.163-.026L5.712 15.312a.505.505 0 01-.071-.923l15.104-7.887a.506.506 0 01.732.52l-1.846 12.42a.503.503 0 01-.498.429zM7.146 14.74l11.576 3.956 1.612-10.843L7.147 14.74z'
        fill={color}
      />
      <Path
        d='M11.748 21.884a.504.504 0 01-.504-.503v-4.532c0-.126.049-.25.135-.343l9.23-9.902a.504.504 0 11.737.688l-9.095 9.755v2.799l1.68-2.288a.504.504 0 01.812.597l-2.59 3.524a.506.506 0 01-.405.205z'
        fill={color}
      />
    </Svg>
  )
}

export const SendMessage = React.memo(SvgComponent)

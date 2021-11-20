import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color } = props
  return (
    <Svg {...props} width={32} height={34} fill='none' viewBox='0 0 56 58'>
      <Path
        d='M56 24.078v-5.661h-3.733V6.705L45.733.1 39.2 6.705v11.712h-4.667V6.705L28 .1l-6.533 6.605v11.712H16.8V6.705L10.267.1 3.733 6.705v11.712H0v5.66h3.733v17.927H0v5.661h3.733V57.1H16.8v-9.435h4.667V57.1h13.066v-9.435H39.2V57.1h13.067v-9.435H56v-5.66h-3.733V24.077H56zm-3.733-3.774h1.866v1.887h-1.866v-1.887zM3.733 45.778H1.867v-1.887h1.866v1.887zm0-23.587H1.867v-1.887h1.866v1.887zm11.2 33.022H5.6V7.486l4.667-4.718 4.666 4.718v47.727zm6.534-9.435H16.8v-1.887h4.667v1.887zm0-3.774H16.8V24.078h4.667v17.926zm0-19.813H16.8v-1.887h4.667v1.887zm11.2 33.022h-9.334V7.486L28 2.768l4.667 4.718v47.727zm6.533-9.435h-4.667v-1.887H39.2v1.887zm0-3.774h-4.667V24.078H39.2v17.926zm0-19.813h-4.667v-1.887H39.2v1.887zm11.2 19.813v13.21h-9.333V7.485l4.666-4.718L50.4 7.486v34.518zm3.733 1.887v1.887h-1.866v-1.887h1.866z'
        fill={color}
      />
    </Svg>
  )
}

export const YardWork = React.memo(SvgComponent)

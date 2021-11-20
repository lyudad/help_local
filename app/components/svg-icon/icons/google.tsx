import * as React from 'react'
import Svg, { SvgProps, Path, G, ClipPath, Defs } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { width = 21, height = 24 } = props
  return (
    <Svg
      {...props}
      width={width}
      height={height}
      viewBox='0 0 21 24'
      fill='none'
    >
      <G clipPath='url(#prefix__clip0)'>
        <Path
          d='M20.989 12.337c0-.932-.072-1.612-.226-2.317H10.709v4.206h5.901c-.118 1.045-.76 2.619-2.189 3.676l-.02.141 3.18 2.606.22.023c2.022-1.976 3.188-4.885 3.188-8.335z'
          fill='#4285F4'
        />
        <Path
          d='M10.71 23.418c2.89 0 5.317-1.008 7.09-2.745l-3.379-2.77c-.904.667-2.117 1.133-3.712 1.133-2.831 0-5.235-1.977-6.092-4.71l-.125.012-3.305 2.707-.044.127c1.761 3.702 5.378 6.245 9.566 6.245z'
          fill='#34A853'
        />
        <Path
          d='M4.617 14.326a7.346 7.346 0 01-.357-2.241c0-.78.131-1.536.345-2.241l-.006-.15-3.346-2.751-.11.055a11.885 11.885 0 00-1.142 5.087c0 1.826.416 3.55 1.142 5.087l3.474-2.846z'
          fill='#FBBC05'
        />
        <Path
          d='M10.71 5.134c2.01 0 3.366.92 4.14 1.688l3.022-3.123C16.016 1.873 13.6.752 10.709.752c-4.188 0-7.805 2.544-9.566 6.246l3.463 2.846c.868-2.733 3.272-4.71 6.103-4.71z'
          fill='#EB4335'
        />
      </G>
      <Defs>
        <ClipPath id='prefix__clip0'>
          <Path
            fill='#fff'
            transform='translate(0 .752)'
            d='M0 0h21v22.743H0z'
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export const Google = React.memo(SvgComponent)

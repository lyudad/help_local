import * as React from 'react'
import Svg, { SvgProps, Path } from 'react-native-svg'

function SvgComponent(props: SvgProps): JSX.Element {
  const { color } = props
  return (
    <Svg {...props} width={30} height={34} fill='none' viewBox='0 0 53 60'>
      <Path
        d='M51.225 23.167h-.515c.467-1.986-.397-4.148-1.176-6.097-.751-1.877-1.46-3.65-.867-4.806a4.11 4.11 0 012.78-1.659.864.864 0 00.624-1.055.876.876 0 00-1.067-.618c-2.008.518-3.283 1.352-3.898 2.55-.95 1.85-.06 4.073.8 6.224.773 1.933 1.57 3.925.975 5.461h-2.06a4.698 4.698 0 00-2.697-3.149c-1.463-.871-2.52-1.5-1.837-4.328a.864.864 0 00-.648-1.042.875.875 0 00-1.054.64c-.98 4.058 1.11 5.303 2.636 6.212.917.546 1.536.951 1.794 1.667h-.789a.87.87 0 00-.875.865v16.105a10.545 10.545 0 01-20.943 1.623h.928a8.449 8.449 0 008.488-8.39v-9.424a4.696 4.696 0 00-.875-9.321h-1.205V3.84a3.683 3.683 0 00-7.367 0v10.783h-8.949V3.841a3.683 3.683 0 00-7.366 0v7.995a.875.875 0 001.75 0V3.84a1.934 1.934 0 013.867 0v10.783H7.812v-3.126a.875.875 0 00-1.75 0v3.126H4.856a4.697 4.697 0 00-.875 9.322v9.424a8.45 8.45 0 008.488 8.39h1.13a18.88 18.88 0 005.852 12.11 19.39 19.39 0 0028.822-2.346.856.856 0 00-.178-1.21.882.882 0 00-1.224.175 17.69 17.69 0 01-6.075 5.08 17.671 17.671 0 01-20.132-2.945 17.169 17.169 0 01-5.308-10.864h5.283A12.296 12.296 0 0045.1 40.137v-15.24h5.25v15.24a20.439 20.439 0 01-3.48 10.352c-.213.43.295.502.73.712.433.21 0 .5.672.323A26.026 26.026 0 0052.1 40.137V24.032a.87.87 0 00-.875-.865zM24.127 3.841a1.933 1.933 0 013.867 0v10.783h-3.867V3.841zM1.85 19.326a2.992 2.992 0 013.006-2.972H30.95a2.971 2.971 0 110 5.944H4.856a2.992 2.992 0 01-3.006-2.972zM5.73 33.37v-9.342h24.344v9.342a6.707 6.707 0 01-6.738 6.661H12.469a6.708 6.708 0 01-6.738-6.66z'
        fill={color}
      />
      <Path
        d='M32.814 59.3c-5 .012-9.812-1.907-13.432-5.357a19.043 19.043 0 01-5.874-12.083h-1.039a8.548 8.548 0 01-8.588-8.49V24.03a4.797 4.797 0 01.975-9.505h1.106V3.841a3.783 3.783 0 017.566 0v10.683h8.75V3.841a3.783 3.783 0 017.565 0v10.684h1.107a4.796 4.796 0 01.974 9.504v9.341a8.548 8.548 0 01-8.588 8.49h-.81a10.446 10.446 0 0020.726-1.723V24.032a.97.97 0 01.974-.965h.64a3.75 3.75 0 00-1.696-1.481c-1.553-.925-3.68-2.192-2.683-6.32a.978.978 0 011.912.073.955.955 0 01-.015.375c-.666 2.755.312 3.337 1.79 4.218a4.842 4.842 0 012.729 3.135h1.91c.533-1.49-.245-3.438-.998-5.322-.87-2.173-1.769-4.419-.798-6.31.628-1.223 1.924-2.074 3.962-2.6a.976.976 0 011.19.69.948.948 0 01-.1.727.968.968 0 01-.598.45 4.023 4.023 0 00-2.716 1.607c-.572 1.116.13 2.869.871 4.724.761 1.901 1.62 4.051 1.209 6.034h.39a.97.97 0 01.975.965v16.105a25.922 25.922 0 01-3.726 11.237.993.993 0 01-.12.211 19.544 19.544 0 01-6.714 5.612 19.312 19.312 0 01-8.826 2.103zM4.856 14.724A4.597 4.597 0 004 23.848l.082.015v9.507a8.349 8.349 0 008.387 8.29h1.222l.008.091a18.844 18.844 0 005.821 12.047 19.29 19.29 0 0028.51-2.122c-.17.018-.248-.031-.292-.183a.283.283 0 00-.182-.203c-.087-.042-.177-.078-.263-.113-.239-.097-.464-.188-.544-.367a17.804 17.804 0 01-5.909 4.848 17.77 17.77 0 01-20.245-2.961 17.343 17.343 0 01-5.34-10.927l-.01-.11h5.481l.012.086a12.195 12.195 0 0024.264-1.609v-15.34h5.448v15.34a21.026 21.026 0 01-3.167 9.948.98.98 0 011.125.424.955.955 0 01.128.352A25.363 25.363 0 0052 40.128V24.032a.77.77 0 00-.776-.765h-.64l.028-.123c.46-1.955-.407-4.124-1.172-6.037-.76-1.899-1.478-3.692-.863-4.888a4.19 4.19 0 012.842-1.71.772.772 0 00.573-.638.753.753 0 00-.018-.296.779.779 0 00-.945-.546c-1.98.51-3.235 1.328-3.835 2.498-.929 1.81-.047 4.012.804 6.142.78 1.949 1.584 3.962.975 5.534l-.024.064h-2.212l-.016-.081a4.636 4.636 0 00-2.65-3.082c-1.443-.86-2.582-1.538-1.883-4.437a.75.75 0 00-.09-.574.77.77 0 00-.483-.348.78.78 0 00-.934.567c-.963 3.986 1.091 5.209 2.59 6.102.937.558 1.57.98 1.836 1.72l.049.133h-.93a.771.771 0 00-.776.765v16.105a10.645 10.645 0 01-21.142 1.639l-.018-.116h1.046a8.35 8.35 0 008.388-8.29v-9.507l.081-.015a4.597 4.597 0 00-.856-9.123h-1.306V3.841a3.583 3.583 0 00-7.166 0v10.883h-9.15V3.841a3.583 3.583 0 00-7.166 0v7.072a.98.98 0 011.55 0V3.841a2.034 2.034 0 014.067 0v10.883H7.712v-2.303a.98.98 0 01-1.55 0v2.303H4.856zm10.61 27.136c.42 4.079 2.289 7.873 5.267 10.692a17.527 17.527 0 0026.058-2.123l.002-.002a20.314 20.314 0 003.458-10.296V24.997H45.2v15.14a12.397 12.397 0 01-24.65 1.723h-5.085zm31.49 8.682a.227.227 0 00-.026.181c.041.108.234.187.438.269.09.037.184.075.276.119a.474.474 0 01.286.327.23.23 0 00.014.042c.09 0 .178-.015.264-.041l.086-.152a.761.761 0 00-.258-.893.783.783 0 00-1.08.148zM7.913 14.524h3.667V3.841a1.834 1.834 0 00-3.667 0v10.683zm-1.75-2.688a.775.775 0 001.55 0v-.343a.775.775 0 00-1.55.005v.338zM23.337 40.13H12.469a6.807 6.807 0 01-6.838-6.76v-9.442h24.543v9.442a6.807 6.807 0 01-6.837 6.76zM5.83 24.128v9.242a6.608 6.608 0 006.638 6.561h10.868a6.608 6.608 0 006.638-6.56v-9.243H5.831zm25.119-1.73H4.856a3.075 3.075 0 01-3.109-3.072 3.072 3.072 0 013.109-3.072H30.95a3.071 3.071 0 110 6.144zM4.856 16.454a2.873 2.873 0 100 5.744H30.95a2.871 2.871 0 100-5.744H4.856zm23.237-1.73h-4.066V3.841a2.033 2.033 0 014.066 0v10.883zm-3.866-.2h3.667V3.841a1.834 1.834 0 00-3.667 0v10.683z'
        fill={color}
      />
    </Svg>
  )
}

export const Electrical = React.memo(SvgComponent)

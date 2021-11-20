import { ViewStyle } from 'react-native'
import { color, spacing } from 'theme'
import { IconProps } from '../svg-icon/icon.props'

const SPACE_BETWEEN = 'space-between'

const BASE_CONTAINER: ViewStyle = {
  justifyContent: SPACE_BETWEEN,
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const BASE_MAIN_ROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: SPACE_BETWEEN,
}

const BASE_ICON: IconProps = {
  color: color.primary,
}

export const containerPresets: {
  default: ViewStyle
} = {
  default: {
    ...BASE_CONTAINER,
  },
}

export const mainRowPresets: {
  default: ViewStyle
} = {
  default: {
    ...BASE_MAIN_ROW,
  },
}

export const iconPresets: {
  default: IconProps
} = {
  default: {
    ...BASE_ICON,
  },
}

export type JobListPresetsNames = keyof typeof mainRowPresets

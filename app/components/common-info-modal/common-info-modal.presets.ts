import { ImageStyle, ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  alignItems: 'center',
}

const BASE_ICON: ImageStyle = {
  marginBottom: spacing[3],
}

const BASE_TITLE_CONTAINER: ViewStyle = {
  marginBottom: spacing[2],
}
const BASE_CONTENT_CONTAINER: ViewStyle = {
  marginBottom: spacing[3],
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const iconPresets: { primary: ImageStyle } = {
  primary: {
    ...BASE_ICON,
  },
}

export const titleContainerPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_TITLE_CONTAINER,
  },
}

export const contentContainerPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_CONTENT_CONTAINER,
  },
}

/**
 * A list of preset names.
 */
export type CommonInfoModalPresetNames = keyof typeof containerPresets

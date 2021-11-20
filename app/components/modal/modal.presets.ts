import { ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  width: '90%',
  backgroundColor: color.palette.white,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '25%',
  borderRadius: 4,
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[6],
}

const BASE_OVERLAY: ViewStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: color.palette.black05,
}

const BASE_CROSS_CONTAINER: ViewStyle = {
  position: 'absolute',
  top: 12,
  right: 12,
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const overlayPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_OVERLAY,
  },
}

export const crossContainerPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_CROSS_CONTAINER,
  },
}

/**
 * A list of preset names.
 */
export type ModalPresetNames = keyof typeof containerPresets

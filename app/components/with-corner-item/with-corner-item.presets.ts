import { ViewStyle } from 'react-native'

const BASE_CORNER_ITEM: ViewStyle = {
  position: 'absolute',
}

export const viewPresets: { primary: ViewStyle } = {
  primary: {},
}

export const cornerItemPresets: {
  primary: ViewStyle
  bottomLeft: ViewStyle
  topRight: ViewStyle
  topLeft: ViewStyle
  primaryPlus: ViewStyle
} = {
  primary: {
    ...BASE_CORNER_ITEM,
    bottom: 0,
    right: 0,
  },
  primaryPlus: {
    ...BASE_CORNER_ITEM,
    bottom: -3,
    right: -3,
  },
  bottomLeft: {
    ...BASE_CORNER_ITEM,
    bottom: 0,
    left: 0,
  },
  topLeft: {
    ...BASE_CORNER_ITEM,
    top: 0,
    left: 0,
  },
  topRight: {
    ...BASE_CORNER_ITEM,
    top: 0,
    right: 0,
  },
}

/**
 * A list of preset names.
 */
export type WithCornerItemPresetNames = keyof typeof cornerItemPresets

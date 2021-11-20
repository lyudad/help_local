import { ImageStyle, ViewStyle } from 'react-native'

const BASE_VIEW: ViewStyle = {
  width: 50,
  height: 50,
}

const BASE_IMAGE: ImageStyle = {
  width: 50,
  height: 50,
  borderRadius: 25,
}

const BASE_CORNER_ITEM: ViewStyle = {
  position: 'absolute',
}

const BASE_VIEW_FOR_OVERLAP: ViewStyle = {
  ...BASE_VIEW,
  position: 'relative',
}

export const viewPresets: {
  primary: ViewStyle
  overlapPrevious1: ViewStyle
  overlapPrevious2: ViewStyle
} = {
  primary: {
    ...BASE_VIEW,
  },
  overlapPrevious1: {
    ...BASE_VIEW_FOR_OVERLAP,
    right: '40%',
  },
  overlapPrevious2: {
    ...BASE_VIEW_FOR_OVERLAP,
    right: '80%',
  },
}

export const imagePresets: { primary: ImageStyle } = {
  primary: {
    ...BASE_IMAGE,
  },
}

export const cornerItemPresets: {
  primary: ViewStyle
  bottomLeft: ViewStyle
  topRight: ViewStyle
  topLeft: ViewStyle
} = {
  primary: {
    ...BASE_CORNER_ITEM,
    bottom: 0,
    right: 0,
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
const combined = { ...cornerItemPresets, ...viewPresets }
export type CircleImagePresetNames = keyof typeof combined

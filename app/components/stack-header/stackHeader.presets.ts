import { ViewStyle, ImageStyle } from 'react-native'
import { spacing } from 'theme'

/**
 * All text will start off looking like this.
 */

const BASE_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[3],
}

const BASE_TOP: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
}
const BASE_LEFT_TOP: ViewStyle = {
  alignItems: 'center',
}
const BASE_RIGHT_TOP: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}
const BASE_RIGHT_TOP_ITEM: ViewStyle = {
  paddingLeft: spacing[6] - 4,
}
const AVATAR_CONTAINER: ViewStyle = {
  width: 60,
  height: 60,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: spacing[6] - 4,
}
const BASE_AVATAR: ImageStyle = {
  borderRadius: 30,
}

const BASE_BOTTOM: ViewStyle = {}
const BASE_BOTTOM_BACK: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */

export const containerPreset: { primary: ViewStyle } = {
  primary: {
    ...BASE_CONTAINER,
  },
}
export const topPreset: {
  primary: ViewStyle
  withInput: ViewStyle
  withInputBack: ViewStyle
} = {
  primary: {
    ...BASE_TOP,
  },
  withInput: {
    ...BASE_TOP,
    marginTop: spacing[7],
  },
  withInputBack: {
    ...BASE_TOP,
    marginTop: spacing[8] + 16,
  },
}
export const leftTopPreset: { primary: ViewStyle } = {
  primary: {
    ...BASE_LEFT_TOP,
  },
}
export const rightTopPreset: { primary: ViewStyle } = {
  primary: {
    ...BASE_RIGHT_TOP,
  },
}
export const rightTopItemPreset: { primary: ViewStyle } = {
  primary: {
    ...BASE_RIGHT_TOP_ITEM,
  },
}
export const avatarContainerPreset: { primary: ViewStyle } = {
  primary: {
    ...AVATAR_CONTAINER,
  },
}
export const avatarPreset: { primary: ViewStyle } = {
  primary: { ...BASE_AVATAR } as ImageStyle,
}
export const bottomPreset: {
  primary: ViewStyle
  withInput: ViewStyle
  withInputBack: ViewStyle
} = {
  primary: { ...BASE_BOTTOM },
  withInput: {
    ...BASE_BOTTOM,
    marginTop: spacing[4],
  },
  withInputBack: {
    ...BASE_BOTTOM,
    marginTop: spacing[4],
  },
}
export const bottomBackPreset: {
  primary: ViewStyle
  withInput: ViewStyle
  withInputBack: ViewStyle
} = {
  primary: { ...BASE_BOTTOM_BACK },
  withInput: { ...BASE_BOTTOM_BACK },
  withInputBack: {
    ...BASE_BOTTOM_BACK,
    marginTop: spacing[4],
  },
}

/**
 * A list of preset names.
 */
export type StackHeaderPresetNames = keyof typeof bottomPreset

import { ViewStyle } from 'react-native'
import { spacing } from 'theme'

const MAIN_ROW_BASE: ViewStyle = {
  width: '100%',
  flexDirection: 'row',
  marginBottom: spacing[4],
}

const MAIN_INFO_VIEW_BASE: ViewStyle = {
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingLeft: spacing[4],
}

const NAME_VIEW_BASE: ViewStyle = {
  paddingBottom: spacing[2],
}

export const mainRowPresets: { primary: ViewStyle } = {
  primary: {
    ...MAIN_ROW_BASE,
  },
}

export const mainInfoViewPresets: { primary: ViewStyle } = {
  primary: {
    ...MAIN_INFO_VIEW_BASE,
  },
}

export const nameViewPresets: { primary: ViewStyle } = {
  primary: {
    ...NAME_VIEW_BASE,
  },
}

/**
 * A list of preset names.
 */
export type HelperHeaderCardPresetNames = keyof typeof mainRowPresets

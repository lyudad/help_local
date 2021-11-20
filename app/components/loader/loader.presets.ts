import { ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  alignSelf: 'center',
  justifyContent: 'center',
  height: 30,
}

export const containerPresets: {
  primary: ViewStyle
  primayWithVerticalMarginSp3: ViewStyle
} = {
  primary: {
    ...BASE_CONTAINER,
  },
  primayWithVerticalMarginSp3: {
    ...BASE_CONTAINER,
    marginVertical: spacing[3],
  },
}

/**
 * A list of preset names.
 */
export type LoaderPresetNames = keyof typeof containerPresets

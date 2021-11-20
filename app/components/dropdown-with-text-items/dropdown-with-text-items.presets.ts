import { ViewStyle } from 'react-native'
import { spacing } from 'theme'

const BASE_ITEM_CONTAINER: ViewStyle = {
  paddingVertical: spacing[2],
}

export const itemContainerPresets: { primary: ViewStyle } = {
  primary: {
    ...BASE_ITEM_CONTAINER,
  },
}

export type IDropdownWithTextItemsPresetNames = keyof typeof itemContainerPresets

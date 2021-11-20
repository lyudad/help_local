import { ViewStyle } from 'react-native'
import { color, spacing } from 'theme'

const BASE_CONTAINER: ViewStyle = {
  width: '100%',
  height: 45,
  borderRadius: 4,
  flexDirection: 'row',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: color.palette.black,
  backgroundColor: color.palette.white,
  zIndex: 1,
}
const BASE_PICKER_CONTAINER: ViewStyle = {
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: spacing[4],
}
const BASE_ICON_CONTAINER: ViewStyle = {
  width: 45,
  height: 45,
  alignItems: 'center',
  justifyContent: 'center',
  borderLeftWidth: 1,
  borderColor: color.palette.black,
}

export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

export const errorViewPresets: { primary: ViewStyle } = {
  primary: {},
}

export const pickerContainerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_PICKER_CONTAINER },
}
export const iconContainerPresets: { primary: ViewStyle; hours: ViewStyle } = {
  primary: { ...BASE_ICON_CONTAINER },
  hours: { display: 'none' },
}

export type DatePickerPresetNames = keyof typeof iconContainerPresets

import { ViewStyle } from 'react-native'

/**
 * All text will start off looking like this.
 */
const BASE_CONTAINER: ViewStyle = {
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const containerPresets: { primary: ViewStyle } = {
  primary: { ...BASE_CONTAINER },
}

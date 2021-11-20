import { ViewStyle } from 'react-native'

export interface IAddressInputProps {
  defaultAddress?: string
  onAddressChange: (address: string) => void
  error?: string

  style?: ViewStyle
}

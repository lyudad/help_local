import { ViewStyle } from 'react-native'

import { IAddress } from 'interfaces'

export interface IAddressFormProps {
  address?: IAddress

  /**
   * If there is an error then this function will be called with empty string
   * If there is NOT an error then this function will be called with full address string
   */
  onAddressChange: (address: string) => void
  title?: string
  withWhyAddressModal?: boolean
  errorText?: string
  withoutTitle?: boolean
  makeAllFieldsTouchedToShowErrors?: boolean

  style?: ViewStyle
}

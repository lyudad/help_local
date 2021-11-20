import { ViewStyle } from 'react-native'

export interface IDateOfBirthProps {
  /**
   * Function of changing date.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  onDateChange: any

  /**
   * Date.
   */
  date?: Date

  style?: ViewStyle

  /**
   * An optional style of Modal Container which override useful for padding & margin.
   */
  styleModalContainer?: ViewStyle | ViewStyle[]

  errorText?: string
}

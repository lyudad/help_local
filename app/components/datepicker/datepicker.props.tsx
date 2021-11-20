import { ViewStyle } from 'react-native'
import { DatePickerPresetNames } from './datepicker.presets'

export interface DatepickerProps {
  /**
   * Type of datePicker, default - 'datetime' .
   */
  mode?: 'datetime' | 'date' | 'time'

  withoutArrow?: boolean

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

  /**
   * One of the different types of text presets.
   */
  preset?: DatePickerPresetNames
}

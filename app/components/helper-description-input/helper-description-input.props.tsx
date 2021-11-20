import { Dispatch, SetStateAction } from 'react'
import { ViewStyle } from 'react-native'

import { IHelperDescriptionInputPresetNames } from './helper-description-input.presets'

export interface IHelperDescriptionInputProps {
  text: string

  setText: Dispatch<SetStateAction<string>>

  editable?: boolean

  errorText?: string

  style?: ViewStyle

  /**
   * One of the different types of text presets.
   */
  preset?: IHelperDescriptionInputPresetNames
}

import { TextStyle } from 'react-native'

export interface IInlineTitleThenTextAndInlineReadMoreProps {
  title: string
  text: string
  readMoreText?: string
  isAlwaysReadMoreMode?: boolean
  isReadMoreBtnHidden?: boolean

  titleStyle?: TextStyle
  textStyle?: TextStyle
}

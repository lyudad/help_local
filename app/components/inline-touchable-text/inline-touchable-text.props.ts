import { TextStyle } from 'react-native'

export interface IInlineTouchableTextProps {
  text: string
  onTextPress?: () => void
  textStyle?: TextStyle
}

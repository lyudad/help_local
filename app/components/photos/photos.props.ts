import { ImageURISource, ViewStyle } from 'react-native'

export interface IPhotosProps {
  title?: string
  showDefaultTitle?: boolean
  photos: string[] | ImageURISource[]
  size?: number

  style?: ViewStyle
}

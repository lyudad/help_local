import { Asset } from 'react-native-image-picker'

export interface ImagePickerProps {
  onSelected: (files: Asset[]) => void
  toggleModal: () => void
  isMultiSelection?: boolean
}

/* eslint-disable */
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Modal, Text } from 'components'
import { ImagePickerProps } from './image-picker.props'
import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker'
import {
  ALIGIN_ITEMS_START,
  MARGIN_VERTICAL_SP4,
  TEXT_ALIGN_LEFT,
} from 'constants/common-styles'
import { color } from 'theme'
import { useDispatch } from 'react-redux'
import { setError } from 'app/store/commonSlice'
import { translate } from 'i18n'

export const ImagePicker = (props: ImagePickerProps): JSX.Element => {
  const { onSelected, toggleModal, isMultiSelection } = props

  const dispatch = useDispatch()

  const options = {
    mediaType: 'photo',
    selectionLimit: isMultiSelection ? 0 : 1,
  }

  const onResult = (result: ImagePickerResponse) => {
    if (result.errorCode) {
      toggleModal()
      dispatch(setError(translate('common.couldNotGetAccess')))
    } else if (result.didCancel) {
    } else {
      toggleModal()
      onSelected(
        result.assets.map((asset) => ({
          name: asset.fileName,
          size: asset.fileSize,
          ...asset,
        })),
      )
    }
  }

  return (
    <Modal
      visible={true}
      toggleModal={() => {
        toggleModal()
      }}
      styleContainer={ALIGIN_ITEMS_START}
    >
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          launchCamera(options, onResult)
        }}
      >
        <Text
          style={[TEXT_ALIGN_LEFT, MARGIN_VERTICAL_SP4]}
          tx='common.takePicture'
          preset='header4'
          color={color.primary}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          // @ts-ignore
          launchImageLibrary(options, onResult)
        }}
      >
        <Text
          style={TEXT_ALIGN_LEFT}
          tx='common.selectFromGallery'
          preset='header4'
          color={color.primary}
        />
      </TouchableOpacity>
    </Modal>
  )
}

/* eslint-disable */
import React, { useEffect, useRef } from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { View, ViewStyle } from 'react-native'
import { useDispatch } from 'react-redux'

import { setWarning } from 'app/store/commonSlice'
import { translate } from 'i18n'
import { IAddressInputProps } from './address-input.props'
import { GOOGLE_API_KEY } from 'constants/config'
import { color } from 'theme'
import { ShowError } from '../show-error'

const INPUT_CONTAINER: ViewStyle = {
  borderWidth: 1,
  borderRadius: 4,
  height: 45,
  borderColor: color.dim,
}

export const AddressInput = ({
  defaultAddress,
  onAddressChange,
  error,
  style,
}: IAddressInputProps): JSX.Element => {
  const dispatch = useDispatch()
  const ref = useRef()

  useEffect(() => {
    if (ref.current && defaultAddress) {
      // @ts-ignore: Object is possibly 'null'
      ref.current.setAddressText(defaultAddress)
      onAddressChange(defaultAddress)
    }
  }, [])

  return (
    <View style={style}>
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={translate('addressInput.placeholder')}
        onPress={(data) => {
          onAddressChange(data.description)
        }}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          types: 'address',
        }}
        debounce={100}
        enablePoweredByContainer={false}
        onFail={() => dispatch(setWarning(translate('common.systemError')))}
        onTimeout={() => dispatch(setWarning(translate('common.requestError')))}
        timeout={7000}
        textInputProps={{
          onChangeText: (newText: string) => onAddressChange(newText),
        }}
        styles={{
          textInput: INPUT_CONTAINER,
        }}
      />
      {error && <ShowError text={error} />}
    </View>
  )
}

import React from 'react'
import { mergeAll, flatten } from 'ramda'
import { TextInput, View } from 'react-native'
// import InputScrollView from 'react-native-input-scroll-view'

import { translate } from 'i18n'
import { Text } from 'components'
import { color } from 'theme'
import {
  containerPresets,
  innereRowPresets,
  // inputOnRowPresets,
} from './helper-description-input.presets'
import { IHelperDescriptionInputProps } from './helper-description-input.props'
import { ShowError } from '../show-error'
// import InputScrollView from 'react-native-input-scroll-view'

export const HelperDescriptionInput = (
  props: IHelperDescriptionInputProps,
): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    text,
    setText,
    errorText,
    editable,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
      {
        ...(errorText && {
          borderColor: color.error,
          borderWidth: 2,
        }),
      },
    ]),
  )
  const innereRowStyle = mergeAll(
    flatten([innereRowPresets[preset] || innereRowPresets.primary]),
  )
  /* const inputOnRowStyle = mergeAll(
    flatten([inputOnRowPresets[preset] || inputOnRowPresets.primary]),
  ) */

  const placeHolderText: string = translate('helperDescription.placeholder')
  const [plcHolder, setPlcHolder] = React.useState<string>(placeHolderText)
  /*
  return (
    <>
      <InputScrollView style={{}}>
        <View style={style}>
          <View style={innereRowStyle}>
            <Text tx='helperCard.iHelptBecause' preset='header5bold' />
          </View>
          <TextInput
            editable={editable}
            value={text}
            multiline
            onChangeText={setText}
            underlineColorAndroid='transparent'
            placeholder={plcHolder}
            onFocus={() => setPlcHolder('')}
            onBlur={() => setPlcHolder(placeHolderText)}
          />
        </View>
      </InputScrollView>
      <ShowError text={errorText} />
    </>
  ) */
  return (
    <>
      <View style={style}>
        <View style={innereRowStyle}>
          <Text tx='helperCard.iHelptBecause' preset='header5bold' />
        </View>
        <TextInput
          value={text}
          multiline
          onChangeText={setText}
          underlineColorAndroid='transparent'
          placeholder={plcHolder}
          onFocus={() => setPlcHolder('')}
          onBlur={() => setPlcHolder(placeHolderText)}
          editable={editable}
        />
      </View>
      <ShowError text={errorText} />
    </>
  )
}

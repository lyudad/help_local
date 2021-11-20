import React from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Text } from 'components'
import { translate } from 'i18n'
import { IShowErrorProps } from './show-error.props'
import { viewPresets, errorTextPresets } from './show-error.presets'

export const ShowError = (props: IShowErrorProps): JSX.Element => {
  let { text = '', tx = '' } = props
  const {
    preset = 'primary',
    style: styleOverride,
    errorTextStyle: errorTextStyleOverride,
  } = props

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  )

  const errorTextStyle = mergeAll(
    flatten([
      errorTextPresets[preset] || errorTextPresets.primary,
      errorTextStyleOverride,
    ]),
  )

  if (text === null) {
    text = ''
  }
  if (tx === null) {
    tx = ''
  }

  return (
    <>
      {(text.length > 0 || tx.length > 0) && (
        <View style={viewStyle}>
          <Text style={errorTextStyle} text={text || translate(tx)} />
        </View>
      )}
    </>
  )
}

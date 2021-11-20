import React from 'react'
import { TouchableOpacity } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import { Text } from 'components'

import {
  containerPresets,
  textPresets,
  btnTextPresets,
} from './info-with-undo-btn.presets'
import { InfoWithUndoBtnProps } from './info-with-undo-btn.props'
import { RowSpaceBetween } from '../space-between/row-space-between'

export function InfoWithUndoBtn(props: InfoWithUndoBtnProps): JSX.Element {
  const {
    preset = 'primary',
    text,
    textStyle,
    visible = false,
    onUndo,
    actionAfter,
    style,
    btnTextStyle,
    hideAfter = 3000,
  } = props

  setTimeout(() => actionAfter(), hideAfter)

  const containerStyle = mergeAll(
    flatten([containerPresets[preset] || containerPresets.primary, style]),
  )
  const styleOfText = mergeAll(
    flatten([textPresets[preset] || textPresets.primary, textStyle]),
  )
  const styleOfBtnText = mergeAll(
    flatten([btnTextPresets[preset] || btnTextPresets.primary, btnTextStyle]),
  )

  return (
    <>
      {!visible && (
        <RowSpaceBetween
          style={containerStyle}
          StartItem={<Text text={text} style={styleOfText} />}
          EndItem={
            <TouchableOpacity onPress={() => onUndo()}>
              <Text tx='common.undo' style={styleOfBtnText} />
            </TouchableOpacity>
          }
        />
      )}
    </>
  )
}

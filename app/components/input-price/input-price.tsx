/* eslint-disable */
import React, { useState } from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, Platform } from 'react-native'

import { Input, ShowError, Text } from 'components'
import { translate } from 'i18n'
import {
  containerPresets,
  inputPresets,
  dollarPresets,
  hrPresets,
  paddingLeft,
} from './input-price.presets'
import { IInputPriceProps } from './input-price.props'

export const InputPrice = (props: IInputPriceProps): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    value = 0,
    onPriceChange,
    textBeforeDollar,
    hideDollar,
    showHr,
    maxLength = 8,
    errorTx,
    errorText,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )
  const inputStyle = mergeAll(
    flatten([
      inputPresets[preset] || inputPresets.primary,
      inputStyleOverride,
      { ...(Platform.OS === 'ios' && { paddingTop: 3 }) },
    ]),
  )
  const dollarStyle = mergeAll(
    flatten([dollarPresets[preset] || dollarPresets.primary]),
  )
  const hrStyle = mergeAll(flatten([hrPresets[preset] || hrPresets.primary]))
  const paddingLeftStyle = mergeAll(
    flatten([paddingLeft[preset] || paddingLeft.primary]),
  )

  const [priceAsText, setPriceAsText] = useState<string>(
    value ? value.toString() : '0',
  )

  return (
    <>
      <View style={style}>
        <Input
          {...(value && { value: priceAsText })}
          style={textBeforeDollar && paddingLeftStyle}
          styleContainer={inputStyle}
          keyboardType='number-pad'
          maxLength={maxLength}
          placeholder='common.pricePlaceholder'
          onChangeText={(text) => {
            const newPriceTextAsArray = Array.from(text)

            let foundDotsCount: number = 0
            let foundBadSymbols: boolean = false
            for (let i = 1; i < newPriceTextAsArray.length; i++) {
              if (Number.isNaN(parseInt(newPriceTextAsArray[i])))
                if (newPriceTextAsArray[i] === '.') foundDotsCount++
                else foundBadSymbols = true
              if (foundDotsCount > 1 || foundBadSymbols) break
            }

            if (
              newPriceTextAsArray.length === 0 ||
              (newPriceTextAsArray.length > 0 &&
                !Number.isNaN(parseInt(newPriceTextAsArray[0])) &&
                foundDotsCount < 2 &&
                !foundBadSymbols &&
                newPriceTextAsArray[0] !== '.')
            ) {
              if (onPriceChange) {
                onPriceChange(
                  Number.isNaN(parseFloat(text)) ? 0 : parseFloat(text),
                )
              }
              if (Number.isNaN(parseFloat(text)) || parseFloat(text) === 0) {
                setPriceAsText('')
              } else {
                setPriceAsText(text)
              }
            }
          }}
        />
        {!hideDollar && (
          <View style={dollarStyle}>
            <Text
              text={textBeforeDollar ? `${textBeforeDollar} $` : '$'}
              preset='header5'
            />
          </View>
        )}
        {showHr && (
          <View style={hrStyle}>
            <Text
              text={`/${translate('common.hr')}`}
              preset='header5slimmest'
            />
          </View>
        )}
      </View>
      {(errorTx || errorText) && (
        <ShowError text={errorText || translate(errorTx)} />
      )}
    </>
  )
}

import React, { useState } from 'react'
import { mergeAll, flatten } from 'ramda'

import { Input } from 'components'
import { containerPresets } from './ssn-input.presets'
import { ISsnInputProps } from './ssn-input.props'

export const SsnInput = (props: ISsnInputProps): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    ssn,
    onSsnChange,
    errorText,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  /*
  const addSpaces = (ssn: string) => {
    let newSsn: string = ''
    for (let i = 0; i < ssn.length; i++) {
      if (i === 2 || i === 5)
        newSsn += ' '
      newSsn += Array.from(ssn)[i]
    }
    return newSsn
  }
*/
  const [isEditingStarted, setIsEditingStarted] = useState<boolean>(false)

  return (
    <Input
      maxLength={10}
      keyboardType='numeric'
      placeholder='ssnInput.defaultNumberPlaceholder'
      styleContainer={style}
      errorText={errorText}
      value={((): string => {
        // if (isEditingStarted) return addSpaces(ssn.toString())
        if (isEditingStarted) {
          return ssn.toString()
        }
        return ''
      })()}
      onChangeText={(text: string) => {
        if (text === '') {
          setIsEditingStarted(false)
        } else {
          setIsEditingStarted(true)
        }
        // onSsnChange(parseInt(text.replaceAll(' ', '')))
        onSsnChange(parseInt(text, 10))
      }}
    />
  )
}

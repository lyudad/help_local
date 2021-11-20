/* eslint-disable */
import React, { useState, useCallback } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { mergeAll, flatten } from 'ramda'
import DatePick from 'react-native-date-picker'
import dayjs from 'dayjs'

import { translate } from 'i18n'
import { Text } from '../text/text'
import { SVGIcon } from '../svg-icon/index'
import { Modal } from '../modal/modal'
import {
  containerPresets,
  pickerContainerPresets,
  iconContainerPresets,
  errorViewPresets,
} from './datepicker.presets'
import { DatepickerProps } from './datepicker.props'
import { ShowError } from 'components'
import { color } from 'theme'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function DatePicker(props: DatepickerProps): JSX.Element {
  // grab the props
  const {
    preset = 'primary',
    mode = 'datetime',
    date,
    onDateChange,
    styleModalContainer,
    errorText,
    style,
    withoutArrow,
  } = props

  const dateString = 'date'
  const timeString = 'time'

  const makePlaceHolder = (_date: Date | null): string => {
    if (mode === timeString) {
      return dayjs(_date).format('h:mm A')
    }
    if (_date) return dayjs(_date).format('MM/DD/YY')
    else {
      if (withoutArrow) return '----'
      else return translate('datePicker.datePlaceholder')
    }
  }

  const [showModal, setShowModal] = useState<boolean>(false)
  const [datePlaceHolder, setDatePlaceHolder] = useState<string>(
    makePlaceHolder(date),
  )

  const containerStyle = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      style,
      {
        ...(errorText && {
          borderColor: color.error,
          borderWidth: 2,
        }),
      },
    ]),
  )
  const errorViewStyle = mergeAll(
    flatten([errorViewPresets[preset] || errorViewPresets.primary]),
  )
  const pickerContainerStyle = mergeAll(
    flatten([pickerContainerPresets[preset] || pickerContainerPresets.primary]),
  )
  const iconContainerStyle = mergeAll(
    flatten([
      iconContainerPresets[preset] || iconContainerPresets.primary,
      { ...(errorText && { borderColor: color.error }) },
    ]),
  )

  const changeDate = useCallback(
    (newDate) => {
      setDatePlaceHolder(makePlaceHolder(newDate))
      onDateChange(newDate)
    },
    [datePlaceHolder],
  )

  return (
    <>
      <TouchableOpacity
        style={containerStyle}
        onPress={() => {
          setShowModal(true)
        }}
      >
        <View style={pickerContainerStyle}>
          <Text text={datePlaceHolder} />
          {!withoutArrow && <SVGIcon icon='chevronDown' size={11} />}
        </View>
        {mode === dateString && (
          <View style={iconContainerStyle}>
            <SVGIcon icon='calendar' />
          </View>
        )}
      </TouchableOpacity>
      {errorText !== '' && (
        <ShowError style={errorViewStyle} text={errorText} />
      )}
      <Modal
        visible={showModal}
        toggleModal={() => setShowModal(!showModal)}
        styleContainer={styleModalContainer}
      >
        <DatePick
          onDateChange={changeDate}
          mode={mode}
          date={date || new Date()}
        />
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Text text='OK' />
        </TouchableOpacity>
      </Modal>
    </>
  )
}

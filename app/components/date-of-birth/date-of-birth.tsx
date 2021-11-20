/* eslint-disable */
import React, { useState } from 'react'
import { TouchableOpacity, ViewStyle, TextStyle, View } from 'react-native'
import DatePick from 'react-native-date-picker'
import dayjs from 'dayjs'

import { translate } from 'i18n'
import { Text } from '../text/text'
import { Modal } from '../modal/modal'
import { IDateOfBirthProps } from './date-of-birth.props'
import { ShowError } from 'components'
import { color } from 'theme'
import { useEffect } from 'react'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function DateOfBirth(props: IDateOfBirthProps): JSX.Element {
  // grab the props
  const { date, onDateChange, styleModalContainer, errorText, style } = props

  const [showModal, setShowModal] = useState<boolean>(false)
  const [datePlaceHolder, setDatePlaceHolder] = useState<string>(
    date
      ? dayjs(date).format('MM/DD/YYYY')
      : translate('finalizeAccountScreen.dateOfBirth'),
  )

  useEffect(() => {
    setDatePlaceHolder(
      date
        ? dayjs(date).format('MM/DD/YYYY')
        : translate('finalizeAccountScreen.dateOfBirth'),
    )
  }, [date])

  const WRAPPER: ViewStyle = {
    width: '100%',
    ...style,
  }

  const MAIN: ViewStyle = {
    width: '100%',
    height: 45,
    borderWidth: errorText ? 2 : 1,
    borderColor: errorText ? color.error : color.palette.lightGrey,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingTop: 3,
  }

  const TEXT_STYLE: TextStyle = {
    fontSize: 14,
    color: date ? color.secondary : color.palette.grey,
  }

  return (
    <>
      <View style={WRAPPER}>
        <TouchableOpacity
          onPress={() => {
            setShowModal(true)
          }}
          style={MAIN}
        >
          <Text text={datePlaceHolder} style={TEXT_STYLE} />
        </TouchableOpacity>
        {errorText !== '' && <ShowError text={errorText} />}
      </View>
      <Modal
        visible={showModal}
        toggleModal={() => setShowModal(!showModal)}
        styleContainer={styleModalContainer}
      >
        <DatePick
          onDateChange={(newDate) => onDateChange(newDate)}
          mode='date'
          date={date || new Date()}
          maximumDate={new Date()}
        />
        <TouchableOpacity onPress={() => setShowModal(!showModal)}>
          <Text text='OK' />
        </TouchableOpacity>
      </Modal>
    </>
  )
}

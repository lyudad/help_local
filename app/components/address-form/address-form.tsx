/* eslint-disable */
import React, { useRef, useState } from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'

import { IAddressFormProps } from './address-form.props'
import {
  Input,
  QuestionMarkInBlackCircle,
  Text,
  Modal,
  SVGIcon,
} from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  JUSTIFY_CONTENT_CENTER,
  MARGIN_BOTTOM_SP2,
  MARGIN_HORIZONTAL_SP2,
  MARGIN_TOP_SP1,
  MARGIN_TOP_SP3,
  MARGIN_VERTICAL_SP2,
  ROW,
} from 'constants/common-styles'
import { translate } from 'i18n'
import { color, typography } from 'theme'
import { ShowError } from '../show-error'
import { DropdownWithTextItems } from '../dropdown-with-text-items/dropdown-with-text-items'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { GOOGLE_API_KEY } from 'constants/config'
import { setError, setWarning } from 'app/store/commonSlice'
import { useDispatch } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'

const HEIGHT_300: ViewStyle = {
  height: 300,
}

const DIM_BORDER: ViewStyle = { borderColor: color.dim }

const PRIMARY_FONT: TextStyle = {
  fontFamily: typography.primary,
}

const INPUT_CONTAINER: TextStyle = {
  borderWidth: 1,
  borderRadius: 4,
  height: 45,
  borderColor: color.dim,
  fontFamily: typography.primary,
}

const states = [
  'Alabama',
  'Alaska',
  'American Samoa',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'District of Columbia',
  'Federated States of Micronesia',
  'Florida',
  'Georgia',
  'Guam',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Marshall Islands',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Northern Mariana Islands',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Palau',
  'Pennsylvania',
  'Puerto Rico',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virgin Island',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
]

const statesWithShort = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
}

export const AddressForm = ({
  address,
  onAddressChange,
  withWhyAddressModal,
  title,
  withoutTitle,
  errorText,
  style,
  makeAllFieldsTouchedToShowErrors,
}: IAddressFormProps): JSX.Element => {
  const dispatch = useDispatch()
  const ref = useRef()
  interface IErrors {
    state: string
    city: string
    street: string
    //streetNumber: string // this is home number
    zip: string
  }

  const requiredFieldText: string = translate('addressForm.requiredField')

  const [isTouched, setIsTouched] = useState<{
    state: boolean
    city: boolean
    street: boolean
    //streetNumber: boolean
    zip: boolean
  }>({
    state: false,
    city: false,
    street: false,
    //streetNumber: false,
    zip: false,
  })
  const [errors, setErrors] = useState<IErrors>({
    state: '',
    city: '',
    street: '',
    //streetNumber: '',
    zip: '',
  })
  const [state, setState] = useState<string>(address ? address.stateLong : '')
  const [city, setCity] = useState<string>(address ? address.city : '')
  const [street, setStreet] = useState<string>(
    address ? address.streetNumber + ' ' + address.streetName : '',
  )
  /*const [streetNumber, setStreetNumber] = useState<string>(
    address ? address.streetNumber : '',
  )*/
  const [zip, setZip] = useState<string>(address ? address.zipcode : '')
  const [isModalOpen, toggleModal] = useState<boolean>(false)

  const isNoErrors = (): boolean => {
    const newErrors: IErrors = {
      state: '',
      city: '',
      street: '',
      //streetNumber: '',
      zip: '',
    }

    if (!state.length) {
      newErrors.state = requiredFieldText
    }

    if (!city.length) {
      newErrors.city = requiredFieldText
    }
    if (!street.length) {
      newErrors.street = requiredFieldText
    }
    /*if (!streetNumber.length) {
      newErrors.streetNumber = requiredFieldText
    }*/
    if (!zip.length) {
      newErrors.zip = requiredFieldText
    }

    setErrors({ ...newErrors })
    if (
      newErrors.state ||
      newErrors.city ||
      newErrors.street ||
      //newErrors.streetNumber ||
      newErrors.zip
    ) {
      return false
    }
    return true
  }

  const onFoucsOutFromFields = () => {
    if (isNoErrors())
      onAddressChange(`${street}, ${city}, ${state} ${zip}, USA`)
    else onAddressChange('')
  }

  if (makeAllFieldsTouchedToShowErrors) {
    if (
      !isTouched.city ||
      !isTouched.state ||
      !isTouched.street ||
      !isTouched.zip
    ) {
      setIsTouched({
        state: true,
        city: true,
        street: true,
        zip: true,
      })
      onFoucsOutFromFields()
    }
  }

  const newTitle: string = title || translate('addressForm.whatIsUrAddress')

  useFocusEffect(
    useCallback(() => {
      if (address) {
        // @ts-ignore
        ref.current?.setAddressText(
          address.streetNumber + ' ' + address.streetName,
        )
      }
    }, [address]),
  )

  return (
    <View style={style}>
      {!withoutTitle && (
        <View
          style={[
            ROW,
            JUSTIFY_CONTENT_CENTER,
            MARGIN_BOTTOM_SP2,
            ALIGIN_ITEMS_CENTER,
          ]}
        >
          <Text text={newTitle} preset='header4slim' />
          {withWhyAddressModal && (
            <QuestionMarkInBlackCircle
              onQuestionMarkPress={() => toggleModal(!isModalOpen)}
              style={MARGIN_HORIZONTAL_SP2}
            />
          )}
        </View>
      )}
      {/*
      <Input
        placeholder='addressForm.street'
        wrapperStyle={MARGIN_VERTICAL_SP2}
        value={street}
        onChangeText={(newValue) => {
          setStreet(newValue)
          //onFoucsOutFromFields()
        }}
        errorText={errors.street && isTouched.street ? errors.street : ''}
        onBlur={() => {
          if (!isTouched.street) setIsTouched({ ...isTouched, street: true })
          onFoucsOutFromFields()
        }}
      />
      */}
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={translate('addressInput.placeholder')}
        onPress={(_, details = null) => {
          //console.log('====>', details)
          const res1 = details.formatted_address.split(',')
          const res2 = res1[2].split(' ')
          const newStreet = res1[0]
          const newCity = res1[1]
          const newState = statesWithShort[res2[1]]
          const newZip = res2[2]
          if (newStreet && newCity && newState && newZip) {
            setStreet(newStreet)
            setCity(newCity)
            setState(newState)
            setZip(newZip)
            /*setIsTouched({
              street: true,
              city: true,
              state: true,
              zip: true,
            })*/
            onAddressChange(
              `${newStreet}, ${newCity}, ${newState} ${newZip}, USA`,
            )
            // @ts-ignore
            ref.current?.setAddressText(newStreet)
          } else dispatch(setWarning('This address is not supported'))
        }}
        fetchDetails={true}
        query={{
          key: GOOGLE_API_KEY,
          language: 'en',
          types: 'address',
          components: 'country:us',
        }}
        debounce={100}
        enablePoweredByContainer={false}
        onFail={() => dispatch(setWarning(translate('common.systemError')))}
        onTimeout={() => dispatch(setError(translate('common.requestError')))}
        timeout={7000}
        textInputProps={{
          onChangeText: (newText: string) => setStreet(newText),
          onBlur: () => {
            if (!isTouched.street) setIsTouched({ ...isTouched, street: true })
            onFoucsOutFromFields()
          },
          placeholder: translate('addressForm.street'),
          placeholderTextColor: color.placeholder,
        }}
        styles={{
          textInput: INPUT_CONTAINER,
          predefinedPlacesDescription: PRIMARY_FONT,
          description: PRIMARY_FONT,
        }}
      />
      <ShowError
        text={errors.street && isTouched.street ? errors.street : ''}
      />
      {/*<Input
        placeholder='addressForm.home'
        wrapperStyle={MARGIN_VERTICAL_SP2}
        value={streetNumber}
        onChangeText={(newValue) => {
          setStreetNumber(newValue)
          //onFoucsOutFromFields()
        }}
        errorText={
          errors.streetNumber && isTouched.streetNumber
            ? errors.streetNumber
            : ''
        }
        onBlur={() => {
          if (!isTouched.streetNumber)
            setIsTouched({ ...isTouched, streetNumber: true })
          onFoucsOutFromFields()
        }}
      />*/}
      <Input
        placeholder='addressForm.city'
        wrapperStyle={{ ...MARGIN_BOTTOM_SP2, ...MARGIN_TOP_SP1 }}
        value={city}
        onChangeText={(newValue) => {
          setCity(newValue)
          //onFoucsOutFromFields()
        }}
        errorText={errors.city && isTouched.city ? errors.city : ''}
        onBlur={() => {
          if (!isTouched.city) setIsTouched({ ...isTouched, city: true })
          onFoucsOutFromFields()
        }}
      />
      {/*}
      <Input
        placeholder='addressForm.state'
        wrapperStyle={MARGIN_VERTICAL_SP2}
        value={state}
        onChangeText={(newValue) => {
          setState(newValue)
          //onFoucsOutFromFields()
        }}
        errorText={errors.state && isTouched.state ? errors.state : ''}
        onBlur={() => {
          if (!isTouched.state) setIsTouched({ ...isTouched, state: true })
          onFoucsOutFromFields()
        }}
      />
      */}
      <DropdownWithTextItems
        onDropdownClose={() => {
          if (!isTouched.state) setIsTouched({ ...isTouched, state: true })
          onFoucsOutFromFields()
        }}
        placeholderTextColor={state ? color.secondary : color.placeholder}
        errorText={errors.state && isTouched.state ? errors.state : ''}
        styleContainer={DIM_BORDER}
        placeholder={state || translate('addressForm.state')}
        isItemsContainerScrollable
        items={states}
        onItemPress={async (index: number) => {
          await setState(states[index])
          onFoucsOutFromFields()
        }}
        styleDropdown={HEIGHT_300}
      />
      <Input
        placeholder='addressForm.zip'
        wrapperStyle={MARGIN_VERTICAL_SP2}
        value={zip}
        onChangeText={(newValue) => {
          setZip(newValue)
          //onFoucsOutFromFields()
        }}
        errorText={errors.zip && isTouched.zip ? errors.zip : ''}
        onBlur={() => {
          if (!isTouched.zip) setIsTouched({ ...isTouched, zip: true })
          onFoucsOutFromFields()
        }}
      />
      <ShowError text={errorText} />
      {isModalOpen && withWhyAddressModal && (
        <Modal
          animationType='fade'
          transparent
          visible
          toggleModal={() => toggleModal(!isModalOpen)}
        >
          <View style={ALIGIN_ITEMS_CENTER}>
            <SVGIcon icon='home' width={35} height={40} color={color.primary} />
            <View style={[MARGIN_TOP_SP3, MARGIN_BOTTOM_SP2]}>
              <Text tx='addressForm.whyNeedMyAddress' preset='header3bold' />
            </View>
            <Text tx='addressForm.answerToWhy' preset='header4slim' />
          </View>
        </Modal>
      )}
    </View>
  )
}

/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage } from 'react-native-flash-message'
import { common, user } from 'app/store/selectors'

import {
  Text,
  Input,
  Button,
  Checkbox,
  Hr,
  CommonInfoModal,
  DateOfBirth,
  SVGIcon,
  BaseScreen,
} from 'components'
import { color, spacing } from 'theme'
import { completeSignUp } from 'screens/both/thunk'
import { CompleteSignUpCredentials } from 'interfaces'
import { translate } from 'i18n'
import { privacyAndTerms } from 'constants/routes'
import { useNavigation } from '@react-navigation/core'
import { MARGIN_BOTTOM_SP5, PADDING_TOP_SP7 } from 'constants/common-styles'
import dayjs from 'dayjs'

//const logoPath = require('assets/app-logo.png')

const FULL: ViewStyle = { flex: 1 }

const HEADER_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: spacing[6],
  paddingBottom: spacing[4] + 1,
}

const TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[6] - 2,
}

const SUB_TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: spacing[3] + 1,
}

const CHOOSE_BTNS_WRAPPER: ViewStyle = {
  width: '90%',
  flexDirection: 'row',
  alignSelf: 'center',
  justifyContent: 'space-between',
  marginBottom: spacing[5] - 2,
}

const CHOOSE_BTN: ViewStyle = {
  paddingHorizontal: spacing[0],
  width: '48%',
}

const FORM: ViewStyle = {
  width: '90%',
  alignSelf: 'center',
  alignItems: 'center',
}

const INPUT_WRAPPER: ViewStyle = {
  marginBottom: spacing[5],
}

const INPUT: TextStyle = {
  color: color.secondary,
}

const WHY: ViewStyle = {
  position: 'absolute',
  right: '6%',
  top: '3%',
}

const ALL_BUTTONS_TEXT: TextStyle = {
  textTransform: 'uppercase',
}

const HR: ViewStyle = {
  marginVertical: spacing[6],
}

const CHECKBOX_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  paddingRight: '5%',
  marginVertical: spacing[2],
  alignSelf: 'flex-start',
  alignItems: 'center',
}

const CHECKBOX: ViewStyle = {
  marginRight: spacing[1],
}

const CHECKBOX_ADDITION: ViewStyle = {
  position: 'relative',
  top: -5,
}

const CHECKBOX_TEXT: TextStyle = {
  fontSize: 13,
  fontWeight: '300',
  lineHeight: 16,
  textAlign: 'left',
}

const CHECKBOX_TEXT_ADDITION: TextStyle = {
  lineHeight: 20,
}

const CHECKBOX_TEXT_ADDITION2: TextStyle = {
  lineHeight: 0,
}

const CHECKBOX_R_TEXT: TextStyle = {
  fontSize: 9,
}

const CHECKBOX_R_VIEW: ViewStyle = {
  position: 'relative',
  top: -1,
}

const PRIVACY_UNDERLINE: TextStyle = {
  textDecorationLine: 'underline',
}

const CREATE_ACCOUNT_BUTTON: ViewStyle = {
  marginVertical: spacing[6],
}

const TO_ROW: ViewStyle = {
  flexDirection: 'row',
}

export const FinalizeAccountScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const activeProfile = useSelector(user.activeProfile)
  const email = useSelector(user.email)
  const loading = useSelector(common.loading)

  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [inputText, setInputText] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [dateOfBirthError, setDateOfBirthError] = useState<string>('')
  const [accountType, setAccountType] = useState<'consumer' | 'helper'>(
    'consumer',
  )
  const [checkBoxesState, setCheckBoxesState] = useState<Array<boolean>>([
    true,
    false,
  ])

  useEffect(() => {
    setDateOfBirthError('')
    setInputText('')
  }, [accountType, activeProfile])

  const onMainBtnPress = () => {
    if (accountType === 'helper' && !dateOfBirth)
      setDateOfBirthError('finalizeAccountScreen.required')
    else setDateOfBirthError('')
    if (!checkBoxesState[1])
      showMessage({
        type: 'danger',
        message: translate('finalizeAccountScreen.mustAgreeTerms'),
      })
    if (
      checkBoxesState[1] &&
      ((accountType === 'helper' && dateOfBirth) || accountType === 'consumer')
    ) {
      const data: CompleteSignUpCredentials & { email: string } = {
        activeProfile: accountType,
        businessName:
          accountType === 'consumer'
            ? inputText === ''
              ? null
              : inputText
            : null,
        //ssn: accountType === 'helper' ? inputText : null,
        dob: dayjs(dateOfBirth).format('YYYY-MM-DD'),
        notifyOnPromo: checkBoxesState[0],
        email,
      }
      if (!loading) dispatch(completeSignUp(data))
    }
  }

  return (
    <View style={FULL}>
      <BaseScreen
        backgroundColor={color.transparent}
        withoutHorizontalPaddings
        style={PADDING_TOP_SP7}
      >
        <CommonInfoModal
          toggleModal={() => toggleModal(!isModalOpen)}
          visible={isModalOpen}
          icon='protect'
          title={translate('finalizeAccountScreen.whyModalTitle')}
          content={translate('finalizeAccountScreen.whyModalDesc')}
        />
        <View style={HEADER_CONTAINER}>
          <SVGIcon
            icon='appLogo'
            color={color.primary}
            width={118}
            height={50}
          />
        </View>
        <View style={TITLE_CONTAINER}>
          <Text preset='header2bold' tx='finalizeAccountScreen.title' />
        </View>
        <View style={SUB_TITLE_CONTAINER}>
          <Text tx='finalizeAccountScreen.subtitle' />
        </View>
        <View style={CHOOSE_BTNS_WRAPPER}>
          <Button
            testID='next-screen-button'
            preset={accountType === 'consumer' ? 'primary' : 'fourth'}
            tx='finalizeAccountScreen.hire'
            style={CHOOSE_BTN}
            textStyle={ALL_BUTTONS_TEXT}
            onPress={() => setAccountType('consumer')}
          />
          <Button
            testID='next-screen-button'
            preset={accountType === 'helper' ? 'primary' : 'fourth'}
            tx='finalizeAccountScreen.getHired'
            style={CHOOSE_BTN}
            textStyle={ALL_BUTTONS_TEXT}
            onPress={() => setAccountType('helper')}
          />
        </View>
        <View style={FORM}>
          {accountType === 'helper' ? (
            <>
              <DateOfBirth
                style={MARGIN_BOTTOM_SP5}
                date={dateOfBirth}
                onDateChange={(newDate) => setDateOfBirth(newDate)}
                errorText={translate(dateOfBirthError)}
              />
              <TouchableOpacity
                style={WHY}
                onPress={() => toggleModal(!isModalOpen)}
              >
                <Text
                  tx='finalizeAccountScreen.why'
                  color={color.primary}
                  preset='underlineBold'
                />
              </TouchableOpacity>
            </>
          ) : (
            <Input
              placeholder='finalizeAccountScreen.clientPlaceholder'
              wrapperStyle={INPUT_WRAPPER}
              style={INPUT}
              keyboardType='email-address'
              placeholderTextColor={color.palette.grey}
              value={inputText}
              onChangeText={setInputText}
            />
          )}
          <Hr style={HR} />
          <View style={CHECKBOX_CONTAINER}>
            <Checkbox
              preset='secondary'
              style={CHECKBOX}
              value={checkBoxesState[0]}
              onToggle={(newValue) =>
                setCheckBoxesState([newValue, checkBoxesState[1]])
              }
              iconOnFill='checked'
            />
            <Text
              style={{ ...CHECKBOX_TEXT, ...CHECKBOX_TEXT_ADDITION }}
              tx='finalizeAccountScreen.firstCheckbox'
            />
          </View>
          <View style={CHECKBOX_CONTAINER}>
            <Checkbox
              preset='secondary'
              style={{ ...CHECKBOX, ...CHECKBOX_ADDITION }}
              value={checkBoxesState[1]}
              onToggle={(newValue) =>
                setCheckBoxesState([checkBoxesState[0], newValue])
              }
              iconOnFill='checked'
            />
            <Text style={{ ...CHECKBOX_TEXT, ...CHECKBOX_TEXT_ADDITION2 }}>
              <View style={TO_ROW}>
                <Text
                  style={CHECKBOX_TEXT}
                  tx='finalizeAccountScreen.secondCheckbox'
                />
                <View style={CHECKBOX_R_VIEW}>
                  <Text
                    style={{ ...CHECKBOX_TEXT, ...CHECKBOX_R_TEXT }}
                    tx='finalizeAccountScreen.r'
                  />
                </View>
              </View>
              <Text text=' ' />
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(privacyAndTerms, {
                    whichTextShouldBeShown: 'terms',
                  })
                }
              >
                <Text
                  style={{ ...CHECKBOX_TEXT, ...PRIVACY_UNDERLINE }}
                  tx='finalizeAccountScreen.terms'
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={CHECKBOX_TEXT} tx='finalizeAccountScreen.and' />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(privacyAndTerms, {
                    whichTextShouldBeShown: 'privacy',
                  })
                }
              >
                <Text
                  style={{ ...CHECKBOX_TEXT, ...PRIVACY_UNDERLINE }}
                  tx='finalizeAccountScreen.privacy'
                />
              </TouchableOpacity>
            </Text>
          </View>
          <Button
            testID='next-screen-button'
            preset={loading ? 'secondaryLoading' : 'secondary'}
            tx='finalizeAccountScreen.create'
            textStyle={ALL_BUTTONS_TEXT}
            style={CREATE_ACCOUNT_BUTTON}
            onPress={() => onMainBtnPress()}
            disabled={loading ? true : false}
          />
        </View>
      </BaseScreen>
    </View>
  )
}

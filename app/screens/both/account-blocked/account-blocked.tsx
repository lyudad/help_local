import React, { memo, useState } from 'react'
import { View, ViewStyle, Image, TextStyle, ImageStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
  Text,
  SVGIcon,
  BaseScreen,
  Input,
  Button,
  InlineTouchableText,
  PADDING_TOP_POSITIVE,
} from 'components'
import { color, spacing } from 'theme'
import {
  ALIGIN_ITEMS_CENTER,
  MARGIN_BOTTOM_SP2,
  MARGIN_BOTTOM_SP5,
  MARGIN_HORIZONTAL_5PERCENT,
  MARGIN_TOP_SP3,
  MARGIN_TOP_SP5,
  MARGIN_VERTICAL_SP3,
  WINDOW_HEIGHT,
} from 'constants/common-styles'
import { setError } from 'app/store/commonSlice'
import { translate } from 'i18n'
import { user } from 'app/store/selectors'
import { IConsumerOrHelper } from 'interfaces'
import { createUnblockAccountRequest } from '../thunk'

const BASE_VIEW: ViewStyle = {
  paddingVertical: spacing[5],
}

const FIRST_SCREEN: ViewStyle = {
  marginTop: (WINDOW_HEIGHT - 500) / 2,
}

const PADDING_SCREEN: ViewStyle = {
  marginTop: 30,
}

const LINK: TextStyle = {
  fontWeight: '700',
  textDecorationLine: 'underline',
  color: color.primary,
}

export const AccountBlockedScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const activeProfile: IConsumerOrHelper = useSelector(user.activeProfile)
  const helper = 'helper'
  const isClient: boolean = activeProfile !== helper
  const [isShowFormMode, setIsShowFormMode] = useState<boolean>(false)
  const [answers, setAnswers] = useState<string[]>(['', '', ''])
  const [errorsToAnswers, setErrorsToAnswers] = useState<string[]>(['', '', ''])
  const lastCreatedUnblockAccountRequestId: number = useSelector(
    user.lastCreatedUnblockAccountRequestId,
  )
  const isCreateUnblockAccountRequestLoading: boolean = useSelector(
    user.isCreateUnblockAccountRequestLoading,
  )

  const isNoErrors = (): boolean => {
    const newErrorsToAnswers: string[] = ['', '', '']
    if (!answers[0]) {
      newErrorsToAnswers[0] = translate('common.errorRequiredField')
    }
    if (!answers[1]) {
      newErrorsToAnswers[1] = translate('common.errorRequiredField')
    }
    setErrorsToAnswers(newErrorsToAnswers)
    return !newErrorsToAnswers[0] && !newErrorsToAnswers[1]
  }

  const onSend = () => {
    if (isNoErrors()) {
      dispatch(
        createUnblockAccountRequest({
          description: answers[0],
          conclusion: answers[1],
          preventionDescription: answers[2],
        }),
      )
    } else {
      dispatch(setError(translate('common.checkErrors')))
    }
  }

  const Thanks = memo(
    (): JSX.Element => {
      const TITLE: TextStyle = {
        fontSize: 30,
        fontWeight: '700',
        marginVertical: spacing[4],
        marginBottom: spacing[2],
        paddingTop: spacing[5],
      }
      const DESC: TextStyle = {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: spacing[7],
        paddingHorizontal: '5%',
      }
      const ICON: ImageStyle = {
        alignSelf: 'center',
      }
      const img = require('assets/unblock-request-sent.png')

      const CIRCLE_IMAGE: ImageStyle = {
        width: '100%',
        height: 340,
      }
      return (
        <>
          <SVGIcon style={ICON} icon='like2' color={color.primary} />
          <View>
            <Text tx='accountBlocked.thanks' style={TITLE} />
          </View>
          <Text tx='accountBlocked.thanksDesc' style={DESC} />
          <Image source={img} style={CIRCLE_IMAGE} />
        </>
      )
    },
  )

  const questions: string[] = [
    isClient ? 'question1forClient' : 'question1forHelper',
    isClient ? 'question2forClient' : 'question2forHelper',
    'question3forBoth',
  ]

  return (
    <BaseScreen
      withHeader
      horizontalPaddingViewStyle={BASE_VIEW}
      withoutBottomNavigator
      withoutHorizontalPaddings
    >
      <View style={[PADDING_TOP_POSITIVE, MARGIN_TOP_SP3]}>
        {lastCreatedUnblockAccountRequestId ? (
          <Thanks />
        ) : (
          <>
            {isShowFormMode ? (
              <View
                style={[
                  ALIGIN_ITEMS_CENTER,
                  PADDING_SCREEN,
                  MARGIN_HORIZONTAL_5PERCENT,
                ]}
              >
                <SVGIcon icon='badSmile' color={color.primary} />
                <Text tx='accountBlocked.uhOh' preset='superLarge' />
                <Text tx='accountBlocked.desc2' />
                <Text
                  tx='accountBlocked.reactivationQuestions'
                  preset='header3bold'
                  style={[MARGIN_TOP_SP5, MARGIN_BOTTOM_SP2]}
                />
                {questions.map((question: string, index: number) => (
                  <View key={question} style={MARGIN_BOTTOM_SP5}>
                    <Text
                      tx={`accountBlocked.${question}`}
                      style={MARGIN_BOTTOM_SP2}
                    />
                    <Input
                      errorText={errorsToAnswers[index]}
                      value={answers[index]}
                      numberOfLines={5}
                      textAlignVertical='top'
                      multiline
                      onChangeText={(newText: string) => {
                        const newAnswers: string[] = answers
                        newAnswers[index] = newText
                        setAnswers({ ...newAnswers })
                      }}
                      placeholder='accountBlocked.placeholder'
                    />
                  </View>
                ))}
                <Button
                  onPress={onSend}
                  tx='accountBlocked.submitRequest'
                  style={MARGIN_VERTICAL_SP3}
                  disabled={isCreateUnblockAccountRequestLoading}
                  preset={
                    isCreateUnblockAccountRequestLoading
                      ? 'primaryLoading'
                      : 'primary'
                  }
                />
              </View>
            ) : (
              <View
                style={[
                  ALIGIN_ITEMS_CENTER,
                  FIRST_SCREEN,
                  MARGIN_HORIZONTAL_5PERCENT,
                ]}
              >
                <SVGIcon icon='warn' color={color.primary} />
                <Text tx='accountBlocked.sorry' preset='superLarge' />
                <Text tx='accountBlocked.desc' />
                <Text>
                  <Text tx='accountBlocked.isThisMistake' preset='bold' />
                  <InlineTouchableText
                    onTextPress={() => setIsShowFormMode(true)}
                    text={translate('accountBlocked.contactUs')}
                    textStyle={LINK}
                  />
                </Text>
              </View>
            )}
          </>
        )}
      </View>
    </BaseScreen>
  )
}

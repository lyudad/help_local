/* eslint-disable */
import React, { useState, useCallback } from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import { useRoute, useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'

import {
  Screen,
  Header,
  Text,
  Dropdown,
  WithHorizontalPaddings,
  Button,
  Accordion,
  BottomNavigation,
  Input,
} from 'components'
import { UserStackRouteProps } from 'navigation'
import { color, spacing } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { translate } from 'i18n'
import { gotIt } from 'constants/routes'
import { sendQuestionForSupport } from 'screens/both/thunk'
import { user } from 'app/store/selectors'
import { IConsumerOrHelper } from 'interfaces'
//import { setOnScrollEventForGradient } from 'app/store/commonSlice'

const FULL: ViewStyle = { flex: 1 }

const TITLE_CONTAINER: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: spacing[8],
  marginBottom: spacing[6],
}
/*
const DESC_INPUT: ViewStyle & TextStyle = {
  textAlignVertical: 'top',
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
  borderRadius: 4,
  marginVertical: spacing[2],
  paddingHorizontal: spacing[2],
}*/
const MARGIN_BOTTOM_1: ViewStyle & TextStyle = {
  marginBottom: spacing[4],
}
const SECTION: ViewStyle & TextStyle = {
  marginTop: spacing[3],
}
const MARGIN_TOP_LARGE: ViewStyle = {
  marginTop: spacing[6],
}
const RADIO_BTNS_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}
const BTN: ViewStyle = {
  width: '30%',
  height: 45,
  paddingHorizontal: 0,
  paddingVertical: 0,
}
const FAQ_QUESTIONS: ViewStyle = {
  marginTop: spacing[6],
}

enum FaqType {
  General = 'GENEREAL',
  Client = 'CLIENT',
  Helper = 'HELPER',
}

type FaqTypeItem = {
  type: FaqType
  text: string
}

type Question = {
  title: string
  content: string
}

type dropdownItemType = {
  name: string
  type: 'general' | 'account_question' | null
}

const dropdownItems: dropdownItemType[] = [
  {
    name: 'contactUsScreen.dropdownItem1',
    type: 'general',
  },
  {
    name: 'contactUsScreen.dropdownItem2',
    type: 'account_question',
  },
]

const faqArr: FaqTypeItem[] = [
  {
    type: FaqType.Client,
    text: 'contactUsScreen.client',
  },
  {
    type: FaqType.General,
    text: 'contactUsScreen.general',
  },
  {
    type: FaqType.Helper,
    text: 'contactUsScreen.helper',
  },
]

const questionsGeneral: Question[] = [
  {
    title: 'contactUsScreen.question1',
    content: 'contactUsScreen.answer1',
  },
  {
    title: 'contactUsScreen.question2',
    content: 'contactUsScreen.answer2',
  },
  {
    title: 'contactUsScreen.question3',
    content: 'contactUsScreen.answer3',
  },
  {
    title: 'contactUsScreen.question4',
    content: 'contactUsScreen.answer4',
  },
]

const questionsClient: Question[] = [
  {
    title: 'contactUsScreen.questionClient1',
    content: 'contactUsScreen.answerClient1',
  },
  {
    title: 'contactUsScreen.questionClient2',
    content: 'contactUsScreen.answerClient2',
  },
  {
    title: 'contactUsScreen.questionClient3',
    content: 'contactUsScreen.answerClient3',
  },
  {
    title: 'contactUsScreen.questionClient4',
    content: 'contactUsScreen.answerClient4',
  },
]

const questionsHelper: Question[] = [
  {
    title: 'contactUsScreen.questionHelper1',
    content: 'contactUsScreen.answerHelper1',
  },
  {
    title: 'contactUsScreen.questionHelper2',
    content: 'contactUsScreen.answerHelper2',
  },
  {
    title: 'contactUsScreen.questionHelper3',
    content: 'contactUsScreen.answerHelper3',
  },
  {
    title: 'contactUsScreen.questionHelper4',
    content: 'contactUsScreen.answerHelper4',
  },
]

export const ContactUsScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)

  const route = useRoute<UserStackRouteProps<'contactUs'>>()
  const [questionText, setQuestionText] = useState<string>('')
  const [faqUserType, setFaqUserType] = useState<FaqType>(FaqType.General)
  const [
    dropdownPlaceholder,
    setDropdownPlaceholder,
  ] = useState<dropdownItemType>({
    name: 'contactUsScreen.dropdowwnPlaceholder',
    type: null,
  })

  const [isFormValid, setFormValid] = useState<boolean>(false)
  const currentRole: IConsumerOrHelper = useSelector(user.currentRole)
  //const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)
  const helper: string = 'helper'

  useFocusEffect(
    useCallback(() => {
      /*dispatch(setOnScrollEventForGradient({
        ...onScrollEventForGradient,
        contentOffset: {
          x: onScrollEventForGradient.x,
          y: 0,
        }
      }))
      */
      if (route.params?.isAccountQuestion) {
        setDropdownPlaceholder(dropdownItems[1])
      }
      return (
        setQuestionText(''),
        setDropdownPlaceholder({
          name: 'contactUsScreen.dropdowwnPlaceholder',
          type: null,
        })
      )
    }, [route]),
  )

  const renderDropdownItems = (): JSX.Element[] => {
    return dropdownItems.map(
      (item: dropdownItemType): JSX.Element => (
        <TouchableOpacity
          style={MARGIN_BOTTOM_1}
          key={item.type}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={item.type}
          action={() => setDropdownPlaceholder(item)}
        >
          <Text tx={item.name} />
        </TouchableOpacity>
      ),
    )
  }

  const renderFaqTypes = (): JSX.Element[] => {
    return faqArr.map(
      (item: FaqTypeItem): JSX.Element => (
        <Button
          key={item.type}
          preset={faqUserType === item.type ? 'primary' : 'fourth'}
          tx={item.text}
          style={BTN}
          onPress={() => setFaqUserType(item.type)}
        />
      ),
    )
  }

  const submit = useCallback(() => {
    dispatch(
      sendQuestionForSupport({
        description: questionText,
        type: dropdownPlaceholder.type,
      }),
    )
    setFormValid(true), navigation.navigate(gotIt)
  }, [navigation, questionText, dropdownPlaceholder])

  return (
    <View style={FULL}>
      <Header
        {...{ clientBtn: currentRole !== helper }}
        headerAnimate={headerStyle}
        isFormValidToNavigate={isFormValid}
      />
      <Screen
        preset='scroll'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <WithHorizontalPaddings>
          <View style={TITLE_CONTAINER}>
            <Text preset='header1' tx='contactUsScreen.screenTitle' />
          </View>
          <View>
            <Text tx='contactUsScreen.dropdownTitle' style={MARGIN_BOTTOM_1} />
            <Dropdown
              isItemsContainerRelative
              placeholder={translate(dropdownPlaceholder.name)}
            >
              {renderDropdownItems()}
            </Dropdown>
          </View>
          <View style={SECTION}>
            <Text tx='contactUsScreen.questionTitle' style={MARGIN_BOTTOM_1} />
            <Input
              multiline
              numberOfLines={7}
              placeholder={'contactUsScreen.inputFormPlaceholder'}
              value={questionText}
              onChangeText={(text) => setQuestionText(text)}
            />
            <Button
              preset={
                questionText.length <= 0 || dropdownPlaceholder.type === null
                  ? 'primaryDisabled'
                  : 'primary'
              }
              tx='common.submit'
              disabled={
                questionText.length <= 0 || dropdownPlaceholder.type === null
              }
              style={MARGIN_TOP_LARGE}
              onPress={submit}
            />
          </View>
          <View style={TITLE_CONTAINER}>
            <Text preset='header1' tx='contactUsScreen.faqTitle' />
          </View>
          <View style={RADIO_BTNS_CONTAINER}>{renderFaqTypes()}</View>
          <View style={FAQ_QUESTIONS}>
            {faqUserType === FaqType.General && (
              <Accordion sections={questionsGeneral} />
            )}
            {faqUserType === FaqType.Client && (
              <Accordion sections={questionsClient} />
            )}
            {faqUserType === FaqType.Helper && (
              <Accordion sections={questionsHelper} />
            )}
          </View>
        </WithHorizontalPaddings>
      </Screen>
      <BottomNavigation isFormValidToNavigate={isFormValid} />
    </View>
  )
}

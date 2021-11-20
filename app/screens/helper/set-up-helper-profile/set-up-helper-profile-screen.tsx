/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, ViewStyle, Image, ImageStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { color, spacing } from 'theme'
import {
  Screen,
  WithHorizontalPaddings,
  Text,
  Button,
  Header,
  CommonInfoModal,
} from 'components'
import { translate } from 'i18n'
import { ICategory, IChosenCategory } from 'app/interfaces/common/category'
import { common, helper, user } from 'app/store/selectors'
import { setError } from 'app/store/commonSlice'
import {
  ISetupHelperProfileThunkData,
  setupHelperProfile,
} from 'screens/helper/thunk'
import {
  RenderAboutYouStepContent,
  RenderBackgroundCheckStepContent,
  RenderJobInformationStepContent,
} from './render-step-content'
import { RenderStep } from './render-step'
import { useNavigation } from '@react-navigation/core'
import { helperDashboard, rejection } from 'constants/routes'
import { FullProfile, HelperProfile, IAddress } from 'interfaces'
import { SetupCompleted } from './setup-completed'
import dayjs from 'dayjs'
import { useIsFocused } from '@react-navigation/native'
import { Asset } from 'react-native-image-picker'

const circleImg = require('assets/helper/set-up-photo.png')

const FULL: ViewStyle = {
  flex: 1,
}

const WRAPPER: ViewStyle = {
  paddingTop: spacing[6],
  paddingBottom: spacing[6],
}

const TITLE_VIEW: ViewStyle = {
  marginTop: spacing[7] - 10,
  marginBottom: spacing[6] - 6,
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  width: '100%',
  height: 155,
  justifyContent: 'center',
  alignItems: 'center',
}

const MAIN_IMAGE: ImageStyle = { width: '100%', height: 170 }
export interface IErrors {
  //ssn?: string
  dateOfbirth?: string
  categories?: string
  miles?: string
  address?: string
  description?: string
}
export enum EBackgroundCheckStates {
  Checking,
  Approved,
  Denied,
}

export const SetUpHelperProfileScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const isScreenFocused: boolean = useIsFocused()
  const consumer: string = 'consumer'
  const helperProfie: HelperProfile | null = useSelector(user.helperProfile)
  const profile: FullProfile = useSelector(user.profile)

  const [isWhySsnModalOpen, setIsWhySsnModalOpen] = useState<boolean>(false)
  const activeProfile = useSelector(user.activeProfile)
  const isCriminal: boolean = useSelector(user.isCriminal)
  let addressFromState: IAddress | null = useSelector(user.address)
  const loading: boolean = useSelector(common.loading)
  const profileAfterSetupHelperProfile: FullProfile | null = useSelector(
    helper.profileAfterSetupHelperProfile,
  )

  const [isFormValid, setFormValid] = useState<boolean>(false)

  useEffect(() => {
    helperProfie && navigation.navigate(helperDashboard)
  }, [helperProfie])

  useEffect(() => {
    if (isScreenFocused) {
      if (activeProfile === 'helper' && isCriminal)
        navigation.navigate(rejection)
    } else {
    }
  }, [isScreenFocused])

  type ISteps = Array<{
    key: string
    title: string
    contentTitle: string
    showQestionMarkAfterContentTitle?: boolean
    onQuestionMarkPress?: () => void
  }>

  const info = 'info'
  const about = 'about'
  const background = 'background'
  const hourly = 'hourly'

  const steps: ISteps = [
    {
      key: info,
      title: translate('setUpHelperProfileScreen.jobInformation'),
      contentTitle: translate('setUpHelperProfileScreen.whatTypeOfJob'),
    },
    {
      key: about,
      title: translate('setUpHelperProfileScreen.aboutYou'),
      contentTitle: '',
    },
  ]

  if (activeProfile === consumer) {
    steps.unshift({
      key: background,
      title: translate('setUpHelperProfileScreen.backgroundCheck'),
      contentTitle: translate('setUpHelperProfileScreen.checkingBackround'),
      onQuestionMarkPress: () => setIsWhySsnModalOpen(true),
    })
  }
  // background step data
  const [
    backgroundCheckState,
    setBackgroundCheckState,
  ] = useState<EBackgroundCheckStates>(EBackgroundCheckStates.Checking)
  //const [ssn, setSSN] = useState<number>(0)
  // const [isSsnAproved, setIsSsnAproved] = useState<boolean>(false)
  //const [isSsnAproved] = useState<boolean>(true)

  // INFO step data

  const [chosenCategories, setChosenCategories] = useState<
    Array<IChosenCategory>
  >([])
  const [milesRange, setMiles] = useState<number>(30)

  const onChosenCategoriesChange = (newChosenCategories: IChosenCategory[]) =>
    setChosenCategories(newChosenCategories)

  const addCategory = (category: ICategory) => {
    setChosenCategories([
      ...chosenCategories,
      {
        ...category,
        isChecked: true,
        type: 'fixed',
        price: '0',
        isAddImagesMode: false,
        images: [],
      },
    ])
  }
  const removeCategory = (id: number) =>
    setChosenCategories([
      ...chosenCategories.filter((category) => category.id !== id),
    ])

  const toggleCheck = (id: number) => {
    setChosenCategories([
      ...chosenCategories.map((category) => {
        if (category.id === id) {
          category.isChecked = !category.isChecked
        }
        return category
      }),
    ])
  }
  const changePrice = (price: string, categoryId: number) => {
    setChosenCategories([
      ...chosenCategories.map((category) => {
        if (category.id === categoryId) {
          category.price = price
        }
        return category
      }),
    ])
  }
  const toggleType = (id: number) => {
    setChosenCategories([
      ...chosenCategories.map((category) => {
        if (category.id === id) {
          category.type = category.type === hourly ? 'fixed' : 'hourly'
        }
        return category
      }),
    ])
  }

  // ABOUT step data
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [address, setAddress] = useState<string>(
    addressFromState ? addressFromState.formatted : '',
  )
  const [description, setDesc] = useState<string>('')
  const [isActive, setIsActive] = useState<boolean>(true)
  const [file, setFile] = useState<{
    file: Asset
    id: string
  } | null>(null)

  const [errors, setErrors] = useState<IErrors>({})

  const isNoErrors = (): boolean => {
    const s = 'setUpHelperProfileScreen.'
    const newErrors: IErrors = {}
    const thisFieldIsRequired: string = translate('common.errorRequiredField')
    /*
    if (activeProfile === consumer) {
      if (!ssn) newErrors.ssn = thisFieldIsRequired
      else if (!isSsnAproved)
        newErrors.ssn = translate(`${s}ssnNotApprovedError`)
    }
    */
    if (activeProfile === consumer) {
      if (!profile.dob && !dateOfBirth)
        newErrors.dateOfbirth = thisFieldIsRequired
    }
    if (
      chosenCategories.filter(
        (category) => category.isChecked && category.price,
      ).length < 1
    )
      newErrors.categories = translate(`${s}chooseCategoryError`)
    if (milesRange < 1) newErrors.miles = translate(`${s}setMilesError`)
    if (!address) newErrors.address = translate(`${s}addressIsRequiredError`)
    if (!description) {
      newErrors.description = translate(`${s}descIsRequiredError`)
    }
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      return false
    } else return true
  }

  const [isSubmitPressed, setIsSubmitPressed] = useState<boolean>(false)
  useEffect(() => {
    isSubmitPressed && isNoErrors()
  }, [dateOfBirth, chosenCategories, milesRange, address, description])

  const save = () => {
    setIsSubmitPressed(true)
    if (isNoErrors() && !loading) {
      const data: ISetupHelperProfileThunkData = {
        milesRange,
        //ssn: ssn.toString(),
        dob: dateOfBirth && dayjs(dateOfBirth).format('YYYY-MM-DD'),
        description,
        address,
        isActive,
        localAvatar: file,
        // @ts-ignore
        jobsInfo: chosenCategories
          .filter(
            (category) => category.isChecked && parseFloat(category.price) > 0,
          )
          .map((category) => ({
            categoryId: category.id,
            price: parseFloat(category.price),
            type: category.type,
            attachments: category.images,
          })),
      }
      dispatch(setupHelperProfile(data))
      setFormValid(true)
    } else {
      dispatch(setError(translate('common.checkErrors')))
    }
  }

  return (
    <View style={FULL}>
      <Header isFormValidToNavigate={isFormValid} />
      <Screen
        showsVerticalScrollIndicator={false}
        preset='scroll'
        backgroundColor={color.transparent}
        keyboardShouldPersistTaps='always' // uncoment if keyboard should always been visible
      >
        <View style={WRAPPER}>
          <CommonInfoModal
            toggleModal={() => setIsWhySsnModalOpen(!isWhySsnModalOpen)}
            visible={isWhySsnModalOpen}
            icon='protect'
            title={translate('finalizeAccountScreen.whyModalTitle')}
            content={translate('finalizeAccountScreen.whyModalDesc')}
          />
          {profileAfterSetupHelperProfile ? (
            <SetupCompleted />
          ) : (
            <>
              <View style={CIRCLE_IMAGE_CONTAINER}>
                <Image source={circleImg} style={MAIN_IMAGE} />
              </View>
              <WithHorizontalPaddings>
                <View style={TITLE_VIEW}>
                  <Text preset='header1' tx='setUpHelperProfileScreen.title' />
                </View>
                {steps.map((step, index) => (
                  <>
                    {(step.key === background ||
                      activeProfile !== consumer ||
                      (activeProfile === consumer &&
                        backgroundCheckState ===
                          EBackgroundCheckStates.Approved)) && (
                      <RenderStep
                        {...{
                          key: step.key,
                          stepNumber: `${index + 1}/${steps.length}`,
                          title: step.title,
                          contentTitle: step.contentTitle,
                          ...(step.showQestionMarkAfterContentTitle && {
                            showQestionMarkAfterContentTitle:
                              step.showQestionMarkAfterContentTitle,
                          }),
                          ...(step.onQuestionMarkPress && {
                            onQuestionMarkPress: step.onQuestionMarkPress,
                          }),
                          ...(index + 1 === steps.length && { isLast: true }),
                        }}
                      >
                        {step.key === info ? (
                          <RenderJobInformationStepContent
                            onMilesChange={(low: number) => setMiles(low)}
                            {...{
                              changePrice,
                              chosenCategories,
                              onChosenCategoriesChange,
                              addCategory,
                              removeCategory,
                              toggleCheck,
                              toggleType,
                              milesRange,
                              errors,
                            }}
                          />
                        ) : step.key === about ? (
                          <RenderAboutYouStepContent
                            {...{
                              ...(addressFromState && {
                                addressObject: addressFromState,
                              }),
                              ...(!profile.dob && {
                                dateOfBirth,
                                setDateOfBirth,
                              }),
                              isActive,
                              setAddress,
                              setDesc,
                              setIsActive,
                              file,
                              setFile,
                              errors,
                            }}
                            desc={description}
                          />
                        ) : (
                          <RenderBackgroundCheckStepContent
                            {...{
                              backgroundCheckState,
                              setBackgroundCheckState,
                              isCriminal,
                            }}
                          />
                        )}
                      </RenderStep>
                    )}
                  </>
                ))}
                {(activeProfile !== 'consumer' ||
                  backgroundCheckState === EBackgroundCheckStates.Approved) && (
                  <Button
                    tx='setUpHelperProfileScreen.updateProfile'
                    preset={loading ? 'secondaryLoading' : 'secondary'}
                    onPress={() => save()}
                    disabled={loading}
                  />
                )}
              </WithHorizontalPaddings>
            </>
          )}
        </View>
      </Screen>
    </View>
  )
}

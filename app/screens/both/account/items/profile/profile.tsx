/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Asset } from 'react-native-image-picker'

import {
  Text,
  Button,
  SVGIcon,
  RowSpaceBetween,
  CircleImage,
  Input,
  RangeWithTitle,
  YesOrNoBtns,
  CategoriesWithSearch,
  HelperDescriptionInput,
  AddressForm,
  CommonInfoModal,
  ImagePicker,
} from 'components'
import { color, spacing } from 'theme'
import { HrWithVerticalMargin } from '../hr-with-vertical-margins'
import { useDispatch, useSelector } from 'react-redux'
import { common, user } from 'app/store/selectors'
import { logout, updateProfile } from 'screens/both/thunk'
import {
  IAddedCategory,
  ICategory,
  IChosenCategory,
  IShortCategoryWithIsActive,
} from 'app/interfaces/common/category'
import { setJobsInfo, setRequestsStatus } from 'screens/both/reducers'
import {
  updateActiveOfJobInfo,
  updateHelperProfile,
  updateHelperProfileWithPrevState,
} from 'screens/helper/thunk'
import { ERequestStatus, IAddress, IMiniHelperProfile } from 'interfaces'
import {
  ALIGN_SELF_START,
  FULL_WIDTH,
  HZ_PADDING_5_PERCENT,
  TEXT_ALIGIN_LEFT,
  WINDOW_HEIGHT,
} from 'constants/common-styles'
import { resetAllExceptWelcomeMsg } from 'screens/both/reducers'
import { resetAll as resetAllClient } from 'screens/client/reducers'
import {
  resetAll as resetAllHelper,
  setIsAllJobsGet,
  setJobList,
} from 'screens/helper/reducers'
import { resetAll as resetAllAuth } from 'screens/auth/reducers'
import {
  resetAll as resetAllCommon,
  setError,
  setOnScrollEventForGradient,
} from 'app/store/commonSlice'
import { translate } from 'i18n'
import { useNavigation } from '@react-navigation/native'
import { deactivation } from 'constants/routes'
import PushNotification from 'react-native-push-notification'
import { NUMBER_REGEX } from 'constants/regex'

const defaultAvatar = require('assets/default-avatar.png')

export interface UpdateProfileDataType {
  firstName?: string
  lastName?: string
  avatarId?: string
  avatar?: { file: Asset; id: string }
  telephone?: string
  address?: string
  email?: string
  businessName?: string
}

const first = 'first'
const second = 'second'

const WRAPPER: ViewStyle = {
  marginBottom: spacing[4],
}

const EDIT_VIEW: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const COLUMN_ITEMS_VERTICAL_CENTER: ViewStyle = {
  justifyContent: 'center',
}
const CENTERING: ViewStyle = {
  width: '30%',
  height: 35,
  borderWidth: 1,
  borderColor: color.palette.lightGrey,
  borderRadius: 4,
  justifyContent: 'center',
}
const ROW_ITEMS_VERTICAL_CENTER: ViewStyle = {
  alignItems: 'center',
}

const INFORMATION_HEADER: ViewStyle = {
  marginBottom: spacing[6] + 3,
  marginTop: spacing[3],
}

const INFO_WRAPPER: ViewStyle = {
  paddingTop: spacing[4] - 7,
  marginTop: spacing[6],
}

const INFO_ITEM: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: spacing[3] - 2,
}

const ICON_VIEW: ViewStyle = {
  minWidth: 23,
  marginRight: spacing[4],
}

const ROW: ViewStyle = {
  flexDirection: 'row',
}

const WHY_HELPT_VIEW_WRAPPER: ViewStyle = {
  marginTop: spacing[3],
}

const UPPERCASE: TextStyle = {
  textTransform: 'uppercase',
}

const CANCEL: ViewStyle = {
  width: '25%',
  justifyContent: 'center',
  alignItems: 'center',
}

const WIDTH_75: ViewStyle = {
  width: '75%',
}

const WIDTH_47: ViewStyle = {
  width: '47%',
}

const INFO_DATA_VIEW: ViewStyle = {
  flex: 1,
  alignItems: 'flex-start',
}

const RANGE: ViewStyle = {
  marginTop: spacing[6],
}

const SCROLL_VIEW: ViewStyle = {
  height: WINDOW_HEIGHT - (270 + 170),
}

const DEACTIVATE: ViewStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[7] - 10,
  alignSelf: 'flex-end',
}

const ACTIVATE: ViewStyle = {
  width: '30%',
  justifyContent: 'center',
  alignItems: 'center',
}

const STATUS_VIEW: ViewStyle = {
  marginTop: spacing[3],
}

const FLEX_1: ViewStyle = {
  flex: 1,
}

const YES_OR_NO: ViewStyle = {
  marginTop: spacing[5],
}

const PADDING_TOP_15: ViewStyle = {
  paddingTop: 15,
}

const TITLE_OF_DEACTIVATE_MODAL: TextStyle = {
  fontSize: 25,
  paddingTop: 10,
}

const LOGOUT_BTN: ViewStyle = {
  minWidth: 100,
}

export const Profile = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const loading = useSelector(common.loading)
  const requestsStatus = useSelector(user.requestsStatus)
  const isLogoutLoading: boolean = useSelector(user.isLogoutLoading)
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  //const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [editPensState, setEditPensState] = useState<Array<boolean>>([
    false,
    false,
  ])
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] =
    useState<boolean>(false)
  const profile = useSelector(user.profile)
  let currentAddress: IAddress | null = profile.address
  const [address, setAddress] = useState<string>(
    currentAddress ? currentAddress.formatted : '',
  )
  const [file, setFile] = useState<{
    file: Asset
    id: string
  } | null>(null)
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false)

  // Profile information block data
  const { firstName, lastName, email, businessName } = profile
  let telephone = profile.telephone?.replace('+', '')

  const items: {
    email: string
    telephone: string
    address: string
    businessName: string
  } = {
    email,
    telephone,
    address: currentAddress ? currentAddress.formatted : '',
    businessName,
  }
  type InfoItemsType = {
    email: string
    telephone: string
    businessName: string
    firstName: string
    lastName: string
  }

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup
      .string()
      .email(translate('signUpScreen.enterValidEmail'))
      .required(translate('signUpScreen.emailRequired'))
      .max(100),
    telephone: yup
      .string()
      .matches(NUMBER_REGEX, {
        message: translate('signUpScreen.enterValidNumber'),
      })
      .required(translate('signUpScreen.phoneRequired')),
    businessName: yup.string().nullable(),
  })
  const { control, handleSubmit, errors } = useForm<InfoItemsType>({
    resolver: yupResolver(schema),
  })

  // Helper profile block data

  const helperProfile = useSelector(user.helperProfile)
  let jobsInfo: Array<IAddedCategory> = []
  if (helperProfile && helperProfile.jobsInfo !== null)
    jobsInfo = useSelector(user.jobsInfo)
  const hourly = 'hourly'

  const makeChosenCategoriesFromAddedCategories = (
    addedCategories,
  ): IChosenCategory[] => {
    return addedCategories.map(
      (addedCategory: IAddedCategory): IChosenCategory => ({
        ...addedCategory.category,
        price: addedCategory.price.toString(),
        type: addedCategory.type,
        isChecked: addedCategory.isActive,
        isAddImagesMode: false,
        images: [
          ...(addedCategory.attachments ? addedCategory.attachments : []),
        ],
      }),
    )
  }
  const [chosenCategories, setChosenCategories] = useState<
    Array<IChosenCategory>
  >(helperProfile ? makeChosenCategoriesFromAddedCategories(jobsInfo) : [])
  useEffect(() => {
    if (helperProfile)
      setChosenCategories(makeChosenCategoriesFromAddedCategories(jobsInfo))
  }, [jobsInfo, helperProfile])

  const [milesRange, setMiles] = useState<number>(
    helperProfile ? helperProfile.milesRange : 0,
  )
  const [description, setDesc] = useState<string>(
    helperProfile ? helperProfile.description : '',
  )
  const [isActive, setIsActive] = useState<boolean>(
    helperProfile ? helperProfile.isActive : false,
  )

  useEffect(() => {
    setIsActive(helperProfile ? helperProfile.isActive : false)
    //setMiles(helperProfile ? helperProfile.milesRange : 0)
    setDesc(helperProfile ? helperProfile.description : '')
  }, [helperProfile])

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
    if (editPensState[1]) {
      setChosenCategories([
        ...chosenCategories.map((category) => {
          if (category.id === id) {
            category.isChecked = !category.isChecked
          }
          return category
        }),
      ])
    } else {
      let status = false
      const newJobsInfo = jobsInfo.map((jobInfo) => {
        if (jobInfo.category.id === id) {
          status = !jobInfo.isActive
          return {
            ...jobInfo,
            isActive: !jobInfo.isActive,
          }
        }
        return jobInfo
      })
      dispatch(
        updateActiveOfJobInfo({ id, status, prevJobInfo: { ...jobsInfo } }),
      )
      dispatch(setJobsInfo(newJobsInfo))
    }
    dispatch(setJobList([]))
    dispatch(setIsAllJobsGet(false))
  }
  const changePrice = (price, categoryId) => {
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

  const collectHelperProfileData = () => {
    const data: IMiniHelperProfile = {
      milesRange,
      description,
      isActive,
      jobsInfo: chosenCategories
        .filter((category) => parseFloat(category.price) > 0)
        .map(
          (category): IShortCategoryWithIsActive => ({
            categoryId: category.id,
            price: parseFloat(category.price),
            type: category.type,
            isActive: category.isChecked,
            images: category.images,
          }),
        ),
    }
    return data
  }

  const onSaveBtnPress = () => {
    const changedKeys: UpdateProfileDataType = {}
    if (editPensState[0]) {
      handleSubmit((data: InfoItemsType) => {
        if (data.firstName !== firstName) changedKeys.firstName = data.firstName
        if (data.lastName !== lastName) changedKeys.lastName = data.lastName
        if (data.telephone != telephone)
          changedKeys.telephone = '+' + data.telephone
        if (data.email !== email) changedKeys.email = data.email.toLowerCase()
        if (data.businessName !== businessName)
          changedKeys.businessName = data.businessName
        if (
          (!currentAddress && address) ||
          (currentAddress && address !== currentAddress.formatted)
        )
          changedKeys.address = address
        if (file) {
          changedKeys.avatar = file
        }
        if (Object.keys(changedKeys).length) {
          dispatch(
            updateProfile({
              changedKeys,
              dontTurnOffLoading: editPensState[1],
            }),
          )
        } else if (!editPensState[1]) {
          setEditPensState([false, editPensState[1]])
        }
      })()
    }
    if (editPensState[1]) {
      dispatch(setJobList([]))
      dispatch(setIsAllJobsGet(false))
      dispatch(
        updateHelperProfile({
          miniHelperProfile: collectHelperProfileData(),
          dontTurnOnLoading:
            !Object.keys(changedKeys).length && editPensState[0]
              ? false
              : editPensState[0],
        }),
      )
    }
  }

  useEffect(() => {
    if (!loading) {
      setEditPensState([false, false])
    }
  }, [loading])

  const logOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch])

  useEffect(() => {
    if (requestsStatus.logoutRequestStatus !== ERequestStatus.NOT_SENT_YET) {
      if (requestsStatus.logoutRequestStatus === ERequestStatus.SUCCESS) {
        dispatch(resetAllAuth())
        dispatch(resetAllCommon())
        dispatch(resetAllClient())
        dispatch(resetAllHelper())
        dispatch(resetAllExceptWelcomeMsg())
        PushNotification.cancelAllLocalNotifications()
      } else {
        dispatch(setError('common.couldntMakeRequest'))
      }
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          logoutRequestStatus: ERequestStatus.NOT_SENT_YET,
        }),
      )
    }
  }, [requestsStatus])

  const selectOneFile = () => {
    /*try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      })
      setFile({ id: `${res.name}${new Date()}`, file: res })
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log('Error at picker', err)
        throw err
      }
    }
    */
    setIsFileModalOpen(true)
  }
  interface RenderInfoBlockTitleProps {
    which: 'first' | 'second'
  }
  const RenderInfoBlockTitle = ({
    which,
  }: RenderInfoBlockTitleProps): JSX.Element => {
    const FirstColor =
      which === first && editPensState[0] ? color.secondary : color.primary
    const SecondColor =
      which === second && editPensState[1] ? color.secondary : color.primary
    const INFORMATION_HEADER_ADDITIONAL: ViewStyle = {
      ...(!editPensState[1] && which === second && { marginBottom: 0 }),
    }
    return (
      <RowSpaceBetween
        style={{
          ...ROW_ITEMS_VERTICAL_CENTER,
          ...INFORMATION_HEADER,
          ...INFORMATION_HEADER_ADDITIONAL,
        }}
        StartItem={
          <Text
            tx={`profile.${which === first ? 'information' : 'helperProfile'}`}
            preset='header3_500'
          />
        }
        EndItem={
          ((which === first && !editPensState[0]) ||
            (which === second && !editPensState[1])) && (
            <TouchableOpacity
              onPress={() => {
                setEditPensState([
                  which === first ? true : editPensState[0],
                  which === second ? true : editPensState[1],
                ])
              }}
            >
              <View style={EDIT_VIEW}>
                <SVGIcon
                  icon='pen'
                  color={which === first ? FirstColor : SecondColor}
                />
                <Text text=' ' />
                <Text
                  tx='common.edit'
                  preset='subtitleBoldLink'
                  color={which === first ? FirstColor : SecondColor}
                />
              </View>
            </TouchableOpacity>
          )
        }
      />
    )
  }

  return (
    <>
      {isFileModalOpen && (
        <ImagePicker
          toggleModal={() => {
            setIsFileModalOpen(!isFileModalOpen)
          }}
          onSelected={(files) =>
            setFile({ file: files[0], id: `${files[0].fileName}${new Date()}` })
          }
        />
      )}
      <ScrollView
        onContentSizeChange={(_, y) => {
          //console.log('xxx')
          dispatch(
            setOnScrollEventForGradient({
              ...onScrollEventForGradient,
              contentSize: {
                height: y,
              },
            }),
          )
        }}
        showsVerticalScrollIndicator={false}
        style={[SCROLL_VIEW, HZ_PADDING_5_PERCENT]}
        onScroll={(e) => dispatch(setOnScrollEventForGradient(e.nativeEvent))}
        keyboardShouldPersistTaps='always' // uncoment if keyboard should always been visible
      >
        <View style={WRAPPER}>
          <RenderInfoBlockTitle which={first} />
          <RowSpaceBetween
            StartItem={
              <TouchableOpacity
                disabled={!editPensState[0]}
                onPress={selectOneFile}
              >
                {file ? (
                  <CircleImage source={{ uri: file.file.uri }} size={84} />
                ) : (
                  <CircleImage
                    source={
                      profile.avatar
                        ? { uri: profile.avatar.sourceUrl }
                        : defaultAvatar
                    }
                    size={84}
                  />
                )}
              </TouchableOpacity>
            }
            EndItem={
              <View style={COLUMN_ITEMS_VERTICAL_CENTER}>
                <Button
                  preset={isLogoutLoading ? 'sixthLoading' : 'sixth'}
                  tx='common.logout'
                  onPress={logOut}
                  disabled={isLogoutLoading}
                  loadingIndicatorColor={color.primary}
                  style={LOGOUT_BTN}
                />
              </View>
            }
          />
          <View style={INFO_WRAPPER}>
            <View style={INFO_ITEM}>
              <View style={ICON_VIEW}>
                <SVGIcon icon='user2' />
              </View>
              <View style={{ ...INFO_DATA_VIEW, ...ROW }}>
                {!editPensState[0] ? (
                  <>
                    <Text text={firstName} preset='header4slim' />
                    <Text
                      text=' '
                      preset='header4slim'
                      color={color.palette.white}
                    />
                    <Text text={lastName} preset='header4slim' />
                  </>
                ) : (
                  <RowSpaceBetween
                    style={FLEX_1}
                    StartItem={
                      <View style={WIDTH_47}>
                        <Controller
                          control={control}
                          render={({ onChange, value }) => (
                            <Input
                              value={value}
                              onChangeText={(newValue) => onChange(newValue)}
                              errorText={errors.firstName?.message}
                            />
                          )}
                          name='firstName'
                          defaultValue={firstName}
                        />
                      </View>
                    }
                    EndItem={
                      <View style={WIDTH_47}>
                        <Controller
                          control={control}
                          render={({ onChange, value }) => (
                            <Input
                              value={value}
                              onChangeText={(newValue) => onChange(newValue)}
                              errorText={errors.lastName?.message}
                            />
                          )}
                          name='lastName'
                          defaultValue={lastName}
                        />
                      </View>
                    }
                  />
                )}
              </View>
            </View>
            {Object.keys(items).map((item, index) => (
              <View key={index} style={INFO_ITEM}>
                <View
                  style={{
                    ...ICON_VIEW,
                    ...(index == 2 &&
                      editPensState[0] && {
                        ...ALIGN_SELF_START,
                        ...PADDING_TOP_15,
                      }),
                  }}
                >
                  <SVGIcon
                    icon={
                      index === 0
                        ? 'mail'
                        : index === 1
                        ? 'phone'
                        : index === 2
                        ? 'mapMark2'
                        : 'bag'
                    }
                  />
                </View>
                <View style={INFO_DATA_VIEW}>
                  {!editPensState[0] ? (
                    <Text
                      style={TEXT_ALIGIN_LEFT}
                      text={items[item]}
                      preset='header4slim'
                    />
                  ) : (
                    <>
                      {index == 2 ? (
                        <View style={FULL_WIDTH}>
                          <AddressForm
                            {...(currentAddress && { address: currentAddress })}
                            onAddressChange={(newAddress: string) => {
                              setAddress(newAddress)
                            }}
                            withoutTitle
                          />
                        </View>
                      ) : (
                        <Controller
                          control={control}
                          render={({ onChange, value }) => (
                            <Input
                              value={value}
                              onChangeText={(newValue) => onChange(newValue)}
                              errorText={errors[item]?.message}
                            />
                          )}
                          name={item}
                          defaultValue={items[item]}
                        />
                      )}
                    </>
                  )}
                </View>
              </View>
            ))}
          </View>
          {helperProfile && (
            <>
              <HrWithVerticalMargin />
              <RenderInfoBlockTitle which={second} />
              <CategoriesWithSearch
                onChosenCategoriesChange={onChosenCategoriesChange}
                isEditMode={editPensState[1]}
                useTrashInEditMode
                {...{
                  chosenCategories,
                  toggleCheck,
                  toggleType,
                  addCategory,
                  removeCategory,
                  changePrice,
                }}
              />
              <RangeWithTitle
                value={milesRange}
                onValueChanged={useCallback(
                  (low: number) => {
                    const prevHelperProfile = { ...helperProfile, milesRange }
                    setMiles(low)
                    if (!editPensState[1]) {
                      dispatch(setJobList([]))
                      dispatch(
                        updateHelperProfileWithPrevState({
                          miniHelperProfile: {
                            ...collectHelperProfileData(),
                            milesRange: low,
                          },
                          prevHelperProfile: { ...prevHelperProfile },
                        }),
                      )
                    }
                  },
                  [editPensState],
                )}
                style={RANGE}
              />
              <YesOrNoBtns
                style={YES_OR_NO}
                onButtonsPress={(pressedOne) => {
                  const prevHelperProfile = { ...helperProfile, isActive }
                  setIsActive(pressedOne === 1)
                  if (!editPensState[1]) {
                    dispatch(
                      updateHelperProfileWithPrevState({
                        miniHelperProfile: {
                          ...collectHelperProfileData(),
                          isActive: pressedOne === 1,
                        },
                        prevHelperProfile: { ...prevHelperProfile },
                      }),
                    )
                  }
                }}
                activeOne={isActive ? 1 : 2}
                showDefaultSubTitle
              />
              <View style={INFO_WRAPPER}>
                <Text tx='profile.whyYouHelpt' preset='header4slim' />
                <HelperDescriptionInput
                  style={WHY_HELPT_VIEW_WRAPPER}
                  text={description}
                  setText={setDesc}
                  editable={editPensState[1]}
                />
              </View>
              <HrWithVerticalMargin />
            </>
          )}
          {(editPensState[0] || editPensState[1]) && (
            <RowSpaceBetween
              StartItem={
                <Button
                  style={WIDTH_75}
                  preset={loading ? 'primaryLoading' : 'primary'}
                  tx='common.save'
                  onPress={() => onSaveBtnPress()}
                  disabled={loading}
                />
              }
              EndItem={
                <View style={CANCEL}>
                  <TouchableOpacity
                    onPress={() => {
                      setAddress(currentAddress ? currentAddress.formatted : '')
                      setEditPensState([false, false])
                      if (helperProfile) {
                        setChosenCategories(
                          makeChosenCategoriesFromAddedCategories(jobsInfo),
                        )
                        setMiles(helperProfile.milesRange)
                        setIsActive(helperProfile.isActive)
                      }
                    }}
                  >
                    <Text
                      tx='common.cancel'
                      preset='subtitleBold'
                      color={color.palette.greySlow}
                      style={UPPERCASE}
                    />
                  </TouchableOpacity>
                </View>
              }
            />
          )}
          <CommonInfoModal
            titleStyle={TITLE_OF_DEACTIVATE_MODAL}
            isButtonShorter={true}
            toggleModal={() => setIsDeactivateModalOpen(!isDeactivateModalOpen)}
            visible={isDeactivateModalOpen}
            icon='crossInCirlce'
            iconSize={31}
            title={translate('profile.deactivateAccount')}
            content={translate('profile.deactivateDesc')}
            buttonText={translate('profile.deactivate')}
            buttonPreset={'primary'}
            onButtonPress={() => {
              setIsDeactivateModalOpen(false)
              navigation.navigate(deactivation)
            }}
          />
        </View>
        <View style={STATUS_VIEW}>
          <RowSpaceBetween
            style={ROW_ITEMS_VERTICAL_CENTER}
            StartItem={<Text tx='profile.accountStatus' preset='header3bold' />}
            EndItem={
              <View style={ACTIVATE}>
                <Button preset='sixth' tx='profile.active' />
              </View>
            }
          />
          <TouchableOpacity
            style={[DEACTIVATE, CENTERING]}
            onPress={() => setIsDeactivateModalOpen(true)}
          >
            <Text
              tx='profile.deactivate'
              color={color.palette.lighterGrey}
              style={[UPPERCASE]}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  )
}

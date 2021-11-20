/* eslint-disable */
import React, { Dispatch, ReactElement, SetStateAction, useState } from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'

import { color, spacing } from 'theme'
import {
  Text,
  RangeWithTitle,
  Button,
  YesOrNoBtns,
  HelperDescriptionInput,
  AddressForm,
  Attachment,
  DateOfBirth,
  Loader,
  SVGIcon,
  ImagePicker,
} from 'components'
import { IChosenCategory } from 'app/interfaces/common/category'
import { CategoriesWithSearch } from 'app/components/categories-with-search/categories-with-search'
import { IAddress } from 'interfaces'
import { translate } from 'i18n'
import { EBackgroundCheckStates, IErrors } from './set-up-helper-profile-screen'
import {
  ALIGIN_ITEMS_CENTER,
  MARGIN_BOTTOM_SP3,
  MARGIN_TOP_SP3,
  MARGIN_VERTICAL_SP2,
  ROW,
} from 'constants/common-styles'
import { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { contactUs } from 'constants/routes'
import { Asset } from 'react-native-image-picker'
/*
const ROW_AND_VERTICAL_CENTER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}*/

interface RenderJobInformationStepContentProps {
  toggleCheck: (id: number) => void
  toggleType: (id: number) => void
  addCategory: (category: IChosenCategory) => void
  removeCategory: (id: number) => void
  changePrice: (price: string, categoryId: number) => void
  chosenCategories: Array<IChosenCategory>
  onChosenCategoriesChange: (newChosenCategories: IChosenCategory[]) => void
  onMilesChange: (low: number, high: number) => void
  milesRange: number
  errors: IErrors
}

export const RenderJobInformationStepContent = (
  props: RenderJobInformationStepContentProps,
): ReactElement => {
  const RANGE: ViewStyle = {
    marginTop: spacing[6],
    marginBottom: spacing[3],
  }

  const { onMilesChange, milesRange, errors, ...rest } = props

  return (
    <View>
      <CategoriesWithSearch isEditMode {...rest} error={errors.categories} />
      <RangeWithTitle
        value={milesRange}
        onValueChanged={onMilesChange}
        style={RANGE}
        error={errors.miles}
      />
    </View>
  )
}

interface IRenderAboutYouStepContentProps {
  dateOfBirth?: Date
  setDateOfBirth?: Dispatch<SetStateAction<Date>>
  addressObject?: IAddress
  setAddress: Dispatch<SetStateAction<string>>
  desc: string
  setDesc: Dispatch<SetStateAction<string>>
  isActive: boolean
  setIsActive: Dispatch<SetStateAction<boolean>>
  file: {
    file: Asset
    id: string
  } | null
  setFile: Dispatch<
    SetStateAction<{
      file: Asset
      id: string
    }>
  >
  errors: IErrors
}

export const RenderAboutYouStepContent = (
  props: IRenderAboutYouStepContentProps,
): ReactElement => {
  const {
    dateOfBirth,
    setDateOfBirth,
    addressObject,
    setAddress,
    desc,
    setDesc,
    isActive,
    setIsActive,
    file,
    setFile,
    errors,
  } = props

  const DATE_OF_BIRTH: ViewStyle = {
    marginBottom: spacing[5] + 2,
  }

  const FIRST_TITLE_BOX: ViewStyle = {
    marginTop: spacing[6] + 3,
    marginBottom: spacing[5] + 2,
  }

  const SECOND_TITLE_BOX: ViewStyle = {
    marginTop: spacing[6] + 3,
    marginBottom: spacing[5] + 2,
  }

  const UPLOAD_BTN_TEXT: TextStyle = {
    textTransform: 'none',
  }

  const YES_OR_NO: ViewStyle = {
    marginTop: spacing[6],
  }
  /*
  const ADDITIONAL_OPTIONS_TITLE_BOX: ViewStyle = {
    marginTop: spacing[6] + 3,
    marginBottom: spacing[2],
  }

  const LAST_TITLE_BOX: ViewStyle = {
    marginVertical: spacing[4],
  }

  const ATTACHMENTS_BOX: ViewStyle = {
    marginTop: spacing[5] - 4,
  }
  */

  //const [viewMoreOptions, setViewMoreOptions] = useState<boolean>(false)

  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false)

  /*const selectOneFile = async () => {
    try {
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
  }
  */

  return (
    <View>
      {isFileModalOpen && (
        <ImagePicker
          toggleModal={() => {
            setIsFileModalOpen(!isFileModalOpen)
          }}
          onSelected={(files) =>
            setFile({ id: `${files[0].fileName}${new Date()}`, file: files[0] })
          }
        />
      )}
      {setDateOfBirth && (
        <DateOfBirth
          errorText={errors.dateOfbirth}
          style={DATE_OF_BIRTH}
          date={dateOfBirth}
          onDateChange={(newDate) => setDateOfBirth(newDate)}
        />
      )}
      <AddressForm
        makeAllFieldsTouchedToShowErrors={!!errors.address}
        title={translate('setUpHelperProfileScreen.addYourHomeAddress')}
        withWhyAddressModal
        {...(addressObject && { address: addressObject })}
        onAddressChange={(newAddress: string) => {
          setAddress(newAddress)
        }}
      />
      <View style={FIRST_TITLE_BOX}>
        <Text
          tx='setUpHelperProfileScreen.addProfileImage'
          preset='header4slim'
        />
      </View>
      <Button
        tx='setUpHelperProfileScreen.uploadPhotosBtn'
        preset='seventh'
        textStyle={UPLOAD_BTN_TEXT}
        onPress={() => setIsFileModalOpen(true)}
        style={MARGIN_BOTTOM_SP3}
      />
      {file && (
        <View key={file.id}>
          <Attachment
            style={MARGIN_VERTICAL_SP2}
            text={file.file.fileName}
            onDeletePress={() => setFile(null)}
          />
        </View>
      )}
      <View style={SECOND_TITLE_BOX}>
        <Text tx='setUpHelperProfileScreen.whyDoYouHelp' preset='header4slim' />
      </View>
      <HelperDescriptionInput
        errorText={errors.description}
        text={desc}
        setText={setDesc}
      />
      <YesOrNoBtns
        style={YES_OR_NO}
        onButtonsPress={(pressedOne) =>
          setIsActive(pressedOne === 1 ? true : false)
        }
        activeOne={isActive ? 1 : 2}
        showDefaultSubTitle
      />
      {/*
      <View style={ADDITIONAL_OPTIONS_TITLE_BOX}>
        <TouchableOpacity onPress={() => setViewMoreOptions(!viewMoreOptions)}>
          <Text
            tx={
              'setUpHelperProfileScreen.' +
              (viewMoreOptions ? 'viewLessOptions' : 'viewMoreOptions')
            }
            preset='subtitleBoldLink'
            color={color.primary}
          />
        </TouchableOpacity>
      </View>
      {viewMoreOptions && (
        <>
          <View style={LAST_TITLE_BOX}>
            <Text
              tx='setUpHelperProfileScreen.addJobPhotos'
              preset='header4slim'
            />
          </View>
          <Button
            tx='setUpHelperProfileScreen.uploadPhotosBtn'
            preset='seventh'
            textStyle={UPLOAD_BTN_TEXT}
            onPress={selectMultipleFile}
          />
          <View style={ATTACHMENTS_BOX}>{RenderImages()}</View>
        </>
      )}*/}
    </View>
  )
}

interface RenderBackgroundCheckStepContentProps {
  isCriminal: boolean
  backgroundCheckState: EBackgroundCheckStates
  setBackgroundCheckState: Dispatch<SetStateAction<EBackgroundCheckStates>>
}

export const RenderBackgroundCheckStepContent = ({
  isCriminal,
  backgroundCheckState,
  setBackgroundCheckState,
}: RenderBackgroundCheckStepContentProps): ReactElement => {
  const navigation = useNavigation()

  const TEXT: TextStyle = {
    fontWeight: 'bold',
    fontSize: 20,
    color: color.primary,
    marginVertical: spacing[3],
  }
  const TEXT2: TextStyle = {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  }

  useEffect(() => {
    const id = setTimeout(() => {
      setBackgroundCheckState(
        isCriminal
          ? EBackgroundCheckStates.Denied
          : EBackgroundCheckStates.Approved,
      )
    }, 5000)
    return () => clearTimeout(id)
  }, [])

  return (
    <View style={ALIGIN_ITEMS_CENTER}>
      {backgroundCheckState === EBackgroundCheckStates.Checking ? (
        <>
          <Loader preset='primayWithVerticalMarginSp3' />
          <Text tx='setUpHelperProfileScreen.loading' style={TEXT} />
        </>
      ) : (
        <>
          <SVGIcon
            color={color.primary}
            icon={
              EBackgroundCheckStates.Approved ? 'checkInCircle' : 'sadSmile'
            }
            size={45}
          />
          <Text
            tx={
              'setUpHelperProfileScreen.' +
              (backgroundCheckState === EBackgroundCheckStates.Approved
                ? 'approved'
                : 'sorry')
            }
            style={TEXT}
          />
          <Text
            tx={
              'setUpHelperProfileScreen.' +
              (backgroundCheckState === EBackgroundCheckStates.Approved
                ? 'approvedDesc'
                : 'deniedDesc')
            }
          />
          {backgroundCheckState === EBackgroundCheckStates.Denied && (
            <View style={[ROW, MARGIN_TOP_SP3]}>
              <Text tx='setUpHelperProfileScreen.notSureWhy' />
              <TouchableOpacity onPress={() => navigation.navigate(contactUs)}>
                <Text tx='setUpHelperProfileScreen.contactUs' style={TEXT2} />
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      {/*
      <SsnInput {...{ ssn, onSsnChange }} errorText={errors.ssn} />
      */}
    </View>
  )
}

/* eslint-disable */
import React, { useState } from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, ViewStyle, TouchableOpacity, ImageStyle } from 'react-native'

import {
  Checkbox,
  Text,
  RowSpaceBetween,
  InputPrice,
  ImagePicker,
} from 'components'
import { color, spacing } from 'theme'
import {
  containerPresets,
  listWrapperPresets,
  listItemPresets,
  leftViewPresets,
  checkboxPresets,
  priceTextPresets,
  editPriceInputPresets,
  changeTypeBtnPresets,
  trashPresets,
} from './categories-with-search.presets'
import { CategoriesWithSearchProps } from './categories-with-search.props'
import { SearchCategoryDropdownInput } from '../search-category-dropdown-input/search-category-dropdown-input'
import { IAttachment, IChosenCategory, IPickedFileAndId } from 'interfaces'
import { SVGIcon } from '../svg-icon'
import { Button } from '../button/button'
import {
  CAPITALIZE,
  MARGIN_BOTTOM_SP5,
  MARGIN_VERTICAL_SP2,
  MARGIN_VERTICAL_SP4,
} from 'constants/common-styles'
import { Attachment } from '../attachment/attachment'
import { translate } from 'i18n'

export const CategoriesWithSearch = (
  props: CategoriesWithSearchProps,
): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    chosenCategories,
    onChosenCategoriesChange,
    addCategory,
    removeCategory,
    toggleCheck,
    toggleType,
    changePrice,
    isEditMode,
    useTrashInEditMode,
    error,
  } = props

  const ADDITIONAL_STYLE: ViewStyle = {
    ...(!isEditMode && { marginTop: 0 }),
  }
  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )
  const listWrapperStyle = mergeAll(
    flatten([listWrapperPresets[preset] || listWrapperPresets.primary]),
  )
  const listItemStyle = mergeAll(
    flatten([listItemPresets[preset] || listItemPresets.primary]),
  )
  const leftViewStyle = mergeAll(
    flatten([leftViewPresets[preset] || leftViewPresets.primary]),
  )
  const checkboxStyle = mergeAll(
    flatten([
      checkboxPresets[preset] || checkboxPresets.primary,
      { marginTop: spacing[isEditMode ? 1 : 0] + 4 },
    ]),
  )
  const trashStyle = mergeAll(
    flatten([trashPresets[preset] || trashPresets.primary]),
  )
  const categoryNameBoxStyle = mergeAll(
    flatten([
      {
        ...(isEditMode && {
          positon: 'relative',
          //top: -11,
          top: 0,
        }),
      },
    ]),
  )
  const priceTextStyle = mergeAll(
    flatten([priceTextPresets[preset] || priceTextPresets.primary]),
  )
  const editPriceInputStyle = mergeAll(
    flatten([editPriceInputPresets[preset] || editPriceInputPresets.primary]),
  )
  const changeTypeBtnStyle = mergeAll(
    flatten([changeTypeBtnPresets[preset] || changeTypeBtnPresets.primary]),
  )
  const hourly = 'hourly'

  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false)
  const [
    chosenCategoryIndexForImages,
    setChosenCategoryIndexForImages,
  ] = useState<number>(null)

  const selectMultipleFile = (chosenCategoryIndex: number) => {
    /*try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      })
      chosenCategories[chosenCategoryIndex].images = [
        ...chosenCategories[chosenCategoryIndex].images,
        ...res.map((item) => ({ id: `${item.name}${new Date()}`, file: item })),
      ]
      onChosenCategoriesChange([...chosenCategories])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log('Error at picker', err)
        throw err
      }
    }
    */
    setIsFileModalOpen(true)
    setChosenCategoryIndexForImages(chosenCategoryIndex)
  }

  const onImagesSelected = (files) => {
    chosenCategories[chosenCategoryIndexForImages].images = [
      ...chosenCategories[chosenCategoryIndexForImages].images,
      ...files.map((item) => ({ id: `${item.name}${new Date()}`, file: item })),
    ]
    onChosenCategoriesChange([...chosenCategories])
  }

  return (
    <View style={{ ...style, ...ADDITIONAL_STYLE }}>
      {isFileModalOpen && (
        <ImagePicker
          toggleModal={() => {
            setIsFileModalOpen(!isFileModalOpen)
          }}
          onSelected={onImagesSelected}
          isMultiSelection
        />
      )}
      {isEditMode && (
        <SearchCategoryDropdownInput
          chosenCategories={chosenCategories}
          resetInputValueAfterCategorySelected
          showCommonPlaceholder
          onSelectCategory={addCategory}
          error={error}
        />
      )}
      <View style={listWrapperStyle}>
        {chosenCategories.map(
          (category: IChosenCategory, chosenCategoryIndex: number) => (
            <>
              <RowSpaceBetween
                style={listItemStyle}
                key={category.id}
                StartItem={
                  <View style={leftViewStyle}>
                    {isEditMode && useTrashInEditMode ? (
                      <TouchableOpacity
                        onPress={() => removeCategory(category.id)}
                      >
                        <SVGIcon
                          style={trashStyle as ImageStyle}
                          icon='trash'
                        />
                      </TouchableOpacity>
                    ) : (
                      <Checkbox
                        style={checkboxStyle}
                        iconOnFill='checked'
                        onToggle={() => toggleCheck(category.id)}
                        value={category.isChecked}
                      />
                    )}
                    <View style={categoryNameBoxStyle}>
                      <Text text={category.title} preset='header4slim' />
                    </View>
                  </View>
                }
                EndItem={
                  <View>
                    {isEditMode ? (
                      <View>
                        <InputPrice
                          style={editPriceInputStyle}
                          showHr={category.type === hourly}
                          value={parseFloat(category.price)}
                          onPriceChange={(price) =>
                            changePrice(price.toString(), category.id)
                          }
                          maxLength={6}
                        />
                      </View>
                    ) : (
                      <Text>
                        <Text
                          text={`$${category.price}`}
                          style={priceTextStyle}
                        />
                        {category.type === hourly && (
                          <>
                            <Text text='/' style={priceTextStyle} />
                            <Text tx='common.hr' style={priceTextStyle} />
                          </>
                        )}
                      </Text>
                    )}
                  </View>
                }
              />
              {isEditMode && (
                <View style={MARGIN_BOTTOM_SP5}>
                  <RowSpaceBetween
                    StartItem={
                      <TouchableOpacity
                        style={changeTypeBtnStyle}
                        onPress={() => {
                          onChosenCategoriesChange(
                            chosenCategories.map((ch_category) => {
                              if (ch_category.id === category.id)
                                return {
                                  ...category,
                                  isAddImagesMode: !category.isAddImagesMode,
                                }
                              else return ch_category
                            }),
                          )
                        }}
                      >
                        <Text
                          preset='subtitleBolderLink'
                          tx={
                            'categoriesWithSearch.' +
                            (category.images.length
                              ? 'addRemoveJobPhotos'
                              : 'addJobPhotos')
                          }
                          color={
                            category.isAddImagesMode
                              ? color.secondary
                              : color.primary
                          }
                        />
                      </TouchableOpacity>
                    }
                    EndItem={
                      <TouchableOpacity
                        style={changeTypeBtnStyle}
                        onPress={() => toggleType(category.id)}
                      >
                        <Text>
                          <Text
                            preset='subtitleBolderLink'
                            tx={`common.${
                              category.type === hourly ? 'fixed' : 'hourly'
                            }`}
                            color={color.primary}
                          />
                          <Text text=' ' />
                          <Text
                            preset='subtitleBolderLink'
                            tx='common.price'
                            color={color.primary}
                          />
                          <Text
                            preset='subtitleBolderLink'
                            text='?'
                            color={color.primary}
                          />
                        </Text>
                      </TouchableOpacity>
                    }
                  />
                  {category.isAddImagesMode && (
                    <View>
                      <Button
                        onPress={() => selectMultipleFile(chosenCategoryIndex)}
                        preset='seventh'
                        tx='categoriesWithSearch.uploadPhotos'
                        style={MARGIN_VERTICAL_SP4}
                        textStyle={CAPITALIZE}
                      />
                      {category.images.map(
                        (
                          image: IPickedFileAndId | IAttachment,
                          index: number,
                        ) => {
                          return (
                            <Attachment
                              style={MARGIN_VERTICAL_SP2}
                              // @ts-ignore
                              uri={image.file?.uri || image.sourceUrl}
                              // @ts-ignore
                              text={`${translate('common.photo')} ${index + 1}`}
                              onDeletePress={() => {
                                onChosenCategoriesChange(
                                  chosenCategories.map((ch_category) => {
                                    if (ch_category.id === category.id)
                                      return {
                                        ...category,
                                        images: category.images.filter(
                                          (_, index2: number) =>
                                            index !== index2,
                                        ),
                                      }
                                    else return ch_category
                                  }),
                                )
                              }}
                            />
                          )
                        },
                      )}
                    </View>
                  )}
                </View>
              )}
            </>
          ),
        )}
      </View>
    </View>
  )
}

/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { color } from 'theme'
import { SVGIcon, Text } from 'components'
import { ICategory } from 'app/interfaces/common/category'
import { translate } from 'i18n'
import { searchCategoriesByName } from './search'
import { SearchCategoryDropdownProps } from './search-category-dropdown-input.props'
import {
  viewPresets,
  inputBoxPresets,
  inputPresets,
  dropdownContainerPresets,
  dropdownItemPresets,
  arrowViewPresets,
} from './search-category-dropdown-input.presets'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategories } from 'screens/both/thunk'
import { user } from 'app/store/selectors'
import { JobCategory } from '../job-category/job-category'
import { FLEX_1, ROW } from 'constants/common-styles'
import { ShowError } from '../show-error'
import { useIsFocused } from '@react-navigation/core'

export const SearchCategoryDropdownInput = (
  props: SearchCategoryDropdownProps,
): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    showCommonPlaceholder,
    placeholder,
    placeholderColor,
    onSelectCategory,
    resetInputValueAfterCategorySelected,
    chosenCategories = [],
    disabled,
    error,
    isCloseSelector,
    isResetInputValue,
    isSearchingMode: isSearchingModeFromProps,
    isShowAllCategiriesMode: isShowAllCategiriesModeFromProps,
    onIsShowAllCategiriesModeChanged,
    onIsSearchingModeChanged,
  } = props

  const [isSearchingMode, setIsSearchingMode] = useState<boolean>(
    isSearchingModeFromProps,
  )
  const [
    isShowAllCategiriesMode,
    setIsShowAllCategiriesMode,
  ] = useState<boolean>(isShowAllCategiriesModeFromProps)
  const [text, setText] = useState<string>('')
  const i18nText =
    placeholder ||
    (showCommonPlaceholder && translate('dropdownInput.commonPlaceholder'))
  const [plcHolder, setPlcHolder] = React.useState<string>(i18nText)
  useEffect(() => setPlcHolder(i18nText), [placeholder])
  const isFocused: boolean = useIsFocused()
  useEffect(() => {
    if (!isFocused) {
      setText('')
    }
  }, [isFocused])

  useEffect(() => {
    if (isShowAllCategiriesModeFromProps) setIsSearchingMode(false)
    setIsShowAllCategiriesMode(isShowAllCategiriesModeFromProps)
  }, [isShowAllCategiriesModeFromProps])

  useEffect(() => {
    if (isSearchingModeFromProps) setIsShowAllCategiriesMode(false)
    setIsSearchingMode(isSearchingModeFromProps)
  }, [isSearchingModeFromProps])

  useEffect(() => {
    if (onIsShowAllCategiriesModeChanged)
      onIsShowAllCategiriesModeChanged(isShowAllCategiriesMode)
  }, [isShowAllCategiriesMode])

  useEffect(() => {
    if (onIsSearchingModeChanged) onIsSearchingModeChanged(isSearchingMode)
  }, [isSearchingMode])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllCategories())
  }, [])

  useEffect(() => {
    if (isCloseSelector) {
      setIsSearchingMode(false)
      setIsShowAllCategiriesMode(false)
    }
  }, [isCloseSelector])

  useEffect(() => {
    if (isResetInputValue) setText('')
  }, [isResetInputValue])

  const allCategories: ICategory[] = useSelector(user.categories)

  const viewStyle = mergeAll(
    flatten([viewPresets[preset] || viewPresets.primary, styleOverride]),
  )
  const inputBoxStyle = mergeAll(
    flatten([
      inputBoxPresets[preset] || inputBoxPresets.primary,
      {
        ...(disabled && {
          backgroundColor: color.palette.background,
          borderColor: color.palette.middleGrey,
        }),
        ...(error && {
          borderColor: color.error,
          borderWidth: 2,
        }),
      },
    ]),
  )
  const inputStyle = mergeAll(
    flatten([inputPresets[preset] || inputPresets.primary]),
  )
  const arrowViewStyle = mergeAll(
    flatten([arrowViewPresets[preset] || arrowViewPresets.primary]),
  )
  const dropdownContainerStyle = mergeAll(
    flatten([
      dropdownContainerPresets[preset] || dropdownContainerPresets.primary,
    ]),
  )
  const dropdownItemStyle = mergeAll(
    flatten([dropdownItemPresets[preset] || dropdownItemPresets.primary]),
  )

  const [matchingToTextCategries, setMatchingToTextCategries] = useState<
    Array<ICategory>
  >([])

  const onCategoryPress = (category: ICategory) => {
    setIsSearchingMode(false)
    setIsShowAllCategiriesMode(false)
    setText(resetInputValueAfterCategorySelected ? '' : category.title)
    onSelectCategory(category)
  }

  const renderMatchingCategriesAsList = (
    matchingCategories: Array<ICategory>,
  ): JSX.Element[] =>
    matchingCategories.map(
      (category: ICategory): JSX.Element => (
        <TouchableOpacity
          style={dropdownItemStyle}
          key={category.id}
          onPress={() => {
            if (
              !chosenCategories.find(
                (chosenCategory) => chosenCategory.id === category.id,
              )
            )
              onCategoryPress(category)
          }}
        >
          <Text text={category.title} />
        </TouchableOpacity>
      ),
    )

  const renderAllCategoriesAsTable = (): JSX.Element[] => {
    const splited2rows = []
    for (let i = 0; i < allCategories.length; i++) {
      // eslint-disable-line
      if (!splited2rows.length) splited2rows.push([allCategories[i]])
      else {
        if (splited2rows[splited2rows.length - 1].length === 3)
          splited2rows.push([allCategories[i]])
        else splited2rows[splited2rows.length - 1].push(allCategories[i])
      }
      if (i + 1 === allCategories.length) {
        while (splited2rows[splited2rows.length - 1].length !== 3)
          splited2rows[splited2rows.length - 1].push(null)
      }
    }
    return splited2rows.map(
      (row, rowIndex): JSX.Element => (
        <View key={rowIndex.toString()} style={ROW}>
          {row.map((category: ICategory | null, index) =>
            category ? (
              <JobCategory
                {...(text === category.title && { isChosen: true })}
                style={FLEX_1}
                {...{ category }}
                key={category.id}
                onPress={(category_: ICategory) => {
                  if (
                    !chosenCategories.find(
                      (chosenCategory) => chosenCategory.id === category_.id,
                    )
                  )
                    onCategoryPress(category_)
                }}
              />
            ) : (
              <View key={index.toString()} style={FLEX_1} />
            ),
          )}
        </View>
      ),
    )
  }

  return (
    <View style={viewStyle}>
      <View style={inputBoxStyle}>
        <SVGIcon
          icon='search'
          {...(disabled && { color: color.palette.moreGrey })}
        />
        <TextInput
          editable={!disabled}
          value={text}
          style={inputStyle}
          placeholder={plcHolder}
          placeholderTextColor={
            placeholderColor ||
            (disabled ? color.palette.moreGrey : color.secondary)
          }
          onFocus={() => setPlcHolder('')}
          onBlur={() => setPlcHolder(i18nText)}
          onChangeText={(newText) => {
            setText(newText)
            setIsShowAllCategiriesMode(false)
            setIsSearchingMode(newText !== '')
            /*setMatchingToTextCategries(
              searchCategoriesByName(newText, allCategories).filter(
                (category) =>
                  !chosenCategories.find(
                    (chosenCategory) => chosenCategory.id === category.id,
                  ),
              ),
            )*/
            setMatchingToTextCategries(
              searchCategoriesByName(newText, allCategories),
            )
          }}
        />
        <TouchableOpacity
          {...{ disabled }}
          style={arrowViewStyle}
          onPress={() => {
            setIsSearchingMode(false)
            setIsShowAllCategiriesMode(!isShowAllCategiriesMode)
          }}
        >
          <SVGIcon
            {...(disabled && { color: color.palette.moreGrey })}
            icon={
              isSearchingMode || isShowAllCategiriesMode
                ? 'chevronRight'
                : 'chevronDown'
            }
            width={isSearchingMode || isShowAllCategiriesMode ? 20 : 11}
            height={isSearchingMode || isShowAllCategiriesMode ? 11 : 20}
          />
        </TouchableOpacity>
      </View>
      {(isSearchingMode || isShowAllCategiriesMode) && (
        <View style={dropdownContainerStyle}>
          {isSearchingMode &&
            (matchingToTextCategries.length ? (
              renderMatchingCategriesAsList(matchingToTextCategries)
            ) : (
              <Text tx='common.noMatchesFound' preset='subtitle' />
            ))}
          {isShowAllCategiriesMode && renderAllCategoriesAsTable()}
        </View>
      )}
      <ShowError text={error} />
    </View>
  )
}

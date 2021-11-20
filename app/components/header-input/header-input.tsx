/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, TouchableOpacity, TextInput } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { color } from 'theme'
import { SVGIcon } from 'components'
import { ICategory, ICreatedOrder, IJobFrequency } from 'interfaces'
import { translate } from 'i18n'
import { HeaderInputPresetProps } from './header-input.props'
import {
  viewPresets,
  inputBoxPresets,
  inputPresets,
  rightIconViewPresets,
} from './header-input.presets'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from 'screens/client/thunk'
import { setJobFilter } from 'screens/helper/thunk'
import { consumer, helper, user } from 'app/store/selectors'
import { useDebounce } from 'hooks'

export const HeaderInput = ({
  preset = 'primary',
  style: styleOverride,
  placeholder,
  placeholderColor,
  disabled,
  toggleFilterModal,
  filterActivityStatusFromParent,
}: HeaderInputPresetProps): JSX.Element => {
  const dispatch = useDispatch()

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
      },
    ]),
  )
  const inputStyle = mergeAll(
    flatten([inputPresets[preset] || inputPresets.primary]),
  )
  const rightIconViewStyle = mergeAll(
    flatten([rightIconViewPresets[preset] || rightIconViewPresets.primary]),
  )

  const i18nText = placeholder && translate(placeholder)
  const [plcHolder, setPlcHolder] = React.useState<string>(i18nText)

  useEffect(() => setPlcHolder(i18nText), [placeholder])

  const [text, setText] = useState<string>('')

  const currentRole = useSelector(user.currentRole)

  // Helpers filter
  const jobType: ICategory | null = useSelector(consumer.jobType)
  const maxHourlyRateClient: number | null = useSelector(consumer.maxHourlyRate)
  const successRaiting: number | null = useSelector(consumer.successRaiting)
  const reliabilityPercentage: number | null = useSelector(
    consumer.reliabilityPercentage,
  )
  const minJobsHeld: number | null = useSelector(consumer.minJobsHeld)

  const isHelperFilterSet =
    jobType ||
    maxHourlyRateClient ||
    successRaiting ||
    reliabilityPercentage ||
    minJobsHeld

  // Jobs filter
  const milesRange: number | null = useSelector(helper.milesRange)
  const maxHourlyRate: number | null = useSelector(helper.maxHourlyRate)
  const minHourlyRate: number | null = useSelector(helper.minHourlyRate)
  const maxFxiedPrice: number | null = useSelector(helper.maxFxiedPrice)
  const minFixedPrice: number | null = useSelector(helper.minFixedPrice)
  const createdAtOrder: ICreatedOrder | null = useSelector(
    helper.createdAtOrder,
  )
  const jobFrequency: null | IJobFrequency = useSelector(helper.jobFrequency)
  const categoryIds: null | ICategory = useSelector(helper.categoryIds)

  const debouncedSearch = useDebounce(text, 500)

  const isJobsFilterSet =
    milesRange ||
    maxHourlyRate ||
    minHourlyRate ||
    maxFxiedPrice ||
    minFixedPrice ||
    createdAtOrder ||
    createdAtOrder ||
    jobFrequency ||
    categoryIds

  let filterIconColor = (
    currentRole === 'consumer' ? isHelperFilterSet : isJobsFilterSet
  )
    ? color.primary
    : color.secondary

  const ACTIVE = 'active'
  if (filterActivityStatusFromParent) {
    filterIconColor =
      filterActivityStatusFromParent === ACTIVE
        ? color.primary
        : color.secondary
  }

  useEffect(() => {
    if (currentRole === 'consumer') {
      dispatch(
        setFilter({
          helperName: debouncedSearch,
          maxHourlyRate: maxHourlyRateClient,
          jobType: jobType,
          minJobsHeld,
          reliabilityPercentage,
          successRaiting,
        }),
      )
    } else {
      dispatch(
        setJobFilter({
          search: debouncedSearch,
          milesRange,
          maxHourlyRate,
          minHourlyRate,
          maxFxiedPrice,
          minFixedPrice,
          createdAtOrder,
          jobFrequency,
          categoryIds,
        }),
      )
    }
  }, [
    debouncedSearch,
    milesRange,
    maxHourlyRate,
    minHourlyRate,
    maxFxiedPrice,
    minFixedPrice,
    createdAtOrder,
    jobFrequency,
    categoryIds,

    maxHourlyRateClient,
    jobType,
    successRaiting,
    minJobsHeld,
    reliabilityPercentage,
  ])

  return (
    <View style={viewStyle}>
      <View style={inputBoxStyle}>
        <SVGIcon icon='search' />
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
          }}
        />
        <TouchableOpacity
          style={rightIconViewStyle}
          onPress={toggleFilterModal}
        >
          <SVGIcon color={filterIconColor} icon='sliders' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

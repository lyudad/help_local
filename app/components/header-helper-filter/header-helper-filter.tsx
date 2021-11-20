import React, { useCallback, useState, useEffect } from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Filter, Text } from 'components'
import { spacing } from 'theme'
import { translate } from 'i18n'
import {
  IJobFrequency,
  ICreatedOrder,
  ICategory,
  HelperProfile,
  IJobsFilter,
} from 'interfaces'
import { helper, user } from 'app/store/selectors'
import { setJobFilter } from 'screens/helper/thunk'
import { containerPresets } from './header-helper-filter.presets'
import { IHeaderHelperFilterProps } from './header-helper-filter.props'
import { Dropdown } from '../dropdown/dropdown'
import { InputPrice } from '../input-price/input-price'
import { SearchCategoryDropdownInput } from '../search-category-dropdown-input/search-category-dropdown-input'
import { RangeWithTitle } from '../range-with-title/range-with-title'

const CONTENT: ViewStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[4],
  alignItems: 'flex-start',
  flex: 1,
}

const ELEMENT: ViewStyle = {
  marginBottom: spacing[4],
  width: '100%',
}

const LABEL: ViewStyle = {
  marginBottom: spacing[2],
  alignSelf: 'flex-start',
}

const MARGIN_BOTTOM_1: ViewStyle = {
  marginBottom: spacing[4],
}

const DROPDOWN: ViewStyle = {
  position: 'relative',
  top: 0,
}

const ROW: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}

const INPUT: ViewStyle = {
  width: '45%',
}

const SELECT = 'select'

const listByArray: ICreatedOrder[] = [
  { title: 'filterJobs.newestToOldest', value: -1 },
  { title: 'filterJobs.oldestToNewset', value: 1 },
]

const jobFrequencyList: IJobFrequency[] = [
  { title: 'filterJobs.oneTime', value: 'one_time' },
  { title: 'filterJobs.recurring', value: 'recurring' },
]

export const HeaderHelperFilter = ({
  preset = 'primary',
  style: styleOverride,
  onFilterJobsApply,
  onClearAllPress,
  ...rest
}: IHeaderHelperFilterProps): JSX.Element => {
  const dispatch = useDispatch()

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  // redux values
  const milesRangeR: number | null = useSelector(helper.milesRange)
  const maxHourlyRateR: number | null = useSelector(helper.maxHourlyRate)
  const minHourlyRateR: number | null = useSelector(helper.minHourlyRate)
  const maxFxiedPriceR: number | null = useSelector(helper.maxFxiedPrice)
  const minFixedPriceR: number | null = useSelector(helper.minFixedPrice)
  const createdAtOrderR: ICreatedOrder | null = useSelector(
    helper.createdAtOrder,
  )
  const jobFrequencyR: null | IJobFrequency = useSelector(helper.jobFrequency)
  const categoryIds: null | ICategory = useSelector(helper.categoryIds)

  const helperProfile: HelperProfile | null = useSelector(user.helperProfile)

  const [category, setCategory] = useState<ICategory | null>(categoryIds)
  const [milesRange, setMiles] = useState<number>(
    helperProfile && helperProfile.milesRange
      ? helperProfile.milesRange
      : milesRangeR,
  )
  const [listBy, setListBy] = useState<ICreatedOrder | null>(createdAtOrderR)
  const [jobFrequency, setJobFrequency] = useState<IJobFrequency | null>(
    jobFrequencyR,
  )
  const [minHourlyRate, setMinHourlyRate] = useState<number | null>(
    minHourlyRateR,
  )
  const [maxHourlyRate, setMaxHourlyRate] = useState<number | null>(
    maxHourlyRateR,
  )
  const [minFixedPrice, setMinFixedPrice] = useState<number | null>(
    minFixedPriceR,
  )
  const [maxFxiedPrice, setMaxFixedPrice] = useState<number | null>(
    maxFxiedPriceR,
  )

  useEffect(() => {
    setCategory(categoryIds)
    setMiles(milesRangeR)
    setListBy(createdAtOrderR)
    setJobFrequency(jobFrequencyR)
    setMinHourlyRate(minHourlyRateR)
    setMaxHourlyRate(maxHourlyRateR)
    setMinFixedPrice(minFixedPriceR)
    setMaxFixedPrice(maxFxiedPriceR)
  }, [
    milesRangeR,
    maxHourlyRateR,
    minHourlyRateR,
    maxFxiedPriceR,
    minFixedPriceR,
    createdAtOrderR,
    jobFrequencyR,
    categoryIds,
  ])

  useEffect(
    () =>
      setMiles(
        helperProfile && helperProfile.milesRange
          ? helperProfile.milesRange
          : milesRangeR,
      ),
    [],
  )

  const onApplyPress = useCallback(() => {
    const jobsFilter: IJobsFilter = {
      milesRange,
      maxHourlyRate,
      minHourlyRate,
      maxFxiedPrice,
      minFixedPrice,
      createdAtOrder: listBy,
      jobFrequency,
      categoryIds: category,
    }
    dispatch(setJobFilter(jobsFilter))
    onFilterJobsApply(jobsFilter)
    rest.onClosePress()
  }, [
    onFilterJobsApply,
    dispatch,
    milesRange,
    maxHourlyRate,
    minHourlyRate,
    maxFxiedPrice,
    minFixedPrice,
    listBy,
    jobFrequency,
    category,
  ])

  const clearAll = useCallback(() => {
    setMiles(0)
    setListBy(null)
    setJobFrequency(null)
    setMinHourlyRate(null)
    setMaxHourlyRate(null)
    setMinFixedPrice(null)
    setMaxFixedPrice(null)
    setCategory(null)
    dispatch(
      setJobFilter({
        milesRange: null,
        createdAtOrder: null,
        jobFrequency: null,
        minHourlyRate: null,
        maxHourlyRate: null,
        maxFxiedPrice: null,
        minFixedPrice: null,
        categoryIds: null,
      }),
    )
    onClearAllPress()
    rest.onClosePress()
  }, [dispatch])

  const handleCategoryType = useCallback(
    (selectedCategory: ICategory) => setCategory(selectedCategory),
    [],
  )

  const renderListBy = (): JSX.Element[] => {
    return listByArray.map(
      (item: ICreatedOrder): JSX.Element => (
        <TouchableOpacity
          style={MARGIN_BOTTOM_1}
          key={item.title}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={item.title}
          action={() => setListBy(item)}
        >
          <Text tx={item.title} />
        </TouchableOpacity>
      ),
    )
  }

  const renderJobFrequency = (): JSX.Element[] => {
    return jobFrequencyList.map(
      (item: IJobFrequency): JSX.Element => (
        <TouchableOpacity
          style={MARGIN_BOTTOM_1}
          key={item.title}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={item.title}
          action={() => setJobFrequency(item)}
        >
          <Text tx={item.title} />
        </TouchableOpacity>
      ),
    )
  }

  return (
    <Filter
      onClearAllPress={() => clearAll()}
      style={style}
      {...{ onApplyPress }}
      {...rest}
    >
      <View style={CONTENT}>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterJobs.distanceAway' preset='header4slim' />
          </View>
          <RangeWithTitle
            isShorter
            withoutTitle
            value={milesRange}
            onValueChanged={setMiles}
          />
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.jobType' preset='header4slim' />
          </View>
          <SearchCategoryDropdownInput
            onSelectCategory={handleCategoryType}
            showCommonPlaceholder
            {...(!category && { isResetInputValue: true })}
          />
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterJobs.listBy' preset='header4slim' />
          </View>
          <Dropdown
            styleDropdown={DROPDOWN}
            placeholder={
              listBy
                ? translate(listBy.title)
                : translate(`filterHelpers.${SELECT}`)
            }
          >
            {renderListBy()}
          </Dropdown>
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterJobs.jobFrequency' preset='header4slim' />
          </View>
          <Dropdown
            styleDropdown={DROPDOWN}
            placeholder={
              jobFrequency
                ? translate(jobFrequency.title)
                : translate(`filterHelpers.${SELECT}`)
            }
          >
            {renderJobFrequency()}
          </Dropdown>
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterJobs.hourlyPriceRange' preset='header4slim' />
          </View>
          <View style={ROW}>
            <InputPrice
              textBeforeDollar={translate('filterJobs.min')}
              style={INPUT}
              value={minHourlyRate}
              onPriceChange={(newPrice) => setMinHourlyRate(newPrice)}
            />
            <InputPrice
              textBeforeDollar={translate('filterJobs.max')}
              style={INPUT}
              value={maxHourlyRate}
              onPriceChange={(newPrice) => setMaxHourlyRate(newPrice)}
            />
          </View>
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterJobs.fixedPriceRange' preset='header4slim' />
          </View>
          <View style={ROW}>
            <InputPrice
              textBeforeDollar={translate('filterJobs.min')}
              style={INPUT}
              value={minFixedPrice}
              onPriceChange={(newPrice) => setMinFixedPrice(newPrice)}
            />
            <InputPrice
              textBeforeDollar={translate('filterJobs.max')}
              style={INPUT}
              value={maxFxiedPrice}
              onPriceChange={(newPrice) => setMaxFixedPrice(newPrice)}
            />
          </View>
        </View>
      </View>
    </Filter>
  )
}

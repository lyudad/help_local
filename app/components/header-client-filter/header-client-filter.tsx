/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Filter, Text } from 'components'
import { spacing } from 'theme'
import { translate } from 'i18n'
import { ICategory } from 'interfaces'
import { setFilter } from 'screens/client/thunk'
import { consumer } from 'app/store/selectors/consumer'
import { containerPresets } from './header-client-filter.presets'
import { IHeaderClientFilterProps } from './header-client-filter.props'
import { Dropdown } from '../dropdown/dropdown'
import { Input } from '../input/input'
import { InputPrice } from '../input-price/input-price'
import { SearchCategoryDropdownInput } from '../search-category-dropdown-input/search-category-dropdown-input'

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

const PRICE_STYLE: ViewStyle = {
  marginTop: -1,
  paddingLeft: 25,
}

export enum DropdownType {
  SUCCESS_RAITING = 'SUCCESS_RAITING',
  RELIABILITY_PRECANTAGE = 'RELIABILITY_PRECANTAGE',
}

export const HeaderClientFilter = ({
  preset = 'primary',
  style: styleOverride,
  onFilterHelpersApply,
  ...rest
}: IHeaderClientFilterProps): JSX.Element => {
  const [isCloseSelectors, setSelectorView] = useState(false)
  const dispatch = useDispatch()

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  const select = 'select'

  const jobTypeR: ICategory | null = useSelector(consumer.jobType)
  const successRaitingR: number | null = useSelector(consumer.successRaiting)
  const reliabilityPercentageR: number | null = useSelector(
    consumer.reliabilityPercentage,
  )
  const maxHourlyRateR: number | null = useSelector(consumer.maxHourlyRate)
  const minJobsHeldR: number | null = useSelector(consumer.minJobsHeld)

  const [jobType, setJobType] = useState<ICategory | null>(jobTypeR)
  const [successRaiting, setSuccessRaiting] = useState<number | null>(
    successRaitingR,
  )
  const [reliabilityPercentage, setReliabilityPercentage] = useState<
    number | null
  >(reliabilityPercentageR)
  const [maxHourlyRate, setMaxHourlyRate] = useState<number | null>(
    maxHourlyRateR,
  )
  const [minJobsHeld, setMinAmountJobsHeld] = useState<number | null>(
    minJobsHeldR,
  )

  useEffect(() => {
    setJobType(jobTypeR)
    setSuccessRaiting(successRaitingR)
    setReliabilityPercentage(reliabilityPercentageR)
    setMaxHourlyRate(maxHourlyRateR)
    setMinAmountJobsHeld(minJobsHeldR)
  }, [
    jobTypeR,
    successRaitingR,
    reliabilityPercentageR,
    maxHourlyRateR,
    minJobsHeldR,
  ])

  const onApplyPress = useCallback(() => {
    dispatch(
      setFilter({
        jobType,
        successRaiting,
        reliabilityPercentage,
        maxHourlyRate,
        minJobsHeld,
      }),
    )
    onFilterHelpersApply()
    rest.onClosePress()
  }, [
    dispatch,
    jobType,
    successRaiting,
    reliabilityPercentage,
    maxHourlyRate,
    minJobsHeld,
  ])

  const handleJobType = useCallback(
    (selectedCategory: ICategory) => setJobType(selectedCategory),
    [],
  )

  const clearAll = useCallback(() => {
    setJobType(null)
    setSuccessRaiting(null)
    setReliabilityPercentage(null)
    setMaxHourlyRate(null)
    setMinAmountJobsHeld(null)
    setSelectorView(true)
    dispatch(
      setFilter({
        jobType: null,
        successRaiting: null,
        reliabilityPercentage: null,
        maxHourlyRate: null,
        minJobsHeld: null,
      }),
    )
    rest.onClosePress()
  }, [dispatch])

  const renderDropdownItems = (type: DropdownType): JSX.Element[] => {
    const arr: number[] =
      type === DropdownType.SUCCESS_RAITING
        ? [1, 2, 3, 4, 5]
        : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    return arr.map(
      (item: number): JSX.Element => (
        <TouchableOpacity
          style={MARGIN_BOTTOM_1}
          key={item}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={item}
          action={() => {
            if (type === DropdownType.SUCCESS_RAITING) {
              setSuccessRaiting(item)
            } else {
              setReliabilityPercentage(item)
            }
          }}
        >
          {type === DropdownType.SUCCESS_RAITING ? (
            <Text text={`${item} star${item > 1 ? 's' : ''}`} />
          ) : (
            <Text
              text={`${item}%${item !== 100 ? translate('common.andUp') : ''}`}
            />
          )}
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
            <Text tx='filterHelpers.jobType' preset='header4slim' />
          </View>
          <SearchCategoryDropdownInput
            onSelectCategory={handleJobType}
            showCommonPlaceholder
            isCloseSelector={isCloseSelectors}
            {...(!jobType && { isResetInputValue: true })}
          />
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.rating' preset='header4slim' />
          </View>
          <Dropdown
            styleDropdown={DROPDOWN}
            placeholder={
              successRaiting
                ? `${successRaiting} star${successRaiting > 1 ? 's' : ''}`
                : translate(`filterHelpers.${select}`)
            }
            isCloseSelector={isCloseSelectors}
          >
            {renderDropdownItems(DropdownType.SUCCESS_RAITING)}
          </Dropdown>
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.maxHourlyPrice' preset='header4slim' />
          </View>
          <InputPrice
            value={maxHourlyRate}
            onPriceChange={(newPrice) => setMaxHourlyRate(newPrice)}
            inputStyle={PRICE_STYLE}
          />
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.minimumAmount' preset='header4slim' />
          </View>
          <Input
            keyboardType='number-pad'
            placeholder='filterHelpers.numberOfJobs'
            value={minJobsHeld?.toString()}
            onChangeText={(text) =>
              setMinAmountJobsHeld(parseFloat(text === '' ? '0' : text))
            }
          />
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.percentage' preset='header4slim' />
          </View>
          <Dropdown
            styleDropdown={DROPDOWN}
            placeholder={
              reliabilityPercentage
                ? `${reliabilityPercentage}%${
                    reliabilityPercentage !== 100
                      ? translate('common.andUp')
                      : ''
                  }`
                : translate(`filterHelpers.${select}`)
            }
          >
            {renderDropdownItems(DropdownType.RELIABILITY_PRECANTAGE)}
          </Dropdown>
        </View>
      </View>
    </Filter>
  )
}

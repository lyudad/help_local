/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react'
import { mergeAll, flatten } from 'ramda'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { setFilter } from 'screens/client/thunk'
import { Filter, Text } from 'components'
import { consumer } from 'app/store/selectors/consumer'
import { spacing } from 'theme'
import { translate } from 'i18n'
import { MARGIN_BOTTOM_SP4, WINDOW_HEIGHT } from 'constants/common-styles'
import { containerPresets, dropdownPresets } from './filter-helpers.presets'
import { IFilterHelpersProps } from './filter-helpers.props'
import { Dropdown } from '../dropdown/dropdown'
import { Input } from '../input/input'
import { InputPrice } from '../input-price/input-price'
import { BOTTOM_NAVIGATION_HEIGHT } from '../bottom-navigation/bottom-navigation'

const CONTENT: ViewStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[4],
  alignItems: 'flex-start',
  height: WINDOW_HEIGHT - (300 + BOTTOM_NAVIGATION_HEIGHT),
}

const ELEMENT: ViewStyle = {
  marginBottom: spacing[4],
  width: '100%',
}

const LABEL: ViewStyle = {
  marginBottom: spacing[2],
  alignSelf: 'flex-start',
}

enum DropdownType {
  SUCCESS_RAITING = 'SUCCESS_RAITING',
  RELIABILITY_PRECANTAGE = 'RELIABILITY_PRECANTAGE',
}

export const FilterHelpers = ({
  preset = 'primary',
  style: styleOverride,
  onFilterHelpersApply,
  ...rest
}: IFilterHelpersProps): JSX.Element => {
  const select = 'select'
  const dispatch = useDispatch()

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )
  const dropdownStyle = mergeAll(
    flatten([dropdownPresets[preset] || dropdownPresets.primary]),
  )

  const successRaitingR: number | null = useSelector(consumer.successRaiting)
  const reliabilityPercentageR: number | null = useSelector(
    consumer.reliabilityPercentage,
  )
  const maxHourlyRateR: number | null = useSelector(consumer.maxHourlyRate)
  const minJobsHeldR: number | null = useSelector(consumer.minJobsHeld)

  //const [isBestValue, setIsBestValue] = useState<boolean>(false)
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
    setSuccessRaiting(successRaitingR)
    setReliabilityPercentage(reliabilityPercentageR)
    setMaxHourlyRate(maxHourlyRateR)
    setMinAmountJobsHeld(minJobsHeldR)
  }, [successRaitingR, reliabilityPercentageR, maxHourlyRateR, minJobsHeldR])
  const clearAll = useCallback(() => {
    setSuccessRaiting(null)
    setReliabilityPercentage(null)
    setMaxHourlyRate(null)
    setMinAmountJobsHeld(null)
    dispatch(
      setFilter({
        jobType: null,
        successRaiting: null,
        reliabilityPercentage: null,
        maxHourlyRate: null,
        minJobsHeld: null,
      }),
    )
  }, [dispatch])

  const onApplyPress = useCallback(() => {
    dispatch(
      setFilter({
        successRaiting,
        reliabilityPercentage,
        maxHourlyRate,
        minJobsHeld,
      }),
    )
    rest.onClosePress()
  }, [
    dispatch,
    successRaiting,
    reliabilityPercentage,
    maxHourlyRate,
    minJobsHeld,
  ])

  const renderDropdownItems = (type: DropdownType): JSX.Element[] => {
    const arr: number[] =
      type === DropdownType.SUCCESS_RAITING
        ? [1, 2, 3, 4, 5]
        : [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    return arr.map(
      (item: number): JSX.Element => (
        <TouchableOpacity
          style={MARGIN_BOTTOM_SP4}
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
        {/*
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.sortBy' preset='header4slim' />
          </View>
          <Toggle
            value={isBestValue}
            onToggle={() => setIsBestValue(!isBestValue)}
          />
        </View>
        */}
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.rating' preset='header4slim' />
          </View>
          <Dropdown
            isItemsContainerRelative
            placeholder={
              successRaiting
                ? `${successRaiting} star${successRaiting > 1 ? 's' : ''}`
                : translate(`filterHelpers.${select}`)
            }
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
            onPriceChange={(newRate) => setMaxHourlyRate(newRate)}
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
            onChangeText={(text) => setMinAmountJobsHeld(parseFloat(text))}
          />
        </View>
        <View style={ELEMENT}>
          <View style={LABEL}>
            <Text tx='filterHelpers.percentage' preset='header4slim' />
          </View>
          <Dropdown
            styleDropdown={dropdownStyle}
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

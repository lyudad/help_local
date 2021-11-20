/* eslint-disable */
import React, { memo } from 'react'
import { View } from 'react-native'
import dayjs from 'dayjs'

import { Text, ViewTimeLogs } from 'components'
import { color } from 'theme'
import {
  MARGIN_TOP_SP2,
  MARGIN_VERTICAL_SP1,
  PADDING_VERTICAL_SP2,
  PADDING_VERTICAL_SP3,
  ROW_SPACE_BETWEEN,
} from 'constants/common-styles'
import { translate } from 'i18n'
import { getTTTFromTrackerInfoArr } from 'utils/logged-time'
import { IJobTotalPriceInfoProps } from './job-total-price-info.props'

export const JobTotalPriceInfo = memo(
  (props: IJobTotalPriceInfoProps): JSX.Element => {
    const {
      style,
      trackerInfo,
      loadingTrackerInfo,
      isHourly,
      title,
      completedAt,
      rate,
      isTotalGreen,
      withoutTimelog,
      calculatedTaxIncluded,
      calculatedTotal,
      calculatedHoursLogged,
      calculatedRate,
      calculatedFee,
      customActionOnViewTimeLogsPress,
      hourRate,
    } = props

    let taxIncluded = 0
    let loggedHours = 0
    let total = 0
    if (isHourly && rate) {
      const TTT = getTTTFromTrackerInfoArr(trackerInfo)
      loggedHours = TTT.hours + TTT.days * 24
      taxIncluded = Math.round((loggedHours * rate) / 100) * 4
      total = loggedHours * rate
    } else {
      taxIncluded = Math.round(rate / 100) * 4
      total = rate
    }
    total += taxIncluded

    let newCalculatedFee: number = null
    if (calculatedFee) {
      newCalculatedFee = parseFloat(calculatedFee.toFixed(2))
    }
    console.log(calculatedFee)
    let newCalculatedTaxIncluded: number = null
    if (calculatedTaxIncluded) {
      newCalculatedTaxIncluded = parseFloat(calculatedTaxIncluded.toFixed(2))
    }
    let newCalculatedTotal: number = null
    if (calculatedTotal) {
      newCalculatedTotal = parseFloat(calculatedTotal.toFixed(2))
    }
    let newCalculatedHoursLogged: number = null
    if (calculatedHoursLogged) {
      newCalculatedHoursLogged = parseInt(calculatedHoursLogged.toFixed())
    }
    let newCalculatedRate: string = null
    if (calculatedRate) {
      newCalculatedRate = hourRate.toFixed(2)
      if (!newCalculatedRate.toString().includes('.')) {
        newCalculatedRate = newCalculatedRate + '.00'
      }
    }

    return (
      <View {...{ style }}>
        <Text text={title} preset='header4bold' style={PADDING_VERTICAL_SP2} />
        <Text>
          <Text tx='jobTotalPriceInfo.completedOn' />
          <Text text=' ' />
          <Text text={dayjs(completedAt).format('MM/DD/YY')} preset='header4' />
        </Text>
        {isHourly && !withoutTimelog ? (
          <ViewTimeLogs
            {...{
              trackerInfo,
              loadingTrackerInfo,
              ...(customActionOnViewTimeLogsPress && {
                customActionOnViewTimeLogsPress,
              }),
            }}
            style={PADDING_VERTICAL_SP3}
          />
        ) : (
          <View style={PADDING_VERTICAL_SP3} />
        )}
        {(rate || newCalculatedRate) && (
          <View style={[ROW_SPACE_BETWEEN, MARGIN_VERTICAL_SP1]}>
            <Text
              preset='subtitle'
              tx={`jobTotalPriceInfo.${isHourly ? 'hourlyRate' : 'fixedRate'}`}
            />
            <Text preset='subtitle' text={`$${newCalculatedRate || rate}`} />
          </View>
        )}
        {isHourly && (
          <View style={[ROW_SPACE_BETWEEN, MARGIN_VERTICAL_SP1]}>
            <Text preset='subtitle' tx='jobTotalPriceInfo.hoursLogged' />
            <Text
              preset='subtitle'
              text={`${newCalculatedHoursLogged || loggedHours} ${translate(
                'common.hours',
              )}`}
            />
          </View>
        )}
        <View style={[ROW_SPACE_BETWEEN, MARGIN_VERTICAL_SP1]}>
          <Text preset='subtitle' tx='jobTotalPriceInfo.fee' />
          <Text preset='subtitle' text={`$${newCalculatedFee}`} />
        </View>
        <View style={[ROW_SPACE_BETWEEN, MARGIN_VERTICAL_SP1]}>
          <Text preset='subtitle' tx='jobTotalPriceInfo.taxIncluded' />
          <Text
            preset='subtitle'
            text={`$${newCalculatedTaxIncluded || taxIncluded}`}
          />
        </View>
        <View style={[ROW_SPACE_BETWEEN, MARGIN_TOP_SP2]}>
          <Text
            preset='header3'
            tx='jobTotalPriceInfo.total'
            {...(isTotalGreen && { color: color.primary })}
          />
          <Text
            preset='subtitle'
            text={`$${newCalculatedTotal || total}`}
            {...(isTotalGreen && { color: color.primary })}
          />
        </View>
      </View>
    )
  },
)

import React from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { Text } from 'components'
import { spacing } from 'theme'
import dayjs from 'dayjs'
import { IFixedOrHourly } from 'interfaces'

interface Props {
  category: string
  meetingType: 'person' | 'virtual'
  address?: string
  startAt?: Date | undefined
  endAt?: Date | undefined
  payType: IFixedOrHourly
  fixedPrice?: number
  minPrice?: number
  maxPrice?: number
  description: string
}

const VIEW: ViewStyle = {
  marginVertical: spacing[4],
}

const TITLE: ViewStyle = {
  marginBottom: spacing[2],
  alignItems: 'flex-start',
}

const ITEM_VIEW: ViewStyle = {
  marginVertical: spacing[1] + 2,
  alignItems: 'flex-start',
}

const DESC: TextStyle = {
  textAlign: 'left',
}

export const JobDetails = (props: Props): JSX.Element => {
  const {
    category,
    meetingType,
    payType,
    fixedPrice = 0,
    minPrice = 0,
    maxPrice = 0,
    description,
    address = '',
    startAt,
    endAt,
  } = props

  return (
    <View style={VIEW}>
      <View style={TITLE}>
        <Text tx='jobDetailScreen.jobDetails' preset='header4bold' />
      </View>

      <View style={ITEM_VIEW}>
        <Text tx='jobDetailScreen.category' preset='subtitle' />
        <Text text={category} preset='subtitleBold' />
      </View>
      <View style={ITEM_VIEW}>
        <Text tx='jobDetailScreen.personOrVirtual' preset='subtitle' />
        <Text
          tx={`jobDetailScreen.${
            meetingType === 'person' ? 'inPerson' : 'virtual'
          }`}
          preset='subtitleBold'
        />
      </View>
      {address !== '' && (
        <View style={ITEM_VIEW}>
          <Text tx='jobDetailScreen.address' preset='subtitle' />
          <Text text={address} preset='subtitleBold' />
        </View>
      )}
      {startAt && endAt && (
        <>
          <View style={ITEM_VIEW}>
            <Text tx='jobDetailScreen.date' preset='subtitle' />
            <Text
              text={dayjs(startAt).format('MMMM DD, YYYY')}
              preset='subtitleBold'
            />
          </View>
          <View style={ITEM_VIEW}>
            <Text tx='jobDetailScreen.time' preset='subtitle' />
            <Text
              text={`${dayjs(startAt).format('h:mm A')} - ${dayjs(endAt).format(
                'h:mm A',
              )}`}
              preset='subtitleBold'
            />
          </View>
        </>
      )}
      <View style={ITEM_VIEW}>
        <Text tx='jobDetailScreen.howWouldYouPay' preset='subtitle' />
        <Text
          text={payType.charAt(0).toUpperCase() + payType.slice(1)}
          preset='subtitleBold'
        />
      </View>
      <View style={ITEM_VIEW}>
        <Text
          tx={`jobDetailScreen.${fixedPrice ? 'fixedPrice' : 'priceRange'}`}
          preset='subtitle'
        />
        <Text>
          <Text text={`$${fixedPrice || minPrice}`} preset='subtitleBold' />
          {maxPrice && (
            <>
              <Text text='-' preset='subtitleBold' />
              <Text text={`$${maxPrice}`} preset='subtitleBold' />
            </>
          )}
        </Text>
      </View>
      <View style={ITEM_VIEW}>
        <Text>
          <Text style={DESC} tx='jobDetailScreen.desc' preset='subtitleBold' />
          <Text style={DESC} text=': ' preset='subtitleBold' />
          <Text style={DESC} text={description} preset='subtitle' />
        </Text>
      </View>
    </View>
  )
}

JobDetails.defaultProps = {
  fixedPrice: 0,
  minPrice: 0,
  maxPrice: 0,
  address: '',
  startAt: undefined,
  endAt: undefined,
}

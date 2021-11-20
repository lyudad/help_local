/* eslint-disable */
import React, { useState, useCallback } from 'react'
import { View, ViewStyle, TextStyle, TouchableOpacity } from 'react-native'
import dayjs from 'dayjs'
import { useNavigation } from '@react-navigation/native'

import { Text, ViewWithShadow, SVGIcon, Button, Hr } from 'components'
import { color, spacing } from 'theme'
import { jobListingFull, jobBid } from 'constants/routes'
import { JobPostCardProps } from './job-post-card.props'
import { AdditionalHeaderTypes } from 'interfaces'
import { translate } from 'i18n'
import { InlineTitleThenTextAndInlineReadMore } from '../Inline-title-then-text-and-inline-read-more'
import { useBeforeRemove } from 'hooks'
import { TouchableOpacity as TouchableOpacity2 } from 'react-native-gesture-handler'

const HEADER_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.lightGreen,
  justifyContent: 'center',
  alignItems: 'center',
}

const HEADER_GOLD: ViewStyle = {
  backgroundColor: color.palette.gold,
}

const SECTION_CONTAINER: ViewStyle = {
  paddingHorizontal: spacing[5],
  marginBottom: spacing[4],
  alignItems: 'flex-start',
}

const SPACE_BETWEEN: ViewStyle = {
  justifyContent: 'space-between',
}
const TITLE_CONTAINER: ViewStyle = {
  ...SPACE_BETWEEN,
  width: '100%',
  marginTop: spacing[3],
  flexDirection: 'row',
  zIndex: 2,
}
const TEXT_TITLE_CONTAINER: ViewStyle & TextStyle = {
  width: '70%',
  alignItems: 'flex-start',
  textAlign: 'left',
  textTransform: 'capitalize',
}
const DATE_COTNAINER: ViewStyle = {
  marginTop: spacing[3],
}
const TEXT_LEFT: TextStyle = {
  textAlign: 'left',
}
const TEXT_CENTER: TextStyle = {
  textAlign: 'center',
  width: '100%',
}
const PRICE_COTNAINER: ViewStyle & TextStyle = {
  width: '100%',
  marginVertical: spacing[3],
  ...TEXT_LEFT,
}
const AUTHOR_CONTAINER: ViewStyle = {
  ...SPACE_BETWEEN,
  width: '100%',
  marginTop: spacing[4],
  flexDirection: 'row',
  alignItems: 'center',
}
const ROW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
}
const TEXT_REVIEWS: TextStyle = {
  paddingLeft: spacing[3],
  paddingTop: 4,
}
const BUTTONS_CONTAINER: ViewStyle = {
  ...SPACE_BETWEEN,
  height: 72,
  paddingHorizontal: spacing[4],
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: color.palette.milky,
}
const BTN1: ViewStyle = {
  height: 36,
  width: '47%',
  alignSelf: 'center',
  paddingVertical: 0,
  paddingHorizontal: 0,
}
const BTN2: ViewStyle = {
  ...BTN1,
  marginLeft: spacing[4],
}

const BOLD_TEXT: TextStyle = {
  fontWeight: 'bold',
}

const BTN_FULL_WIDTH: ViewStyle = {
  width: '90%',
}

const DOTS: ViewStyle = {
  paddingLeft: 15,
  paddingBottom: 1,
  paddingRight: 0,
}

const DROPDOWN_CONTAINER: ViewStyle = {
  width: 177,
  height: 65,
  borderRadius: 4,
  position: 'absolute',
  zIndex: 0,
  right: 0,
  top: spacing[5],
}
const DROPDOWN_WRAPPER: ViewStyle = {
  height: '100%',
  alignSelf: 'center',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}
const TEXT_DROPDOWN: ViewStyle = {
  width: '70%',
}

const TEXT_CAPITALIZE: TextStyle = {
  textTransform: 'capitalize',
}

export const JobPostCard = ({
  style,
  id,
  additionalHeader,
  header,
  title,
  date,
  address,
  fixPrice,
  minPrice,
  maxPrice,
  description,
  isReadMoreForDescription,
  firstName,
  lastName,
  stars = 0,
  reviewsNumber = 0,
  isFull = false,
  isBid = false,
  isValidForNavigateFullList = true,
  helperId2SendMsg,
  sendAction = () => {},
  withoutDots,
  customFooter,
  isHourly,
  alreadySentBidId,
  isBidSentMiniBtn,
  onBlockPress,
  isCompleted,
}: //isRemoved,
JobPostCardProps): JSX.Element => {
  const navigation = useNavigation()
  const [isOpen, toggleDropdown] = useState<boolean>(false)

  const formatDate = dayjs(date).format('MM/DD/YY')

  const price = (): string => {
    if (fixPrice) {
      return '$' + fixPrice + (isHourly ? '/' + translate('common.hr') : '')
    }
    return `$${minPrice}/hr. - $${maxPrice}/hr.`
  }

  const author = (): string => {
    return `${
      firstName.charAt(0).toUpperCase() + firstName.slice(1)
    } ${lastName[0].toUpperCase()}.`
  }

  const navigateToJobListingFull = useCallback(() => {
    useBeforeRemove({
      isValid: isValidForNavigateFullList,
      navigate: () =>
        navigation.navigate(jobListingFull, {
          id,
        }),
    })
  }, [navigation])

  let firstBtnText: string = 'btnBid'
  if (alreadySentBidId) {
    if (isBidSentMiniBtn) firstBtnText = 'bidSent'
    else firstBtnText = 'viewMyBid'
  }

  return (
    <ViewWithShadow style={style}>
      {header && (
        <View style={HEADER_CONTAINER}>
          <Text>
            <Text tx='jobsPostCard.title' />
            <Text style={TEXT_CAPITALIZE} preset='bold' text={` ${header}`} />
          </Text>
        </View>
      )}
      {additionalHeader && (
        <View
          style={[
            HEADER_CONTAINER,
            additionalHeader === AdditionalHeaderTypes.PREVIOUS_BID &&
              HEADER_GOLD,
          ]}
        >
          <Text>
            <Text text='This is a ' />
            <Text preset='bold' text='previous bid' />
            <Text text=' and can not be edited.' />
          </Text>
        </View>
      )}
      <View style={SECTION_CONTAINER}>
        <View style={TITLE_CONTAINER}>
          <Text
            style={[TEXT_TITLE_CONTAINER, isBid && TEXT_CENTER]}
            preset='header3bold'
            text={title}
          />
          {helperId2SendMsg && (
            <View style={{}}>
              <TouchableOpacity onPress={sendAction}>
                <SVGIcon icon='sendMessage' color={color.palette.white} />
              </TouchableOpacity>
            </View>
          )}
          {!isBid && !withoutDots && (
            <TouchableOpacity
              onPress={() => toggleDropdown(!isOpen)}
              style={DOTS}
            >
              <SVGIcon
                icon='dots'
                color={isOpen ? color.primary : color.secondary}
              />
            </TouchableOpacity>
          )}
          {isOpen && (
            <ViewWithShadow style={DROPDOWN_CONTAINER}>
              <TouchableOpacity2
                style={DROPDOWN_WRAPPER}
                onPress={() => {
                  if (onBlockPress) onBlockPress(id)
                }}
              >
                <SVGIcon icon='exclamationSign' />
                <Text
                  preset='subtitle'
                  tx='jobsPostCard.dropdownText'
                  style={TEXT_DROPDOWN}
                />
              </TouchableOpacity2>
            </ViewWithShadow>
          )}
        </View>
        {date && (
          <Text style={DATE_COTNAINER}>
            <Text preset='subtitle' tx='jobsPostCard.postedOn' />
            <Text preset='subtitle' text={` ${formatDate}`} />
          </Text>
        )}
        {address && <Text preset='subtitleBold' text={address} />}
        <Text
          style={[PRICE_COTNAINER, isBid && TEXT_CENTER]}
          preset='bold'
          text={price()}
          color={color.primary}
        />
        <Hr />
      </View>
      <View style={SECTION_CONTAINER}>
        <InlineTitleThenTextAndInlineReadMore
          title={translate('jobsPostCard.jobDescription') + ': '}
          text={description}
          isAlwaysReadMoreMode={!isReadMoreForDescription}
        />
        {firstName && (
          <View style={AUTHOR_CONTAINER}>
            <Text text={author()} />
            <View style={ROW_CONTAINER}>
              {[1, 2, 3, 4, 5].map((star) => (
                <SVGIcon
                  icon='star'
                  key={star}
                  color={
                    star <= stars ? color.palette.gold : color.palette.lightGrey
                  }
                />
              ))}
              <Text style={TEXT_REVIEWS}>
                <Text preset='smallest' text={`${reviewsNumber} `} />
                <Text preset='smallest' tx='jobsPostCard.reviews' />
              </Text>
            </View>
          </View>
        )}
      </View>
      <View style={{ ...(!customFooter && { ...BUTTONS_CONTAINER }) }}>
        {customFooter ? (
          customFooter
        ) : (
          <>
            {!isBid && (
              <Button
                style={[BTN1, isFull && BTN_FULL_WIDTH]}
                preset={alreadySentBidId ? 'fourth' : 'secondary'}
                tx={`jobsPostCard.${firstBtnText}`}
                onPress={() =>
                  navigation.navigate(jobBid, {
                    id: alreadySentBidId || id,
                    isUpdate: alreadySentBidId ? true : false,
                  })
                }
              />
            )}
            {isCompleted && (
              <Text preset='bold' tx={'jobsPostCard.noJobExists'} />
            )}
            {!isFull && !isCompleted && (
              <Button
                style={[BTN2, isBid && BTN_FULL_WIDTH]}
                textStyle={BOLD_TEXT}
                preset='fifth'
                tx={isBid ? 'jobsPostCard.btnView2' : 'jobsPostCard.btnView1'}
                onPress={navigateToJobListingFull}
              />
            )}
          </>
        )}
      </View>
    </ViewWithShadow>
  )
}

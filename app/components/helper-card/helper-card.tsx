/* eslint-disable */
import React, { useState } from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { color, spacing } from 'theme'
import { Text, SVGIcon, Button, BaseCard, HelperHeaderCard } from 'components'
import { HelperCardProps } from './helper-card.props'
import { translate } from 'i18n'
import { useNavigation } from '@react-navigation/core'
import { helperProfile } from 'constants/routes'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Hr } from '../hr/hr'
import {
  ALIGIN_ITEMS_CENTER,
  MARGIN_LEFT_SP2,
  PADDING_HORIZONTAL_0,
  PADDING_HORIZONTAL_SP2,
  PADDING_HORIZONTAL_SP4,
  PADDING_TOP_0,
  PADDING_TOP_SP3,
  PADDING_VERTICAL_SP2,
  ROW,
  TEXT_ALIGN_LEFT,
} from 'constants/common-styles'
import { ViewWithShadow } from '../view-with-shadow/view-with-shadow'
import { useDispatch } from 'react-redux'
import { markUserAsInappropriate } from 'screens/both/thunk'
import { InlineTitleThenTextAndInlineReadMore } from '../Inline-title-then-text-and-inline-read-more'
import { removeHelperFromList } from 'screens/client/reducers'

const INFO_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: spacing[4],
}
const SUB_INFO_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-around',
  alignItems: 'center',
}

const NO_RATINGS_BOX: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const NO_RATINGS_BOX_SECOND_ITEM: ViewStyle = {
  alignItems: 'flex-start',
  marginLeft: spacing[4],
}

const PRIMARY_COLOR: TextStyle = {
  color: color.primary,
}

const RIGHT_LINE: ViewStyle = {
  borderColor: color.palette.lightGrey,
  borderRightWidth: 1,
}

const BUTTONS_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  width: '100%',
  justifyContent: 'space-between',
}

const BUTTON: ViewStyle = {
  width: '47%',
  paddingVertical: spacing[2],
  alignItems: 'center',
}

const BUTTON_TEXT: TextStyle = {
  fontSize: 13,
  fontWeight: '700',
  lineHeight: 19,
  textTransform: 'uppercase',
}

const HZ_CENTER: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
}

const DESC_INFO: TextStyle = {
  textAlign: 'left',
}

const SUB_MENU: ViewStyle = {
  alignSelf: 'flex-end',
}

const SUB_MENU_DOTS: ViewStyle = {
  paddingTop: 8,
  paddingBottom: 2,
  paddingLeft: 20,
  paddingRight: 13,
}

const SUB_MENU_ITEMS_CONTAINER: ViewStyle = {
  backgroundColor: color.palette.white,
  width: 177,
  position: 'absolute',
  top: 32,
  right: 15,
}

const BTN_FULL: ViewStyle = {
  width: '100%',
  backgroundColor: color.primary,
}

const BOTTOM_STYLE: ViewStyle = {
  paddingTop: 0,
}

const BTN_FULL_TEXT: TextStyle = {
  color: color.palette.white,
}

const DESC_TITLE: TextStyle = {
  fontSize: 13,
  fontWeight: 'bold',
}

const DESC: TextStyle = {
  fontSize: 13,
}

export const HelperCard = ({
  helper,
  showCategory,
  jobsPendingForTime,
  buttonsBlockVersion,
  onlyInviteBtn = false,
  isPreviouslyUsed = false,
  withSendMsgBtn = false,
  withBid = false,
  onFirstBtnPress,
  onSecondBtnPress,
  withoutHr,
  withoutMenu,
  isReadMoreBtnHidden = true,
  withBasedOnYourJobTitle,
  onAvatarPress,
  onHelperPress,
  afterProfileBlocked,
  ...rest
}: HelperCardProps): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false)

  const renderBottomBlock = (buttonsVersion: number): JSX.Element => {
    let firstButtonTx = 'viewProfile'
    let secondButtonTx = 'viewProfile'
    switch (buttonsVersion) {
      case 2: {
        firstButtonTx = 'inviteToJob'
        break
      }
      case 3: {
        firstButtonTx = 'inviteHelper'
        break
      }
      case 4: {
        secondButtonTx = 'inviteToJob'
        break
      }
      case 5: {
        firstButtonTx = 'selectHelper'
        break
      }
      default: {
        firstButtonTx = 'viewProfile'
        secondButtonTx = 'viewProfile'
      }
    }
    firstButtonTx = `helperCard.${firstButtonTx}`
    secondButtonTx = `helperCard.${secondButtonTx}`

    const { jobsHeld, reliabilityScore } = helper.userInfo
    const isHelptBest: boolean = helper.isHelptBest
    return (
      <>
        <View style={INFO_CONTAINER}>
          {isHelptBest || jobsHeld || reliabilityScore ? (
            <View style={SUB_INFO_CONTAINER}>
              {isHelptBest && (
                <View
                  style={{
                    ...HZ_CENTER,
                    ...((jobsHeld || reliabilityScore) && RIGHT_LINE),
                  }}
                >
                  <SVGIcon icon='order' color={color.primary} />
                  <Text
                    tx='helperCard.helptBest'
                    preset='subtitleBold'
                    style={PRIMARY_COLOR}
                  />
                </View>
              )}
              {jobsHeld > 0 && (
                <View
                  style={{
                    ...HZ_CENTER,
                    ...(reliabilityScore && [RIGHT_LINE]),
                  }}
                >
                  <Text text={jobsHeld.toString()} preset='subtitleBold' />
                  <Text
                    tx={`helperCard.job${jobsHeld > 1 ? 's' : ''}Held`}
                    preset='subtitle'
                  />
                </View>
              )}
              {reliabilityScore > 0 && (
                <View style={HZ_CENTER}>
                  <Text text={`${reliabilityScore}%`} preset='subtitleBold' />
                  <Text tx='helperCard.reliability' preset='subtitle' />
                </View>
              )}
            </View>
          ) : (
            <View style={NO_RATINGS_BOX}>
              <View>
                <SVGIcon icon='hi' color={color.secondary} />
              </View>
              <View style={NO_RATINGS_BOX_SECOND_ITEM}>
                <Text tx='helperCard.hiThere' preset='subtitleBold' />
                <Text tx='helperCard.noRatingsYet' preset='subtitle' />
              </View>
            </View>
          )}
        </View>
        <View style={BUTTONS_CONTAINER}>
          <Button
            {...(buttonsVersion === 1
              ? { text: '' }
              : {
                  tx: onlyInviteBtn ? 'helperCard.inviteToJob' : firstButtonTx,
                })}
            preset={buttonsVersion === 1 ? 'fourth' : 'secondary'}
            textStyle={[BUTTON_TEXT, onlyInviteBtn && BTN_FULL_TEXT]}
            style={[BUTTON, onlyInviteBtn && BTN_FULL]}
            {...(onFirstBtnPress && { onPress: () => onFirstBtnPress() })}
          >
            {buttonsVersion === 1 && (
              <SVGIcon icon='like' color={color.primary} />
            )}
          </Button>
          {!onlyInviteBtn && (
            <Button
              tx={secondButtonTx}
              preset='fifth'
              style={BUTTON}
              textStyle={BUTTON_TEXT}
              {...(onSecondBtnPress && { onPress: () => onSecondBtnPress() })}
            />
          )}
        </View>
      </>
    )
  }

  return (
    <BaseCard
      headerVariant={
        showCategory ? 'second' : jobsPendingForTime ? 'first' : null
      }
      headerBoldText={
        withBasedOnYourJobTitle
          ? helper.category.title
          : jobsPendingForTime
          ? jobsPendingForTime.toString() +
            ' ' +
            translate('helperCard.jobsPending')
          : showCategory
          ? helper?.category?.title
          : ''
      }
      headerSlimText={
        withBasedOnYourJobTitle
          ? translate('helperProfile.basedOnUrJob')
          : jobsPendingForTime
          ? translate('helperProfile.basedOnUrJob')
          : showCategory
          ? translate('helperCard.helpsIn')
          : ''
      }
      bottom={renderBottomBlock(buttonsBlockVersion)}
      {...{
        wrapperStyle: !withoutMenu
          ? { ...PADDING_TOP_0, ...PADDING_HORIZONTAL_0 }
          : {},
      }}
      bottomStyle={BOTTOM_STYLE}
    >
      <View
        style={{
          ...SUB_MENU,
          ...(withoutMenu && PADDING_TOP_SP3),
          zIndex: 1,
        }}
      >
        {!withoutMenu && (
          <TouchableOpacity
            onPress={() => setIsSubMenuOpen(!isSubMenuOpen)}
            style={SUB_MENU_DOTS}
          >
            <SVGIcon icon='dots' color={color.secondary} />
          </TouchableOpacity>
        )}
        {isSubMenuOpen && (
          <ViewWithShadow style={SUB_MENU_ITEMS_CONTAINER}>
            <TouchableOpacity
              onPress={() => {
                setIsSubMenuOpen(!isSubMenuOpen)
                dispatch(
                  markUserAsInappropriate({ targetId: helper.userInfo.id }),
                )
                dispatch(
                  removeHelperFromList({
                    id: helper.userInfo.id,
                    removeFromPrevUsedList: isPreviouslyUsed,
                  }),
                )
              }}
              style={[
                ROW,
                PADDING_HORIZONTAL_SP2,
                PADDING_VERTICAL_SP2,
                ALIGIN_ITEMS_CENTER,
              ]}
            >
              <SVGIcon icon='exclamationSign' color={color.secondary} />
              <Text
                tx='helperCard.submenuFirstItem'
                preset='subtitleBolder'
                style={[TEXT_ALIGN_LEFT, MARGIN_LEFT_SP2]}
              />
            </TouchableOpacity>
            <Hr />
            <TouchableOpacity
              onPress={() => {
                setIsSubMenuOpen(!isSubMenuOpen)
                dispatch(
                  markUserAsInappropriate({
                    targetId: helper.userInfo.id,
                    onlyBlock: true,
                  }),
                )
                dispatch(
                  removeHelperFromList({
                    id: helper.userInfo.id,
                    removeFromPrevUsedList: isPreviouslyUsed,
                  }),
                )
                if (afterProfileBlocked) afterProfileBlocked()
              }}
              style={[
                ROW,
                PADDING_HORIZONTAL_SP2,
                PADDING_VERTICAL_SP2,
                ALIGIN_ITEMS_CENTER,
              ]}
            >
              <SVGIcon icon='report' color={color.secondary} />
              <Text
                tx='helperCard.submenuSecondItem'
                preset='subtitleBolder'
                style={[TEXT_ALIGN_LEFT, MARGIN_LEFT_SP2]}
              />
            </TouchableOpacity>
          </ViewWithShadow>
        )}
      </View>
      <View style={{ ...(!withoutMenu && PADDING_HORIZONTAL_SP4) }}>
        <HelperHeaderCard
          id={helper.userInfo.id}
          avatar={helper.avatar}
          firstName={helper.userInfo?.firstName}
          lastName={helper.userInfo?.lastName}
          stars={helper.userInfo.avgRating ? helper.userInfo.avgRating : 0}
          reviews={
            helper.userInfo.feedbackCount ? helper.userInfo.feedbackCount : 0
          }
          rate={helper.price}
          withSendMsgBtn={withSendMsgBtn}
          withoutHr={withoutHr}
          isPreviouslyUsed={isPreviouslyUsed || helper.previouslyUsed}
          {...{
            withBid,
          }}
          onHelperPress={() => {
            if (onHelperPress) onHelperPress()
            else navigation.navigate(helperProfile, { id: helper.id })
          }}
          onAvatarPress={onAvatarPress}
          {...rest}
        />
        <Text style={DESC_INFO}>
          <InlineTitleThenTextAndInlineReadMore
            isReadMoreBtnHidden={isReadMoreBtnHidden}
            isAlwaysReadMoreMode={false}
            titleStyle={DESC_TITLE}
            textStyle={DESC}
            title={translate('helperCard.iHelptBecause')}
            text={helper.description}
          />
        </Text>
        {helper.address && (
          <>
            <Text text=' ' />
            <Text style={DESC_INFO}>
              <Text
                style={TEXT_ALIGN_LEFT}
                tx='helperCard.livesIn'
                preset='subtitle'
              />
              <Text text=' ' />
              <Text
                style={TEXT_ALIGN_LEFT}
                text={helper.address.city}
                preset='subtitleBolder'
              />
            </Text>
          </>
        )}
      </View>
    </BaseCard>
  )
}

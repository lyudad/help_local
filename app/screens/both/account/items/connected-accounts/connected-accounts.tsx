import { user } from 'app/store/selectors'
import { SVGIcon, Text, ViewWithShadow } from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  HZ_PADDING_5_PERCENT,
  JUSTIFY_CONTENT_CENTER,
  MARGIN_BOTTOM_SP4,
  MARGIN_HORIZONTAL_SP3,
  MARGIN_TOP_SP5,
  ROW,
} from 'constants/common-styles'
import { translate } from 'i18n'
import { ILinkedSocialAccountInfo } from 'interfaces'
import React from 'react'
import { View, ViewStyle } from 'react-native'
import { useSelector } from 'react-redux'

const CARD: ViewStyle = {
  padding: '5%',
}

export const ConnectedAccounts = (): JSX.Element => {
  const GOOGLE = 'google'
  const linkedSocialAccount: ILinkedSocialAccountInfo = useSelector(
    user.linkedSocialAccount,
  )
  const social: string =
    linkedSocialAccount.type.charAt(0).toUpperCase() +
    linkedSocialAccount.type.slice(1)

  return (
    <View style={HZ_PADDING_5_PERCENT}>
      <Text preset='bold' tx='connecctedAccounts.title' />
      <ViewWithShadow style={{ ...CARD, ...MARGIN_TOP_SP5 }}>
        <View
          style={[
            ROW,
            JUSTIFY_CONTENT_CENTER,
            ALIGIN_ITEMS_CENTER,
            MARGIN_BOTTOM_SP4,
          ]}
        >
          <View style={MARGIN_HORIZONTAL_SP3}>
            <SVGIcon
              icon={linkedSocialAccount.type === GOOGLE ? 'google' : 'fb'}
              width={linkedSocialAccount.type === GOOGLE ? 21 : 10}
              height={linkedSocialAccount.type === GOOGLE ? 24 : 23}
            />
          </View>
          <Text
            text={translate(
              `connecctedAccounts.connectedTo${social}`,
            ).toUpperCase()}
            preset='subtitleBold'
          />
        </View>
        <Text>
          <Text tx='connecctedAccounts.textBeforeEmail' />
          <Text text={linkedSocialAccount.email} preset='bold' />
          <Text tx='connecctedAccounts.textAfterEmail' />
        </Text>
      </ViewWithShadow>
    </View>
  )
}

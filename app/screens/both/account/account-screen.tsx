import React, { useState, useCallback } from 'react'
import { View, ViewStyle } from 'react-native'

import { color, spacing } from 'theme'
import {
  Screen,
  Text,
  Dropdown,
  Header,
  BottomNavigation,
  Loader,
} from 'components'
import { translate } from 'i18n'
import {
  HZ_PADDING_5_PERCENT,
  MARGIN_VERTICAL_SP1,
} from 'constants/common-styles'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { UserStackRouteProps } from 'navigation'

import { useDispatch, useSelector } from 'react-redux'
import { user } from 'app/store/selectors'
import { ILinkedSocialAccountInfo } from 'interfaces'
import {
  Profile,
  ResetPassword,
  Notifications,
  Payment,
  ConnectedAccounts,
} from './items'
import { getLikedSocialAccountInfo } from '../thunk'

const FULL: ViewStyle = {
  flex: 1,
}

const WRAPPER: ViewStyle = {
  // paddingBottom: spacing[5] + 2,
  flex: 1,
}

const TITLE_VIEW: ViewStyle = {
  marginTop: spacing[7] - 10,
  marginBottom: spacing[4] + 2,
}

const DROPDOWN_CONTAINER: ViewStyle = {
  marginBottom: spacing[4],
}

const profile = 'profile'
const resetPassword = 'resetPassword'
const notifications = 'notifications'
const payment = 'payment'
const connectedAccounts = 'connectedAccounts'

interface IAccountScreens {
  name: string
  link: string
}

export const AccountScreen = (): JSX.Element => {
  const route = useRoute<UserStackRouteProps<'account'>>()
  const dispatch = useDispatch()
  const linkedSocialAccount: ILinkedSocialAccountInfo = useSelector(
    user.linkedSocialAccount,
  )
  const isGetLikedSocialAccountInfoLoading: boolean = useSelector(
    user.isGetLikedSocialAccountInfoLoading,
  )

  useFocusEffect(
    useCallback(() => {
      if (!linkedSocialAccount) {
        dispatch(getLikedSocialAccountInfo())
      }
    }, []),
  )

  const accountScreens: IAccountScreens[] = [
    { name: 'accountScreen.profile', link: profile },
    { name: 'accountScreen.resetPassword', link: resetPassword },
    { name: 'accountScreen.notifications', link: notifications },
    { name: 'accountScreen.payment', link: payment },
  ]
  if (linkedSocialAccount) {
    accountScreens.push({
      name: 'accountScreen.connectedAccounts',
      link: connectedAccounts,
    })
  }

  const [
    dropdownPlaceholder,
    setDropdownPlaceholder,
  ] = useState<IAccountScreens>(
    accountScreens[route.params?.itemIndex ? route.params.itemIndex : 0],
  )

  const renderModalList = (list: IAccountScreens[]): JSX.Element[] =>
    list.map(
      (item: IAccountScreens): JSX.Element => (
        <View
          style={MARGIN_VERTICAL_SP1}
          key={item.link}
          /* eslint-disable @typescript-eslint/ban-ts-comment */
          // @ts-ignore
          childKey={item.link}
          action={() => setDropdownPlaceholder(item)}
        >
          <Text tx={item.name} />
        </View>
      ),
    )

  return (
    <View style={FULL}>
      <Header />
      <Screen preset='fixed' backgroundColor={color.transparent}>
        <View style={WRAPPER}>
          <View style={[TITLE_VIEW, HZ_PADDING_5_PERCENT]}>
            <Text preset='header1' tx='accountScreen.account' />
          </View>
          {isGetLikedSocialAccountInfoLoading ? (
            <Loader preset='primayWithVerticalMarginSp3' />
          ) : (
            <>
              <View style={[DROPDOWN_CONTAINER, HZ_PADDING_5_PERCENT]}>
                <Dropdown
                  placeholder={translate(dropdownPlaceholder.name)}
                  isItemsContainerRelative
                >
                  {renderModalList(accountScreens)}
                </Dropdown>
              </View>
              {dropdownPlaceholder.link === profile && <Profile />}
              {dropdownPlaceholder.link === resetPassword && <ResetPassword />}
              {dropdownPlaceholder.link === notifications && <Notifications />}
              {dropdownPlaceholder.link === payment && <Payment />}
              {dropdownPlaceholder.link === connectedAccounts && (
                <ConnectedAccounts />
              )}
            </>
          )}
        </View>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Platform, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'
import PlaidLink, { LinkExit, LinkSuccess } from 'react-native-plaid-link-sdk'

import { getLinkTokenToAddBankAccount } from 'api/payment'
import { setError } from 'app/store/commonSlice'
import { user } from 'app/store/selectors'
import { Button, Loader, Text, ViewWithShadow } from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  FLEX_1,
  FLEX_10,
  FLEX_5,
  ROW,
  UPPERCASE,
} from 'constants/common-styles'
import { IInitedLinkToken } from 'interfaces'
import { color } from 'theme'
import { finishBankAccountLink } from 'screens/both/thunk'

const BTN: ViewStyle = {
  backgroundColor: color.primary,
  height: 45,
  justifyContent: 'center',
}

export const PlugBankAccount = ({
  onExitPlugPaymentMethod,
}: {
  onExitPlugPaymentMethod: () => void
}): JSX.Element => {
  const dispatch = useDispatch()
  const isFocused: boolean = useIsFocused()
  const [linkToken, setLinkToken] = useState('')
  const loadingFinishBankAccountLink: boolean = useSelector(
    user.loadingFinishBankAccountLink,
  )

  useEffect(() => {
    if (isFocused) {
      ;(async () => {
        try {
          const res: IInitedLinkToken = await getLinkTokenToAddBankAccount(
            Platform.OS,
          )
          setLinkToken(res.linkToken)
        } catch (error) {
          dispatch(setError(error))
          onExitPlugPaymentMethod()
        }
      })()
    } else {
      setLinkToken('')
    }
  }, [isFocused])

  return (
    <>
      {linkToken ? (
        <View style={[ROW, ALIGIN_ITEMS_CENTER]}>
          <View style={FLEX_5}>
            <TouchableOpacity
              onPress={() => onExitPlugPaymentMethod()}
              disabled={loadingFinishBankAccountLink}
            >
              <Text
                tx='common.cancel'
                preset='subtitleBold'
                color={
                  loadingFinishBankAccountLink
                    ? color.palette.lighterGreyPlus
                    : color.palette.greySlow
                }
                style={UPPERCASE}
              />
            </TouchableOpacity>
          </View>
          <View style={FLEX_1} />
          <View style={FLEX_10}>
            {loadingFinishBankAccountLink ? (
              <Button disabled preset='primaryLoading' />
            ) : (
              <>
                <PlaidLink
                  tokenConfig={{
                    token: linkToken,
                  }}
                  onSuccess={(success: LinkSuccess) => {
                    dispatch(
                      finishBankAccountLink({
                        plaidPublicToken: success.publicToken,
                        selectedAccountId: success.metadata.accounts[0].id,
                      }),
                    )
                  }}
                  onExit={(exit: LinkExit) => {
                    if (exit.error)
                      dispatch(setError(exit.error.displayMessage))
                  }}
                >
                  <ViewWithShadow style={BTN}>
                    <Text
                      tx='payment.chooseBank'
                      style={[UPPERCASE]}
                      color={color.palette.white}
                      preset='subtitleBold'
                    />
                  </ViewWithShadow>
                </PlaidLink>
              </>
            )}
          </View>
        </View>
      ) : (
        <Loader preset='primayWithVerticalMarginSp3' />
      )}
    </>
  )
}

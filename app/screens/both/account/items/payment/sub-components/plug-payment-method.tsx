/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {
  StripeProvider,
  useConfirmSetupIntent,
} from '@stripe/stripe-react-native'
import { useIsFocused } from '@react-navigation/core'

import { setupCreditCardViaStripe } from 'api/payment'
import { setError } from 'app/store/commonSlice'
import { user } from 'app/store/selectors'
import { Button, ButtonPresetNames, Text } from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  FLEX_1,
  FLEX_10,
  FLEX_5,
  ROW,
  UPPERCASE,
} from 'constants/common-styles'
import { STRIPE_PUBLISHABLE_KEY } from 'constants/config'
import { IBillingDetails, IClientSecret } from 'interfaces'
import { color } from 'theme'
import { getCreditCardData } from 'screens/both/thunk'
import { StripeCard } from './stripe-card'
import { PlugBankAccount } from './plug-bank-account'
import { PlugPaypal } from './plug-paypal'

export type TPaymentMethodsLabels = 'credit_card' | 'bank_account' | 'paypal'

const CREDIT_CARD = 'credit_card'
const BANK_ACCOUNT = 'bank_account'
const PAYPAL: string = 'paypal'

export const PlugPaymentMethod = ({
  method,
  onExitPlugPaymentMethod,
}: {
  method: TPaymentMethodsLabels
  onExitPlugPaymentMethod: () => void
}): JSX.Element => {
  const dispatch = useDispatch()
  const email: string = useSelector(user.email)
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true)
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false)
  const { confirmSetupIntent } = useConfirmSetupIntent()
  const loadingGetCreditCardData: boolean = useSelector(
    user.loadingGetCreditCardData,
  )
  const isFocused: boolean = useIsFocused()

  useEffect(() => {
    if (isFocused && !loadingGetCreditCardData) {
      setIsSaveLoading(false)
    }
  }, [loadingGetCreditCardData])

  const onSavePress = async () => {
    setIsSaveLoading(true)
    if (method === CREDIT_CARD) {
      // Gather the customer's billing information (e.g., email)
      const billingDetails: IBillingDetails = {
        email,
      }
      try {
        // Create a setup intent on the backend
        const getCS: IClientSecret = await setupCreditCardViaStripe()
        const { setupIntent, error } = await confirmSetupIntent(
          getCS.clientSecret,
          {
            type: 'Card',
            billingDetails,
          },
        )
        if (setupIntent) {
          dispatch(getCreditCardData())
        } else {
          dispatch(setError(error.localizedMessage))
          setIsSaveLoading(false)
        }
      } catch (error) {
        // my server error
        setIsSaveLoading(false)
        dispatch(setError(error))
      }
    }
  }

  let saveBtnPreset: ButtonPresetNames = 'primary'
  if (isSaveLoading) {
    saveBtnPreset = 'primaryLoading'
  }
  if (isSaveDisabled) {
    saveBtnPreset = 'primaryDisabled'
  }

  return (
    <View style={FLEX_1}>
      {method === CREDIT_CARD && (
        <>
          <StripeProvider {...{ publishableKey: STRIPE_PUBLISHABLE_KEY }}>
            <StripeCard
              toggleIsCardDataReady={(isCardDataReady) =>
                setIsSaveDisabled(!isCardDataReady)
              }
            />
          </StripeProvider>
          <View style={[ROW, ALIGIN_ITEMS_CENTER]}>
            <View style={FLEX_5}>
              <TouchableOpacity
                onPress={() => onExitPlugPaymentMethod()}
                disabled={isSaveLoading}
              >
                <Text
                  tx='common.cancel'
                  preset='subtitleBold'
                  color={
                    isSaveLoading
                      ? color.palette.lighterGreyPlus
                      : color.palette.greySlow
                  }
                  style={UPPERCASE}
                />
              </TouchableOpacity>
            </View>
            <View style={FLEX_1} />
            <Button
              disabled={isSaveDisabled}
              tx='common.save'
              style={FLEX_10}
              onPress={() => onSavePress()}
              preset={saveBtnPreset}
            />
          </View>
        </>
      )}
      {method === BANK_ACCOUNT && (
        <PlugBankAccount {...{ onExitPlugPaymentMethod }} />
      )}
      {method === PAYPAL && <PlugPaypal {...{ onExitPlugPaymentMethod }} />}
    </View>
  )
}

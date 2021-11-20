/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, ViewStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { user } from 'app/store/selectors'
import {
  Button,
  CommonInfoModal,
  SVGIcon,
  Text,
  ViewWithShadow,
} from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  JUSTIFY_CONTENT_CENTER,
  MARGIN_BOTTOM_SP6,
  MARGIN_TOP_SP3,
  MARGIN_TOP_SP5,
  ROW,
  ROW_SPACE_BETWEEN,
} from 'constants/common-styles'
import { translate } from 'i18n'
import { TPluggedPaymentMethodValueVariants } from 'interfaces'
import {
  removeBankAccount,
  removeCreditCard,
  removePaypal,
} from 'screens/both/thunk'

const VIEW: ViewStyle = {
  paddingHorizontal: '5%',
  paddingVertical: '5%',
}

export const ShowPluggedPaymentMethod = ({
  pluggedPaymentMethod,
}: {
  pluggedPaymentMethod: TPluggedPaymentMethodValueVariants
}): JSX.Element => {
  const dispatch = useDispatch()
  const loadingRemoveCreditCard: boolean = useSelector(
    user.loadingRemoveCreditCard,
  )
  const loadingRemoveBankAccount: boolean = useSelector(
    user.loadingRemoveBankAccount,
  )
  const isRemovePaypalLoading: boolean = useSelector(user.isRemovePaypalLoading)
  const [
    isRemoveMethodModalOpen,
    setIsRemoveMethodModalOpen,
  ] = useState<boolean>(false)

  const isLoading = (): boolean =>
    loadingRemoveBankAccount || loadingRemoveCreditCard || isRemovePaypalLoading
  const loading: boolean = isLoading()

  useEffect(() => {
    if (!isLoading()) {
      setIsRemoveMethodModalOpen(false)
    }
  }, [loadingRemoveCreditCard, loadingRemoveBankAccount, isRemovePaypalLoading])

  let isPluggedBankAccount = false
  let isPluggedPaypal = false
  if (Object.prototype.hasOwnProperty.call(pluggedPaymentMethod, 'bankName')) {
    isPluggedBankAccount = true
  }
  if (Object.prototype.hasOwnProperty.call(pluggedPaymentMethod, 'isPaypal')) {
    isPluggedPaypal = true
  }

  let cardTitle = 'conectedToYourCreditCard'
  if (isPluggedBankAccount) {
    cardTitle = 'conectedToYourBankAccount'
  }
  if (isPluggedPaypal) {
    cardTitle = 'conectedToPaypal'
  }
  let cardStars = '**** **** **** '
  if (isPluggedBankAccount) {
    cardStars = '**********'
  }
  let cardBtnText = 'removeCard'
  if (isPluggedBankAccount) {
    cardBtnText = 'removeAccount'
  }
  if (isPluggedPaypal) {
    cardBtnText = 'disconnect'
  }

  return (
    <>
      <ViewWithShadow style={VIEW}>
        <View style={[ROW, JUSTIFY_CONTENT_CENTER, ALIGIN_ITEMS_CENTER]}>
          {isPluggedPaypal && <SVGIcon icon='paypal' width={50} height={35} />}
          <Text
            text={translate(`payment.${cardTitle}`).toUpperCase()}
            preset='subtitleBold'
          />
        </View>
        <View
          style={[
            ROW_SPACE_BETWEEN,
            MARGIN_BOTTOM_SP6,
            MARGIN_TOP_SP5,
            isPluggedPaypal ? MARGIN_TOP_SP3 : [],
          ]}
        >
          {isPluggedPaypal ? (
            <Text tx='payment.youConnnectedWithPaypal' />
          ) : (
            // eslint-disable-next-line
            // @ts-ignore
            <Text text={`${cardStars}${pluggedPaymentMethod.last4}`} />
          )}
          {!isPluggedPaypal &&
            (isPluggedBankAccount ? (
              <SVGIcon icon='bank' />
            ) : (
              <SVGIcon icon='visa' width={36} height={26} />
            ))}
        </View>
        <Button
          tx={`payment.${cardBtnText}`}
          onPress={() => setIsRemoveMethodModalOpen(true)}
          preset='sixth'
        />
      </ViewWithShadow>
      <CommonInfoModal
        toggleModal={() => setIsRemoveMethodModalOpen(!isRemoveMethodModalOpen)}
        visible={isRemoveMethodModalOpen}
        icon='crossInPentagon'
        iconSize={40}
        title={translate('payment.areYouSure')}
        content={translate('payment.removeMethodWarning')}
        buttonText={translate('common.yes')}
        buttonPreset={loading ? 'primaryLoading' : 'primary'}
        isButtonDisabled={loading}
        onButtonPress={() => {
          if (isPluggedBankAccount) {
            dispatch(removeBankAccount())
          } else if (isPluggedPaypal) {
            dispatch(removePaypal())
          } else {
            dispatch(removeCreditCard())
          }
        }}
      />
    </>
  )
}

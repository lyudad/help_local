/* eslint-disable */
import React, { useCallback } from 'react'
import { View, ViewStyle } from 'react-native'

import { Button, ButtonPresetNames, Hr, Input, Loader, Text } from 'components'
import {
  ALIGIN_ITEMS_START,
  ALIGN_SELF_START,
  FLEX_1,
  MARGIN_BOTTOM_SP2,
  MARGIN_BOTTOM_SP3,
  MARGIN_TOP_SP5,
  MARGIN_TOP_SP6,
  MARGIN_VERTICAL_SP3,
  PADDING_VERTICAL_SP3,
  ROW,
} from 'constants/common-styles'
import { translate } from 'i18n'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPromoCodesBalance, usePromoCode } from 'screens/both/thunk'
import { user } from 'app/store/selectors'
import { useEffect } from 'react'
import { setSuccess } from 'app/store/commonSlice'
import {
  setLastUsedPromoCode,
  setLastUsedPromoCodeData,
} from 'screens/both/reducers'
import { getPromoCodeInfo } from 'screens/both/thunk'
import { IPromoCodeData } from 'interfaces'
import { useFocusEffect } from '@react-navigation/native'
import { color, spacing } from 'theme'

const PROMO_BTN: ViewStyle = {
  width: 130,
  height: 46,
  position: 'absolute',
  right: 0,
}

const HR: ViewStyle = {
  marginVertical: 43,
}

const PROMO_INFO_WRAPPER: ViewStyle = {
  flexDirection: 'row',
  padding: spacing[4],
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
  borderRadius: 4,
}

const PADDING_LEFT_SP4: ViewStyle = {
  paddingLeft: spacing[4],
}

const BORDER_RIGHT: ViewStyle = {
  borderRightColor: color.palette.lightGrey,
  borderRightWidth: 1,
}

const ADDITIONAL_PADDING_LEFT: ViewStyle = {
  paddingLeft: 32,
}

export const Promo = (): JSX.Element => {
  const dispatch = useDispatch()
  const lastUsedPromoCode: string | null = useSelector(user.lastUsedPromoCode)
  const lastUsedPromoCodeData: IPromoCodeData | null = useSelector(
    user.lastUsedPromoCodeData,
  )
  const isUsePromoCodeLoading: boolean | null = useSelector(
    user.isUsePromoCodeLoading,
  )
  const isGetPromoCodeInfoLoading: boolean | null = useSelector(
    user.isGetPromoCodeInfoLoading,
  )
  const availableBonuses: number = useSelector(user.availableBonuses)
  const isGetPromoCodesBalanceLoading: boolean = useSelector(
    user.isGetPromoCodesBalanceLoading,
  )

  const [promo, setPromo] = useState<string>('')
  let btnPreset: ButtonPresetNames = 'primary'
  if (!promo.length) btnPreset = 'primaryDisabled'
  if (isUsePromoCodeLoading) btnPreset = 'primaryLoading'

  const onSend = () => {
    dispatch(usePromoCode({ promoCode: promo }))
  }

  useEffect(() => {
    if (lastUsedPromoCode) {
      dispatch(setSuccess(translate('payment.promoUsed')))
      dispatch(getPromoCodeInfo({ promoCode: lastUsedPromoCode }))
      dispatch(setLastUsedPromoCode(null))
      setPromo('')
      dispatch(getPromoCodesBalance())
    }
  }, [lastUsedPromoCode])

  useFocusEffect(
    useCallback(() => {
      return () => dispatch(setLastUsedPromoCodeData(null))
    }, []),
  )

  useEffect(() => {
    dispatch(getPromoCodesBalance())
  }, [])

  const addZeroAndDollar = (value: number): string => {
    let text: string = `$${value}`
    if (!text.includes('.')) text = `${text}.00`
    return text
  }

  return (
    <View style={MARGIN_TOP_SP6}>
      <Text tx='payment.promoLabel' style={MARGIN_BOTTOM_SP3} />
      <View>
        <Input
          value={promo}
          onChangeText={(newText) => setPromo(newText)}
          placeholder='payment.promoCode'
        />
        <Button
          tx='payment.redeem'
          style={PROMO_BTN}
          disabled={!promo.length || isUsePromoCodeLoading}
          preset={btnPreset}
          onPress={onSend}
        />
      </View>
      <View style={MARGIN_TOP_SP5}>
        {isGetPromoCodeInfoLoading && <Loader />}
        {lastUsedPromoCodeData && (
          <>
            <View style={[ROW, MARGIN_BOTTOM_SP2]}>
              <View style={[FLEX_1, ALIGIN_ITEMS_START]}>
                <Text tx='payment.description' />
              </View>
              <View
                style={[FLEX_1, ALIGIN_ITEMS_START, ADDITIONAL_PADDING_LEFT]}
              >
                <Text tx='payment.value' style={[FLEX_1]} />
              </View>
            </View>
            <View style={PROMO_INFO_WRAPPER}>
              <View
                style={[
                  FLEX_1,
                  PADDING_VERTICAL_SP3,
                  BORDER_RIGHT,
                  ALIGIN_ITEMS_START,
                ]}
              >
                <Text tx='common.giftCardBalance' preset='header5bold' />
              </View>
              <View style={[FLEX_1, PADDING_VERTICAL_SP3, ALIGIN_ITEMS_START]}>
                <Text
                  text={`+${addZeroAndDollar(
                    lastUsedPromoCodeData.bonusesValue,
                  )}`}
                  style={[PADDING_LEFT_SP4]}
                />
              </View>
            </View>
          </>
        )}
      </View>
      {availableBonuses > 0 && (
        <View style={MARGIN_VERTICAL_SP3}>
          {isGetPromoCodesBalanceLoading ? (
            <Loader preset='primayWithVerticalMarginSp3' />
          ) : (
            <Text style={ALIGN_SELF_START}>
              <Text tx='common.giftCardBalance' preset='header5bold' />
              <Text text=' ' />
              <Text text={`${addZeroAndDollar(availableBonuses)}`} />
            </Text>
          )}
        </View>
      )}
      <Hr style={HR} />
    </View>
  )
}

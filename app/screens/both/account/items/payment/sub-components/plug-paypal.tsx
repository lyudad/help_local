/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/core'
import { WebView } from 'react-native-webview'
//import { WebView } from 'react-native-community'

import { getBraintreeToken } from 'api/payment'
import { setError } from 'app/store/commonSlice'
import { user } from 'app/store/selectors'
import { Button, Loader } from 'components'
import {
  FLEX_1,
  MARGIN_VERTICAL_SP3,
  PADDING_VERTICAL_SP2,
} from 'constants/common-styles'
import { IClientToken } from 'interfaces'
import { addBraintreePaymentMethod } from 'screens/both/thunk'
import { useRef } from 'react'
import { PLUG_PAYPAL_HTML_URL } from 'constants/config'

export const PlugPaypal = ({
  onExitPlugPaymentMethod,
}: {
  onExitPlugPaymentMethod: () => void
}): JSX.Element => {
  const isFocused: boolean = useIsFocused()
  const dispatch = useDispatch()

  const [token, setToken] = useState<string>('')
  const [isHtmlLoading, setIsHtmlLoading] = useState<boolean>(false)
  const webViewRef = useRef()
  const isAddBraintreePaymentMethodLoading = useSelector(
    user.isAddBraintreePaymentMethodLoading,
  )

  useEffect(() => {
    if (isFocused) {
      ;(async () => {
        try {
          const res: IClientToken = await getBraintreeToken()
          setToken(res.clientToken)
        } catch (error) {
          dispatch(setError(error))
          onExitPlugPaymentMethod()
        }
      })()
    } else {
      setToken('')
    }
  }, [isFocused])

  const onMessage = (e) => {
    const newData = JSON.parse(e.nativeEvent.data)
    dispatch(
      addBraintreePaymentMethod({
        deviceData: newData.deviceData.correlation_id,
        paymentMethodNonce: newData.nonce,
      }),
    )
  }

  const injectedToHtml = () => {
    let injectedData = `document.getElementById('for_token').value = '${token}';`
    return injectedData
  }

  return (
    <View style={FLEX_1}>
      {(token === '' ||
        isHtmlLoading ||
        isAddBraintreePaymentMethodLoading) && (
        <Loader preset='primayWithVerticalMarginSp3' />
      )}
      {token !== '' && !isAddBraintreePaymentMethodLoading && (
        <WebView
          scrollEnabled={true}
          ref={webViewRef}
          cacheEnabled={false}
          source={{ uri: PLUG_PAYPAL_HTML_URL }}
          injectedJavaScript={injectedToHtml()}
          onLoadStart={() => setIsHtmlLoading(true)}
          onLoadEnd={() => setIsHtmlLoading(false)}
          onMessage={onMessage}
          //userAgent='Mozilla/5.0 (Linux; Android 11) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.115 Mobile Safari/537.36'
        />
      )}
      {!isAddBraintreePaymentMethodLoading && (
        <Button
          style={[MARGIN_VERTICAL_SP3, PADDING_VERTICAL_SP2]}
          tx='common.cancel'
          preset='fifth'
          onPress={onExitPlugPaymentMethod}
        />
      )}
    </View>
  )
}

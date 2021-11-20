import React from 'react'
import { View, ViewStyle } from 'react-native'
import { CardField, CardFieldInput } from '@stripe/stripe-react-native'

import { color, spacing } from 'theme'

const CARD_FIELD: ViewStyle = {
  width: '100%',
  height: 50,
  marginVertical: spacing[6],
}

const CARD: CardFieldInput.Styles = {
  backgroundColor: color.palette.white,
  textColor: color.secondary,
}

export const StripeCard = ({
  toggleIsCardDataReady,
}: {
  toggleIsCardDataReady: (isReady: boolean) => void
}): JSX.Element => {
  return (
    <View>
      <CardField
        postalCodeEnabled={false}
        placeholder={{
          number: '---- ---- ---- ----',
        }}
        cardStyle={CARD}
        style={CARD_FIELD}
        onCardChange={(cardDetails) => {
          toggleIsCardDataReady(cardDetails.complete)
        }}
      />
    </View>
  )
}

import React from 'react'
import { ViewStyle } from 'react-native'
import { Hr } from 'components'
import { spacing } from 'theme'

const HR: ViewStyle = {
  marginVertical: spacing[6],
}

export const HrWithVerticalMargin = (): JSX.Element => {
  return <Hr style={HR} />
}

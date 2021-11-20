import React, { useState } from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'

import {
  Text,
  Screen,
  Header,
  BottomNavigation,
  WithHorizontalPaddings,
  Input,
  Button,
  ButtonPresetNames,
} from 'components'
import { color, spacing } from 'theme'
import { useDispatch, useSelector } from 'react-redux'
import { user } from 'app/store/selectors'

import { sendAccountDeactivationRequest } from '../thunk'

const FULL: ViewStyle = { flex: 1 }

const INPUT_WRAPPER: ViewStyle = {
  marginTop: spacing[5],
  marginBottom: spacing[7] - 8,
}

const TITLE: TextStyle = {
  fontSize: 30,
  lineHeight: 35,
  fontWeight: 'bold',
  marginTop: spacing[6],
  marginBottom: spacing[5],
}

const HELPER = 'helper'

export const DeactivationScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const currentRole = useSelector(user.currentRole)
  const loading = useSelector(user.isSendAccountDeactivationRequestLoading)
  const lastDeactivateAccountRequestId: number | null = useSelector(
    user.lastDeactivateAccountRequestId,
  )
  const [text, setText] = useState<string>('')

  const onSend = () => {
    dispatch(sendAccountDeactivationRequest({ description: text }))
  }

  let btnPreset: ButtonPresetNames = 'primary'
  if (!text.length) {
    btnPreset = 'primaryDisabled'
  }
  if (loading) {
    btnPreset = 'primaryLoading'
  }

  return (
    <View testID='PasswordResetScreen' style={FULL}>
      <Header clientBtn={currentRole !== HELPER} textBack='deactivation.back' />
      <Screen preset='scroll' backgroundColor={color.transparent}>
        <WithHorizontalPaddings>
          <Text tx='deactivation.title' style={TITLE} />
          {lastDeactivateAccountRequestId ? (
            <Text tx='deactivation.reviewing' />
          ) : (
            <>
              <Text tx='deactivation.desc' />
              <View style={INPUT_WRAPPER}>
                <Input
                  numberOfLines={7}
                  value={text}
                  onChangeText={(newText) => {
                    setText(newText)
                  }}
                  placeholder='deactivation.placeholder'
                  textAlignVertical='top'
                  multiline
                />
              </View>
              <Button
                preset={btnPreset}
                tx='deactivation.submit'
                onPress={onSend}
                disabled={!text.length || loading}
              />
            </>
          )}
        </WithHorizontalPaddings>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

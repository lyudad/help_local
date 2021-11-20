/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { View, ViewStyle, TextStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import {
  Text,
  Button,
  Checkbox,
  Hr,
  Loader,
  ScrollViewWithGradientStateUpdater,
} from 'components'
import { spacing, color } from 'theme'
import {
  getNotificationSettings,
  updateNotificationSettings,
} from 'screens/both/thunk'
import { user } from 'app/store/selectors'
import { INotificationSetting } from 'interfaces'
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { HZ_PADDING_5_PERCENT } from 'constants/common-styles'

const SCROLL_VIEW: ViewStyle = {
  height: '80%',
}
const TITLE_CONTAINER: ViewStyle = {
  alignItems: 'flex-start',
  marginTop: spacing[4],
}
const SETTING_CONTAINER: ViewStyle = {
  marginTop: spacing[6],
}
const CHECKBOXES_CONTAINER: ViewStyle = {
  marginTop: spacing[5],
  marginBottom: spacing[6],
}
const CHECKBOX_SECTION_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
}
const CHECKBOX: ViewStyle = {
  marginLeft: spacing[5],
}
const CHECKBOX_OUTLINE: ViewStyle = {
  backgroundColor: color.palette.white,
  borderColor: color.secondary,
  borderWidth: 1,
}
const CHECKBOX_FILL: ViewStyle = {
  backgroundColor: color.primary,
}
const TEXT_CONTAINER: ViewStyle = {
  paddingLeft: spacing[4],
}

const ROW_CONTAINER: ViewStyle = {
  flexDirection: 'row',
}
const BUTTONS_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: spacing[6],
}
const BTN_CONTAINER: ViewStyle = {
  width: '60%',
}

export const Notifications = (): JSX.Element => {
  const dispatch = useDispatch()
  const notificationSettings: INotificationSetting[] = useSelector(
    user.notificationSettings,
  )
  const loadingUpdateNtfSettings: boolean = useSelector(
    user.loadingUpdateNotificationSettings,
  )

  useFocusEffect(
    useCallback(() => {
      dispatch(getNotificationSettings())
    }, []),
  )

  const [
    localNotificationSettings,
    setLocalNotificationClientSettings,
  ] = useState<INotificationSetting[]>(notificationSettings)

  useEffect(() => setLocalNotificationClientSettings(notificationSettings), [
    notificationSettings,
  ])

  const renderSettings = (): JSX.Element[] => {
    interface ISortedNotificationSetting {
      title: string
      notifications: INotificationSetting[]
    }
    const clientSettings: INotificationSetting[] = []
    const helperSettings: INotificationSetting[] = []
    const HELPER = 'helper'
    for (let i = 0; i < localNotificationSettings.length; i++) {
      if (localNotificationSettings[i].type === HELPER)
        helperSettings.push(localNotificationSettings[i])
      else clientSettings.push(localNotificationSettings[i])
    }
    const settingsList: ISortedNotificationSetting[] = [
      {
        title: 'notificationSettings.checkboxTitle1',
        notifications: clientSettings,
      },
      {
        title: 'notificationSettings.checkboxTitle2',
        notifications: helperSettings,
      },
    ]
    return settingsList.map(
      (settingItem: ISortedNotificationSetting, index: number): JSX.Element => (
        <View style={SETTING_CONTAINER} key={settingItem.title}>
          <View style={CHECKBOX_SECTION_CONTAINER}>
            <Text preset='bold' tx={settingItem.title} />
            <View style={ROW_CONTAINER}>
              <Text preset='bold' tx='common.email' style={TEXT_CONTAINER} />
              <Text preset='bold' tx='common.push' style={TEXT_CONTAINER} />
            </View>
          </View>
          <View style={CHECKBOXES_CONTAINER}>
            {settingItem.notifications.map(
              (notification: INotificationSetting): JSX.Element => (
                <View
                  style={CHECKBOX_SECTION_CONTAINER}
                  key={notification.event}
                >
                  <Text text={notification.title} />
                  <View style={ROW_CONTAINER}>
                    <Checkbox
                      outlineStyle={CHECKBOX_OUTLINE}
                      style={CHECKBOX}
                      value={notification.email}
                      iconOnFill='checked'
                      fillStyle={CHECKBOX_FILL}
                      onToggle={() => {
                        setLocalNotificationClientSettings([
                          ...localNotificationSettings.map((ntf) =>
                            ntf.id === notification.id
                              ? {
                                  ...notification,
                                  email: !notification.email,
                                }
                              : ntf,
                          ),
                        ])
                      }}
                    />
                    <Checkbox
                      outlineStyle={CHECKBOX_OUTLINE}
                      style={CHECKBOX}
                      value={notification.push}
                      iconOnFill='checked'
                      fillStyle={CHECKBOX_FILL}
                      onToggle={() => {
                        setLocalNotificationClientSettings([
                          ...localNotificationSettings.map((ntf) =>
                            ntf.id === notification.id
                              ? {
                                  ...notification,
                                  push: !notification.push,
                                }
                              : ntf,
                          ),
                        ])
                      }}
                    />
                  </View>
                </View>
              ),
            )}
          </View>
          {index !== settingsList.length - 1 && <Hr />}
        </View>
      ),
    )
  }

  const BTN_TEXT: TextStyle = {
    color: loadingUpdateNtfSettings
      ? color.palette.middleGrey
      : color.palette.greySlow,
  }

  return (
    // @ts-ignore
    <ScrollViewWithGradientStateUpdater
      showsVerticalScrollIndicator={false}
      style={[SCROLL_VIEW, HZ_PADDING_5_PERCENT]}
    >
      <View style={TITLE_CONTAINER}>
        <Text preset='header3bold' tx='notificationSettings.title' />
      </View>
      {localNotificationSettings.length > 0 ? (
        <>
          <View>{renderSettings()}</View>
          {localNotificationSettings !== notificationSettings && (
            <View style={BUTTONS_CONTAINER}>
              <Button
                disabled={loadingUpdateNtfSettings}
                preset={loadingUpdateNtfSettings ? 'primaryLoading' : 'primary'}
                tx='notificationSettings.buttonUpdate'
                style={BTN_CONTAINER}
                onPress={() =>
                  dispatch(
                    updateNotificationSettings(localNotificationSettings),
                  )
                }
              />
              <Button
                disabled={loadingUpdateNtfSettings}
                preset='transparent'
                tx='common.cancel'
                textStyle={BTN_TEXT}
                onPress={() =>
                  setLocalNotificationClientSettings(notificationSettings)
                }
              />
            </View>
          )}
        </>
      ) : (
        <Loader preset='primayWithVerticalMarginSp3' />
      )}
    </ScrollViewWithGradientStateUpdater>
  )
}

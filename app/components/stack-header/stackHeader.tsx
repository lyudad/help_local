import React, { useCallback, useState } from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  ImageStyle,
  TouchableHighlight,
  ViewStyle,
} from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { translate } from 'i18n'
import { color, spacing } from 'theme'
import { resetAll as resetAllBoth } from 'screens/both/reducers'
import { resetAll as resetAllClient } from 'screens/client/reducers'
import { resetAll as resetAllHelper } from 'screens/helper/reducers'
import { resetAll as resetAllAuth } from 'screens/auth/reducers'
import { resetAll as resetAllCommon } from 'app/store/commonSlice'
import { Modal } from 'components'
import { useNavigation } from '@react-navigation/core'
import {
  account,
  clientDashboard,
  finalizeAccount,
  jobDetail,
  message,
  messagesList,
  notifications,
  postJob,
  setUpHelperProfile,
  helperDashboard,
} from 'constants/routes'
import { useDispatch, useSelector } from 'react-redux'
import { api } from 'app/services/api'
import { user } from 'app/store/selectors'
import { WithCornerItem } from '../with-corner-item/with-corner-item'
import { StackHeaderProps } from './stackHeader.props'
import {
  containerPreset,
  topPreset,
  leftTopPreset,
  rightTopPreset,
  rightTopItemPreset,
  avatarContainerPreset,
  avatarPreset,
  bottomPreset,
  bottomBackPreset,
} from './stackHeader.presets'
import { Text } from '../text/text'
import { DropdownInput } from '../dropdown-input/dropdownInput'
import { SVGIcon } from '../svg-icon'

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
const ICON_BACK: ImageStyle = {
  marginRight: spacing[3],
}

export function StackHeader(props: StackHeaderProps) {
  // grab the props
  const {
    preset = 'primary',
    placeholder,
    avatarSrc,
    // onPressAvatar,
    onLongPressAvatar,
    onPressBell,
    onSendPress,
  } = props

  const [isModalOpen, toggleModal] = useState<boolean>(false) // tmp modal
  const navigation = useNavigation() // tmp
  const dispatch = useDispatch() // tmp
  const TMP_STYLE: ViewStyle = {
    marginVertical: spacing[2],
  }

  const i18nText = placeholder && translate(placeholder)

  const containerStyle = mergeAll(
    flatten([containerPreset[preset] || containerPreset.primary]),
  )
  const topStyle = mergeAll(flatten([topPreset[preset] || topPreset.primary]))
  const leftTopStyle = mergeAll(
    flatten([leftTopPreset[preset] || leftTopPreset.primary]),
  )
  const rightTopStyle = mergeAll(
    flatten([rightTopPreset[preset] || rightTopPreset.primary]),
  )
  const rightTopItemStyle = mergeAll(
    flatten([rightTopItemPreset[preset] || rightTopItemPreset.primary]),
  )
  const avatarContainerStyle = mergeAll(
    flatten([avatarContainerPreset[preset] || avatarContainerPreset.primary]),
  )
  const avatarStyle = mergeAll(
    flatten([avatarPreset[preset] || avatarPreset.primary]),
  )

  const bottomStyle = mergeAll(
    flatten([bottomPreset[preset] || bottomPreset.primary]),
  )
  const bottomBackStyle = mergeAll(
    flatten([bottomBackPreset[preset] || bottomBackPreset.primary]),
  )

  const logoPath = require('assets/app-logo-small.png')
  const accsesToken = useSelector(user.accessToken)
  if (isModalOpen) console.log(accsesToken) // eslint-disable-line

  const navigateToClientDashboard = useCallback(
    () => navigation.navigate(clientDashboard),
    [],
  )
  const navigateToFinalizeAccount = useCallback(
    () => navigation.navigate(finalizeAccount),
    [],
  )
  const navigateToAccount = useCallback(() => navigation.navigate(account), [])
  const navigateToMessage = useCallback(() => navigation.navigate(message), [])
  const navigateToMessagesList = useCallback(
    () => navigation.navigate(messagesList),
    [],
  )
  const navigateToJobDetail = useCallback(
    () => navigation.navigate(jobDetail),
    [],
  )
  const navigateToNotifications = useCallback(
    () => navigation.navigate(notifications),
    [],
  )
  const navigateToSetUpHelperProfile = useCallback(
    () => navigation.navigate(setUpHelperProfile),
    [],
  )
  const navigateToPostJob = useCallback(() => navigation.navigate(postJob), [])
  const navigateToHelperDashboard = useCallback(
    () => navigation.navigate(helperDashboard),
    [],
  )

  const logOut = useCallback(() => {
    dispatch(resetAllAuth())
    dispatch(resetAllCommon())
    dispatch(resetAllClient())
    dispatch(resetAllHelper())
    dispatch(resetAllBoth())
  }, [dispatch])

  return (
    <>
      {isModalOpen && (
        <Modal
          animationType='fade'
          transparent
          visible
          toggleModal={() => toggleModal(!isModalOpen)}
        >
          <View style={TMP_STYLE}>
            <Text
              text='Temporary menu'
              preset='header3'
              color={color.primary}
            />
          </View>
          <TouchableOpacity
            onPress={navigateToClientDashboard}
            style={TMP_STYLE}
          >
            <Text preset='header4'>Client dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToFinalizeAccount}
            style={TMP_STYLE}
          >
            <Text preset='header4'>Finalize account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToAccount} style={TMP_STYLE}>
            <Text preset='header4'>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToMessage} style={TMP_STYLE}>
            <Text preset='header4'>Message</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToMessagesList} style={TMP_STYLE}>
            <Text preset='header4'>Messages list</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToJobDetail} style={TMP_STYLE}>
            <Text preset='header4'>Job detail</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToNotifications} style={TMP_STYLE}>
            <Text preset='header4'>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToSetUpHelperProfile}
            style={TMP_STYLE}
          >
            <Text preset='header4'>Setup helper profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToPostJob} style={TMP_STYLE}>
            <Text preset='header4'>Post job</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigateToHelperDashboard}
            style={TMP_STYLE}
          >
            <Text preset='header4'>Dashboard</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={logOut} style={TMP_STYLE}>
            <Text preset='header4'>Log out</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={async () => {
              await api.post('dev_delete_acc')
              logOut()
            }}
            style={TMP_STYLE}
          >
            <Text preset='header4'>Delete my account</Text>
          </TouchableOpacity>
        </Modal>
      )}
      <View style={containerStyle}>
        <View style={topStyle}>
          <View style={leftTopStyle}>
            <Image source={logoPath} />
          </View>
          <View style={rightTopStyle}>
            <TouchableOpacity style={rightTopItemStyle} onPress={onPressBell}>
              <WithCornerItem
                preset='primaryPlus'
                CornerItem={
                  <SVGIcon icon='online2' color={color.palette.goldPlus} />
                }
              >
                <SVGIcon icon='bell' color={color.palette.white} />
              </WithCornerItem>
            </TouchableOpacity>
            <TouchableOpacity style={rightTopItemStyle} onPress={onSendPress}>
              <WithCornerItem
                preset='primaryPlus'
                CornerItem={
                  <SVGIcon icon='online2' color={color.palette.goldPlus} />
                }
              >
                <SVGIcon icon='send' color={color.palette.white} />
              </WithCornerItem>
            </TouchableOpacity>
            <TouchableHighlight
              style={avatarContainerStyle}
              onPress={() => toggleModal(!isModalOpen)}
              onLongPress={onLongPressAvatar}
            >
              <Image source={avatarSrc} style={avatarStyle} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
      {(preset === 'withInput' || preset === 'withInputBack') && (
        <View style={bottomStyle}>
          <DropdownInput placeholder={i18nText} />
          {preset === 'withInputBack' && (
            <View style={bottomBackStyle}>
              <SVGIcon icon='chevronLeft' style={ICON_BACK} />
              <Text text='Go back to schedule' color={color.palette.white} />
            </View>
          )}
        </View>
      )}
    </>
  )
}

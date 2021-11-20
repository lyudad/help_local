/* eslint-disable */
import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  ViewStyle,
  ImageStyle,
  ImageBackground,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  TextStyle,
  SafeAreaView,
  Platform,
} from 'react-native'
import { useNavigation, useFocusEffect } from '@react-navigation/core'
import { useDispatch, useSelector } from 'react-redux'
import Animated from 'react-native-reanimated'
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification'

import {
  account,
  clientDashboard,
  helperDashboard,
  contactUs,
  message,
  notifications,
  postJob,
  privacyAndTerms,
  setUpHelperProfile,
  activeBid,
} from 'constants/routes'
import {
  Text,
  Button,
  HeaderInput,
  WithCornerItem,
  SVGIcon,
  Modal,
  DeveloperMenu,
  CommonInfoModal,
} from 'components'
import { color, spacing } from 'theme'
import { changeCurrentRole, getBadgesCount, logout } from 'screens/both/thunk'
import { common, user } from 'app/store/selectors'
import { HeaderProps } from './header.props'
import { InlineTouchableText } from '../inline-touchable-text'
import { translate } from 'i18n'
import { useBeforeRemove } from 'hooks'
import { getProfile } from 'api/user'
import { ERequestStatus, FullProfile } from 'interfaces'
import { setProfile, setRequestsStatus } from 'screens/both/reducers'
import { WINDOW_WIDTH } from 'constants/common-styles'
import { setError, setHeaderHeight } from 'app/store/commonSlice'
import { resetAllExceptWelcomeMsg } from 'screens/both/reducers'
import { resetAll as resetAllClient } from 'screens/client/reducers'
import { resetAll as resetAllHelper } from 'screens/helper/reducers'
import { resetAll as resetAllAuth } from 'screens/auth/reducers'
import { resetAll as resetAllCommon } from 'app/store/commonSlice'

const defaultAvatar = require('assets/default-avatar.png')
/*
import { resetAll as resetAllBoth } from 'screens/both/reducers'
import { resetAll as resetAllClient } from 'screens/client/reducers'
import { resetAll as resetAllHelper } from 'screens/helper/reducers'
import { resetAll as resetAllAuth } from 'screens/auth/reducers'
import { resetAll as resetAllCommon } from 'app/store/commonSlice'
*/

const headerHeightCutter: number = Platform.OS === 'ios' ? 27 : 19
// static styles
const BG: ImageStyle = {
  height: 97 - headerHeightCutter,
  backgroundColor: color.transparent,
}
const BGSaveView: ViewStyle = {
  backgroundColor: color.secondary,
}
const BG_IMAGE: ImageStyle = {
  flex: 1,
  paddingHorizontal: spacing[6] + 4,
  width: WINDOW_WIDTH,
}
export const BG_HEIGHT_SMALLEST: ImageStyle = {
  height: 70 - headerHeightCutter,
}
const BG_HEIGHT_SMALL: ImageStyle = {
  height: 183 - headerHeightCutter,
}
const BG_HEIGHT_1: ImageStyle = {
  height: 208 - headerHeightCutter,
}
/*
const BG_HEIGHT_2: ImageStyle = {
  height: 264,
}*/
const BG_HEIGHT_3: ImageStyle = {
  height: 434 - headerHeightCutter,
}
const BG_HEIGHT_4: ImageStyle = {
  height: 370 - headerHeightCutter,
}
const SPACE_BETWEEN: ViewStyle = {
  justifyContent: 'space-between',
}
const SECTION: ViewStyle = {
  ...SPACE_BETWEEN,
  marginTop: spacing[6],
}
const MARGIN_TOP: ViewStyle = {
  marginTop: Platform.OS === 'ios' ? 8 : 13,
}
const ROW: ViewStyle = {
  flexDirection: 'row',
}
const LEFT_TOP: ViewStyle = {
  justifyContent: 'center',
}
const RIGHT_TOP: ViewStyle = {
  ...SPACE_BETWEEN,
  flexDirection: 'row',
  alignItems: 'center',
}
const RIGHT_TOP_ITEM: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: spacing[5],
}
const AVATAR_CONTAINER: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: spacing[6] - 4,
}
const AVATAR: ImageStyle = {
  borderRadius: 30,
  width: 40,
  height: 40,
}
const BTN: ViewStyle = {
  width: '100%',
  height: 45,
  marginBottom: spacing[4],
  paddingVertical: 0,
}
const BACK_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
}
const ICON_BACK: ImageStyle = {
  marginRight: spacing[3],
}
const MENU_TEXT_CONTAINER: TextStyle = {
  paddingVertical: spacing[4],
  borderBottomColor: color.palette.grey,
  borderBottomWidth: 0.2,
}
const MENU_TEXT: TextStyle = {
  textAlign: 'left',
}
const MENU_TEXT_LAST: TextStyle = {
  textAlign: 'left',
  paddingTop: spacing[4],
  paddingBottom: spacing[6],
}

const BUTTONS_CONTAINER: ViewStyle = {
  ...SPACE_BETWEEN,
  flexDirection: 'row',
  marginBottom: spacing[3],
}
const BTN_MENU: ViewStyle = {
  width: '45%',
  height: 36,
  padding: 0,
  margin: 0,
}
const MARGIN_BOTTOM4: ViewStyle = {
  marginBottom: spacing[4],
}

const MODAL_CONTAINER: ViewStyle = {
  paddingVertical: spacing[6],
  paddingHorizontal: spacing[3],
}

const PRIVACY_AND_TERMS_TEXT: TextStyle = {
  fontSize: 13,
  fontWeight: '600',
  textDecorationLine: 'underline',
}

const NOTIFICATIONS = 'notifications'

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps): JSX.Element {
  const {
    placeholder,
    textBack,
    input = false,
    clientBtn = false,
    onlyTextBack = false,
    isFormValidToNavigate = true,
    headerAnimate,
    toggleFilterModal,
    customActionOnPostJobPress,
    actionForBackText,
    isFinishProfileModalOpen,
    onCloseFinishProfileModal,
    filterActivityStatusFromParent,
  } = props
  const haederBg0 = require('assets/header-bg-only-back.png')
  const haederBg1 = require('assets/header-bg.png')
  const haederBg2 = require('assets/header-bg-input.png')
  const haederBg3 = require('assets/header-bg-menu.png')
  const haederBg4 = require('assets/header-bg-input-no-back.png')

  if (onlyTextBack) BACK_CONTAINER.top = Platform.OS === 'ios' ? -23 : -15
  else BACK_CONTAINER.top = 0

  //const menuVariant: number = 0
  //const headerBGImage = require(`assets/menu-bg/menu-bg-${d}.png`)

  const navigation = useNavigation()
  const dispatch = useDispatch()
  const [isMenuOpen, toggleMenu] = useState<boolean>(false)
  const helperProfile = useSelector(user.helperProfile)
  const profile: FullProfile = useSelector(user.profile)
  const requestsStatus = useSelector(user.requestsStatus)
  const detectScrolling: number = useSelector(common.detectScrolling)

  useEffect(() => {
    toggleMenu(false)
  }, [detectScrolling])

  const bgImage = (() => {
    if (onlyTextBack) {
      return haederBg0
    }
    if (isMenuOpen) {
      return haederBg3
    }
    if ((clientBtn || input) && !textBack) {
      return haederBg4
    }
    if (clientBtn || input) {
      return haederBg2
    }
    return haederBg1
  })()

  const [isModalOpen, toggleModal] = useState<boolean>(false)

  const onToggleModal = useCallback(() => toggleModal(!isModalOpen), [
    isModalOpen,
  ])
  const onToggleMenu = useCallback(
    (value?: boolean) => toggleMenu(value ? value : !isMenuOpen),
    [isMenuOpen],
  )

  useFocusEffect(
    useCallback(() => {
      dispatch(getBadgesCount())
      const id = setInterval(() => {
        dispatch(getBadgesCount())
      }, 30000)
      return () => {
        clearInterval(id)
        dispatch(setHeaderHeight(0))
      }
    }, [dispatch]),
  )

  useEffect(() => {
    const unsubscribe = navigation.addListener('state', () => {
      toggleMenu(false)
    })
    return unsubscribe
  }, [navigation])

  useEffect(() => {
    if (profile.isDeactivate) {
      dispatch(logout())
    }
  }, [profile])

  useEffect(() => {
    if (requestsStatus.logoutRequestStatus !== ERequestStatus.NOT_SENT_YET) {
      if (requestsStatus.logoutRequestStatus === ERequestStatus.SUCCESS) {
        dispatch(resetAllAuth())
        dispatch(resetAllCommon())
        dispatch(resetAllClient())
        dispatch(resetAllHelper())
        dispatch(resetAllExceptWelcomeMsg())
        PushNotification.cancelAllLocalNotifications()
      } else {
        dispatch(setError('common.couldntMakeRequest'))
      }
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          logoutRequestStatus: ERequestStatus.NOT_SENT_YET,
        }),
      )
    }
  }, [requestsStatus])

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const newProfile: FullProfile = await getProfile()
      if (newProfile.isSuspended) {
        dispatch(
          setProfile({
            ...profile,
            isSuspended: true,
          }),
        )
      }
    }, 180000)
    return () => clearInterval(intervalId)
  }, [])

  const navigateToClientDashboard = useCallback(
    (value: boolean) =>
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () =>
          navigation.navigate(clientDashboard, {
            isHeaderInput: value,
          }),
      }),
    [navigation, isFormValidToNavigate],
  )

  const navigateToHelperDashboard = useCallback(
    (value: boolean) =>
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () =>
          navigation.navigate(helperDashboard, {
            isHeaderInput: value,
          }),
      }),
    [navigation, isFormValidToNavigate],
  )

  const navigateToAccount = useCallback(() => {
    useBeforeRemove({
      isValid: isFormValidToNavigate,
      navigate: () => navigation.navigate(account),
    })
  }, [navigation, isFormValidToNavigate])

  const navigateToMessage = useCallback(() => {
    useBeforeRemove({
      isValid: isFormValidToNavigate,
      navigate: () => navigation.navigate(message),
    })
  }, [navigation, isFormValidToNavigate])

  const navigateToContactUs = useCallback(() => {
    useBeforeRemove({
      isValid: isFormValidToNavigate,
      navigate: () => navigation.navigate(contactUs),
    })
  }, [navigation, isFormValidToNavigate])

  const navigateToNotifications = useCallback(() => {
    useBeforeRemove({
      isValid: isFormValidToNavigate,
      navigate: () => navigation.navigate(notifications),
    })
  }, [navigation, isFormValidToNavigate])
  const navigateToPrivacyAndTerms = useCallback(
    (whichTextShouldBeShown) => {
      useBeforeRemove({
        isValid: isFormValidToNavigate,
        navigate: () =>
          navigation.navigate(privacyAndTerms, { whichTextShouldBeShown }),
      })
    },
    [navigation, isFormValidToNavigate],
  )

  const setAccountTypeConsumer = useCallback(
    () => dispatch(changeCurrentRole('consumer')),
    [dispatch],
  )
  const setAccountTypeHelper = useCallback(() => {
    dispatch(changeCurrentRole('helper'))
    if (!helperProfile) {
      setTimeout(() => navigation.navigate(setUpHelperProfile), 300)
    }
  }, [dispatch, navigation, helperProfile])

  const [
    isBecomeHelperModalOpen,
    setIsBecomeHelperModalOpen,
  ] = useState<boolean>(false)
  const becomeHelper = () => {
    if (helperProfile) setAccountTypeHelper()
    else setIsBecomeHelperModalOpen(true)
  }

  const currentRole = useSelector(user.currentRole)
  const badges = useSelector(user.badges)

  const [
    areThereNewNotifications,
    setAreThereNewNotifications,
  ] = useState<boolean>(false)

  useEffect(() => {
    const { index, routes } = navigation.dangerouslyGetState()
    setAreThereNewNotifications(
      badges?.notificationsBadges > 0 && routes[index].name !== NOTIFICATIONS,
    )
  }, [badges])

  /*
  const logOut = useCallback(() => {
    dispatch(resetAllAuth())
    dispatch(resetAllCommon())
    dispatch(resetAllClient())
    dispatch(resetAllHelper())
    dispatch(resetAllBoth())
  }, [dispatch])
  */

  const goBack = useCallback(() => {
    useBeforeRemove({
      isValid: isFormValidToNavigate,
      navigate: () => {
        toggleMenu(false)
        navigation.goBack()
      },
    })
  }, [navigation, isFormValidToNavigate])

  useEffect(() => {
    // pressed notiication on status bar and app was opened from background
    messaging().onNotificationOpenedApp(() => {
      navigation.navigate(notifications)
    })
    // pressed notiication on status bar and app was opened from quit
    messaging()
      .getInitialNotification()
      .then((data) => {
        if (data) navigation.navigate(notifications)
      })

    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification)

        if (notification.userInteraction) {
          console.log(notification.data.bidId)
          navigation.navigate(activeBid, { bidId: notification.data.bidId })
        }
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        //notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
    })

    const unsubscribe = messaging().onMessage(async () => {
      const { index, routes } = navigation.dangerouslyGetState()
      if (routes[index].name !== NOTIFICATIONS)
        setAreThereNewNotifications(true)
    })
    return unsubscribe
  }, [])

  const NEW_BG: ViewStyle = {
    ...BG,
    ...((clientBtn || input) && BG_HEIGHT_1),
    ...((clientBtn || input) && !textBack && BG_HEIGHT_SMALL),
    ...(isMenuOpen && BG_HEIGHT_3),
    ...(isMenuOpen &&
      currentRole === 'helper' &&
      !input &&
      !clientBtn &&
      BG_HEIGHT_4),
    ...(onlyTextBack && BG_HEIGHT_SMALLEST),
    zIndex: 999999999,
  }

  // @ts-ignore
  dispatch(setHeaderHeight(NEW_BG.height))

  return (
    <>
      <SafeAreaView style={BGSaveView} />
      <Animated.View style={[NEW_BG, headerAnimate]}>
        <ImageBackground source={bgImage} style={BG_IMAGE} resizeMode='stretch'>
          <Modal
            styleContainer={MODAL_CONTAINER}
            animationType='fade'
            transparent
            visible={isModalOpen}
            toggleModal={() => toggleModal(!isModalOpen)}
          >
            <DeveloperMenu />
          </Modal>
          <CommonInfoModal
            toggleModal={() =>
              setIsBecomeHelperModalOpen(!isBecomeHelperModalOpen)
            }
            visible={isBecomeHelperModalOpen}
            icon='key'
            title={translate('setUpHelperProfileScreen.getHired')}
            content={translate('setUpHelperProfileScreen.getHiredModalDesc')}
            buttonText={translate('setUpHelperProfileScreen.setupProfile')}
            onButtonPress={() => {
              setIsBecomeHelperModalOpen(false)
              setAccountTypeHelper()
            }}
          />
          {isFinishProfileModalOpen && (
            <CommonInfoModal
              toggleModal={() => onCloseFinishProfileModal()}
              visible={true}
              icon='finishProfile'
              title={translate('header.finishProfile')}
              content={translate('header.finishProfileDesc')}
              buttonText={translate('header.finishProfile')}
              onButtonPress={() => {
                onCloseFinishProfileModal()
                navigation.navigate(setUpHelperProfile)
              }}
              isButtonShorter
            />
          )}
          {!onlyTextBack && (
            <View style={[SECTION, ROW, MARGIN_TOP]}>
              <TouchableOpacity
                style={LEFT_TOP}
                onPress={() => {
                  if (currentRole === 'consumer') {
                    navigateToClientDashboard(false)
                  } else {
                    navigateToHelperDashboard(false)
                  }
                }}
              >
                <SVGIcon
                  icon='appLogo'
                  color={color.primary}
                  width={90}
                  height={38}
                />
              </TouchableOpacity>
              <View style={RIGHT_TOP}>
                <TouchableOpacity
                  style={RIGHT_TOP_ITEM}
                  onPress={navigateToNotifications}
                >
                  <WithCornerItem
                    preset='primaryPlus'
                    CornerItem={
                      areThereNewNotifications && (
                        <SVGIcon
                          icon='online2'
                          color={color.palette.goldPlus}
                        />
                      )
                    }
                  >
                    <SVGIcon icon='bell' color={color.palette.white} />
                  </WithCornerItem>
                </TouchableOpacity>
                <TouchableOpacity
                  style={RIGHT_TOP_ITEM}
                  onPress={navigateToMessage}
                >
                  <WithCornerItem
                    preset='primaryPlus'
                    CornerItem={
                      badges?.messagingBadges > 0 && (
                        <SVGIcon
                          icon='online2'
                          color={color.palette.goldPlus}
                        />
                      )
                    }
                  >
                    <SVGIcon icon='send' color={color.palette.white} />
                  </WithCornerItem>
                </TouchableOpacity>
                <TouchableHighlight
                  style={AVATAR_CONTAINER}
                  onPress={() => onToggleMenu()}
                  onLongPress={onToggleModal}
                  delayLongPress={500}
                >
                  <Image
                    source={
                      profile.avatar
                        ? { uri: profile.avatar.sourceUrl }
                        : defaultAvatar
                    }
                    style={AVATAR}
                  />
                </TouchableHighlight>
              </View>
            </View>
          )}
          <View style={SECTION}>
            {input && !isMenuOpen && (
              <>
                <HeaderInput
                  placeholder={placeholder || 'header.placeholder1'}
                  placeholderColor={color.secondary}
                  style={MARGIN_BOTTOM4}
                  toggleFilterModal={toggleFilterModal}
                  filterActivityStatusFromParent={
                    filterActivityStatusFromParent
                  }
                />
              </>
            )}
            {isMenuOpen && (
              <View>
                <View style={BUTTONS_CONTAINER}>
                  <Button
                    preset={currentRole === 'consumer' ? 'sixth' : 'tenth'}
                    tx='header.menuBtn1'
                    style={BTN_MENU}
                    onPress={setAccountTypeConsumer}
                  />
                  <Button
                    preset={currentRole === 'helper' ? 'sixth' : 'tenth'}
                    tx='header.menuBtn2'
                    style={BTN_MENU}
                    onPress={becomeHelper}
                  />
                </View>
                <View>
                  <View style={MENU_TEXT_CONTAINER}>
                    <TouchableOpacity onPress={navigateToAccount}>
                      <Text
                        tx='header.menuSection1'
                        preset='header2'
                        color={color.palette.white}
                        style={MENU_TEXT}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={MENU_TEXT_CONTAINER}>
                    <TouchableOpacity onPress={navigateToContactUs}>
                      <Text
                        tx='header.menuSection2'
                        preset='header2'
                        color={color.palette.white}
                        style={MENU_TEXT}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text style={MENU_TEXT_LAST}>
                    <InlineTouchableText
                      onTextPress={() => navigateToPrivacyAndTerms('terms')}
                      text={translate('header.menuSection3')}
                      textStyle={{
                        ...MENU_TEXT,
                        color: color.palette.white,
                        ...PRIVACY_AND_TERMS_TEXT,
                      }}
                    />
                    <Text
                      preset='subtitle'
                      text=' & '
                      color={color.palette.white}
                    />
                    <InlineTouchableText
                      onTextPress={() => navigateToPrivacyAndTerms('privacy')}
                      text={translate('header.menuSection4')}
                      textStyle={{
                        color: color.palette.white,
                        ...PRIVACY_AND_TERMS_TEXT,
                      }}
                    />
                  </Text>
                </View>
              </View>
            )}
            {isMenuOpen && input && (
              <HeaderInput
                placeholder={placeholder || 'header.placeholder1'}
                placeholderColor={color.secondary}
                style={MARGIN_BOTTOM4}
                toggleFilterModal={toggleFilterModal}
                filterActivityStatusFromParent={filterActivityStatusFromParent}
              />
            )}
            {(isMenuOpen || clientBtn) && !input && currentRole === 'consumer' && (
              <Button
                tx='header.btnPostJob'
                style={BTN}
                onPress={() => {
                  if (customActionOnPostJobPress) customActionOnPostJobPress()
                  else navigation.navigate(postJob)
                }}
              />
            )}
          </View>
          {textBack && !isMenuOpen && (
            <TouchableOpacity
              style={BACK_CONTAINER}
              onPress={actionForBackText ? actionForBackText : goBack}
            >
              <SVGIcon
                icon='chevronLeft'
                style={ICON_BACK}
                size={13}
                color={color.palette.white}
              />
              <Text
                tx={textBack || ''}
                preset='subtitle'
                color={color.palette.white}
              />
            </TouchableOpacity>
          )}
        </ImageBackground>
      </Animated.View>
    </>
  )
}

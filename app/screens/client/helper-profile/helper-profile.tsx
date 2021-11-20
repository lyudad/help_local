import React, { useCallback, useState } from 'react'
import {
  ImageURISource,
  View,
  ViewStyle,
  Image,
  ImageStyle,
} from 'react-native'
import {
  useRoute,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'

import {
  Screen,
  Header,
  HelperCard,
  WithHorizontalPaddings,
  Text,
  Loader,
  BottomNavigation,
  Photos,
  InviteHelperModal,
  Modal,
  ViewReviews,
  PADDING_TOP_POSITIVE,
} from 'components'
import { color, spacing } from 'theme'
import { useHeaderAnimation } from 'hooks'
import { UserStackRouteProps } from 'navigation'
import { HelperCardButtonsBlockVersion } from 'app/components/helper-card/helper-card.props'
import { IHelperInfo } from 'interfaces'
import { getHelperById } from 'screens/client/thunk'
import { consumer } from 'app/store/selectors/consumer'
import { MARGIN_VERTICAL_SP4 } from 'constants/common-styles'
import { clientDashboard } from 'constants/routes'

const DEFAULT_AVATAR = require('assets/default-avatar.png')

const FULL: ViewStyle = { flex: 1 }

const FULL_AVATAR: ImageStyle = {
  width: '100%',
  height: 300,
  marginTop: spacing[4],
}

const SECTION: ViewStyle = {
  marginTop: spacing[7],
}

export const HelperProfileScreen = (): JSX.Element => {
  const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const route = useRoute<UserStackRouteProps<'helperProfile'>>()
  const helperID = route.params.id
  const { textBack } = route.params
  const [isInviteModalOpen, setIsInviteModalOpen] = useState<boolean>(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState<boolean>(false)

  const helper: IHelperInfo = useSelector(consumer.helper)
  const loading: boolean = useSelector(consumer.loadingHelpers)

  useFocusEffect(
    useCallback(() => {
      if (helperID) {
        dispatch(getHelperById(helperID))
      }
    }, [helperID]),
  )

  return (
    <View style={FULL}>
      <Header
        clientBtn
        textBack={textBack || 'helperProfile.headerTextBack'}
        headerAnimate={headerStyle}
      />
      <Screen
        preset='scroll'
        backgroundColor={color.transparent}
        onScroll={scrollHandler}
      >
        <WithHorizontalPaddings style={PADDING_TOP_POSITIVE}>
          {!helperID && (
            <Text
              style={MARGIN_VERTICAL_SP4}
              tx='helperProfile.deletedHisProfile'
              color={color.palette.grey}
            />
          )}
          {((helperID && loading) ||
            (helperID && !helper) ||
            (helperID && helperID !== helper.id)) && (
            <Loader preset='primayWithVerticalMarginSp3' />
          )}

          {!loading && helper && helperID === helper.id && (
            <>
              <Modal
                visible={isAvatarModalOpen}
                toggleModal={() => setIsAvatarModalOpen(!isAvatarModalOpen)}
              >
                <Image
                  style={FULL_AVATAR}
                  source={
                    helper.avatar
                      ? { uri: helper.avatar.sourceUrl }
                      : DEFAULT_AVATAR
                  }
                />
              </Modal>
              {isInviteModalOpen && (
                <InviteHelperModal
                  helperNotPressable
                  helperInfo={helper}
                  onToggleModal={() => setIsInviteModalOpen(!isInviteModalOpen)}
                />
              )}
              <View style={SECTION}>
                <HelperCard
                  afterProfileBlocked={() =>
                    navigation.navigate(clientDashboard)
                  }
                  withBasedOnYourJobTitle
                  isReadMoreBtnHidden={false}
                  nameAndReviewNotPressable
                  onAvatarPress={() => setIsAvatarModalOpen(true)}
                  key={helper.id}
                  helper={helper}
                  buttonsBlockVersion={
                    HelperCardButtonsBlockVersion.InviteHelperAndView
                  }
                  onFirstBtnPress={() => setIsInviteModalOpen(true)}
                  onlyInviteBtn
                  showCategory
                  withSendMsgBtn={helper.userInfo.directMessaging}
                />
              </View>
              <Photos
                showDefaultTitle
                photos={helper?.attachments?.map(
                  (attachment): ImageURISource => ({
                    uri: attachment.sourceUrl,
                  }),
                )}
              />
              {helperID && <ViewReviews helperProfileId={helperID} />}
            </>
          )}
        </WithHorizontalPaddings>
      </Screen>
      <BottomNavigation />
    </View>
  )
}

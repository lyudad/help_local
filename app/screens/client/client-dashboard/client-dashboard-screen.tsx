/* eslint-disable */
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  //Platform,
  ImageStyle,
  Platform,
} from 'react-native'
import Reanimated from 'react-native-reanimated'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native'
import { useRoute } from '@react-navigation/native'
import ExtraDimensions from 'react-native-extra-dimensions-android'

import { IHelperInfo, ICategory } from 'interfaces'
import { color, spacing } from 'theme'
import {
  Screen,
  Text,
  WithHorizontalPaddings,
  ViewWithShadow,
  HelperCard,
  Hr,
  JobCategory,
  SVGIcon,
  Modal,
  Button,
  JobLists,
  Header,
  BottomNavigation,
  HeaderClientFilter,
  Loader,
  InlineTouchableText,
  InviteHelperModal,
  BOTTOM_NAVIGATION_HEIGHT,
} from 'components'
import { HelperCardButtonsBlockVersion } from 'app/components/helper-card/helper-card.props'
import { common, user } from 'app/store/selectors'
import { useHeaderAnimation } from 'hooks'
import { useNavigation } from '@react-navigation/core'
import { helperProfile, postJob, messagesList, account } from 'constants/routes'
import {
  WINDOW_WIDTH,
  WINDOW_HEIGHT,
  MARGIN_VERTICAL_SP3,
  TEXT_ALIGN_LEFT,
  PADDING_BOTTOM_SP5,
} from 'constants/common-styles'
import {
  //getSuggestionsHelpers,
  getHelpers,
  setFilter,
  updatePendingJobsCategoriesList,
} from 'screens/client/thunk'
import { createChatRoom } from 'screens/both/messaging/thunk'
import { consumer } from 'app/store/selectors'
import { UserStackRouteProps } from 'navigation'
import { translate } from 'i18n'
import { setClientsWhoClosedWelcomeMsg } from 'screens/both/reducers'
import { getAllCategories } from 'screens/both/thunk'
import {
  setCachedJob,
  setHelpers,
  setIsAllHelpersGet,
  setIsPendingJobsCategoriesListUpdated,
} from '../reducers'
import {
  setDetectScrolling,
  setOnScrollEventForGradient,
} from 'app/store/commonSlice'

const wellcomeIcon = require('assets/fireworks-mini.png')

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList)

const FULL: ViewStyle = {
  flex: 1,
}

const WELLCOME_CONTAINER: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: spacing[4] + 2,
  paddingBottom: spacing[7] - 10,
  marginTop: 40,
}

const CLOSE_WELLCOME_BOX: ViewStyle = {
  alignSelf: 'flex-end',
  marginTop: spacing[3],
  marginBottom: spacing[2],
}

export const WELLCOME_TITLE: TextStyle = {
  color: color.primary,
  fontWeight: Platform.OS === 'ios' ? '700' : '800',
}

const HR: ViewStyle = {
  marginVertical: spacing[3],
}

const WELLCOME_INFO_BOX: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const WELLCOME_INFO_BOX_ITEM1: ViewStyle = {
  flex: 1,
}

const WELLCOME_INFO_BOX_ITEM2: ViewStyle = {
  flex: 4,
  paddingTop: spacing[6],
}

const JOB_LISTS: ViewStyle = {
  marginVertical: spacing[5],
}

const ADDITIONAL_PADDING: ViewStyle = {
  paddingTop: spacing[7],
}

const TEXT_2_LEFT: TextStyle = {
  textAlign: 'left',
}

const JOB_CATEGORIES_CONTAINER: ViewStyle = {
  marginTop: spacing[4],
  paddingVertical: spacing[3],
}

const JOB_CATEGORY_ROW: ViewStyle = {
  flexDirection: 'row',
  marginVertical: spacing[3],
}

const HEADER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: spacing[7] - 10,
}

const CARD_CONTAINER: ViewStyle = {
  marginBottom: spacing[5],
}
/*

const MINI_CIRCLE: ViewStyle = {
  width: 18,
  height: 18,
  backgroundColor: color.secondary,
  borderRadius: 15,
  justifyContent: 'center',
  marginLeft: spacing[3],
}

const WHITE_COLOR: TextStyle = {
  color: color.palette.white,
}
*/

const MODAL_CONTAINER: ViewStyle = {
  alignItems: 'center',
  width: '100%',
}

const MODAL_BTN: ViewStyle = {
  marginTop: spacing[4],
}

const MODAL_TITLE_BOX: ViewStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[2],
}

const TRADE_MARK: TextStyle = {
  color: color.secondary,
  fontSize: 19,
  lineHeight: 21,
  textAlign: 'center',
}

export const LOADER_CONT: ViewStyle = {
  justifyContent: 'center',
  marginBottom: spacing[5],
}

console.log(WINDOW_HEIGHT, '---')

// Header modal_filter style
export const MODAL_FILTER_WRAPPER: ViewStyle = {
  //marginLeft: 20,
  position: 'absolute',
  //width: Platform.OS === 'ios' ? '91%' : '90%',
  width: '105%',
  //height:
  //WINDOW_HEIGHT -
  //(BOTTOM_NAVIGATION_HEIGHT + 289 + (Platform.OS === 'ios' ? 17 : -8)),
  zIndex: 2,
  top: Platform.select({
    ios: 200,
    default: 154,
  }),
  alignItems: 'center',
  transform: [
    {
      translateX: 300,
    },
  ],
}

const FILTER_CONT: ViewStyle = {
  flex: 1,
  width: '90%',
}
export const FILTER: ViewStyle = {
  height:
    WINDOW_HEIGHT -
    (ExtraDimensions.isSoftMenuBarEnabled() ? 24 : 0) -
    (BOTTOM_NAVIGATION_HEIGHT + 187 + (Platform.OS === 'ios' ? 17 : -30)),
}

const LINK_TEXT_ON_WELCOME: TextStyle = {
  fontSize: 13,
  fontWeight: '700',
  color: color.primary,
  textDecorationLine: 'underline',
}
export const WELCOME_ICON: ImageStyle = {
  width: 64,
  height: 64,
}

export const ClientDashboardScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isScreenFocused: boolean = useIsFocused()

  const HELPERS_LIMIT = 2

  const route = useRoute<UserStackRouteProps<'clientDashboard'>>()

  const [
    isSetupPaymentModalOpen,
    setIsSetupPaymentModalOpen,
  ] = useState<boolean>(false)
  const [shouldClearCachedJob, setShouldClearCachedJob] = useState<boolean>(
    true,
  )

  const [
    helperInfoForInviteModal,
    setHelperInfoForInviteModal,
  ] = useState<IHelperInfo | null>(null)
  const [page, setPage] = useState<number>(1)
  const [isViewAllHelpersMode, setIsViewAllHelpersMode] = useState<boolean>(
    false,
  )

  const helpers: Array<IHelperInfo> = useSelector(consumer.helpers)
  const loadingHelpers: boolean = useSelector(consumer.loadingHelpers)
  const isAllHelpersGet: boolean = useSelector(consumer.isAllHelpersGet)
  const isPendingJobsCategoriesListUpdated: boolean = useSelector(
    consumer.isPendingJobsCategoriesListUpdated,
  )
  const pendingJobsCategoriesList: number[] = useSelector(
    consumer.pendingJobsCategoriesList,
  )
  const categories: ICategory[] = useSelector(user.categories)
  const userId: string = useSelector(user.id)
  const clientsWhoClosedWelcomeMsg: string[] = useSelector(
    user.clientsWhoClosedWelcomeMsg,
  )
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  //Filter
  const helperName: string | null = useSelector(consumer.helperName)
  const jobType: ICategory | null = useSelector(consumer.jobType)
  const maxHourlyRate: number | null = useSelector(consumer.maxHourlyRate)
  const minJobsHeld: number | null = useSelector(consumer.minJobsHeld)
  const successRaiting: number | null = useSelector(consumer.successRaiting)
  const reliabilityPercentage: number | null = useSelector(
    consumer.reliabilityPercentage,
  )

  const loadHelpers = (
    isFirst?: boolean,
    localPendingJobsCategoriesList?: number[],
  ) => {
    let categoryIds: number[] = []
    if (!isViewAllHelpersMode || localPendingJobsCategoriesList) {
      if (
        (!isViewAllHelpersMode && !pendingJobsCategoriesList.length) ||
        (localPendingJobsCategoriesList &&
          !localPendingJobsCategoriesList.length)
      ) {
        categoryIds = [99999999]
      } else {
        categoryIds = localPendingJobsCategoriesList
          ? localPendingJobsCategoriesList
          : pendingJobsCategoriesList
      }
    } else if (jobType) {
      categoryIds = [jobType.id]
    }

    if (isFirst) dispatch(setIsAllHelpersGet(false))
    if (!isAllHelpersGet || isFirst) {
      dispatch(
        getHelpers({
          limit: HELPERS_LIMIT,
          offset: HELPERS_LIMIT * ((isFirst ? 1 : page) - 1),
          search: helperName,
          categoryIds,
          maxHourlyRate,
          minJobsHeld,
          minAvgScore: successRaiting,
          maxAvgScore: successRaiting,
          minReliabilityScore: reliabilityPercentage,
        }),
      )
      setPage(isFirst ? 2 : page + 1)
    }
  }

  const resetFilterState = () => {
    dispatch(
      setFilter({
        helperName: null,
        jobType: null,
        successRaiting: null,
        reliabilityPercentage: null,
        maxHourlyRate: null,
        minJobsHeld: null,
      }),
    )
  }

  useEffect(() => {
    loadHelpers(true)
  }, [
    helperName,
    jobType,
    maxHourlyRate,
    minJobsHeld,
    successRaiting,
    reliabilityPercentage,
    isViewAllHelpersMode,
  ])

  useEffect(() => {
    if (isScreenFocused) {
      if (route?.params?.showSetupPaymentModal) setIsSetupPaymentModalOpen(true)
      setShouldClearCachedJob(true)
      if (!categories.length) dispatch(getAllCategories())
      dispatch(updatePendingJobsCategoriesList())
    } else {
      dispatch(setIsPendingJobsCategoriesListUpdated(false))
      setHelperInfoForInviteModal(null)
      setIsSetupPaymentModalOpen(false)
      navigation.setParams({ showSetupPaymentModal: false })
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (isPendingJobsCategoriesListUpdated) {
      setIsViewAllHelpersMode(pendingJobsCategoriesList.length === 0)
      if (helpers.length === 0) {
        /*if (
          helperName ||
          jobType ||
          maxHourlyRate ||
          minJobsHeld ||
          successRaiting ||
          reliabilityPercentage
        ) {*/
        loadHelpers(true, pendingJobsCategoriesList)
        /*} else {
          dispatch(
            getSuggestionsHelpers({
              limit: HELPERS_LIMIT,
              offset: HELPERS_LIMIT * (1 - 1),
              ...(pendingJobsCategoriesList.length
                ? { categoryIds: pendingJobsCategoriesList }
                : {}),
            }),
          )
          setPage(2)
        }*/
      }
    }
  }, [isPendingJobsCategoriesListUpdated])

  useEffect(() => {
    if (!isSetupPaymentModalOpen && shouldClearCachedJob)
      dispatch(setCachedJob(null))
  }, [isSetupPaymentModalOpen])

  useEffect(() => {
    if (!route?.params?.isHeaderInput) {
      resetFilterState()
    }
    if (route?.params?.isHeaderInput && isScreenFocused) {
      setIsViewAllHelpersMode(true)
    }
  }, [route])

  const navigateToHelperProfile = useCallback(
    (helperId: number) => navigation.navigate(helperProfile, { id: helperId }),
    [navigation],
  )

  const onScollCallback = (e) => {
    dispatch(setOnScrollEventForGradient(e))
  }

  const { headerStyle, scrollHandler } = useHeaderAnimation(80, onScollCallback)

  const createChat = useCallback(
    (interlocutorId: string) => {
      dispatch(createChatRoom({ interlocutorId }))
      navigation.navigate(messagesList, { textBack: 'common.goBack' })
    },
    [dispatch, navigation],
  )

  const renderHelper = (helper: IHelperInfo, index?: number) => {
    /*if (!isAllHelpersGet && index === helpers.length - 1) {
      return (
        <MaskedView maskElement={<MaskedElement />}>
          <View style={CARD_CONTAINER} key={helper.id}>
            <HelperCard
              helper={helper}
              sendAction={() => createChat(helper.userInfo.id)}
              withSendMsgBtn={helper.userInfo.directMessaging}
              onFirstBtnPress={() => navigateToHelperProfile(helper.id)}
              buttonsBlockVersion={
                HelperCardButtonsBlockVersion.ViewAndInviteToJob
              }
              showCategory
              onSecondBtnPress={() => setHelperInfoForInviteModal(helper)}
            />
          </View>
        </MaskedView>
      )
    } else {*/
    return (
      <View style={CARD_CONTAINER} key={helper.id}>
        <HelperCard
          helper={helper}
          sendAction={() => createChat(helper.userInfo.id)}
          onFirstBtnPress={() => navigateToHelperProfile(helper.id)}
          withSendMsgBtn={helper.userInfo.directMessaging}
          buttonsBlockVersion={HelperCardButtonsBlockVersion.ViewAndInviteToJob}
          showCategory
          onSecondBtnPress={() => setHelperInfoForInviteModal(helper)}
        />
      </View>
    )
    //}
  }

  const renderFooter = (): JSX.Element => {
    //handleClose()
    return loadingHelpers ? (
      <View style={LOADER_CONT}>
        <Loader />
      </View>
    ) : null
  }

  // Header modal_filter style
  const transition = useRef(new Animated.Value(WINDOW_WIDTH)).current

  const handleOpen = () => {
    Animated.timing(transition, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  const handleClose = () => {
    Animated.timing(transition, {
      toValue: WINDOW_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const transformStyle: ViewStyle = {
    transform: [
      {
        // @ts-ignore
        translateX: transition,
      },
    ],
  }

  //const Aa = require('assets/categories/Cleaning.svg')

  return (
    <View style={FULL}>
      <Animated.View style={[MODAL_FILTER_WRAPPER, transformStyle]}>
        <ViewWithShadow style={FILTER_CONT}>
          <HeaderClientFilter
            style={FILTER}
            onFilterHelpersApply={() => {}}
            onClosePress={() => handleClose()}
          />
        </ViewWithShadow>
      </Animated.View>
      <Header
        clientBtn
        headerAnimate={headerStyle}
        input={route.params ? route.params.isHeaderInput : false}
        toggleFilterModal={handleOpen}
      />
      <Screen preset='fixed' backgroundColor={color.transparent}>
        {helperInfoForInviteModal && (
          <InviteHelperModal
            helperInfo={helperInfoForInviteModal}
            onToggleModal={() => setHelperInfoForInviteModal(null)}
          />
        )}
        <WithHorizontalPaddings>
          {isSetupPaymentModalOpen && (
            <Modal
              animationType='fade'
              transparent
              visible
              toggleModal={() =>
                setIsSetupPaymentModalOpen(!isSetupPaymentModalOpen)
              }
            >
              <View style={MODAL_CONTAINER}>
                <SVGIcon icon='wallet' color={color.primary} />
                <View style={MODAL_TITLE_BOX}>
                  <Text
                    tx='clientDashboard.payModalTitle'
                    preset='header3bold'
                  />
                </View>
                <Text tx='clientDashboard.payModalDesc' preset='header4slim' />
                <Button
                  tx='clientDashboard.payModalBtn'
                  preset='primary'
                  style={MODAL_BTN}
                  onPress={() => {
                    setShouldClearCachedJob(false)
                    navigation.navigate(account, { itemIndex: 3 })
                  }}
                />
              </View>
            </Modal>
          )}
          <AnimatedFlatList
            ListHeaderComponent={
              <>
                {!helperName && (
                  <>
                    {clientsWhoClosedWelcomeMsg &&
                      !clientsWhoClosedWelcomeMsg.includes(userId) && (
                        <ViewWithShadow style={WELLCOME_CONTAINER}>
                          <View style={CLOSE_WELLCOME_BOX}>
                            <TouchableOpacity
                              onPress={() => {
                                dispatch(
                                  setClientsWhoClosedWelcomeMsg([
                                    ...clientsWhoClosedWelcomeMsg,
                                    userId,
                                  ]),
                                )
                              }}
                            >
                              <SVGIcon icon='cross' />
                            </TouchableOpacity>
                          </View>
                          <Image source={wellcomeIcon} style={WELCOME_ICON} />
                          <Text
                            tx='clientDashboard.wellcome'
                            preset='largest'
                            style={WELLCOME_TITLE}
                          />
                          <Text>
                            <Text
                              preset='header4bold'
                              tx='clientDashboard.howHelptWorks1'
                              style={TEXT_ALIGN_LEFT}
                            />
                            <Text text='&#174; ' style={TRADE_MARK} />
                            <Text
                              preset='header4bold'
                              tx='clientDashboard.howHelptWorks2'
                              style={TEXT_ALIGN_LEFT}
                            />
                          </Text>
                          <Hr style={HR} />
                          <View style={WELLCOME_INFO_BOX}>
                            <View style={WELLCOME_INFO_BOX_ITEM1}>
                              <SVGIcon
                                icon='userCircle'
                                color={color.palette.white}
                              />
                            </View>
                            <View style={WELLCOME_INFO_BOX_ITEM2}>
                              <Text
                                tx='clientDashboard.hire'
                                preset='header3bold'
                                style={TEXT_2_LEFT}
                              />
                              <Text style={TEXT_2_LEFT}>
                                <Text
                                  tx='clientDashboard.hireDescStart'
                                  preset='subtitle'
                                  style={TEXT_2_LEFT}
                                />
                                <Text text=' ' />
                                <InlineTouchableText
                                  text={translate('clientDashboard.jobPost')}
                                  textStyle={LINK_TEXT_ON_WELCOME}
                                  onTextPress={() =>
                                    navigation.navigate(postJob)
                                  }
                                />
                                <Text text=' ' />
                                <Text
                                  tx='clientDashboard.hireDescEnd'
                                  preset='subtitle'
                                />
                              </Text>
                            </View>
                          </View>
                          <View style={WELLCOME_INFO_BOX}>
                            <View style={WELLCOME_INFO_BOX_ITEM1}>
                              <SVGIcon
                                icon='settingsCircle'
                                color={color.palette.white}
                              />
                            </View>
                            <View
                              style={{
                                ...WELLCOME_INFO_BOX_ITEM2,
                                ...ADDITIONAL_PADDING,
                              }}
                            >
                              <Text
                                tx='clientDashboard.getHired'
                                preset='header3bold'
                                style={TEXT_2_LEFT}
                              />
                              <Text
                                tx='clientDashboard.getHiredDesc'
                                preset='subtitle'
                                style={TEXT_2_LEFT}
                              />
                            </View>
                          </View>
                        </ViewWithShadow>
                      )}
                    <JobLists style={JOB_LISTS} hideEmptyBlocks />
                    <Text
                      tx='clientDashboard.popularJobCategories'
                      preset='header2plusBold'
                      style={TEXT_2_LEFT}
                    />
                    {categories.length ? (
                      <ViewWithShadow style={JOB_CATEGORIES_CONTAINER}>
                        {[
                          [categories[0], categories[1], categories[2]],
                          [categories[3], categories[4], categories[5]],
                        ].map((row, rowIndex) => (
                          <View
                            key={rowIndex.toString()}
                            style={JOB_CATEGORY_ROW}
                          >
                            {row.map((category) => (
                              <JobCategory
                                key={category.id.toString()}
                                {...{ category }}
                                onPress={(pressedCategory) => {
                                  navigation.navigate(postJob, {
                                    category: pressedCategory,
                                  })
                                }}
                              />
                            ))}
                          </View>
                        ))}
                      </ViewWithShadow>
                    ) : (
                      <Loader preset='primayWithVerticalMarginSp3' />
                    )}
                  </>
                )}
                {/*
                <View style={HEADER_CONTAINER}>
                  <Text>
                    <Text
                      tx='clientDashboard.localHelptBest'
                      preset='header2plusBold'
                    />
                    <TouchableOpacity>
                      <View style={MINI_CIRCLE}>
                        <Text text='?' style={WHITE_COLOR} />
                      </View>
                    </TouchableOpacity>
                  </Text>
                  <TouchableOpacity>
                    <Text tx='clientDashboard.viewAll' preset='linkBold' />
                  </TouchableOpacity>
                </View>
                */}
                <View style={[HEADER_CONTAINER, PADDING_BOTTOM_SP5]}>
                  <Text
                    tx='clientDashboard.localHelpers'
                    preset='header2plusBold'
                  />
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(setIsAllHelpersGet(false))
                      dispatch(setHelpers([]))
                      /*
                      loadHelpers(
                        true,
                        (isViewAllHelpersMode
                          ? pendingJobsCategoriesList
                          : undefined
                        ),
                      )*/
                      if (
                        isViewAllHelpersMode &&
                        route?.params?.isHeaderInput
                      ) {
                        resetFilterState()
                        navigation.setParams({ isHeaderInput: false })
                      }
                      setIsViewAllHelpersMode(!isViewAllHelpersMode)
                    }}
                  >
                    <Text
                      tx='clientDashboard.viewAll'
                      preset='linkBold'
                      color={
                        isViewAllHelpersMode ? color.secondary : color.primary
                      }
                    />
                  </TouchableOpacity>
                </View>
                {!isPendingJobsCategoriesListUpdated && (
                  <Loader preset='primayWithVerticalMarginSp3' />
                )}
                {isPendingJobsCategoriesListUpdated &&
                  !loadingHelpers &&
                  !helpers.length && (
                    <Text
                      text='No helpers'
                      color={color.palette.grey}
                      style={[MARGIN_VERTICAL_SP3]}
                    />
                  )}
              </>
            }
            data={helpers}
            bounces={false}
            onScrollBeginDrag={() =>
              dispatch(setDetectScrolling(Math.random()))
            }
            onScroll={scrollHandler}
            onContentSizeChange={(_, y) => {
              dispatch(
                setOnScrollEventForGradient({
                  ...onScrollEventForGradient,
                  contentSize: {
                    height: y,
                  },
                }),
              )
            }}
            /* eslint-disable @typescript-eslint/no-explicit-any */
            renderItem={({ item, index }: any) => renderHelper(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: IHelperInfo) => item.id.toString()}
            ListFooterComponent={renderFooter}
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              loadHelpers()
            }}
            scrollEventThrottle={1}
          />
        </WithHorizontalPaddings>
      </Screen>
      <BottomNavigation
        isInputShowed={route?.params ? route.params.isHeaderInput : false}
      />
    </View>
  )
}

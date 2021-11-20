/* eslint-disable */
import React, { useState, useRef } from 'react'
import {
  View,
  ViewStyle,
  TextStyle,
  Image,
  TouchableOpacity,
  Animated,
  FlatList,
} from 'react-native'
import Reanimated from 'react-native-reanimated'
import {
  Screen,
  Text,
  WithHorizontalPaddings,
  ViewWithShadow,
  Hr,
  SVGIcon,
  Modal,
  Button,
  JobPostCard,
  Header,
  BottomNavigation,
  HeaderHelperFilter,
  //MaskedElement,
  BidLists,
  Loader,
  //BG_HEIGHT_SMALLEST,
} from 'components'
import { useDispatch, useSelector } from 'react-redux'
//import MaskedView from '@react-native-masked-view/masked-view'
import { useIsFocused } from '@react-navigation/native'

import {
  WINDOW_WIDTH,
  //WINDOW_HEIGHT,
  MARGIN_TOP_SP5,
  TEXT_ALIGN_LEFT,
  MARGIN_BOTTOM_SP4,
} from 'constants/common-styles'
import { color, spacing } from 'theme'
import {
  IPostJob,
  IJobFrequency,
  ICreatedOrder,
  ICategory,
  HelperProfile,
  IBid,
} from 'interfaces'
import { common, helper, user } from 'app/store/selectors'
import {
  blockJob,
  getAcceptedBids,
  getJobList,
  getPendingBids,
} from 'screens/helper/thunk'
import { useHeaderAnimation } from 'hooks'
import { useRoute } from '@react-navigation/native'
import { UserStackRouteProps } from 'navigation'
import { setHelpersWhoClosedWelcomeMsg } from 'screens/both/reducers'
import { setIsAllJobsGet, setJobList, setMilesRange } from '../reducers'
import { useEffect } from 'react'
import {
  FILTER,
  LOADER_CONT,
  MODAL_FILTER_WRAPPER,
  WELCOME_ICON,
  WELLCOME_TITLE,
} from 'screens/client'
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

const ADDITIONAL_PADDING: ViewStyle = {
  paddingTop: spacing[7],
}

const TEXT_2_LEFT: TextStyle = {
  textAlign: 'left',
}

const TRADE_MARK: TextStyle = {
  color: color.secondary,
  fontSize: 19,
  lineHeight: 21,
  textAlign: 'center',
}

const HEADER_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: spacing[7] - 10,
  marginBottom: spacing[4],
}

const MODAL_CONTAINER: ViewStyle = {
  alignItems: 'center',
}

const MODAL_BTN: ViewStyle = {
  marginTop: spacing[4],
}

const MODAL_TITLE_BOX: ViewStyle = {
  marginTop: spacing[3],
  marginBottom: spacing[2],
}

const POST_JOB_WRAPPER: ViewStyle = {
  marginBottom: spacing[6],
}

// Header modal_filter style
/*const MODAL_FILTER_WRAPPER: ViewStyle = {
  position: 'absolute',
  width: '100%',
  height: WINDOW_HEIGHT - 180,
  zIndex: 2,
  top: 154,
  alignItems: 'center',
  transform: [
    {
      translateX: 300,
    },
  ],
}*/

const FILTER_CONT: ViewStyle = {
  flex: 1,
  width: '90%',
}

export const HelperDashboardScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const isScreenFocused: boolean = useIsFocused()

  const onScollCallback = (e) => {
    dispatch(setOnScrollEventForGradient(e))
  }
  const { scrollHandler } = useHeaderAnimation(80, onScollCallback)

  const JOBS_LIMIT = 4

  const route = useRoute<UserStackRouteProps<'helperDashboard'>>()

  const [page, setPage] = useState<number>(1)
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false)
  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [
    isFinishProfileModalOpen,
    setIsFinishProfileModalOpen,
  ] = useState<boolean>(false)

  //const headerHeight: number = useSelector(common.headerHeight)

  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  const acceptedBids: IBid[] = useSelector(helper.acceptedBids)
  const pendingBids: IBid[] = useSelector(helper.pendingBids)
  const jobList = useSelector(helper.jobList)
  const loading: boolean = useSelector(helper.loading)
  const isAllJobsGet: boolean = useSelector(helper.isAllJobsGet)
  const helperProfile: HelperProfile | null = useSelector(user.helperProfile)

  const search: string | null = useSelector(helper.search)
  const milesRange: number | null = useSelector(helper.milesRange)
  const maxHourlyRate: number | null = useSelector(helper.maxHourlyRate)
  const minHourlyRate: number | null = useSelector(helper.minHourlyRate)
  const maxFxiedPrice: number | null = useSelector(helper.maxFxiedPrice)
  const minFixedPrice: number | null = useSelector(helper.minFixedPrice)
  const createdAtOrder: ICreatedOrder | null = useSelector(
    helper.createdAtOrder,
  )
  const jobFrequency: null | IJobFrequency = useSelector(helper.jobFrequency)
  const categoryIds: null | ICategory = useSelector(helper.categoryIds)
  const userId: string = useSelector(user.id)
  const helpersWhoClosedWelcomeMsg: string[] = useSelector(
    user.helpersWhoClosedWelcomeMsg,
  )

  const onFilterJobsApply = ({
    milesRange,
    categoryIds,
    createdAtOrder,
    jobFrequency,
    maxHourlyRate,
    minHourlyRate,
    maxFxiedPrice,
    minFixedPrice,
  }) => {
    setIsFilterActive(
      milesRange ||
        categoryIds ||
        createdAtOrder ||
        jobFrequency ||
        maxHourlyRate ||
        minHourlyRate ||
        maxFxiedPrice ||
        minFixedPrice,
    )
  }

  const makeJobsLoading = (isFirst?: boolean) => {
    if (isFirst) dispatch(setIsAllJobsGet(false))
    dispatch(
      getJobList({
        limit: JOBS_LIMIT,
        offset: JOBS_LIMIT * ((isFirst ? 1 : page) - 1),
        search,
        ...(isFilterActive && {
          milesRange,
          maxHourlyRate,
          minHourlyRate,
          maxFxiedPrice,
          minFixedPrice,
          createdAtOrder: createdAtOrder?.value,
          jobFrequency: jobFrequency?.value,
          categoryIds: categoryIds ? [categoryIds.id] : null,
        }),
      }),
    )
    if (isFirst) setPage(2)
  }

  useEffect(() => {
    if (isScreenFocused) {
      if (helperProfile) {
        dispatch(getAcceptedBids({}))
        dispatch(getPendingBids({}))
        if (helperProfile.milesRange !== milesRange && !isFilterActive)
          dispatch(setMilesRange(helperProfile.milesRange))
        if (jobList.length === 0) {
          makeJobsLoading(true)
        }
      } else {
        setIsFinishProfileModalOpen(true)
      }
    }
  }, [isScreenFocused])

  useEffect(() => makeJobsLoading(true), [
    milesRange,
    categoryIds,
    createdAtOrder,
    jobFrequency,
    maxHourlyRate,
    minHourlyRate,
    maxFxiedPrice,
    minFixedPrice,
    search,
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      if (helperProfile) {
        makeJobsLoading(true)
      }
    }, 5000)
    return () => clearInterval(interval)
  })

  const onBlockJobPress = (jobPostId: number) => {
    dispatch(blockJob({ jobPostId }))
    dispatch(setJobList([...jobList.filter((job) => job.id !== jobPostId)]))
  }

  const renderJob = (job: IPostJob, index?: number) => {
    const RenderJobPostCard = (): JSX.Element => {
      return (
        <JobPostCard
          id={job.id}
          header={job.category.title}
          title={job.title}
          date={job.createdAt}
          address={job.address?.formatted}
          fixPrice={job.fixPrice}
          minPrice={job.minPrice}
          maxPrice={job.maxPrice}
          description={job.description}
          firstName={job.createdBy.firstName}
          lastName={job.createdBy.lastName}
          stars={job.createdBy.avgRating}
          reviewsNumber={job.createdBy.feedbackCount}
          onBlockPress={onBlockJobPress}
          isBidSentMiniBtn={job.bidSent}
          alreadySentBidId={
            pendingBids.filter((pBid) => pBid.jobPost.id === job.id).length &&
            job.bidSent
              ? pendingBids.filter((pBid) => pBid.jobPost.id === job.id)[0].id
              : undefined
          }
          isCompleted={job.completed}
        />
      )
    }

    if (acceptedBids.filter((aBid) => aBid.jobPost.id === job.id).length)
      return <></>

    /*if (!isAllJobsGet && index === jobList.length - 1) {
      return (
        <MaskedView maskElement={<MaskedElement />}>
          <View key={job.id} style={POST_JOB_WRAPPER}>
            <RenderJobPostCard />
          </View>
        </MaskedView>
      )
    } else {*/
    return (
      <View key={job.id} style={POST_JOB_WRAPPER}>
        <RenderJobPostCard />
      </View>
    )
    //}
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

  const renderFooter = (): JSX.Element => {
    //handleClose()
    return loading ? (
      <View style={LOADER_CONT}>
        <Loader />
      </View>
    ) : null
  }

  return (
    <View style={FULL}>
      <Animated.View style={[MODAL_FILTER_WRAPPER, transformStyle]}>
        <ViewWithShadow style={FILTER_CONT}>
          <HeaderHelperFilter
            style={FILTER}
            {...{ onFilterJobsApply }}
            onClosePress={() => handleClose()}
            onClearAllPress={() => setIsFilterActive(false)}
          />
        </ViewWithShadow>
      </Animated.View>

      <Header
        input={route.params ? route.params.isHeaderInput : false}
        placeholder='header.helperPlaceholder'
        //{...((headerHeight > BG_HEIGHT_SMALLEST) && {
        //headerAnimate: headerStyle
        //})}
        //{...((route.params?.isHeaderInput) && { headerAnimate: headerStyle })}
        toggleFilterModal={handleOpen}
        isFinishProfileModalOpen={isFinishProfileModalOpen}
        onCloseFinishProfileModal={() => {
          setIsFinishProfileModalOpen(false)
        }}
        filterActivityStatusFromParent={
          isFilterActive ? 'active' : 'not-active'
        }
      />
      <Screen preset='fixed' backgroundColor={color.transparent}>
        <WithHorizontalPaddings>
          <Modal
            animationType='fade'
            transparent
            visible={isModalOpen}
            toggleModal={() => toggleModal(!isModalOpen)}
          >
            <View style={MODAL_CONTAINER}>
              <SVGIcon icon='wallet' color={color.primary} />
              <View style={MODAL_TITLE_BOX}>
                <Text tx='clientDashboard.payModalTitle' preset='header3bold' />
              </View>
              <Text tx='clientDashboard.payModalDesc' preset='header4slim' />
              <Button
                tx='clientDashboard.payModalBtn'
                preset='primary'
                style={MODAL_BTN}
              />
            </View>
          </Modal>
          <AnimatedFlatList
            ListHeaderComponent={
              <>
                {!search && (
                  <>
                    {helpersWhoClosedWelcomeMsg &&
                      !helpersWhoClosedWelcomeMsg.includes(userId) && (
                        <ViewWithShadow style={WELLCOME_CONTAINER}>
                          <View style={CLOSE_WELLCOME_BOX}>
                            <TouchableOpacity
                              onPress={() => {
                                dispatch(
                                  setHelpersWhoClosedWelcomeMsg([
                                    ...helpersWhoClosedWelcomeMsg,
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
                                tx='clientDashboard.getHired'
                                preset='header3bold'
                                style={TEXT_2_LEFT}
                              />
                              <Text style={TEXT_2_LEFT}>
                                <Text
                                  tx='helperDashboard.hireDescStart'
                                  preset='subtitle'
                                  style={TEXT_2_LEFT}
                                />
                                <Text text=' ' />
                                <Text
                                  tx='helperDashboard.helperProfile'
                                  preset='linkBold'
                                />
                                <Text text=' ' />
                                <Text
                                  tx='helperDashboard.hireDescEnd'
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
                                tx='clientDashboard.hire'
                                preset='header3bold'
                                style={TEXT_2_LEFT}
                              />
                              <Text
                                tx='helperDashboard.getHiredDesc'
                                preset='subtitle'
                                style={TEXT_2_LEFT}
                              />
                            </View>
                          </View>
                        </ViewWithShadow>
                      )}
                    <BidLists
                      isPlacedOnHelperDashboard
                      style={MARGIN_TOP_SP5}
                    />
                  </>
                )}
                <View style={HEADER_CONTAINER}>
                  <Text tx='helperDashboard.title' preset='header2plusBold' />
                </View>
                {jobList.length === 0 && !loading && (
                  <Text
                    style={MARGIN_BOTTOM_SP4}
                    color={color.palette.grey}
                    tx={
                      'helperDashboard.' +
                      (isFilterActive
                        ? 'noJobsAvailableForFilter'
                        : 'noJobsAvailable')
                    }
                  />
                )}
              </>
            }
            data={jobList}
            bounces={false}
            onScroll={scrollHandler}
            /* eslint-disable @typescript-eslint/no-explicit-any */
            renderItem={({ item, index }: any) => renderJob(item, index)}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: IPostJob) => item.id.toString()}
            onScrollBeginDrag={() =>
              dispatch(setDetectScrolling(Math.random()))
            }
            onEndReachedThreshold={0.1}
            onEndReached={() => {
              if (!isAllJobsGet) {
                makeJobsLoading()
                setPage(page + 1)
              }
            }}
            ListFooterComponent={renderFooter}
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

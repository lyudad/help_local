/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
  FlatList,
  BackHandler,
  NativeEventSubscription,
  TextStyle,
  Animated as Animated2,
  Platform,
  Keyboard,
  TouchableHighlight,
} from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import Animated from 'react-native-reanimated'
//import MaskedView from '@react-native-masked-view/masked-view'
import { useRoute } from '@react-navigation/native'

import {
  Attachment,
  Button,
  DatePicker,
  Input,
  InputPrice,
  ModeChangerText,
  SVGIcon,
  Text,
  TwoButtonsWithTitle,
  SearchCategoryDropdownInput,
  DropdownWithTextItems,
  HelperCard,
  FilterHelpers,
  RowSpaceBetween,
  BaseScreen,
  //MaskedElement,
  ShowError,
  AddressForm,
  Modal,
  CommonInfoModal,
  InlineTouchableText,
  Loader,
  BOTTOM_NAVIGATION_HEIGHT,
  ViewWithShadow,
  ImagePicker,
} from 'components'
import { color, spacing } from 'theme'
import { translate } from 'i18n'
import { HowItWorks, RenderMiniBlock } from './additional-components'
import { PreviousPostsDropdown } from './PreviousPostsDropdown'
import { IArchivedJobCategory, ICategory } from 'app/interfaces/common/category'
import {
  common,
  root,
  user,
  consumer as consumerSelector,
} from 'app/store/selectors'
import {
  setError as setCommonError,
  setOnScrollEventForGradient,
} from 'app/store/commonSlice'
import {
  resetFilter,
  setCachedJob,
  setError,
  setHelpers,
  setIsAllHelpersGet,
  setIsAllPreviouslyUsedHelpersGet,
  setJobInfo,
  setPreviouslyUsedHelpers,
  setWasJobUpdated,
} from 'screens/client/reducers'
import {
  ALIGIN_ITEMS_CENTER,
  FLEX_1,
  FLEX_4,
  FLEX_9,
  GRAY_BORDER_RADIUS4,
  MARGIN_BOTTOM_0,
  MARGIN_HORIZONTAL_2PX,
  MARGIN_TOP_SP3,
  MARGIN_TOP_SP5,
  MARGIN_VERTICAL_SP2,
  MARGIN_VERTICAL_SP3,
  PADDING_BOTTOM_0,
  PADDING_BOTTOM_SP2,
  PADDING_BOTTOM_SP3,
  PADDING_HORIZONTAL_SP3,
  PADDING_TOP_SP4,
  PADDING_TOP_SP6,
  PADDING_VERTICAL_SP4,
  ROW,
  ROW_SPACE_BETWEEN,
  UNDERLINE,
  WINDOW_HEIGHT,
  Z_INDEX_1,
  Z_INDEX_2,
  MARGIN_BOTTOM_SP2,
  BOLD,
  HZ_PADDING_5_PERCENT,
  WINDOW_WIDTH,
  MARGIN_TOP_SP4,
  MARGIN_BOTTOM_SP3,
} from 'constants/common-styles'
import {
  getHelpers,
  postJob,
  updateJob,
  setFilter,
  getArchivedJobCategories,
} from 'screens/client/thunk'
import {
  EUserPaymentMethods,
  HourlyOrFixed,
  IAddress,
  IConsumerReducerState,
  IPickedFileAndId,
  IHelperInfo,
  IJobFrequencyType,
  IJobInfo,
  IJobRecurringInterval,
  INameAndId,
  IPostNewJobForThunk,
  IUpdateJob,
} from 'interfaces'
import { consumer as consumerSelectors } from 'app/store/selectors/consumer'
import { setAll } from 'screens/client/reducers'
import { HelperCardButtonsBlockVersion } from 'app/components/helper-card/helper-card.props'
import dayjs from 'dayjs'
import { UserStackRouteProps } from 'navigation'
import { useBeforeRemove, useHeaderAnimation } from 'hooks'
import {
  clientDashboard,
  helperProfile,
  jobDetail,
  privacyAndTerms,
} from 'constants/routes'
import { JobPosted, RenderQuestion } from './sub-components'
import { Asset } from 'react-native-image-picker'

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const ATTACH_BTN_VIEW_ON_DESC: ViewStyle = {
  position: 'relative',
  bottom: 30,
  paddingRight: 7,
  alignItems: 'flex-end',
}

const VIEW: ViewStyle = {
  height: WINDOW_HEIGHT - 70,
  flex: 1,
}

const DESCRIPTION_SHOW_ERROR: ViewStyle = {
  position: 'relative',
  top: -23,
}

/*
const FILTER: ViewStyle = {
  position: 'relative',
  right: '-5%',
}
*/

const PRICE_STYLE: ViewStyle = {
  paddingLeft: 25,
}

const MODAL_CONTAINER: ViewStyle = {
  marginTop: spacing[6] + 150,
}

const GREEN_13_TEXT: TextStyle = {
  fontSize: 13,
  color: color.primary,
}

const LOADER_CONT: ViewStyle = {
  justifyContent: 'center',
  marginBottom: spacing[5],
}

const FILTER: ViewStyle = {
  shadowColor: color.palette.white,
}

const BOTTOM: ViewStyle = {
  bottom: 68,
}

export const PostJobScreen = (): JSX.Element => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const route = useRoute<UserStackRouteProps<'postJob'>>()
  const isScreenFocused: boolean = useIsFocused()

  const consumer: IConsumerReducerState = useSelector(root.consumer)
  const clientAddress: IAddress = useSelector(user.address)
  const loading = useSelector(common.loading)
  const loadingHelpers: boolean = useSelector(consumerSelector.loadingHelpers)
  const lastPostedJobId: number | null = useSelector(
    consumerSelectors.lastPostedJobId,
  )
  const wasJobUpdated = useSelector(consumerSelector.wasJobUpdated)
  const error = useSelector(consumerSelectors.error)
  let jobInfo: IJobInfo | null = useSelector(
    // for reuse previous and edit
    consumerSelectors.jobInfo,
  )
  const archivedJobCategories: IArchivedJobCategory[] = useSelector(
    consumerSelector.archivedJobCategories,
  )
  const primaryPaymentMethod: EUserPaymentMethods | null = useSelector(
    user.primaryPaymentMethod,
  )
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  const recurring = 'recurring'
  const DAY: string = 'day'
  const WEEK: string = 'week'

  const oneTimeText = translate('common.oneTime')
  // const recurringText = translate('common.recurring')
  const yesText = translate('common.yes')
  const noText = translate('common.no')
  const dailyText = translate('common.daily')
  const weeklyText = translate('common.weekly')
  const monthlyText = translate('common.monthly')

  const isEditJobMode = route.params.isEditJobMode
  const isCameFromOtherScreenWithJobInfoForReuse: boolean =
    route.params.isCameFromOtherScreenWithJobInfoForReuse
  const [isReusePreviousMode, setIsReusePreviousMode] = useState<boolean>(false)
  const [isEditPreviousDetailsMode, setIsEditPreviousDetailsMode] =
    useState<boolean>(false)
  const [isAdditionalCriteriaMode, setIsAdditionalCriteriaMode] =
    useState<boolean>(false)
  // const [showQestionMarkAfterTitle, seTshowQestionMarkAfterTitle] =
  //   useState<boolean>(false)
  const [isModalOpen, toggleModal] = useState<boolean>(false)
  const [isCancelJobNoticeOpen, setIsCancelJobNoticeOpen] =
    useState<boolean>(false)

  useEffect(() => {
    setIsEditPreviousDetailsMode(false)
    setIsAdditionalCriteriaMode(false)
  }, [isReusePreviousMode])

  const now = new Date()
  const defaultStartAt = new Date(
    parseInt(dayjs(now).format('YYYY')),
    parseInt(dayjs(now).format('MM')),
    parseInt(dayjs(now).format('DD')),
    9,
    0,
    0,
  )
  const defaultEndAt = new Date(
    parseInt(dayjs(now).format('YYYY')),
    parseInt(dayjs(now).format('MM')),
    parseInt(dayjs(now).format('DD')),
    17,
    0,
    0,
  )
  const [category, setCategory] = useState<ICategory | null>(null)
  const [title, setTitle] = useState<string>('')
  // for meeting, if in person type
  const [address, setAddress] = useState<string>(
    clientAddress ? clientAddress.formatted : '',
  )
  const [isInPersonMeeting, setIsInPersonMeeting] = useState<boolean>(true)
  const [date, setDate] = useState<Date | null>(now)
  const [startAt, setStartAt] = useState<Date>(defaultStartAt)
  const [endAt, setEndAt] = useState<Date>(defaultEndAt)
  const [payType, setPayType] = useState<HourlyOrFixed | null>(null)
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [fixPrice, setFixPrice] = useState<number>(0)
  const [description, setDescription] = useState<string>('')
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const [frequencyType, setFrequencyType] =
    useState<IJobFrequencyType>('one_time')
  const [recurringInterval, setRecurringInterval] =
    useState<IJobRecurringInterval>('day')
  const [coverLetterNeeded, setCoverLetterNeeded] = useState<boolean>(false)
  const [questions, setQuestions] = useState<string[]>([])
  const [inviteIds, setInviteIds] = useState<Array<string>>([
    ...(route.params.inviteIds ? route.params.inviteIds : []),
  ])
  const [images, setImages] = useState<IPickedFileAndId[]>([])
  const [isFileModalOpen, setIsFileModalOpen] = useState<boolean>(false)
  const [previousImages, setPreviousImages] = useState<INameAndId[]>([])

  const [backHandler, setBackHandler] =
    useState<NativeEventSubscription | null>(null)

  const onIsPublicButtonsPress = useCallback(
    (pressedOne) => setIsPublic(pressedOne === 1 ? true : false),
    [],
  )

  // Helpers pagination
  const HELPERS_LIMIT = 2
  const [page, setPage] = useState<number>(1)

  const helpers: Array<IHelperInfo> = useSelector(consumerSelectors.helpers)
  const previouslyUsedHelpers: Array<IHelperInfo> = useSelector(
    consumerSelectors.previouslyUsedHelpers,
  )
  const isAllHelpersGet: boolean = useSelector(
    consumerSelectors.isAllHelpersGet,
  )
  const isAllPreviouslyUsedHelpersGet: boolean = useSelector(
    consumerSelectors.isAllPreviouslyUsedHelpersGet,
  )
  //filter
  const maxHourlyRate: number | null = useSelector(
    consumerSelectors.maxHourlyRate,
  )
  const minJobsHeld: number | null = useSelector(consumerSelectors.minJobsHeld)
  const successRaiting: number | null = useSelector(
    consumerSelectors.successRaiting,
  )
  const reliabilityPercentage: number | null = useSelector(
    consumerSelectors.reliabilityPercentage,
  )

  const [isHelpersFilterVisible, setIsHelpersFilterVisible] =
    useState<boolean>(false)

  const resetLocalState = (skip: string[] = []): void => {
    setCategory(null)
    setTitle('')
    setDate(now)
    setStartAt(defaultStartAt)
    setEndAt(defaultEndAt)
    setIsInPersonMeeting(false)
    setAddress(clientAddress ? clientAddress.formatted : '')
    setPayType(null)
    setFixPrice(0)
    setMinPrice(0)
    setMaxPrice(0)
    setDescription('')
    setIsPublic(true)
    setFrequencyType('one_time')
    setRecurringInterval('day')
    setCoverLetterNeeded(false)
    setQuestions([])
    if (!skip.includes('isReusePreviousMode')) setIsReusePreviousMode(false)
    setIsAdditionalCriteriaMode(false)
    setIsEditPreviousDetailsMode(false)
    setImages([])
    setPreviousImages([])
    setIsCancelJobNoticeOpen(false)
  }

  interface IErrors {
    title?: string
    address?: string
    date?: string
    startAt?: string
    endAt?: string
    payType?: string
    description?: string
  }
  const [errors, setErrors] = useState<IErrors>({})

  const hourly = 'hourly'
  const onSelectCategory = useCallback((selectedCategory: ICategory) => {
    setCategory(selectedCategory)
    dispatch(setFilter({ jobType: selectedCategory }))
  }, [])

  const isNoErrors = (): boolean => {
    const newErrors: IErrors = {}
    const thisFieldIsRequired = translate('common.errorRequiredField')
    if (title.length === 0) newErrors.title = thisFieldIsRequired
    if (isInPersonMeeting && address.length === 0)
      newErrors.address = translate('common.enterYourAddressError')
    if (description.length === 0) newErrors.description = thisFieldIsRequired
    if (!date) newErrors.date = translate('postJob.errorSetDate')
    if (date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0))
      newErrors.date = translate('postJob.youShouldNotSelectOldDate')
    if (
      dayjs(new Date()).format('DD/MM/YYYY') ===
      dayjs(date).format('DD/MM/YYYY')
    ) {
      const startAtWithCurrentDate = new Date()
      startAtWithCurrentDate.setHours(startAt.getHours())
      startAtWithCurrentDate.setMinutes(startAt.getMinutes())
      if (startAtWithCurrentDate.getTime() - 600000 <= new Date().getTime())
        newErrors.startAt = translate(
          'postJob.startTimeMustBeBiggerTo10MinutesThanNowAtLeast',
        )
    }
    if (startAt.getTime() >= endAt.getTime())
      newErrors.endAt = translate('postJob.endAtMustBeBigger')
    if (payType === HourlyOrFixed.FIXED && fixPrice === 0)
      newErrors.payType = translate('postJob.errorSetPrice')
    else if (
      payType === HourlyOrFixed.HOURLY &&
      (minPrice === 0 || maxPrice === 0)
    )
      newErrors.payType = translate('postJob.errorSetPriceRange')
    else if (payType === null)
      newErrors.payType = translate('postJob.errorChoosePayType')
    if (Object.keys(newErrors).length) {
      setErrors(newErrors)
      dispatch(setError(translate('common.checkErrors')))
      return false
    } else return true
  }
  //console.log('errors', errors)
  //console.log(address)

  const onSend = () => {
    if (isNoErrors()) {
      startAt.setFullYear(date.getFullYear())
      startAt.setMonth(date.getMonth())
      startAt.setDate(date.getDate())

      endAt.setFullYear(date.getFullYear())
      endAt.setMonth(date.getMonth())
      endAt.setDate(date.getDate())

      const data: IPostNewJobForThunk | IUpdateJob = {
        ...(isEditJobMode
          ? {
              id: jobInfo.id,
            }
          : {
              title,
              category,
              inviteIds,
            }),
        frequencyType,
        ...(frequencyType === recurring && { recurringInterval }),
        ...(fixPrice ? { fixPrice } : { minPrice, maxPrice }),
        fixPrice: fixPrice ? fixPrice : null,
        minPrice: minPrice ? minPrice : null,
        maxPrice: maxPrice ? maxPrice : null,
        description,
        startAt,
        attachmentIds: [],
        endAt,
        isPublic,
        coverLetterNeeded,
        ...(isInPersonMeeting && address && { address }),
        screeningQuestions: [
          ...questions
            .filter((question) => question)
            .map((question) => ({ title: question })),
        ],
      }
      if (primaryPaymentMethod || isEditJobMode) {
        dispatch(
          isEditJobMode
            ? updateJob({
                ...data,
                localeImages: images,
                previousImages: previousImages.map((file) => file.id),
              } as IUpdateJob)
            : postJob({
                job: { ...data, localeImages: images } as IPostNewJobForThunk,
              }),
        )
      } else {
        dispatch(
          setCachedJob({
            ...data,
            localeImages: images,
          } as IPostNewJobForThunk),
        )
        navigation.navigate(clientDashboard, { showSetupPaymentModal: true })
      }
    }
  }

  const fillStateFromExitsJob = (): void => {
    if (
      jobInfo &&
      (isEditJobMode ||
        isReusePreviousMode ||
        isCameFromOtherScreenWithJobInfoForReuse)
    ) {
      const job: IJobInfo = jobInfo
      setCategory(job.category)
      setTitle(job.title)
      if (isEditJobMode) setDate(new Date(jobInfo.startAt))
      setStartAt(new Date(job.startAt))
      setEndAt(new Date(job.endAt))
      setIsInPersonMeeting(job.address !== null)
      if (job.address) setAddress(job.address.formatted)
      setPayType(job.fixPrice ? HourlyOrFixed.FIXED : HourlyOrFixed.HOURLY)
      setFixPrice(job.fixPrice ? job.fixPrice : 0)
      setMinPrice(job.minPrice ? job.minPrice : 0)
      setMaxPrice(job.maxPrice ? job.maxPrice : 0)
      setDescription(job.description)
      setIsPublic(job.isPublic)
      setFrequencyType(job.frequencyType)
      if (job.recurringInterval) {
        let interval: IJobRecurringInterval = 'month'
        if (job.recurringInterval.days)
          interval = job.recurringInterval.days === 7 ? 'week' : 'day'
        setRecurringInterval(interval)
      }
      if (job.screeningQuestions?.length)
        setQuestions([
          ...job.screeningQuestions.map((question) => question.title),
        ])
      setCoverLetterNeeded(job.coverLetterNeeded)
      const previousImagesList = job.attachments?.map((file) => {
        return { name: file.filename, id: file.id }
      })
      setPreviousImages(previousImagesList ? previousImagesList : [])
    }
  }

  const resetFilterAndHelpersLoadingData = () => {
    dispatch(resetFilter())
    dispatch(setHelpers([]))
    dispatch(setPreviouslyUsedHelpers([]))
    dispatch(setIsAllHelpersGet(false))
    dispatch(setIsAllPreviouslyUsedHelpersGet(false))
  }

  const onBackPress = (): boolean => {
    useBeforeRemove({
      isValid: false,
      navigate: () => navigation.goBack(),
    })
    return true
  }

  const [
    isSearchCategoryDropdownInputTableOpen,
    setIsSearchCategoryDropdownInputTableOpen,
  ] = useState<boolean>(true)

  const [
    isSearchCategoryDropdownInputListOpen,
    setIsSearchCategoryDropdownInputListOpen,
  ] = useState<boolean>(false)

  useEffect(() => {
    if (isScreenFocused) {
      if (isEditJobMode) {
        fillStateFromExitsJob()
        setTimeout(() => {
          setIsSearchCategoryDropdownInputTableOpen(false)
          setIsSearchCategoryDropdownInputListOpen(false)
        }, 50)
      }
      if (
        jobInfo &&
        !isEditJobMode &&
        !isReusePreviousMode &&
        !isCameFromOtherScreenWithJobInfoForReuse
      )
        dispatch(setJobInfo(null))
      if (!isEditJobMode) dispatch(getArchivedJobCategories({}))
      if (route.params.category) setCategory(route.params.category)
    } else {
      dispatch(setJobInfo(null))
      dispatch(setWasJobUpdated(false))
      resetLocalState()
    }
    resetFilterAndHelpersLoadingData()
  }, [isScreenFocused])

  useEffect(() => {
    if (lastPostedJobId) {
      resetLocalState()
      resetFilterAndHelpersLoadingData()
      dispatch(
        setAll({
          ...consumer,
          loadingHelpers: false,
          previouslyUsedHelpers: [],
          helpers: [],
          archivedJobCategories: [],
          archivedJobs: [],
          jobInfo: null,
        }),
      )
    }
  }, [lastPostedJobId])
  useEffect(() => {
    if (wasJobUpdated) {
      navigation.navigate(jobDetail, { id: jobInfo.id })
    }
  }, [wasJobUpdated])
  useEffect(() => {
    if (error && isScreenFocused) {
      dispatch(setCommonError(error))
      dispatch(setError(''))
    }
  }, [error])

  const dispatchGetHelpers = (isFirstPage: boolean = false) => {
    dispatch(
      getHelpers({
        limit: HELPERS_LIMIT,
        offset: HELPERS_LIMIT * ((isFirstPage ? 1 : page) - 1),
        categoryIds: [category.id],
        minAvgScore: successRaiting,
        maxAvgScore: successRaiting,
        minReliabilityScore: reliabilityPercentage,
        maxHourlyRate,
        minJobsHeld,
        previouslyUsed: !isAllPreviouslyUsedHelpersGet && isReusePreviousMode,
      }),
    )
  }

  useEffect(() => {
    Keyboard.dismiss()
    setErrors({})
    if (category) {
      resetFilterAndHelpersLoadingData()
      dispatchGetHelpers(true)
      setPage(2)
      setBackHandler(
        BackHandler.addEventListener('hardwareBackPress', onBackPress),
      )
    } else {
      if (backHandler) backHandler.remove()
      setIsSearchCategoryDropdownInputTableOpen(true)
    }
  }, [category])

  useEffect(() => {
    if (isScreenFocused) {
      dispatch(setHelpers([]))
      dispatch(setIsAllHelpersGet(false))
      if (category) {
        dispatchGetHelpers(true)
        setPage(2)
      }
    }
  }, [maxHourlyRate, minJobsHeld, successRaiting, reliabilityPercentage])

  useEffect(() => {
    if (isAllPreviouslyUsedHelpersGet) setPage(1)
  }, [isAllPreviouslyUsedHelpersGet])
  useEffect(() => {
    if (isCameFromOtherScreenWithJobInfoForReuse) {
      fillStateFromExitsJob()
      setIsReusePreviousMode(true)
      navigation.setParams({ isCameFromOtherScreenWithJobInfoForReuse: false })
    }
  }, [isCameFromOtherScreenWithJobInfoForReuse])
  useEffect(() => {
    if (isScreenFocused) fillStateFromExitsJob()
  }, [jobInfo])

  const handleHelperList = () => {
    if ((!isAllHelpersGet || !isAllPreviouslyUsedHelpersGet) && category) {
      dispatchGetHelpers()
      setPage(page + 1)
    }
  }

  let recurringIntervalDropdownPlaceholder = oneTimeText
  if (frequencyType === recurring) {
    if (recurringInterval === DAY)
      recurringIntervalDropdownPlaceholder = dailyText
    else if (recurringInterval === WEEK)
      recurringIntervalDropdownPlaceholder = weeklyText
    else recurringIntervalDropdownPlaceholder = monthlyText
  }

  const { headerStyle, scrollHandler } = useHeaderAnimation(80, (e) =>
    dispatch(setOnScrollEventForGradient(e)),
  )

  const RenderMeetingType = (): JSX.Element => {
    const onButtonsPress = useCallback((pressedOne) => {
      if (pressedOne === 1) {
        setIsInPersonMeeting(true)
      } else {
        setIsInPersonMeeting(false)
        setAddress('')
      }
    }, [])
    return (
      <RenderMiniBlock>
        <TwoButtonsWithTitle
          disabled={isEditJobMode}
          title={translate('postJob.personOrVirtual')}
          firstBtnText={translate('postJob.inPerson')}
          secondBtnText={translate('postJob.virtual')}
          activeOne={isInPersonMeeting ? 1 : 2}
          {...{ onButtonsPress }}
        />
      </RenderMiniBlock>
    )
  }

  const selectMultipleFile = (files: Asset[]) => {
    /*
    try {
      const res = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
      })
      setImages([
        ...images,
        ...res.map((item) => ({ id: `${item.name}${new Date()}`, file: item })),
      ])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log('Error at picker', err)
        throw err
      }
    }
    */
    setImages([
      ...images,
      ...files.map((item) => ({
        id: `${item.fileName}${new Date()}`,
        file: item,
      })),
    ])
  }

  type IListTitle = 'prevUsedHelpers' | 'findNewHelper' | 'helpersAvailable'
  interface IRenderHelpersListTitleProps {
    listTitle: IListTitle
    withFilter?: boolean
  }
  const RenderHelpersListTitle = ({
    listTitle,
    withFilter,
  }: IRenderHelpersListTitleProps): JSX.Element => {
    return (
      <>
        <RowSpaceBetween
          style={{
            ...ALIGIN_ITEMS_CENTER,
            ...PADDING_BOTTOM_SP2,
            ...MARGIN_TOP_SP5,
          }}
          StartItem={<Text preset='header3_500' tx={`postJob.${listTitle}`} />}
          EndItem={
            <>
              {withFilter && (
                <TouchableOpacity
                  style={ROW_SPACE_BETWEEN}
                  onPress={() =>
                    setIsHelpersFilterVisible(!isHelpersFilterVisible)
                  }
                >
                  <SVGIcon
                    icon='filter'
                    color={
                      maxHourlyRate ||
                      minJobsHeld ||
                      successRaiting ||
                      reliabilityPercentage
                        ? color.primary
                        : color.secondary
                    }
                  />
                  <Text text='  ' />
                  <Text
                    tx='postJob.filterBy'
                    preset='linkBold'
                    color={color.primary}
                  />
                </TouchableOpacity>
              )}
            </>
          }
        />
        {!isHelpersFilterVisible && withFilter && helpers.length === 0 && (
          <Text
            tx={
              'postJob.' +
              (maxHourlyRate ||
              minJobsHeld ||
              successRaiting ||
              reliabilityPercentage
                ? 'noHelpersAvailableForFilter'
                : 'noHelpersAvailable')
            }
            color={color.palette.grey}
          />
        )}
        {/*
        isHelpersFilterVisible && withFilter && (
          <FilterHelpers
            //style={{ ...MARGIN_VERTICAL_SP2, ...FILTER }}
            style={MARGIN_VERTICAL_SP2}
            onClosePress={() => setIsHelpersFilterVisible(false)}
          />
        )
        */}
      </>
    )
  }

  const renderHelper = (helper: IHelperInfo, index?: number) => {
    if (category && !isEditJobMode) {
      let isInvited: boolean = false
      let buttonsBlockVersion: HelperCardButtonsBlockVersion =
        helper.previouslyUsed
          ? HelperCardButtonsBlockVersion.InviteToJobAndView
          : HelperCardButtonsBlockVersion.InviteHelperAndView
      for (let i = 0; i < inviteIds.length; i++) {
        if (helper.userInfo.id === inviteIds[i]) {
          isInvited = true
          buttonsBlockVersion = HelperCardButtonsBlockVersion.LikeAndView
          break
        }
      }

      //const isLastItem: boolean =
      //§index === helpers.length + previouslyUsedHelpers.length - 1
      const isFirstPrevUsedItem: boolean =
        previouslyUsedHelpers.length && !index
      const isFirstItem: boolean = previouslyUsedHelpers.length === index

      const RenderHelperCard = (): JSX.Element => {
        let listTitle: IListTitle = 'helpersAvailable'
        if (isReusePreviousMode) {
          listTitle = isFirstPrevUsedItem ? 'prevUsedHelpers' : 'findNewHelper'
        }
        return (
          <>
            {isFirstItem || isFirstPrevUsedItem ? (
              <RenderHelpersListTitle
                listTitle={listTitle}
                withFilter={isFirstItem}
              />
            ) : (
              <></>
            )}
            <View key={helper.id} style={MARGIN_VERTICAL_SP3}>
              <HelperCard
                withSendMsgBtn={helper.userInfo.directMessaging}
                key={helper.id}
                helper={helper}
                {...{ buttonsBlockVersion }}
                onFirstBtnPress={() =>
                  setInviteIds(
                    isInvited
                      ? [...inviteIds.filter((id) => id !== helper.userInfo.id)]
                      : [...inviteIds, helper.userInfo.id],
                  )
                }
                onSecondBtnPress={() => {
                  useBeforeRemove({
                    isValid: false,
                    navigate: () =>
                      navigation.navigate(helperProfile, { id: helper.id }),
                  })
                }}
              />
            </View>
            {helpers.length === 0 &&
              previouslyUsedHelpers.length - 1 === index && (
                <RenderHelpersListTitle
                  listTitle='findNewHelper'
                  withFilter={true}
                />
              )}
          </>
        )
      }

      //if (!isAllHelpersGet && isLastItem) {
      // return (
      //   <MaskedView maskElement={<MaskedElement />}>
      //     <RenderHelperCard />
      //   </MaskedView>
      // )
      //} else {
      return <RenderHelperCard />
      // }
    }
    return null
  }

  const renderImages = (): JSX.Element[] => {
    return images.map(
      (localFile: { file: Asset; id: string }, index): JSX.Element => (
        <View key={localFile.id}>
          <Attachment
            style={MARGIN_VERTICAL_SP2}
            //text={localFile?.file?.fileName ? localFile.file.fileName : ''}
            text={`${translate('common.photo')} ${
              index + 1 + previousImages.length
            }`}
            onDeletePress={() =>
              setImages(images.filter((subFile) => subFile.id !== localFile.id))
            }
          />
        </View>
      ),
    )
  }

  const renderFooter = (): JSX.Element => {
    //handleClose()
    return loadingHelpers && !isAllHelpersGet ? (
      <View style={LOADER_CONT}>
        <Loader />
      </View>
    ) : null
  }

  const renderPreviousImages = (): JSX.Element[] => {
    return previousImages.map(
      (localFile: { name: string; id: string }, index): JSX.Element => (
        <View key={localFile.id}>
          <Attachment
            style={MARGIN_VERTICAL_SP2}
            text={`${translate('common.photo')} ${index + 1}`}
            onDeletePress={() =>
              setPreviousImages(
                previousImages.filter((subFile) => subFile.id !== localFile.id),
              )
            }
          />
        </View>
      ),
    )
  }

  const DESC_INPUT: ViewStyle = {
    paddingBottom: 10,
    minHeight: 145,
    ...(errors.description && {
      borderColor: color.error,
      borderWidth: 2,
    }),
  }

  const translateX = useRef(new Animated2.Value(WINDOW_WIDTH)).current
  const transformStyle: ViewStyle = {
    transform: [
      {
        // @ts-ignore
        translateX,
      },
    ],
  }

  const handleOpen = () => {
    Animated2.timing(translateX, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  const handleClose = () => {
    Animated2.timing(translateX, {
      toValue: WINDOW_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  //const headerHeight: number = useSelector(common.headerHeight)
  const filterHeight: number =
    WINDOW_HEIGHT -
    (BOTTOM_NAVIGATION_HEIGHT + (Platform.OS === 'ios' ? 114 : 60))
  const FILTER_HEIGHT: ViewStyle = {
    height: filterHeight,
  }

  const FILTER_WRAPPER: ViewStyle = {
    position: 'absolute',
    //backgroundColor: color.palette.white,
    width: WINDOW_WIDTH,
    zIndex: 9,
    //top: 154,
    marginLeft: '5%',
    paddingRight: '5%',
    ...FILTER_HEIGHT,
  }

  useEffect(() => {
    if (isHelpersFilterVisible) handleOpen()
    else handleClose()
  }, [isHelpersFilterVisible])

  //const [isFilterGradient, setIsFilterGradient] = useState<boolean>(true)

  return (
    <BaseScreen
      type='fixed'
      withHeader
      isFormValidToNavigate={!category}
      gradientStyle={{ ...(category && BOTTOM) }}
      {...(isEditJobMode && {
        clientBtn: true,
        headerAnimate: headerStyle,
        textBack: 'postJob.headerTextBack',
        customActionOnPostJobPress: () => {
          navigation.setParams({ isEditJobMode: false })
          resetLocalState()
        },
      })}
      withoutHorizontalPaddings
      withoutGradient={
        isHelpersFilterVisible || isSearchCategoryDropdownInputTableOpen
      }
    >
      {isFileModalOpen && (
        <ImagePicker
          isMultiSelection
          toggleModal={() => {
            setIsFileModalOpen(!isFileModalOpen)
          }}
          onSelected={selectMultipleFile}
        />
      )}
      <Animated2.View style={[transformStyle, FILTER_WRAPPER]}>
        <ViewWithShadow style={FLEX_1}>
          <FilterHelpers
            style={FILTER}
            onClosePress={() => setIsHelpersFilterVisible(false)}
          />
        </ViewWithShadow>
      </Animated2.View>
      <View style={[VIEW, HZ_PADDING_5_PERCENT]}>
        {lastPostedJobId ? (
          <JobPosted />
        ) : (
          <AnimatedFlatList
            // keyboardShouldPersistTaps='always' // uncoment if keyboard should always been visible
            ListHeaderComponent={
              <TouchableHighlight
                underlayColor={'white'}
                activeOpacity={1.0}
                onPress={() => {
                  setIsSearchCategoryDropdownInputTableOpen(false)
                  setIsSearchCategoryDropdownInputListOpen(false)
                }}
                style={FLEX_1}
              >
                <View style={MARGIN_HORIZONTAL_2PX}>
                  <View style={[PADDING_TOP_SP6, PADDING_BOTTOM_SP3]}>
                    <Text
                      preset='header1'
                      tx={'postJob.title' + (isEditJobMode ? '3' : '1')}
                    />
                  </View>
                  {!isEditJobMode && archivedJobCategories.length > 0 && (
                    <ModeChangerText
                      style={PADDING_VERTICAL_SP4}
                      text={translate('postJob.paragraph1')}
                      isActive={isReusePreviousMode}
                      onToggle={() => {
                        dispatch(setJobInfo(null))
                        resetLocalState(['isReusePreviousMode'])
                        setIsReusePreviousMode(!isReusePreviousMode)
                      }}
                    />
                  )}
                  <RenderMiniBlock>
                    {isReusePreviousMode ? (
                      <PreviousPostsDropdown />
                    ) : (
                      <SearchCategoryDropdownInput
                        isShowAllCategiriesMode={
                          isSearchCategoryDropdownInputTableOpen
                        }
                        isSearchingMode={isSearchCategoryDropdownInputListOpen}
                        {...{
                          onSelectCategory,
                          ...((isEditJobMode || isReusePreviousMode) &&
                            category && {
                              placeholder: category.title,
                            }),
                          ...(category
                            ? { placeholder: category.title }
                            : { showCommonPlaceholder: true }),
                        }}
                        disabled={isEditJobMode}
                        onIsSearchingModeChanged={(isOpened: boolean) =>
                          setIsSearchCategoryDropdownInputListOpen(isOpened)
                        }
                        onIsShowAllCategiriesModeChanged={(isOpened: boolean) =>
                          setIsSearchCategoryDropdownInputTableOpen(isOpened)
                        }
                      />
                    )}
                  </RenderMiniBlock>
                  {category ? (
                    <>
                      <RenderMiniBlock titleTx='postJob.givePostTitle'>
                        <Input
                          disabled={isEditJobMode}
                          value={title}
                          onChangeText={(text) => setTitle(text)}
                          placeholder='postJob.jobTitle'
                          errorText={errors.title}
                          maxLength={70}
                        />
                      </RenderMiniBlock>
                      <RenderMeetingType />
                      {isInPersonMeeting && (
                        <RenderMiniBlock>
                          <AddressForm
                            {...((clientAddress ||
                              (isEditJobMode && jobInfo.address)) && {
                              address:
                                isEditJobMode && jobInfo.address
                                  ? jobInfo.address
                                  : clientAddress,
                            })}
                            onAddressChange={(newAddress: string) => {
                              setAddress(newAddress)
                            }}
                            makeAllFieldsTouchedToShowErrors={!!errors.address}
                          />
                        </RenderMiniBlock>
                      )}
                      <RenderMiniBlock titleTx='postJob.whenYouWantJobDone'>
                        <DatePicker
                          style={Z_INDEX_2}
                          mode='date'
                          {...(date && { date })}
                          onDateChange={(newDate) => setDate(newDate)}
                          errorText={errors.date}
                        />
                        <View
                          style={{
                            ...ROW,
                            ...PADDING_TOP_SP4,
                          }}
                        >
                          <View style={FLEX_4}>
                            <DatePicker
                              date={startAt}
                              onDateChange={(newDate) => setStartAt(newDate)}
                              mode='time'
                              errorText={errors.startAt}
                            />
                          </View>
                          <View style={[FLEX_1, MARGIN_TOP_SP3]}>
                            <Text tx='postJob.to' />
                          </View>
                          <View style={FLEX_4}>
                            <DatePicker
                              date={endAt}
                              onDateChange={(newDate) => setEndAt(newDate)}
                              mode='time'
                              errorText={errors.endAt}
                            />
                          </View>
                        </View>
                      </RenderMiniBlock>
                      {isReusePreviousMode && !isEditPreviousDetailsMode && (
                        <ModeChangerText
                          style={PADDING_BOTTOM_SP3}
                          text={translate('postJob.linkViewDetail')}
                          isActive={isEditPreviousDetailsMode}
                          onToggle={() =>
                            setIsEditPreviousDetailsMode(
                              !isEditPreviousDetailsMode,
                            )
                          }
                        />
                      )}
                      {(!isReusePreviousMode ||
                        (isReusePreviousMode && isEditPreviousDetailsMode)) && (
                        <View>
                          <RenderMiniBlock error={!payType && errors.payType}>
                            <TwoButtonsWithTitle
                              style={Z_INDEX_1}
                              title={translate('postJob.howWouldYouPay')}
                              firstBtnText={translate('common.hourly')}
                              {...(payType && {
                                activeOne: payType === hourly ? 1 : 2,
                              })}
                              secondBtnText={`${translate(
                                'common.fixed',
                              )} ${translate('common.price')}`}
                              onButtonsPress={(pressedOne) => {
                                if (pressedOne === 1) setFixPrice(0)
                                else {
                                  setMinPrice(0)
                                  setMaxPrice(0)
                                }
                                setPayType(
                                  pressedOne === 1
                                    ? HourlyOrFixed.HOURLY
                                    : HourlyOrFixed.FIXED,
                                )
                              }}
                            />
                          </RenderMiniBlock>
                          {payType && (
                            <RenderMiniBlock
                              error={payType && errors.payType}
                              titleTx={
                                'postJob.' +
                                (payType === hourly
                                  ? 'setHourlyPriceRange'
                                  : 'setSpecificPrice')
                              }
                            >
                              {payType === hourly ? (
                                <View
                                  style={{ ...ROW, ...ALIGIN_ITEMS_CENTER }}
                                >
                                  <InputPrice
                                    showHr
                                    style={{ ...FLEX_9 }}
                                    value={minPrice}
                                    onPriceChange={(newPrice) =>
                                      setMinPrice(newPrice)
                                    }
                                    inputStyle={PRICE_STYLE}
                                  />
                                  <Text
                                    text=' - '
                                    style={{ ...FLEX_1 }}
                                    preset='header2'
                                  />
                                  <InputPrice
                                    showHr
                                    style={{ ...FLEX_9 }}
                                    value={maxPrice}
                                    onPriceChange={(newPrice) =>
                                      setMaxPrice(newPrice)
                                    }
                                    inputStyle={PRICE_STYLE}
                                  />
                                </View>
                              ) : (
                                <InputPrice
                                  value={fixPrice}
                                  onPriceChange={(newPrice) =>
                                    setFixPrice(newPrice)
                                  }
                                  inputStyle={PRICE_STYLE}
                                />
                              )}
                            </RenderMiniBlock>
                          )}
                          <RenderMiniBlock
                            titleTx='postJob.descLabel'
                            style={PADDING_BOTTOM_0}
                          >
                            <TextInput
                              multiline
                              numberOfLines={7}
                              textAlignVertical='top'
                              style={{
                                ...GRAY_BORDER_RADIUS4,
                                ...PADDING_HORIZONTAL_SP3,
                                ...DESC_INPUT,
                                ...MARGIN_BOTTOM_0,
                              }}
                              value={description}
                              onChangeText={(text) => setDescription(text)}
                            />
                            <View style={ATTACH_BTN_VIEW_ON_DESC}>
                              <TouchableOpacity
                                onPress={() => setIsFileModalOpen(true)}
                              >
                                <SVGIcon icon='image' />
                              </TouchableOpacity>
                            </View>
                            <ShowError
                              text={errors.description}
                              style={DESCRIPTION_SHOW_ERROR}
                            />
                          </RenderMiniBlock>
                          <RenderMiniBlock>
                            {renderPreviousImages()}
                            {renderImages()}
                          </RenderMiniBlock>
                        </View>
                      )}
                      {!isAdditionalCriteriaMode && (
                        <RenderMiniBlock>
                          <ModeChangerText
                            text={translate(
                              'postJob.' +
                                (isAdditionalCriteriaMode
                                  ? 'viewLessCriteria'
                                  : 'viewAdditionalCriteria'),
                            )}
                            isActive={isAdditionalCriteriaMode}
                            onToggle={() =>
                              setIsAdditionalCriteriaMode(
                                !isAdditionalCriteriaMode,
                              )
                            }
                          />
                        </RenderMiniBlock>
                      )}

                      {isAdditionalCriteriaMode && (
                        <>
                          <RenderMiniBlock>
                            <TwoButtonsWithTitle
                              title={translate('postJob.howShouldBePosted')}
                              firstBtnText={translate('common.public')}
                              showQestionMarkAfterTitle
                              onQuestionMarkPress={() =>
                                toggleModal(!isModalOpen)
                              }
                              secondBtnText={translate('common.private')}
                              activeOne={isPublic ? 1 : 2}
                              onButtonsPress={onIsPublicButtonsPress}
                            />
                          </RenderMiniBlock>

                          <RenderMiniBlock titleTx='postJob.whatIsFrequency'>
                            <DropdownWithTextItems
                              placeholder={recurringIntervalDropdownPlaceholder}
                              items={[
                                oneTimeText,
                                dailyText,
                                weeklyText,
                                monthlyText,
                              ]}
                              onItemPress={(index) => {
                                if (!index) setFrequencyType('one_time')
                                else {
                                  setFrequencyType('recurring')
                                  let newRecurringInterval: IJobRecurringInterval =
                                    'month'
                                  if (index === 1) newRecurringInterval = 'day'
                                  else if (index === 2)
                                    newRecurringInterval = 'week'
                                  setRecurringInterval(newRecurringInterval)
                                }
                              }}
                            />
                          </RenderMiniBlock>
                          <RenderMiniBlock titleTx='postJob.wouldYouLikeCoverLetterOrResume'>
                            <DropdownWithTextItems
                              placeholder={coverLetterNeeded ? yesText : noText}
                              items={[noText, yesText]}
                              onItemPress={(index) =>
                                setCoverLetterNeeded(index ? true : false)
                              }
                            />
                          </RenderMiniBlock>
                          <RenderMiniBlock
                            titleTx='postJob.areThereAdditionalQuestions'
                            subtitleText={` (${translate('common.optional')})`}
                          >
                            <TouchableOpacity
                              onPress={() => {
                                setQuestions([...questions, ''])
                              }}
                            >
                              <Text
                                text={`+ ${translate('postJob.addQuestion')}`}
                                preset='header4'
                                color={color.primary}
                                style={{ ...UNDERLINE }}
                              />
                            </TouchableOpacity>
                          </RenderMiniBlock>
                          {questions.map((question: string, index: number) => (
                            <RenderQuestion
                              value={question}
                              onRemoveQuestionPress={() => {
                                setQuestions([
                                  ...questions.filter(
                                    (_, index2) => index !== index2,
                                  ),
                                ])
                              }}
                              onQuestionChange={(newText: string) => {
                                questions[index] = newText
                                setQuestions([...questions])
                              }}
                            />
                          ))}
                        </>
                      )}
                      <CommonInfoModal
                        toggleModal={() =>
                          setIsCancelJobNoticeOpen(!isCancelJobNoticeOpen)
                        }
                        visible={isCancelJobNoticeOpen}
                        icon='userAndCross'
                        title={translate('postJob.cancelJobNotice')}
                        content={translate('postJob.cancelJobNoticeDesc')}
                        buttonText={translate('postJob.gotIt')}
                        onButtonPress={() => {
                          setIsCancelJobNoticeOpen(false)
                          onSend()
                        }}
                        bottom={
                          <View style={MARGIN_TOP_SP3}>
                            <Text
                              tx='postJob.questionsAboutWhyPayFee'
                              style={GREEN_13_TEXT}
                            />
                            <InlineTouchableText
                              text={translate('postJob.viewOurTerms')}
                              textStyle={{
                                ...GREEN_13_TEXT,
                                ...UNDERLINE,
                                ...BOLD,
                              }}
                              onTextPress={() => {
                                useBeforeRemove({
                                  isValid: false,
                                  navigate: () =>
                                    navigation.navigate(privacyAndTerms, {
                                      whichTextShouldBeShown: 'terms',
                                    }),
                                })
                              }}
                            />
                          </View>
                        }
                      />
                      {isModalOpen && (
                        <Modal
                          animationType='fade'
                          transparent
                          visible={isModalOpen}
                          toggleModal={() => toggleModal(!isModalOpen)}
                          styleContainer={MODAL_CONTAINER}
                        >
                          <View style={ALIGIN_ITEMS_CENTER}>
                            <SVGIcon
                              icon='fieye'
                              size={35}
                              height={40}
                              color={color.primary}
                            />
                            <View style={[MARGIN_TOP_SP3, MARGIN_BOTTOM_SP2]}>
                              <Text
                                tx='postJob.publicvsprivatepost'
                                style={{ fontSize: 20 }}
                                preset='bold'
                                color={color.primary}
                              ></Text>
                              <Text>
                                <Text
                                  tx='postJob.publicPrivateDescription'
                                  style={{ textTransform: 'uppercase' }}
                                />
                                <Text text=' ' />
                                <Text tx='common.publicLow' preset='bold' />
                                <Text text=' ' />
                                <Text tx='postJob.publicPrivateDescription2' />
                                <Text text=' ' />
                                <Text tx='postJob.publicPrivateDescription' />
                                <Text text=' ' />
                                <Text tx='common.privateLow' preset='bold' />
                                <Text text=' ' />
                                <Text tx='postJob.publicPrivateDescription3' />
                              </Text>
                            </View>
                          </View>
                        </Modal>
                      )}
                      {previouslyUsedHelpers.length === 0 &&
                        helpers.length === 0 && (
                          <RenderHelpersListTitle
                            listTitle={
                              isReusePreviousMode
                                ? 'findNewHelper'
                                : 'helpersAvailable'
                            }
                            withFilter={true}
                          />
                        )}
                    </>
                  ) : (
                    <HowItWorks />
                  )}
                </View>
              </TouchableHighlight>
            }
            data={[
              ...(isReusePreviousMode ? previouslyUsedHelpers : []),
              ...helpers,
            ]}
            onScroll={scrollHandler}
            onContentSizeChange={(_, y) => {
              //console.log('xxx')
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
            onEndReachedThreshold={0.1}
            onEndReached={() => handleHelperList()}
            ListFooterComponent={renderFooter}
            keyboardShouldPersistTaps='handled'
          />
        )}
      </View>
      {category && !lastPostedJobId && (
        <View style={HZ_PADDING_5_PERCENT}>
          <Button
            tx={'postJob.' + (isEditJobMode ? 'updateJob' : 'postAndNotify')}
            preset={loading ? 'secondaryLoading' : 'secondary'}
            style={{ ...MARGIN_TOP_SP4, ...MARGIN_BOTTOM_SP3 }}
            onPress={() => {
              if (isNoErrors()) {
                if (isEditJobMode) onSend()
                else setIsCancelJobNoticeOpen(true)
              }
            }}
            disabled={loading}
          />
        </View>
      )}
    </BaseScreen>
  )
}

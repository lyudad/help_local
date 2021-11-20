/* eslint-disable */
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  TouchableOpacity,
  View,
  ViewStyle,
  Animated,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { common, consumer, user } from 'app/store/selectors'
import {
  Button,
  Modal,
  RowSpaceBetween,
  SVGIcon,
  Text,
  Hr,
  Loader,
  JobTotalPriceInfo,
  Filter,
  SearchCategoryDropdownInput,
  DatePicker,
} from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  ALIGIN_ITEMS_START,
  ALIGN_SELF_START,
  FLEX_1,
  FLEX_7,
  FULL_WIDTH,
  HZ_PADDING_5_PERCENT,
  MARGIN_BOTTOM_SP2,
  MARGIN_BOTTOM_SP5,
  MARGIN_HORIZONTAL_SP2,
  MARGIN_VERTICAL_SP2,
  MARGIN_VERTICAL_SP3,
  PADDING_HORIZONTAL_2PX,
  PADDING_HORIZONTAL_SP4,
  PADDING_VERTICAL_SP2,
  PADDING_VERTICAL_SP3,
  PADDING_VERTICAL_SP4,
  PADDING_VERTICAL_SP5,
  ROW,
  ROW_SPACE_BETWEEN,
  UNDERLINE,
  WINDOW_WIDTH,
} from 'constants/common-styles'
import { translate } from 'i18n'
import {
  EUserPaymentMethods,
  ICategory,
  ICheckoutPreview,
  IPostNewJobForThunk,
  IReceipt,
  TPluggedPaymentMethodValueVariants,
} from 'interfaces'
import {
  getBankAccountData,
  getCreditCardData,
  getReceipts,
} from 'screens/both/thunk'
import {
  setIsAllReceiptsGot,
  setPluggedPaymentMethod,
  setReceipts,
} from 'screens/both/reducers'
import {
  PlugPaymentMethod,
  ShowPluggedPaymentMethod,
  TPaymentMethodsLabels,
} from './sub-components'
import { Promo } from './sub-components/promo'
import Reanimated from 'react-native-reanimated'
import { color, spacing } from 'theme'
import dayjs from 'dayjs'
import { postJob } from 'screens/client/thunk'
import { setCachedJob } from 'screens/client/reducers'
import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native'
import { jobPosted } from 'constants/routes'
import { UserStackRouteProps } from 'navigation'
import { setOnScrollEventForGradient } from 'app/store/commonSlice'

const PAYPAL = 'paypal'

const LOADER_CONT: ViewStyle = {
  justifyContent: 'center',
  marginBottom: spacing[5],
}

const MARGIN_VERTICAL: ViewStyle = {
  marginVertical: 6,
}

const LIMIT = 4

const FILTER_WRAPPER: ViewStyle = {
  position: 'absolute',
  width: WINDOW_WIDTH,
  zIndex: 9,
  top: 240,
  marginLeft: '5%',
  paddingRight: '5%',
  height: '90%',
}

const AnimatedFlatList = Reanimated.createAnimatedComponent(FlatList)

export const Payment = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isFocused: boolean = useIsFocused()
  const route = useRoute<UserStackRouteProps<'account'>>()

  const pluggedPaymentMethod: TPluggedPaymentMethodValueVariants = useSelector(
    user.pluggedPaymentMethod,
  )

  const receipts: IReceipt[] = useSelector(user.receipts)
  const isAllReceiptsGot: boolean = useSelector(user.isAllReceiptsGot)
  const isGetReceiptsLoading: boolean = useSelector(user.isGetReceiptsLoading)
  const checkoutPreview: ICheckoutPreview = useSelector(user.checkoutPreview)
  const isGetJobCheckoutPreviewLoading: boolean = useSelector(
    user.isGetJobCheckoutPreviewLoading,
  )
  const cachedJob: IPostNewJobForThunk | null = useSelector(consumer.cachedJob)
  const primaryPaymentMethod: EUserPaymentMethods | null = useSelector(
    user.primaryPaymentMethod,
  )
  const lastPostedCachedJobId: number = useSelector(
    consumer.lastPostedCachedJobId,
  )
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  const [addPaymentMethodMode, setAddPaymentMethodMode] =
    useState<TPaymentMethodsLabels | null>(null)
  const [isCardOrBankAccountModalOpen, setIsCardOrBankAccountModalOpen] =
    useState<boolean>(false)
  const [page, setPage] = useState<number>(1)
  const [receiptForModal, setReceiptForModal] = useState<IReceipt | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false)

  //filter
  const [category, setCategory] = useState<ICategory | null>(null)
  const [createdAfter, setCreatedAfter] = useState<Date | null>(null)
  const [createdBefore, setCreatedBefore] = useState<Date | null>(null)

  const [tmpCategory, setTmpCategory] = useState<ICategory | null>(null)
  const [tmpCreatedAfter, setTmpCreatedAfter] = useState<Date | null>(null)
  const [tmpCreatedBefore, setTmpCreatedBefore] = useState<Date | null>(null)

  const handleGetReceipts = useCallback(
    (localPage?) => {
      const newPage = localPage || page
      if (!isAllReceiptsGot || localPage) {
        dispatch(
          getReceipts({
            limit: LIMIT,
            offset: LIMIT * (newPage - 1),
            ...(category && { categoryId: category.id }),
            ...(createdAfter && { createdAfter }),
            ...(createdBefore && { createdBefore }),
          }),
        )
        setPage(page + 1)
      }
    },
    [isAllReceiptsGot, category, createdAfter, createdBefore, page],
  )

  useEffect(() => {
    dispatch(setIsAllReceiptsGot(false))
    dispatch(setReceipts([]))
    setPage(1)
    handleGetReceipts(1)
  }, [category, createdAfter, createdBefore])

  useEffect(() => {
    if (pluggedPaymentMethod) {
      setAddPaymentMethodMode(null)
      if (cachedJob) {
        dispatch(postJob({ job: { ...cachedJob }, isCached: true }))
        dispatch(setCachedJob(null))
      }
    }
  }, [pluggedPaymentMethod])

  useEffect(() => {
    if (lastPostedCachedJobId) {
      navigation.navigate(jobPosted)
    }
  }, [lastPostedCachedJobId])

  useEffect(() => {
    if (route.params?.paidJobMiniInfoToShowReceiptOnModal) {
      setReceiptForModal({
        id: 999999999,
        amount: route.params.paidJobMiniInfoToShowReceiptOnModal.charges.total,
        rate: route.params.paidJobMiniInfoToShowReceiptOnModal.charges.total.toString(),
        serviceFee:
          route.params.paidJobMiniInfoToShowReceiptOnModal.charges.serviceFee.toString(),
        tax: route.params.paidJobMiniInfoToShowReceiptOnModal.charges.tax,
        hours:
          route.params.paidJobMiniInfoToShowReceiptOnModal.charges
            .hoursToCharge,
        createdAt:
          route.params.paidJobMiniInfoToShowReceiptOnModal
            .completedByConsumerAt,
        jobPost: {
          id: route.params.paidJobMiniInfoToShowReceiptOnModal.id,
          title: route.params?.paidJobMiniInfoToShowReceiptOnModal.title,
        },
        hourRate:
          route.params.paidJobMiniInfoToShowReceiptOnModal.charges.hourRate,
      })
    }
  }, [checkoutPreview])

  useEffect(() => {
    if (isFocused) {
      dispatch(getCreditCardData())
      dispatch(getBankAccountData())
      if (primaryPaymentMethod === PAYPAL && !pluggedPaymentMethod) {
        dispatch(setPluggedPaymentMethod({ isPaypal: true }))
      }
      /*
      now receipts are not supported for helpers at all
      i will uncomment it when they will be ready


        paidJobMiniInfoToShowReceiptOnModal
        will be sent by helper's job completed and paid  notifications

      if (route.params?.paidJobMiniInfoToShowReceiptOnModal) {
        dispatch(getJobCheckoutPreview({
          jobPostId: route.params.paidJobMiniInfoToShowReceiptOnModal.id,
        }))
      }
      */
    } else {
      dispatch(setReceipts([]))
      dispatch(setIsAllReceiptsGot(false))
      setPage(1)
      dispatch(setCachedJob(null))
    }
  }, [isFocused])

  const translateX = useRef(new Animated.Value(WINDOW_WIDTH)).current
  const transformStyle: ViewStyle = {
    transform: [
      {
        // @ts-ignore
        translateX,
      },
    ],
  }

  const handleOpen = () => {
    Animated.timing(translateX, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()
  }
  const handleClose = () => {
    Animated.timing(translateX, {
      toValue: WINDOW_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (isFilterOpen) handleOpen()
    else handleClose()
  }, [isFilterOpen])

  const ReceiptsFilter = (): JSX.Element => {
    return (
      <Filter
        onApplyPress={() => {
          setCategory(tmpCategory)
          setCreatedAfter(tmpCreatedAfter)
          setCreatedBefore(tmpCreatedBefore)
          setIsFilterOpen(false)
        }}
        onClearAllPress={() => {
          setTmpCategory(null)
          setTmpCreatedAfter(null)
          setTmpCreatedBefore(null)
          setCategory(null)
          setCreatedAfter(null)
          setCreatedBefore(null)
          setIsFilterOpen(false)
        }}
        onClosePress={() => {
          setTmpCategory(category)
          setTmpCreatedAfter(createdAfter)
          setTmpCreatedBefore(createdBefore)
          setIsFilterOpen(false)
        }}
      >
        <SearchCategoryDropdownInput
          style={MARGIN_VERTICAL_SP2}
          showCommonPlaceholder
          {...(tmpCategory && { placeholder: tmpCategory.title })}
          onSelectCategory={(selectedCategory) => {
            setTmpCategory(selectedCategory)
          }}
        />
        <Text
          tx='payment.betweenDates'
          style={[MARGIN_VERTICAL_SP2, ALIGN_SELF_START]}
        />
        <View style={[ROW, MARGIN_BOTTOM_SP2]}>
          <View style={FLEX_7}>
            <DatePicker
              date={tmpCreatedAfter}
              withoutArrow
              mode='date'
              onDateChange={(newDate) => {
                setTmpCreatedAfter(newDate)
              }}
            />
          </View>
          <View style={FLEX_1} />
          <View style={FLEX_7}>
            <DatePicker
              date={tmpCreatedBefore}
              withoutArrow
              mode='date'
              onDateChange={(newDate) => {
                setTmpCreatedBefore(newDate)
              }}
            />
          </View>
        </View>
      </Filter>
    )
  }

  const renderReceipt = (receipt: IReceipt, index?: number) => {
    const date: string =
      translate('payment.completed') +
      dayjs(receipt.createdAt).format(' MM/DD/YY')
    return (
      <>
        {!addPaymentMethodMode && (
          <TouchableOpacity
            onPress={() => {
              setReceiptForModal({ ...receipt })
            }}
            style={[ROW_SPACE_BETWEEN, PADDING_HORIZONTAL_SP4, MARGIN_VERTICAL]}
          >
            <View style={[ALIGIN_ITEMS_START]}>
              <Text
                text={receipt.jobPost.title}
                preset='header3'
                style={UNDERLINE}
              />
              <Text text={date} preset='subtitle' />
            </View>
            <SVGIcon icon='arrowRight2' size={12} />
          </TouchableOpacity>
        )}
      </>
    )
  }

  const renderFooter = (): JSX.Element => {
    return isGetReceiptsLoading && !addPaymentMethodMode ? (
      <View style={LOADER_CONT}>
        <Loader />
      </View>
    ) : null
  }

  return (
    <>
      <AnimatedFlatList
        ListHeaderComponent={
          <>
            <Animated.ScrollView style={[FILTER_WRAPPER, transformStyle]}>
              <ReceiptsFilter />
            </Animated.ScrollView>
            <View style={[FLEX_1, HZ_PADDING_5_PERCENT]}>
              <Text
                tx='payment.linkPayment'
                preset='header3_500'
                style={[ALIGN_SELF_START, MARGIN_VERTICAL_SP3]}
              />
              {pluggedPaymentMethod || addPaymentMethodMode ? (
                <>
                  {pluggedPaymentMethod && (
                    <ShowPluggedPaymentMethod {...{ pluggedPaymentMethod }} />
                  )}
                  {addPaymentMethodMode && (
                    <PlugPaymentMethod
                      method={addPaymentMethodMode}
                      onExitPlugPaymentMethod={() => {
                        setAddPaymentMethodMode(null)
                      }}
                    />
                  )}
                </>
              ) : (
                <>
                  <Button
                    tx='payment.addCardOrBankAccount'
                    preset='fourth'
                    style={[PADDING_VERTICAL_SP4, MARGIN_VERTICAL_SP2]}
                    onPress={() => {
                      setIsCardOrBankAccountModalOpen(true)
                    }}
                  />
                  <Button
                    preset='fourth'
                    style={[MARGIN_VERTICAL_SP2, PADDING_VERTICAL_SP2]}
                    onPress={() => {
                      setAddPaymentMethodMode('paypal')
                    }}
                  >
                    <View style={[ROW, ALIGIN_ITEMS_CENTER]}>
                      <SVGIcon icon='paypal' width={50} height={35} />
                      <Text
                        text={translate(
                          'payment.addPayPalAcccount',
                        ).toUpperCase()}
                        preset='subtitleBold'
                      />
                    </View>
                  </Button>
                </>
              )}
              <Modal
                toggleModal={() =>
                  setIsCardOrBankAccountModalOpen(!isCardOrBankAccountModalOpen)
                }
                visible={isCardOrBankAccountModalOpen}
              >
                <View style={[ROW, PADDING_VERTICAL_SP5]}>
                  <Button
                    tx='payment.creditCard'
                    preset='fourth'
                    onPress={() => {
                      setIsCardOrBankAccountModalOpen(false)
                      setAddPaymentMethodMode('credit_card')
                    }}
                    style={MARGIN_HORIZONTAL_SP2}
                  />
                  <Button
                    tx='payment.bankAccount'
                    preset='fourth'
                    onPress={() => {
                      setIsCardOrBankAccountModalOpen(false)
                      setAddPaymentMethodMode('bank_account')
                    }}
                    style={MARGIN_HORIZONTAL_SP2}
                  />
                </View>
              </Modal>
              {(receiptForModal || isGetJobCheckoutPreviewLoading) && (
                <Modal
                  toggleModal={() => setReceiptForModal(null)}
                  visible={true}
                >
                  {receiptForModal ? (
                    <View style={FULL_WIDTH}>
                      <JobTotalPriceInfo
                        isHourly={receiptForModal.hours !== null}
                        title={receiptForModal.jobPost.title}
                        completedAt={new Date(receiptForModal.createdAt)}
                        withoutTimelog={true}
                        calculatedTaxIncluded={receiptForModal.tax}
                        isTotalGreen
                        calculatedTotal={receiptForModal.amount}
                        calculatedHoursLogged={receiptForModal.hours}
                        calculatedFee={parseFloat(receiptForModal.serviceFee)}
                        calculatedRate={parseFloat(receiptForModal.rate)}
                        hourRate={receiptForModal.hourRate}
                      />
                    </View>
                  ) : (
                    <Loader preset='primayWithVerticalMarginSp3' />
                  )}
                </Modal>
              )}
              {!addPaymentMethodMode && <Promo />}
            </View>
            {!addPaymentMethodMode && (
              <View style={HZ_PADDING_5_PERCENT}>
                <Text
                  tx='payment.receipts'
                  preset='header3_500'
                  style={[ALIGN_SELF_START, MARGIN_BOTTOM_SP5]}
                />
                <View style={PADDING_HORIZONTAL_SP4}>
                  <RowSpaceBetween
                    style={PADDING_VERTICAL_SP3}
                    StartItem={<Text tx='payment.jobs' preset='header3' />}
                    EndItem={
                      <TouchableOpacity onPress={() => setIsFilterOpen(true)}>
                        <SVGIcon
                          icon='filter'
                          color={
                            category || createdAfter || createdBefore
                              ? color.primary
                              : color.secondary
                          }
                        />
                      </TouchableOpacity>
                    }
                  />
                  <Hr style={MARGIN_BOTTOM_SP2} />
                </View>
              </View>
            )}
          </>
        }
        ListHeaderComponentStyle={{
          ...PADDING_HORIZONTAL_2PX,
          ...(addPaymentMethodMode === PAYPAL && { height: 400 }),
        }}
        scrollEnabled={addPaymentMethodMode !== PAYPAL}
        data={receipts}
        //onScroll={scrollHandler}
        /* eslint-disable @typescript-eslint/no-explicit-any */
        renderItem={({ item, index }: any) => renderReceipt(item, index)}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item: IReceipt) => item.id.toString()}
        ListFooterComponent={renderFooter}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          handleGetReceipts()
        }}
        onContentSizeChange={(x, y) => {
          dispatch(
            setOnScrollEventForGradient({
              ...onScrollEventForGradient,
              contentSize: {
                height: y,
              },
            }),
          )
        }}
        onScroll={(e) => {
          dispatch(setOnScrollEventForGradient(e.nativeEvent))
        }}
      />
    </>
  )
}

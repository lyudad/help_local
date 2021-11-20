/* eslint-disable */
import React, { useCallback, useState, useEffect } from 'react'
import { View, ViewStyle, TextInput, TextStyle } from 'react-native'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker'

import { UserStackRouteProps } from 'navigation'
import { common, helper } from 'app/store/selectors'
import {
  getJobById,
  bidOnJob,
  getBidInfo,
  updateBidOnJob,
  cleanJobAndBidInfo,
} from 'screens/helper/thunk'
import {
  IJob,
  IJobBidQuery,
  IBidInfo,
  IScreeningQuestions,
  IScreeningQuestionsAnswer,
  IHelperRequestsStatus,
  ERequestStatus,
  IPostJob,
} from 'interfaces'
import {
  Header,
  Screen,
  WithHorizontalPaddings,
  JobPostCard,
  Text,
  Button,
  Input,
  SVGIcon,
  BottomNavigation,
  Attachment,
  ButtonPresetNames,
} from 'components'
import { color, spacing } from 'theme'
import { bidSubmitted, helperDashboard } from 'constants/routes'
import { translate } from 'i18n'
import { MARGIN_BOTTOM_SP3, TEXT_ALIGIN_LEFT } from 'constants/common-styles'
import { setJobList, setRequestsStatus } from '../reducers'

const FULL: ViewStyle = {
  flex: 1,
}
const SECTION: ViewStyle = {
  marginTop: spacing[7],
}
const SMALL_MARGIN_TOP: ViewStyle = {
  marginTop: spacing[2],
}
const LARGE_MARGIN_BOTTOM: ViewStyle = {
  marginBottom: spacing[6],
}
const SUBSECTION: ViewStyle = {
  ...SMALL_MARGIN_TOP,
  ...LARGE_MARGIN_BOTTOM,
}
const DESC_INPUT: ViewStyle & TextStyle = {
  ...SMALL_MARGIN_TOP,
  textAlignVertical: 'top',
  borderColor: color.palette.lightGrey,
  borderWidth: 1,
  borderRadius: 4,
  marginBottom: spacing[2],
  height: 93,
  padding: spacing[2],
}
const DESCRIPTION_ROW: ViewStyle = {
  flexDirection: 'row',
  marginTop: spacing[5],
  alignItems: 'center',
}
const DESCRIPTION_TEXT_CONTAINER: ViewStyle = {
  flex: 1,
  marginLeft: spacing[5],
  alignItems: 'flex-start',
}
const BOTTOM_CONTAINER: ViewStyle = {
  ...LARGE_MARGIN_BOTTOM,
  ...SECTION,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
}
const BTN_BID: ViewStyle = {
  width: '70%',
}
const BTN_BID_TEXT: TextStyle = {
  color: color.palette.greySlow,
}
const ATTACHMENT: ViewStyle = {
  marginBottom: spacing[3],
}

export const JobBidScreen = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const route = useRoute<UserStackRouteProps<'jobBid'>>()

  // if we are trying to update a bid, the jobID will contain bid id instead of job id
  const jobID = route.params.id

  const isUpdate: boolean = route.params.isUpdate
  const isPrevBid: boolean = !!route.params?.bidType
  const job: IJob = useSelector(helper.job)
  const bid: IBidInfo = useSelector(helper.bidInfo)
  const jobList: IPostJob[] = useSelector(helper.jobList)
  const requestsStatus: IHelperRequestsStatus = useSelector(
    helper.requestsStatus,
  )
  const isBidOnJobLoading: boolean = useSelector(helper.isBidOnJobLoading)
  const isUpdateBidOnJobLoading: boolean = useSelector(
    helper.isUpdateBidOnJobLoading,
  )

  const error: string = useSelector(common.error)

  const isScreenFocused: boolean = useIsFocused()

  const [paidAmount, setPaidAmount] = useState<string>('')
  const [files, setFile] = useState<
    { file: DocumentPickerResponse; id: string }[]
  >([])
  const [previousFiles, setPreviousFile] = useState<
    { name: string; id: string }[]
  >([])
  const [materialsCost, setMaterialsCost] = useState<string>('')
  const [answersList, setAnswersList] = useState<IScreeningQuestionsAnswer[]>(
    [],
  )

  useEffect(() => {
    if (isScreenFocused) {
    } else {
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          updateBidOnJobRequestStatus: ERequestStatus.NOT_SENT_YET,
          bidOnJobRequestStatus: ERequestStatus.NOT_SENT_YET,
        }),
      )
    }
  }, [isScreenFocused])

  useEffect(() => {
    if (isScreenFocused && error && error.includes('already has hired a bid')) {
      dispatch(setJobList(jobList.filter((job: IPostJob) => job.id !== jobID)))
      navigation.navigate(helperDashboard)
    }
  }, [error])

  useEffect(() => {
    if (
      requestsStatus.bidOnJobRequestStatus === ERequestStatus.SUCCESS ||
      requestsStatus.updateBidOnJobRequestStatus === ERequestStatus.SUCCESS
    ) {
      setFormValid(true)
      navigation.navigate(bidSubmitted, {
        isUpdate:
          requestsStatus.updateBidOnJobRequestStatus === ERequestStatus.SUCCESS,
      })
    }
  }, [requestsStatus])

  useFocusEffect(
    useCallback(() => {
      if (isUpdate) {
        dispatch(getBidInfo({ id: jobID }))
      } else {
        dispatch(getJobById(jobID))
      }
      return () => (
        dispatch(cleanJobAndBidInfo()),
        setPaidAmount(''),
        setMaterialsCost(''),
        setFile([]),
        setPreviousFile([]),
        setAnswersList([])
      )
    }, [isUpdate, jobID]),
  )

  useEffect(() => {
    if (jobID && job?.screeningQuestions) {
      setAnswersList(
        job.screeningQuestions.map((question) => {
          return {
            questionId: question.id,
            answer: '',
          }
        }),
      )
    }
  }, [jobID, job])

  useEffect(() => {
    if (bid) {
      const previousFilesList = bid?.attachments?.map((file) => {
        return { name: file.filename, id: file.id }
      })
      const answers = bid?.jobPostInfo?.screeningQuestions?.map((quest) => {
        return { answer: quest.answer, questionId: quest.id }
      })

      setPaidAmount(bid?.requestedAmount?.toString())
      setMaterialsCost(bid?.materialsCost?.toString())
      setPreviousFile(previousFilesList ? previousFilesList : [])
      setAnswersList(answers ? answers : [])
    }
  }, [bid])

  const [isFormValid, setFormValid] = useState<boolean>(false)

  const onSend = () => {
    if (isUpdate) {
      dispatch(
        updateBidOnJob({
          data: {
            id: bid.id,
            requestedAmount: Number.parseFloat(paidAmount),
            materialsCost: Number.parseFloat(materialsCost),
            screeningQuestionsAnswers: answersList,
          },
          localeFiles: files,
          previousFiles: previousFiles.map((file) => file.id),
        }),
      )
    } else {
      const data: IJobBidQuery = {
        job_post_id: job.id,
        requested_amount: Number.parseFloat(paidAmount),
        materials_cost: Number.parseFloat(materialsCost),
        screeningQuestionsAnswers: answersList,
      }
      dispatch(bidOnJob({ data, localeFiles: files }))
    }
  }

  let mainSendBtnPreset: ButtonPresetNames = 'primary'
  let isMainBtnDisabled: boolean = false
  if (
    ((job?.fixPrice || bid?.jobPostInfo?.fixPrice) && !paidAmount) ||
    (!job?.fixPrice && !bid?.jobPostInfo?.fixPrice && !paidAmount) ||
    ((job?.coverLetterNeeded || bid?.jobPostInfo?.coverLetterNeeded) &&
      !files.length &&
      !previousFiles.length)
  ) {
    mainSendBtnPreset = 'primaryDisabled'
    isMainBtnDisabled = true
  }
  if (isBidOnJobLoading || isUpdateBidOnJobLoading) {
    mainSendBtnPreset = 'primaryLoading'
    isMainBtnDisabled = true
  }

  const selectOneFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.plainText,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.pdf,
        ],
      })
      setFile([...files, { id: `${res.name}${new Date()}`, file: res }])
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        console.log('Error at picker', err)
        throw err
      }
    }
  }

  const goBack = useCallback(() => navigation.goBack(), [navigation])

  const renderQuestionsForJobBid = (
    list: IScreeningQuestions[],
  ): JSX.Element[] => {
    return list.map(
      (quest: IScreeningQuestions): JSX.Element => (
        <View key={quest.id} style={SMALL_MARGIN_TOP}>
          <Text preset='header4slim' text={quest.title} />
          <TextInput
            editable={!isPrevBid}
            multiline
            value={
              answersList.find(
                (answer: IScreeningQuestionsAnswer) =>
                  quest.id === answer.questionId,
              )?.answer
            }
            onChangeText={(text) =>
              setAnswersList([
                ...answersList.filter((ans) => ans.questionId !== quest.id),
                { questionId: quest.id, answer: text },
              ])
            }
            numberOfLines={7}
            style={DESC_INPUT}
            placeholder={translate('jobBid.placeholder4')}
          />
        </View>
      ),
    )
  }

  const renderQuestionsForUpdateBid = (
    list: IScreeningQuestions[],
  ): JSX.Element[] => {
    return list.map(
      (answer: IScreeningQuestions): JSX.Element => (
        <View key={answer.id} style={SMALL_MARGIN_TOP}>
          <Text preset='header4slim' text={answer.title} />
          <TextInput
            editable={!isPrevBid}
            multiline
            value={
              answersList.find(
                (ans: IScreeningQuestionsAnswer) =>
                  ans.questionId === answer.id,
              )?.answer
            }
            onChangeText={(text) => {
              return setAnswersList([
                ...answersList.filter((ans) => ans.questionId !== answer.id),
                { questionId: answer.id, answer: text },
              ])
            }}
            numberOfLines={7}
            style={DESC_INPUT}
            placeholder={translate('jobBid.placeholder4')}
          />
        </View>
      ),
    )
  }

  const renderFiles = (): JSX.Element[] => {
    return files.map(
      (localFile: {
        file: DocumentPickerResponse
        id: string
      }): JSX.Element => (
        <View key={localFile.id} style={ATTACHMENT}>
          <Attachment
            text={localFile.file.name}
            onDeletePress={() => {
              if (!isPrevBid)
                setFile(files.filter((subFile) => subFile.id !== localFile.id))
            }}
          />
        </View>
      ),
    )
  }

  const renderPreviousFiles = (): JSX.Element[] => {
    return previousFiles.map(
      (localFile: { name: string; id: string }): JSX.Element => (
        <View key={localFile.id} style={ATTACHMENT}>
          <Attachment
            text={localFile.name}
            onDeletePress={() =>
              setPreviousFile(
                previousFiles.filter((subFile) => subFile.id !== localFile.id),
              )
            }
          />
        </View>
      ),
    )
  }

  return (
    <View style={FULL}>
      <Header
        placeholder='header.helperPlaceholder'
        //textBack='jobBid.headerTextBack'
        isFormValidToNavigate={isFormValid}
      />
      <Screen preset='scroll' backgroundColor={color.transparent}>
        <WithHorizontalPaddings style={MARGIN_BOTTOM_SP3}>
          {(job || bid) && (
            <>
              <JobPostCard
                id={isUpdate ? job?.id || bid?.jobPostInfo.id : jobID}
                style={SECTION}
                additionalHeader={route.params?.bidType}
                title={job?.title || bid?.jobPostInfo?.title}
                fixPrice={job?.fixPrice || bid?.jobPostInfo?.fixPrice}
                minPrice={job?.minPrice || bid?.jobPostInfo?.minPrice}
                maxPrice={job?.maxPrice || bid?.jobPostInfo?.maxPrice}
                description={job?.description || bid?.jobPostInfo?.description}
                isBid
                isValidForNavigateFullList={isFormValid}
                isCompleted={job?.completed || bid?.jobPostInfo?.completed}
              />
              {!job?.completed && !bid?.jobPostInfo?.completed && (
                <>
                  <View style={SECTION}>
                    <Text preset='header3bold' tx='jobBid.title1' />
                    {(job?.coverLetterNeeded ||
                      bid?.jobPostInfo?.coverLetterNeeded) && (
                      <>
                        <Text
                          preset='header4slim'
                          tx='jobBid.subtitle1'
                          style={SMALL_MARGIN_TOP}
                        />
                        <Button
                          disabled={isPrevBid}
                          preset='seventh'
                          style={SUBSECTION}
                          onPress={() => selectOneFile()}
                        >
                          <Text>
                            <Text
                              preset='header4'
                              text='+ '
                              color={color.palette.grey}
                            />
                            <Text
                              preset='header5'
                              tx='jobBid.btnUploadDoc'
                              color={color.palette.grey}
                            />
                          </Text>
                        </Button>
                      </>
                    )}
                    {renderPreviousFiles()}
                    {renderFiles()}
                    <View style={SUBSECTION}>
                      <Text
                        preset='header4slim'
                        tx={`jobBid.subtitle${
                          job?.minPrice || bid?.jobPostInfo?.minPrice
                            ? '2'
                            : '3'
                        }`}
                      />
                      <Input
                        disabled={isPrevBid}
                        leftText='$'
                        presetLeftText='header5bold'
                        placeholder={`jobBid.placeholder${
                          job?.minPrice || bid?.jobPostInfo?.minPrice
                            ? '1'
                            : '2'
                        }`}
                        wrapperStyle={SMALL_MARGIN_TOP}
                        keyboardType='number-pad'
                        value={paidAmount}
                        onChangeText={(data) => setPaidAmount(data)}
                      />
                    </View>
                    {(job?.fixPrice || bid?.jobPostInfo?.fixPrice) && (
                      <View style={SUBSECTION}>
                        <Text preset='header4slim' tx='jobBid.subtitle6' />
                        <Input
                          disabled={isPrevBid}
                          leftText='$'
                          presetLeftText='header5bold'
                          placeholder='jobBid.placeholder3'
                          wrapperStyle={SMALL_MARGIN_TOP}
                          keyboardType='number-pad'
                          value={materialsCost}
                          onChangeText={(data) => setMaterialsCost(data)}
                        />
                      </View>
                    )}
                  </View>
                  {job?.screeningQuestions && (
                    <View style={SECTION}>
                      <Text preset='header3bold' tx='jobBid.title2' />
                      {renderQuestionsForJobBid(job?.screeningQuestions)}
                    </View>
                  )}
                  {bid?.jobPostInfo?.screeningQuestions && (
                    <View style={SECTION}>
                      <Text preset='header3bold' tx='jobBid.title2' />
                      {renderQuestionsForUpdateBid(
                        bid?.jobPostInfo?.screeningQuestions,
                      )}
                    </View>
                  )}
                  <View style={SECTION}>
                    <Text preset='header3bold' tx='jobBid.title3' />
                    <View style={DESCRIPTION_ROW}>
                      <SVGIcon
                        icon='calendar'
                        size={30}
                        color={color.primary}
                      />
                      <View style={DESCRIPTION_TEXT_CONTAINER}>
                        <Text preset='subtitle' tx='jobDetailScreen.date' />
                        <Text
                          preset='bold'
                          text={dayjs(
                            job?.startAt || bid?.jobPostInfo?.startAt,
                          ).format('MMMM DD, YYYY')}
                        />
                      </View>
                    </View>
                    <View style={DESCRIPTION_ROW}>
                      <SVGIcon icon='time' size={30} color={color.primary} />
                      <View style={DESCRIPTION_TEXT_CONTAINER}>
                        <Text preset='subtitle' tx='jobDetailScreen.time' />
                        <Text
                          preset='bold'
                          text={`${dayjs(
                            job?.startAt || bid?.jobPostInfo?.startAt,
                          ).format('h:mm A')}-${dayjs(
                            job?.endAt || bid?.jobPostInfo?.endAt,
                          ).format('h:mm A')}`}
                        />
                      </View>
                    </View>
                    <View style={DESCRIPTION_ROW}>
                      <SVGIcon icon='mapMark' size={30} color={color.primary} />
                      <View style={DESCRIPTION_TEXT_CONTAINER}>
                        <Text preset='subtitle' tx='jobDetailScreen.address' />
                        <Text
                          preset='bold'
                          style={TEXT_ALIGIN_LEFT}
                          text={
                            job?.address?.formatted ||
                            bid?.jobPostInfo?.address?.formatted ||
                            translate('jobListingFull.thisIsVirtualJob')
                          }
                        />
                      </View>
                    </View>
                  </View>
                  {!route.params?.bidType && (
                    <View style={BOTTOM_CONTAINER}>
                      <Button
                        disabled={isMainBtnDisabled}
                        preset={mainSendBtnPreset}
                        tx={isUpdate ? 'jobBid.btnUpdate' : 'jobBid.btnBid'}
                        style={BTN_BID}
                        onPress={onSend}
                      />
                      <Button
                        preset='transparent'
                        tx='common.cancel'
                        textStyle={BTN_BID_TEXT}
                        onPress={goBack}
                      />
                    </View>
                  )}
                </>
              )}
            </>
          )}
        </WithHorizontalPaddings>
      </Screen>
      <BottomNavigation isFormValidToNavigate={isFormValid} />
    </View>
  )
}

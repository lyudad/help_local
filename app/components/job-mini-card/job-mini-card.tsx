import React, { useEffect, useState } from 'react'
import { View, ViewStyle, TouchableOpacity } from 'react-native'
import { Button, Modal, SVGIcon, Text } from 'components'
import dayjs from 'dayjs'
import {
  JUSTIFY_CONTENT_CENTER,
  MARGIN_VERTICAL_SP3,
  MARGIN_VERTICAL_SP5,
  ROW,
} from 'constants/common-styles'
import { color } from 'theme'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/core'
import { removeJob } from 'screens/client/thunk'
import { consumer } from 'app/store/selectors'
import { setJobInfo, setRequestsStatus } from 'screens/client/reducers'
import { setSuccess } from 'app/store/commonSlice'
import { translate } from 'i18n'
import { ERequestStatus, IConsumerRequestsStatus } from 'interfaces'
import { myJobs, privacyAndTerms } from 'constants/routes'
import { JobMiniCardProps } from './job-mini-card.props'

const WRAPPER: ViewStyle = {
  justifyContent: 'center',
}

const ROW_FIRST_ITEM: ViewStyle = {
  paddingTop: 2,
}

export const JobMiniCard = ({
  title,
  status,
  date,
  jobId,
  style,
}: JobMiniCardProps): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [isModal, setIsModal] = useState<boolean>(false)
  const loadingRemoveJob: boolean = useSelector(consumer.loadingRemoveJob)
  const requestsStatus: IConsumerRequestsStatus = useSelector(
    consumer.requestsStatus,
  )
  const ACTIVE = 'active'

  useEffect(() => {
    if (requestsStatus.removeJobRequestStatus === ERequestStatus.SUCCESS) {
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          removeJobRequestStatus: ERequestStatus.NOT_SENT_YET,
        }),
      )
      setJobInfo(null)
      navigation.navigate(myJobs)
      setIsModal(false)
      dispatch(setSuccess(translate('jobDetailScreen.jobDeletedSuccess')))
    }
  }, [requestsStatus])

  return (
    <View style={{ ...WRAPPER, ...style }}>
      <Text text={title} preset='header1' />
      <View style={[ROW, JUSTIFY_CONTENT_CENTER]}>
        <View style={ROW_FIRST_ITEM}>
          <Text>
            <Text
              tx={`jobDetailScreen.${
                status === ACTIVE ? 'activeJob' : 'pendingJob'
              }`}
              preset='subtitleBold'
            />
            <Text text=' / ' preset='subtitleBold' />
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => setIsModal(true)}>
            <Text
              tx={`jobDetailScreen.${
                status === ACTIVE ? 'cancelJob' : 'removeJob'
              }`}
              preset='subtitleBoldLink'
            />
          </TouchableOpacity>
        </View>
      </View>
      <Text>
        <Text tx='jobDetailScreen.posted' preset='subtitle' />
        <Text text=' ' preset='subtitle' />
        <Text text={dayjs(date).format('MMMM DD, YYYY')} preset='subtitle' />
      </Text>
      <Modal visible={isModal} toggleModal={() => setIsModal(false)}>
        {status === ACTIVE ? (
          <>
            <SVGIcon icon='crossInPentagon' color={color.primary} size={40} />
            <View style={MARGIN_VERTICAL_SP3}>
              <Text
                preset='header3bold'
                tx='jobDetailScreen.modalCancelTitle'
              />
            </View>
            <Text>
              <Text tx='jobDetailScreen.modalCancelText1' />
              <Text text=' ' />
              <Text preset='bold' tx='jobDetailScreen.modalCancelText2' />
              <Text text=' ' />
              <Text tx='jobDetailScreen.modalCancelText3' />
            </Text>
            <Button
              disabled={loadingRemoveJob}
              preset={loadingRemoveJob ? 'primaryLoading' : 'primary'}
              tx='jobDetailScreen.modalCancelBtn'
              style={MARGIN_VERTICAL_SP5}
              onPress={() => {
                dispatch(removeJob({ jobPostId: jobId, removeFrom: 'active' }))
              }}
            />
            <Text
              preset='subtitle'
              tx='jobDetailScreen.modalQuestion'
              color={color.primary}
            />
            <TouchableOpacity
              onPress={() => {
                setIsModal(false)
                navigation.navigate(privacyAndTerms, {
                  whichTextShouldBeShown: 'terms',
                })
              }}
            >
              <Text
                preset='subtitleBold'
                tx='jobDetailScreen.modalTermOfUse'
                color={color.primary}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <SVGIcon icon='crossInSquare' color={color.primary} size={40} />
            <View style={MARGIN_VERTICAL_SP3}>
              <Text
                preset='header3bold'
                tx='jobDetailScreen.modalRemoveTitle'
              />
            </View>
            <Text tx='jobDetailScreen.modalRemoveText' />
            <Button
              disabled={loadingRemoveJob}
              preset={loadingRemoveJob ? 'primaryLoading' : 'primary'}
              tx='jobDetailScreen.modalRemoveBtn'
              style={MARGIN_VERTICAL_SP5}
              onPress={() => {
                dispatch(removeJob({ jobPostId: jobId, removeFrom: 'pending' }))
              }}
            />
          </>
        )}
      </Modal>
    </View>
  )
}

JobMiniCard.defaultProps = {
  style: {},
}

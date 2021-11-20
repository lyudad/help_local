import React, { memo, useState } from 'react'
import { View } from 'react-native'

import {
  Button,
  SVGIcon,
  Text,
  Modal,
  JobTotalPriceInfo,
  ViewTimeLogsContent,
  Loader,
} from 'components'
import { color } from 'theme'
import {
  ALIGIN_ITEMS_CENTER,
  FULL_WIDTH,
  MARGIN_TOP_SP5,
  MARGIN_VERTICAL_SP3,
} from 'constants/common-styles'
import { ICheckoutPreview, IJobInfo, ITrackerInfo } from 'interfaces'
import { useSelector } from 'react-redux'
import { user } from 'app/store/selectors'

interface IProps {
  toggleModal: () => void
  isModal: boolean
  trackerInfo: ITrackerInfo[]
  loadingTrackerInfo: boolean
  jobInfo: IJobInfo
  onApprove: () => void
  loadingCompleteJob: boolean
}

export const ShowModal = memo(
  ({
    isModal,
    toggleModal,
    trackerInfo,
    loadingTrackerInfo,
    jobInfo,
    onApprove,
    loadingCompleteJob,
  }: IProps): JSX.Element => {
    const MAIN = 'main'
    const [modalContentVariant, setModalContentVariant] = useState<
      'main' | 'time_log'
    >('main')

    const checkoutPreview: ICheckoutPreview = useSelector(user.checkoutPreview)
    const isGetJobCheckoutPreviewLoading: boolean = useSelector(
      user.isGetJobCheckoutPreviewLoading,
    )

    return (
      <Modal
        visible={isModal}
        toggleModal={() => {
          if (modalContentVariant === MAIN) {
            toggleModal()
          } else {
            setModalContentVariant('main')
          }
        }}
      >
        {!checkoutPreview || isGetJobCheckoutPreviewLoading ? (
          <Loader preset='primayWithVerticalMarginSp3' />
        ) : (
          <>
            {modalContentVariant === MAIN ? (
              <View style={FULL_WIDTH}>
                <View style={ALIGIN_ITEMS_CENTER}>
                  <SVGIcon icon='paper' color={color.primary} size={40} />
                </View>
                <View style={MARGIN_VERTICAL_SP3}>
                  <Text
                    preset='header3bold'
                    tx='jobDetailScreen.jobPaymentReview'
                  />
                </View>
                <JobTotalPriceInfo
                  {...{ trackerInfo, loadingTrackerInfo }}
                  isHourly={!jobInfo.fixPrice}
                  title={jobInfo.title}
                  completedAt={new Date(jobInfo.hiredBidInfo.completedAt)}
                  // rate={jobInfo.hiredBidInfo.requestedAmount}
                  calculatedRate={checkoutPreview.rate}
                  calculatedHoursLogged={checkoutPreview.hoursToCharge}
                  calculatedTotal={checkoutPreview.total}
                  calculatedTaxIncluded={checkoutPreview.tax}
                  calculatedFee={checkoutPreview.serviceFee}
                  customActionOnViewTimeLogsPress={() => {
                    setModalContentVariant('time_log')
                  }}
                  hourRate={jobInfo.hiredBidInfo.requestedAmount}
                />
                <Button
                  disabled={loadingCompleteJob}
                  preset={loadingCompleteJob ? 'primaryLoading' : 'primary'}
                  tx='jobDetailScreen.approvePay'
                  style={MARGIN_TOP_SP5}
                  onPress={() => onApprove()}
                />
              </View>
            ) : (
              <ViewTimeLogsContent {...{ trackerInfo, loadingTrackerInfo }} />
            )}
          </>
        )}
      </Modal>
    )
  },
)

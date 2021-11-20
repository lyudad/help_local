/* eslint-disable */
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { helperProfile, postJob } from 'constants/routes'
import React, { useEffect, useState, useCallback } from 'react'
import { TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { setJobsToInviteUser, setRequestsStatus } from 'screens/client/reducers'
import { getJobsToInviteUser, inviteUserToJob } from 'screens/client/thunk'
import { color, spacing } from 'theme'
import { ButtonPresetNames } from '../button/button.presets'
import { IInviteHelperModalProps } from './invite-helper-modal.props'
import { setSuccess } from 'app/store/commonSlice'
import { consumer, user } from 'app/store/selectors'
import {
  Button,
  Dropdown,
  HelperHeaderCard,
  Loader,
  Modal,
  Text,
  ShowError,
} from 'components'
import {
  ALIGIN_ITEMS_START,
  MARGIN_VERTICAL_SP3,
} from 'constants/common-styles'
import { translate } from 'i18n'
import { ERequestStatus, IJobsToInviteUser } from 'interfaces'

const FULL_WIDTH: ViewStyle = {
  width: '100%',
}

const TEXT_2_LEFT: TextStyle = {
  textAlign: 'left',
}

const MODAL_CONTAINER: ViewStyle = {
  alignItems: 'center',
  width: '100%',
}

const MARGIN_BOTTOM_1: ViewStyle & TextStyle = {
  marginBottom: spacing[4],
}

const MODAL_TITLE_CONTAINER: ViewStyle = {
  width: '100%',
  paddingBottom: spacing[5],
  marginBottom: spacing[5],
  borderBottomColor: color.palette.black01,
  borderBottomWidth: 1,
}

const MODAL_TEXT_CONTAINER: ViewStyle = {
  alignItems: 'flex-start',
  marginVertical: spacing[3],
  zIndex: 5,
}

const MODAL_TEXT: TextStyle = {
  ...TEXT_2_LEFT,
  marginTop: spacing[2],
}

const DROPDOWN_CONTAINER: ViewStyle = {
  maxHeight: 240,
}

export const InviteHelperModal = ({
  helperInfo,
  onToggleModal,
  helperNotPressable,
}: IInviteHelperModalProps): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const userFirstName = useSelector(user.firstName)
  const userLastName = useSelector(user.lastName)
  const jobsToInviteUser = useSelector(consumer.jobsToInviteUser)
  const isGetJobsToInviteUserLoading = useSelector(
    consumer.isGetJobsToInviteUserLoading,
  )
  const isInviteUserToJobLoading = useSelector(
    consumer.isInviteUserToJobLoading,
  )
  const requestsStatus = useSelector(consumer.requestsStatus)

  const [dropdownPlaceholder, setDropdownPlaceholder] = useState<string>(
    translate('inviteHelperModal.selectJob'),
  )
  const [
    selectedJobData,
    setSelectedJobData,
  ] = useState<IJobsToInviteUser | null>(null)
  const [localError, setLocalError] = useState<string>('')

  const cutStringIfLongAndThreeDots = (str: string): string => {
    let newStr = str
    if (str.length > 32) {
      newStr = str.slice(0, 32) + '...'
    }
    return newStr
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(
        getJobsToInviteUser({
          userToInviteId: helperInfo.userInfo.id,
          categoryId: helperInfo.category.id,
        }),
      )
      return () => {
        dispatch(setJobsToInviteUser([]))
        dispatch(
          setRequestsStatus({
            ...requestsStatus,
            lastGetJobsToInviteUserRequestStatus: ERequestStatus.NOT_SENT_YET,
          }),
        )
      }
    }, []),
  )

  useEffect(() => {
    if (selectedJobData)
      setDropdownPlaceholder(cutStringIfLongAndThreeDots(selectedJobData.title))
    else setDropdownPlaceholder(translate('inviteHelperModal.selectJob'))
  }, [selectedJobData])

  useEffect(() => {
    if (
      requestsStatus.lastInviteUserToJobRequestStatus !==
      ERequestStatus.NOT_SENT_YET
    ) {
      onToggleModal()
      if (
        requestsStatus.lastInviteUserToJobRequestStatus ===
        ERequestStatus.SUCCESS
      ) {
        dispatch(setSuccess(translate('inviteHelperModal.helperInvited')))
      }
      dispatch(
        setRequestsStatus({
          ...requestsStatus,
          lastInviteUserToJobRequestStatus: ERequestStatus.NOT_SENT_YET,
        }),
      )
    }
    if (
      requestsStatus.lastGetJobsToInviteUserRequestStatus ===
      ERequestStatus.FAIL
    )
      onToggleModal()
  }, [requestsStatus])

  const onSendInvite = () => {
    dispatch(
      inviteUserToJob({
        userToInviteId: helperInfo.userInfo.id,
        jobPostId: selectedJobData.id,
      }),
    )
  }

  const renderModalDropdownItems = (): JSX.Element[] => {
    return [
      <TouchableOpacity
        /* eslint-disable @typescript-eslint/ban-ts-comment */
        // @ts-ignore
        //childKey={01}
        style={MARGIN_VERTICAL_SP3}
        onPress={() => {
          onToggleModal()
          navigation.navigate(postJob, {
            category: helperInfo.category,
            inviteIds: [helperInfo.userInfo.id],
          })
        }}
      >
        <Text
          tx='clientDashboard.dropdownInvite'
          preset='header5bold'
          color={color.primary}
        />
      </TouchableOpacity>,
      ...(jobsToInviteUser && jobsToInviteUser.length > 0
        ? jobsToInviteUser.map(
            (item: IJobsToInviteUser): JSX.Element => (
              <View
                style={MARGIN_BOTTOM_1}
                key={item.id}
                /* eslint-disable @typescript-eslint/ban-ts-comment */
                // @ts-ignore
                childKey={item.id}
                action={() => {
                  setSelectedJobData(item)
                  setDropdownPlaceholder(item.title)
                  if (item.isInvitedAlready)
                    setLocalError(
                      translate('inviteHelperModal.alreadyInvitedForToThisJob'),
                    )
                  else setLocalError('')
                }}
              >
                <Text text={cutStringIfLongAndThreeDots(item.title)} />
              </View>
            ),
          )
        : []),
    ]
  }

  let inviteBtnPreset: ButtonPresetNames = 'secondaryDisabled'
  if (selectedJobData && !localError) inviteBtnPreset = 'secondary'
  if (isInviteUserToJobLoading) inviteBtnPreset = 'secondaryLoading'

  return (
    <Modal
      animationType='fade'
      transparent
      visible
      toggleModal={
        () => onToggleModal()
        //setCurrentHelper(null),
        //setCurrentJob(null),
        //setInviteToJobModal(!inviteToJobModal)
      }
    >
      <View style={MODAL_CONTAINER}>
        <View style={MODAL_TITLE_CONTAINER}>
          <Text
            tx='clientDashboard.modalTitle'
            preset='header3bold'
            color={color.primary}
          />
        </View>
        <HelperHeaderCard
          id={helperInfo.userInfo.id}
          avatar={helperInfo?.avatar}
          firstName={helperInfo?.userInfo?.firstName}
          lastName={helperInfo?.userInfo?.lastName}
          stars={helperInfo?.userInfo.avgRating}
          reviews={helperInfo?.userInfo.feedbackCount}
          rate={helperInfo?.price}
          avatarNotPressable={helperNotPressable}
          nameAndReviewNotPressable={helperNotPressable}
          onHelperPress={() => {
            navigation.navigate(helperProfile, { id: helperInfo.id })
          }}
        />
        <View style={FULL_WIDTH}>
          {isGetJobsToInviteUserLoading ? (
            <Loader preset='primayWithVerticalMarginSp3' />
          ) : (
            <Dropdown
              isItemsContainerRelative
              isItemsContainerScrollable
              placeholder={dropdownPlaceholder}
              dropdownTouchableItemStyle={ALIGIN_ITEMS_START}
              styleDropdown={DROPDOWN_CONTAINER}
              dropdownScrollViewStyle={FULL_WIDTH}
            >
              {renderModalDropdownItems()}
            </Dropdown>
          )}
        </View>
        <ShowError text={localError} style={MARGIN_VERTICAL_SP3} />
        <View style={MODAL_TEXT_CONTAINER}>
          <Text style={MODAL_TEXT} tx='clientDashboard.dropdownText1' />
          <Text style={MODAL_TEXT} tx='clientDashboard.dropdownText2' />
          <Text style={MODAL_TEXT} tx='clientDashboard.dropdownText3' />
          <Text
            style={TEXT_2_LEFT}
            text={`${userFirstName} ${userLastName[0]}.`}
          />
        </View>
        <Button
          preset={inviteBtnPreset}
          tx='clientDashboard.btnSendInvite'
          onPress={onSendInvite}
          disabled={
            isInviteUserToJobLoading ||
            selectedJobData?.isInvitedAlready ||
            !selectedJobData
          }
        />
      </View>
    </Modal>
  )
}

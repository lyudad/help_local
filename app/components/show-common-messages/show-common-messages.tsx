/* eslint-disable */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FlashMessage, { showMessage } from 'react-native-flash-message'

import { setError, setSuccess, setWarning } from 'app/store/commonSlice'
import { setError as setHelperReducerError } from 'screens/helper/reducers'
import { setError as setConsumerReducerError } from 'screens/client/reducers'
import {
  setAccessToken,
  setError as setBothReducerError,
} from 'screens/both/reducers'
import { common, consumer, helper, user } from 'app/store/selectors'
import { translate } from 'i18n'

import { resetAllExceptWelcomeMsg } from 'screens/both/reducers'
import { resetAll as resetAllClient } from 'screens/client/reducers'
import { resetAll as resetAllHelper } from 'screens/helper/reducers'
import { resetAll as resetAllAuth } from 'screens/auth/reducers'
import { resetAll as resetAllCommon } from 'app/store/commonSlice'
import { api } from 'services'
import { useState } from 'react'
import { Modal, Text } from 'components'
import { color } from 'theme'
import { Loader } from '../loader/loader'
import { keysToSnake } from 'utils/keys-to-snake'
import { CLIENT_ERROR, SERVER_ERROR } from 'apisauce'

export const ShowCommonMessages = (): JSX.Element => {
  const dispatch = useDispatch()
  const [isUpdateTokenModalOpen, setIsUpdateTokenModalOpen] = useState<boolean>(
    false,
  )

  const error = useSelector(common.error)
  const success = useSelector(common.success)
  const warning = useSelector(common.warning)
  const autoShowMessage: boolean = useSelector(common.autoShowMessage)

  const helperReducerError = useSelector(helper.error)
  const helperAutoShowError = useSelector(helper.autoShowError)

  const consumerReducerError = useSelector(consumer.error)
  const consumerAutoShowError = useSelector(consumer.autoShowError)

  const bothReducerError = useSelector(user.error)
  const bothAutoShowError = useSelector(user.autoShowError)
  const refreshToken: string = useSelector(user.refreshToken)

  const updateToken = async () => {
    setIsUpdateTokenModalOpen(true)
    try {
      const res = await api.post('refresh', keysToSnake({ refreshToken }))
      if (res.ok) {
        setIsUpdateTokenModalOpen(false)
        // @ts-ignore
        // eslint-disable next-line
        dispatch(setAccessToken(res.data.data.access_token))
      } else if (res.problem === CLIENT_ERROR || res.problem === SERVER_ERROR) {
        setIsUpdateTokenModalOpen(false)
        dispatch(setWarning(translate('common.signInAgain')))
        dispatch(resetAllAuth())
        dispatch(resetAllCommon())
        dispatch(resetAllClient())
        dispatch(resetAllHelper())
        dispatch(resetAllExceptWelcomeMsg())
      } else {
        dispatch(setError(translate('common.requestError')))
        updateToken()
      }
    } catch (error) {
      dispatch(setError(translate('common.requestError')))
      updateToken()
    }
  }

  useEffect(() => {
    if (
      autoShowMessage ||
      helperAutoShowError ||
      consumerAutoShowError ||
      bothAutoShowError
    ) {
      const succesText = 'success'
      const dangerText = 'danger'
      const warningText = 'warning'
      let message =
        error ||
        helperReducerError ||
        consumerReducerError ||
        bothReducerError ||
        warning ||
        success
      let type: 'success' | 'danger' | 'warning' = succesText
      if (
        error ||
        helperReducerError ||
        consumerReducerError ||
        bothReducerError
      ) {
        type = dangerText
      } else if (warning) {
        type = warningText
      }
      if (
        message &&
        (((error || warning || success) && autoShowMessage) ||
          (helperReducerError && helperAutoShowError) ||
          (consumerReducerError && consumerAutoShowError) ||
          (bothReducerError && bothAutoShowError))
      ) {
        if (message.includes('Authorization error')) {
          updateToken()
        } else {
          showMessage({ message, type })
        }
        if (autoShowMessage) {
          dispatch(setError(null))
          dispatch(setSuccess(null))
          dispatch(setWarning(null))
        }
        if (helperAutoShowError) dispatch(setHelperReducerError(''))
        if (consumerAutoShowError) dispatch(setConsumerReducerError(''))
        if (bothAutoShowError) dispatch(setBothReducerError(''))
      }
    }
  }, [
    error,
    success,
    warning,
    autoShowMessage,
    helperReducerError,
    helperAutoShowError,
    consumerReducerError,
    consumerAutoShowError,
    bothReducerError,
    bothAutoShowError,
  ])

  return (
    <>
      <Modal
        visible={isUpdateTokenModalOpen}
        toggleModal={() => {}}
        crossColor={color.palette.white}
      >
        <Text tx='common.updatingSession' preset='bold' />
        <Loader preset='primayWithVerticalMarginSp3' />
      </Modal>
      <FlashMessage icon='auto' duration={5000} />
    </>
  )
}

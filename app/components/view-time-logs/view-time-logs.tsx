import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'

import { Modal, Text } from 'components'
import { color } from 'theme'
import { IViewTimeLogsProps } from './view-time-logs.props'
import { ViewTimeLogsContent } from '../view-time-logs-content'

export const ViewTimeLogs = (props: IViewTimeLogsProps): JSX.Element => {
  const {
    style,
    textStyle,
    trackerInfo,
    loadingTrackerInfo,
    customActionOnViewTimeLogsPress,
  } = props

  const [showModal, setShowModal] = useState<boolean>(false)

  return (
    <View {...{ style }}>
      <Modal visible={showModal} toggleModal={() => setShowModal(!showModal)}>
        <ViewTimeLogsContent {...{ loadingTrackerInfo, trackerInfo }} />
      </Modal>
      <TouchableOpacity
        onPress={() => {
          if (customActionOnViewTimeLogsPress) {
            customActionOnViewTimeLogsPress()
          } else {
            setShowModal(true)
          }
        }}
      >
        <Text
          tx='jobDetailScreen.viewTimeLogs'
          preset='subtitleBoldLink'
          color={color.primary}
          style={textStyle}
        />
      </TouchableOpacity>
    </View>
  )
}

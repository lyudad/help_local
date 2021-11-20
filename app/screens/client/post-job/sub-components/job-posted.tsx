import React, { useEffect } from 'react'
import {
  View,
  ViewStyle,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native'

import { SVGIcon, Text } from 'components'
import { color, spacing } from 'theme'
import {
  PADDING_BOTTOM_SP3,
  PADDING_BOTTOM_SP6,
  PADDING_TOP_SP3,
  PADDING_TOP_SP4,
  UNDERLINE,
} from 'constants/common-styles'
import { useDispatch, useSelector } from 'react-redux'
import { consumer } from 'app/store/selectors/consumer'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import {
  setLastPostedCachedJobId,
  setLastPostedJobId,
} from 'screens/client/reducers'
import { jobDetail } from 'constants/routes'

const circleImg = require('assets/job-posted.png')

const WRAPPER: ViewStyle = {
  paddingTop: spacing[7] - 7,
  paddingBottom: spacing[7],
  alignItems: 'center',
}

const INFO_VIEW: ViewStyle = {
  width: '80%',
}

const CIRCLE_IMAGE_CONTAINER: ViewStyle = {
  width: '100%',
  height: 333,
  justifyContent: 'center',
  alignItems: 'center',
  paddingTop: spacing[4],
}

export const JobPosted = (): JSX.Element => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isFocus: boolean = useIsFocused()
  const lastPostedJobId: number = useSelector(consumer.lastPostedJobId)
  const lastPostedCachedJobId: number = useSelector(
    consumer.lastPostedCachedJobId,
  )

  useEffect(() => {
    if (!isFocus) {
      dispatch(setLastPostedJobId(null))
      dispatch(setLastPostedCachedJobId(null))
    }
  }, [isFocus])

  const navigateToNewJob = (): void => {
    const id = lastPostedJobId || lastPostedCachedJobId
    dispatch(setLastPostedJobId(null))
    dispatch(setLastPostedCachedJobId(null))
    navigation.navigate(jobDetail, { id })
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={WRAPPER}>
        <SVGIcon icon='checkInCircle' size={45} color={color.primary} />
        <View style={{ ...PADDING_TOP_SP4, ...PADDING_BOTTOM_SP3 }}>
          <Text preset='header1' tx='postJob.jobPosted' />
        </View>
        <View style={INFO_VIEW}>
          <Text tx='postJob.jobPostedInfo' />
        </View>
        <TouchableOpacity
          style={{
            ...PADDING_TOP_SP3,
            ...PADDING_BOTTOM_SP6,
          }}
          onPress={navigateToNewJob}
        >
          <Text
            tx='postJob.takeMeToMyJob'
            preset='header4'
            color={color.primary}
            style={{ ...UNDERLINE }}
          />
        </TouchableOpacity>
        <View style={CIRCLE_IMAGE_CONTAINER}>
          <Image source={circleImg} />
        </View>
      </View>
    </ScrollView>
  )
}

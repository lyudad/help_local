/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import dayjs from 'dayjs'

import { Text } from 'components'
import { color } from 'theme'
import { useDispatch, useSelector } from 'react-redux'
import { consumer } from 'app/store/selectors/consumer'
import { IArchivedJob, IJobInfo } from 'interfaces'
import { getJobInfo, getArchivedJobs } from 'screens/client/thunk'
import { useIsFocused, useNavigation } from '@react-navigation/core'
import { postJob } from 'constants/routes'
import { resetArchvedJobs } from 'screens/client/reducers'
import { flatten, mergeAll } from 'ramda'
import { ICategoryPreviousJobsProps } from './category-previous-jobs.props'
import * as presets from './category-previous-jobs.presets'
import { Loader } from '../loader/loader'
import { useFocusEffect } from '@react-navigation/native'

const defaultAvatar = require('assets/default-avatar.png')

export const CategoryPreviousJobs = (
  props: ICategoryPreviousJobsProps,
): JSX.Element => {
  const {
    preset = 'primary',
    category,
    shouldNavigateToPostJob,
    style: styleOverride,
  } = props
  const style = mergeAll(
    flatten([
      presets.wrapperPresets[preset] || presets.wrapperPresets.primary,
      styleOverride,
    ]),
  )
  const circleAvatarStyle = mergeAll(
    flatten([
      presets.circleAvatarPresets[preset] ||
        presets.circleAvatarPresets.primary,
    ]),
  )
  const modalBtnStyle = mergeAll(
    flatten([
      presets.modalBtnPresets[preset] || presets.modalBtnPresets.primary,
    ]),
  )
  const modalItemBottomPartStyle = mergeAll(
    flatten([
      presets.modalItemBottomPartPresets[preset] ||
        presets.modalItemBottomPartPresets.primary,
    ]),
  )
  const modalItemStyle = mergeAll(
    flatten([
      presets.modalItemPresets[preset] || presets.modalItemPresets.primary,
    ]),
  )
  const modalItemTitleStyle = mergeAll(
    flatten([
      presets.modalItemTitlePresets[preset] ||
        presets.modalItemTitlePresets.primary,
    ]),
  )
  const modalItemTopPartStyle = mergeAll(
    flatten([
      presets.modalItemTopPartPresets[preset] ||
        presets.modalItemTopPartPresets.primary,
    ]),
  )
  const rowContainerStyle = mergeAll(
    flatten([
      presets.rowContainerPresets[preset] ||
        presets.rowContainerPresets.primary,
    ]),
  )

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const isFocused: boolean = useIsFocused()
  const archivedJobs: IArchivedJob[] = useSelector(consumer.archivedJobs)
  const jobInfo: IJobInfo | null = useSelector(consumer.jobInfo)

  const [
    wasJobInfoLoadedByThisCommponent,
    setWasJobInfoLoadedByThisCommponent,
  ] = useState<boolean>(false)

  useEffect(() => {
    dispatch(resetArchvedJobs())
    dispatch(getArchivedJobs({ categoryId: category.id }))
  }, [category])
  useEffect(() => {
    if (
      jobInfo &&
      shouldNavigateToPostJob &&
      isFocused &&
      wasJobInfoLoadedByThisCommponent
    ) {
      navigation.navigate(postJob, {
        isCameFromOtherScreenWithJobInfoForReuse: true,
      })
    }
  }, [jobInfo])

  useFocusEffect(
    useCallback(() => {
      return () => setWasJobInfoLoadedByThisCommponent(false)
    }, []),
  )

  const renderModalList = (_archivedJobs: IArchivedJob[]): JSX.Element[] =>
    _archivedJobs.map(
      (job: IArchivedJob): JSX.Element => {
        let avatar = defaultAvatar
        if (job.helperInfo?.avatar) {
          avatar = { uri: job.helperInfo.avatar.sourceUrl }
        }
        return (
          <View key={job.id.toString()} style={modalItemStyle}>
            <View style={modalItemTopPartStyle}>
              <Text preset='bold' text={job.title} />
              <TouchableOpacity
                style={modalBtnStyle}
                onPress={() => {
                  setWasJobInfoLoadedByThisCommponent(true)
                  dispatch(resetArchvedJobs())
                  dispatch(getJobInfo({ id: job.id }))
                }}
              >
                <Text
                  preset='bold'
                  color={color.palette.white}
                  tx='postJob.modalBtn'
                />
              </TouchableOpacity>
            </View>
            <View style={modalItemBottomPartStyle}>
              <View style={rowContainerStyle}>
                <Image source={avatar} style={circleAvatarStyle} />
                <Text>
                  <Text text={job.helperInfo?.firstName} />
                  <Text text={` ${job.helperInfo?.lastName.charAt(0)}.`} />
                </Text>
              </View>
              <View style={rowContainerStyle}>
                <Text
                  tx={`postJob.modal${job.completed ? 'Done' : 'Deleted'}`}
                />
                <Text text={`: ${dayjs(job.deletedAt).format('MM/DD/YY')}`} />
              </View>
            </View>
          </View>
        )
      },
    )

  return (
    <ScrollView style={style} showsVerticalScrollIndicator={false}>
      <View style={modalItemTitleStyle}>
        <Text preset='header3bold' text={category.title} />
      </View>
      {archivedJobs.length ? (
        renderModalList(archivedJobs)
      ) : (
        <Loader preset='primayWithVerticalMarginSp3' />
      )}
    </ScrollView>
  )
}

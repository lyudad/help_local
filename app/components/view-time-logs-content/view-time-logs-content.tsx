import React from 'react'
import { View, ScrollView } from 'react-native'
import dayjs from 'dayjs'

import { Hr, Loader, SVGIcon, Text } from 'components'
import { color } from 'theme'
import {
  ALIGIN_ITEMS_CENTER,
  FLEX_1,
  FULL_WIDTH,
  MARGIN_VERTICAL_SP1,
  MARGIN_VERTICAL_SP2,
  MARGIN_VERTICAL_SP3,
  ROW,
} from 'constants/common-styles'
import { IViewTimeLogsContentProps } from './view-time-logs-content.props'

export const ViewTimeLogsContent = (
  props: IViewTimeLogsContentProps,
): JSX.Element => {
  const { style, trackerInfo, loadingTrackerInfo } = props

  return (
    <ScrollView
      style={FULL_WIDTH}
      contentContainerStyle={[ALIGIN_ITEMS_CENTER, style]}
    >
      <SVGIcon icon='oclock' color={color.primary} width={32} height={40} />
      <View style={MARGIN_VERTICAL_SP3}>
        <Text
          preset='header3bold'
          tx='jobDetailScreen.timeLogs'
          color={color.primary}
        />
      </View>
      <View style={ALIGIN_ITEMS_CENTER}>
        {loadingTrackerInfo && <Loader />}
        {!loadingTrackerInfo && !trackerInfo.length && (
          <Text preset='subtitle' tx='jobDetailScreen.noTimeLogged' />
        )}
        {!loadingTrackerInfo &&
          trackerInfo.length > 0 &&
          trackerInfo.map((info, index) => (
            <>
              {index !== 0 &&
                dayjs(trackerInfo[index - 1].endAt).format('DD') !==
                  dayjs(info.startAt).format('DD') && (
                  <View style={[ROW, MARGIN_VERTICAL_SP2]}>
                    <Hr />
                  </View>
                )}
              <View style={[ROW, MARGIN_VERTICAL_SP1]}>
                <View style={FLEX_1}>
                  <View style={ROW}>
                    <Text
                      text={dayjs(info.startAt).format('MM/DD/YY')}
                      preset='header4'
                    />
                  </View>
                </View>
                <View style={FLEX_1}>
                  <View style={ROW}>
                    <SVGIcon icon='start' color={color.primary} />
                    <Text color={color.palette.white} text='-' />
                    <Text preset='header4slim' tx='jobDetailScreen.start' />
                    <Text
                      preset='header4slim'
                      text={dayjs(info.startAt).format('h:mma')}
                    />
                  </View>
                </View>
              </View>
              {info.endAt && (
                <View style={[ROW, MARGIN_VERTICAL_SP1]}>
                  <View style={FLEX_1}>
                    <View style={ROW}>
                      <Text
                        text={dayjs(info.endAt).format('MM/DD/YY')}
                        preset='header4'
                      />
                    </View>
                  </View>
                  <View style={FLEX_1}>
                    <View style={ROW}>
                      <SVGIcon icon='pause' />
                      <Text color={color.palette.white} text='-' />
                      <Text preset='header4slim' tx='jobDetailScreen.pause' />
                      <Text
                        preset='header4slim'
                        text={dayjs(info.endAt).format('h:mma')}
                      />
                    </View>
                  </View>
                </View>
              )}
            </>
          ))}
      </View>
    </ScrollView>
  )
}

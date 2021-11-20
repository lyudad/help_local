import React, { memo } from 'react'
import { View } from 'react-native'
import { mergeAll, flatten } from 'ramda'

import { Button, RowSpaceBetween, Text } from 'components'
import {
  ALIGIN_ITEMS_CENTER,
  JUSTIFY_CONTENT_CENTER,
  MARGIN_HORIZONTAL_SP2,
  ROW,
} from 'constants/common-styles'
import {
  containerPresets,
  titlePresets,
  btnsWrapperPresets,
  btnsPresets,
} from './two-buttons-with-title.presets'
import { ITwoButtonsWithTitleProps } from './two-buttons-with-title.props'
import { QuestionMarkInBlackCircle } from '../question-mark-in-black-circle/question-mark-in-black-circle'

export const TwoButtonsWithTitle = memo(
  (props: ITwoButtonsWithTitleProps): JSX.Element => {
    const {
      preset = 'primary',
      title,
      subTitle,
      showQestionMarkAfterTitle,
      onQuestionMarkPress,
      firstBtnText,
      secondBtnText,
      activeOne,
      onButtonsPress,
      style: styleOverride,
      titleStyle: titleStyleOverride,
      disabled,
    } = props

    const style = mergeAll(
      flatten([
        containerPresets[preset] || containerPresets.primary,
        styleOverride,
      ]),
    )
    const titleStyle = mergeAll(
      flatten([
        titlePresets[preset] || titlePresets.primary,
        titleStyleOverride,
      ]),
    )
    const btnsWrapperStyle = mergeAll(
      flatten([btnsWrapperPresets[preset] || btnsWrapperPresets.primary]),
    )
    const btnsStyle = mergeAll(
      flatten([btnsPresets[preset] || btnsPresets.primary]),
    )

    const firstBtnPreset: 'primary' | 'fourth' =
      activeOne === 1 ? 'primary' : 'fourth'
    const secondBtnPreset: 'primary' | 'fourth' =
      activeOne === 2 ? 'primary' : 'fourth'

    return (
      <View style={style}>
        <View
          style={{ ...ROW, ...JUSTIFY_CONTENT_CENTER, ...ALIGIN_ITEMS_CENTER }}
        >
          <Text>
            <Text text={title} style={titleStyle} preset='header4slim' />
            {subTitle && (
              <>
                <Text text=' ' />
                <Text text={subTitle} preset='subtitle' />
              </>
            )}
          </Text>
          {showQestionMarkAfterTitle && (
            <QuestionMarkInBlackCircle
              {...{ onQuestionMarkPress }}
              style={{ ...MARGIN_HORIZONTAL_SP2 }}
            />
          )}
        </View>
        <RowSpaceBetween
          style={btnsWrapperStyle}
          StartItem={
            <Button
              {...{ disabled }}
              style={btnsStyle}
              preset={disabled && activeOne !== 1 ? 'disabled' : firstBtnPreset}
              text={firstBtnText}
              onPress={() => onButtonsPress(1)}
            />
          }
          EndItem={
            <Button
              {...{ disabled }}
              style={btnsStyle}
              preset={
                disabled && activeOne !== 2 ? 'disabled' : secondBtnPreset
              }
              text={secondBtnText}
              onPress={() => onButtonsPress(2)}
            />
          }
        />
      </View>
    )
  },
)

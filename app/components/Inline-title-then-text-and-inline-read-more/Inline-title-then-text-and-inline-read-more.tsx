/* eslint-disable */
import React, { useState } from 'react'
import { Dimensions, TextStyle } from 'react-native'

import { Text, InlineTouchableText } from 'components'
import { TEXT_ALIGIN_LEFT, UNDERLINE } from 'constants/common-styles'
import { IInlineTitleThenTextAndInlineReadMoreProps } from './Inline-title-then-text-and-inline-read-more.props'
import { translate } from 'i18n'

export const InlineTitleThenTextAndInlineReadMore = ({
  title,
  text,
  readMoreText,
  isAlwaysReadMoreMode,
  titleStyle,
  textStyle,
  isReadMoreBtnHidden,
}: IInlineTitleThenTextAndInlineReadMoreProps): JSX.Element => {
  let newText: string = text
  let [
    isShowFullTextWitoutModes,
    setIsShowFullTextWitoutModes,
  ] = useState<boolean>(isAlwaysReadMoreMode)

  const windowWidth = Dimensions.get('window').width
  const lettersCountForOneRow: number =
    Math.round(windowWidth - Math.round(windowWidth / 100) * 20) / 10
  // 20 is space for paddingHorizontal
  // 10 is space for each letter
  const countOfRows: number = Math.round(
    (text.length + 20) / lettersCountForOneRow,
  )
  // 20 is space for title
  if (countOfRows <= 4) {
    if (!isShowFullTextWitoutModes) setIsShowFullTextWitoutModes(true)
    isShowFullTextWitoutModes = true
  }
  const [isReadMoreMode, setIsReadMoreMode] = useState<boolean>(
    isShowFullTextWitoutModes,
  )
  if (!isReadMoreMode && countOfRows > 4) {
    newText = text.slice(0, lettersCountForOneRow * 4 - 7 - 1) + '...'
    // 7 is space for "read more" text
    // 1 is space for "..." dots
  }
  const READ_MORE: TextStyle = {
    ...UNDERLINE,
    fontWeight: 'bold',
  }

  let readMoreOrReadLess: string = 'readMore'
  if (isReadMoreMode) readMoreOrReadLess = 'less'

  return (
    <Text style={TEXT_ALIGIN_LEFT}>
      <Text
        preset='bold'
        text={title}
        {...(titleStyle && { style: [titleStyle, TEXT_ALIGIN_LEFT] })}
      />
      <Text text={newText} {...(textStyle && { style: textStyle })} />
      {!isShowFullTextWitoutModes && !isReadMoreBtnHidden && (
        <InlineTouchableText
          onTextPress={() => setIsReadMoreMode(!isReadMoreMode)}
          {...{
            text:
              ' ' +
              (readMoreText
                ? readMoreText
                : translate(
                    'inlineTitleThenTextAndInlineReadMore.' +
                      readMoreOrReadLess,
                  )),
          }}
          textStyle={READ_MORE}
        />
      )}
    </Text>
  )
}

import * as React from 'react'
import { ScrollView, ScrollViewProps } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'
import { common } from 'app/store/selectors'
import { setOnScrollEventForGradient } from 'app/store/commonSlice'

export const ScrollViewWithGradientStateUpdater = ({
  onContentSizeChange,
  onScroll,
  ...rest
}: ScrollViewProps): JSX.Element => {
  const dispatch = useDispatch()
  const onScrollEventForGradient = useSelector(common.onScrollEventForGradient)

  return (
    <ScrollView
      onContentSizeChange={(x, y) => {
        dispatch(
          setOnScrollEventForGradient({
            ...onScrollEventForGradient,
            contentSize: {
              height: y,
            },
          }),
        )
        if (onContentSizeChange) {
          onContentSizeChange(x, y)
        }
      }}
      onScroll={(e) => {
        dispatch(setOnScrollEventForGradient(e.nativeEvent))
        if (onScroll) {
          onScroll(e)
        }
      }}
      {...rest}
    />
  )
}

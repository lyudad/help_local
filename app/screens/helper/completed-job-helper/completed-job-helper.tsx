import React, { useEffect } from 'react'
import { ViewStyle } from 'react-native'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { UserStackRouteProps } from 'navigation'
import { useDispatch, useSelector } from 'react-redux'

import { BaseScreen, JobCompletedCard, Loader } from 'components'
import { spacing } from 'theme'
// import { useHeaderAnimation } from 'hooks'
import { IBidInfo } from 'interfaces'
import { helper } from 'app/store/selectors'
import { getBidInfo } from '../thunk'

const BASE_VIEW: ViewStyle = {
  paddingTop: spacing[7] - 8,
}

export const CompletedJobHelper = (): JSX.Element => {
  const dispatch = useDispatch()
  // const { headerStyle, scrollHandler } = useHeaderAnimation(80)
  const route = useRoute<UserStackRouteProps<'completedJobHelper'>>()

  const isScreenFocused: boolean = useIsFocused()

  const bidInfo: IBidInfo = useSelector(helper.bidInfo)
  const loadingBidInfo: boolean = useSelector(helper.loadingBidInfo)

  const { bidId } = route.params

  useEffect(() => {
    if (isScreenFocused && (!bidInfo || (bidInfo && bidInfo.id !== bidId))) {
      dispatch(getBidInfo({ id: bidId }))
    }
  }, [isScreenFocused])

  return (
    <BaseScreen
      withHeader
      // textBack='completedJobHelperScreen.goBackToNotifications'
      // headerAnimate={headerStyle}
      // onScroll={scrollHandler}
      horizontalPaddingViewStyle={BASE_VIEW}
      type='scroll'
    >
      {bidInfo && bidInfo.id === bidId && !loadingBidInfo ? (
        <>
          <JobCompletedCard isClient={false} {...{ bidInfo }} />
        </>
      ) : (
        <Loader preset='primayWithVerticalMarginSp3' />
      )}
    </BaseScreen>
  )
}

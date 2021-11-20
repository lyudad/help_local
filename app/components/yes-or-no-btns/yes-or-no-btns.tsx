import React from 'react'
import { mergeAll, flatten } from 'ramda'

import { TwoButtonsWithTitle } from 'components'
import { translate } from 'i18n'
import { containerPresets } from './yes-or-no-btns.presets'
import { IYesOrNoBtnsProps } from './yes-or-no-btns.props'

export const YesOrNoBtns = (props: IYesOrNoBtnsProps): JSX.Element => {
  const {
    preset = 'primary',
    style: styleOverride,
    title: titleFromProps,
    activeOne,
    onButtonsPress,
    subTitle: subTitleFromProps,
    showDefaultSubTitle,
  } = props

  const style = mergeAll(
    flatten([
      containerPresets[preset] || containerPresets.primary,
      styleOverride,
    ]),
  )

  const title: string = titleFromProps || translate('yesOrNoBtns.defaultTitle')
  const subTitle: string | undefined =
    subTitleFromProps ||
    (showDefaultSubTitle ? translate('yesOrNoBtns.defaultSubTitle') : undefined)

  return (
    <TwoButtonsWithTitle
      style={style}
      title={title}
      {...(subTitle && { subTitle })}
      activeOne={activeOne}
      firstBtnText={translate('common.yes')}
      secondBtnText={translate('common.no')}
      onButtonsPress={onButtonsPress}
    />
  )
}

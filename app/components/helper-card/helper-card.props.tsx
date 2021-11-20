import { IHelperInfo } from 'interfaces'

export enum HelperCardButtonsBlockVersion {
  LikeAndView = 1,
  InviteToJobAndView,
  InviteHelperAndView,
  ViewAndInviteToJob,
  SelectHelperAndView,
}

export interface HelperCardProps {
  helper: IHelperInfo

  showCategory?: boolean

  isPreviouslyUsed?: boolean

  withSendMsgBtn?: boolean

  jobIdForMsg?: number

  withBid?: boolean

  onlyInviteBtn?: boolean

  jobsPendingForTime?: number

  /**
   * 1
   *  white button with like icon
   *  and after second button with preset 'fifth' and 'View profile' text
   * 2
   *  black button with text 'Invite to job'
   *  and after second button is as like in 1
   * 3
   *  black button with text 'Invite helper'
   *  and after second button is as like in 1
   * 4
   *  black button with text 'View profile'
   *  and after second button is as like in 1, but text is 'Invite to job'
   * 5
   *  black button with text 'select helper'
   *  and after second button is as like in 1
   */
  buttonsBlockVersion: HelperCardButtonsBlockVersion

  withoutHr?: boolean
  withoutMenu?: boolean
  nameAndReviewNotPressable?: boolean
  isReadMoreBtnHidden?: boolean
  withBasedOnYourJobTitle?: boolean

  sendAction?: () => void
  afterProfileBlocked?: () => void
  onHelperPress?: () => void
  onAvatarPress?: () => void
  onFirstBtnPress?: () => void
  onSecondBtnPress?: () => void
}

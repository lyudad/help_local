import { ViewStyle } from 'react-native'

export interface HeaderProps {
  /**
   *y axis
   */
  headerAnimate?: ViewStyle
  /**
   *Placeholder text for bottom input which is looked up via i18n.
   */
  placeholder?: string

  /**
   *Text for action back
   */
  textBack?: string

  /**
   *Action for back text
   */
  actionForBackText?: () => void

  /**
   *Action for input filter
   */
  toggleFilterModal?: () => void

  isFormValidToNavigate?: boolean

  /**
   * Avatar image source.
   */
  /* eslint-disable @typescript-eslint/no-explicit-any */
  avatarSrc?: any

  /**
   * If true - input availabel above button/textBack
   */
  input?: boolean

  /**
   * If true - availabel only text back
   */
  onlyTextBack?: boolean

  /**
   * Button - 'post job'
   */
  clientBtn?: boolean

  /**
   * It can be used on edit job screen
   */
  customActionOnPostJobPress?: () => void

  isFinishProfileModalOpen?: boolean

  filterActivityStatusFromParent?: 'active' | 'not-active'

  onCloseFinishProfileModal?: () => void
}

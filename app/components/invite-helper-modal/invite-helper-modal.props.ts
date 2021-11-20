import { IHelperInfo } from 'interfaces'

export interface IInviteHelperModalProps {
  helperInfo: IHelperInfo
  onToggleModal: () => void
  helperNotPressable?: boolean
}

import { Alert } from 'react-native'

interface IUseBeforeRemoveProps {
  isValid: boolean
  navigate: () => void
}
export const useBeforeRemove = ({
  isValid,
  navigate,
}: IUseBeforeRemoveProps) => {
  if (isValid) {
    navigate()
  } else {
    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigate(),
        },
      ],
    )
  }
}

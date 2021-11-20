import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import { Input, Text } from 'components'
import { color } from 'theme'
import { ALIGN_SELF_END, PADDING_BOTTOM_SP3 } from 'constants/common-styles'

interface IProps {
  value: string
  onRemoveQuestionPress: () => void
  onQuestionChange: (newText: string) => void
}

export const RenderQuestion = ({
  value,
  onRemoveQuestionPress,
  onQuestionChange,
}: IProps): JSX.Element => {
  return (
    <View style={PADDING_BOTTOM_SP3}>
      <Input value={value} onChangeText={onQuestionChange} />
      <TouchableOpacity onPress={onRemoveQuestionPress} style={ALIGN_SELF_END}>
        <Text
          tx='postJob.removeQuestion'
          color={color.primary}
          preset='subtitleBolderLink'
        />
      </TouchableOpacity>
    </View>
  )
}

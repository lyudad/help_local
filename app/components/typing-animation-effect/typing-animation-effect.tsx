import React, { useState } from 'react'
import { TextStyle } from 'react-native'
import { color } from 'theme'
import TypeWriter from 'react-native-typewriter'
import { Text } from '../text/text'

type PropsType = {
  list: Array<string>
}

const DESC_TEXT: TextStyle = {
  color: color.palette.white,
}

const CURSOR: TextStyle = {
  fontSize: 23,
  fontWeight: '200',
  color: color.palette.white,
}

export const TypingAnimationEffect = ({ list }: PropsType): JSX.Element => {
  const [index, setIndex] = useState<number>(0)
  const changeIndex = (): void => {
    setTimeout(() => {
      if (index >= list.length - 1) {
        setIndex(0)
      } else {
        setIndex(index + 1)
      }
    }, 2000)
  }

  return (
    <TypeWriter typing={1} onTypingEnd={changeIndex} initialDelay={200}>
      <Text preset='header2bold' style={DESC_TEXT}>
        {list[index]}
      </Text>
      <Text text='|' style={CURSOR} />
    </TypeWriter>
  )
}

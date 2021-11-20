import * as React from 'react'
import { storiesOf } from '@storybook/react-native'
import { StoryScreen, Story, UseCase } from 'storybook/views'
import { Dropdown } from './dropdown'
import { Text } from '../text/text'

const container = { height: 250 }
declare let module

storiesOf('Dropdown', module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add('Presets', () => (
    <Story>
      <UseCase text='Primary' usage='The primary dropdown.' style={container}>
        <Dropdown placeholder='test text'>
          <Text text='test text_1' />
          <Text text='test text_2' />
          <Text text='test text_3' />
          <Text text='test text_4' />
          <Text text='test text_5' />
        </Dropdown>
      </UseCase>
    </Story>
  ))
